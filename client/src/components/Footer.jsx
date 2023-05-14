import { useState,useCallback,useEffect } from 'react'
import { create } from 'ipfs-http-client'
import React from 'react';
import "./Footer.css"
import useEth from "../contexts/EthContext/useEth";
import { Buffer } from 'buffer';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from "@web3modal/ethereum";


import { Web3Button } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({
  Canvas:HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img')
  })

const projectId = '2L2d01In1I9OFbre81IirWt0szw';
const projectSecret = '7c43815b40bc5ae32c34ad9d6db87dad';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
let input=''


function Footer() {  
  const [fileUrl, updateFileUrl] = useState("");
  const{state: {contract,accounts,web3}} = useEth();
  const[yournumber,numset]=useState("");
  const[inputs, setInputs]=useState({selectaddr:'',cname:'',nationality:'',crime:'',amount:'',age:''});
  const {selectaddr,cname,nationality,age,crime,amount}  =inputs;
  const inputss = document.getElementById('myImg')
  const chains =[sepolia];
  
  
  
  const {provider} = configureChains(chains,[w3mProvider({ projectId:'ad51cb658b57c4bb5916b92e7f4a4ff7'})]);
    
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
  
      projectId:'ad51cb658b57c4bb5916b92e7f4a4ff7',
      version: "1", 
  
    chains,
    
  }),
  provider,
  });

  
  const ethereumClient = new EthereumClient(wagmiClient,chains);
  

useEffect(() => {
  
 input= document.getElementById('myImg')

  console.log(yournumber)
  
}, []);

async function onChange(e)
{
  const {value,name} =e.target
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
}


const loadImage = async () => {
  // 업로드 된 이미지 이름을 배열에 담아 라벨링 합니다.
  const labels = ["you"];


  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      const detections = await faceapi
        .detectSingleFace(input)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);


      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
};


useEffect(() => {
  const loadModels = async () => {

    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json'),
      faceapi.nets.faceLandmark68Net.loadFromUri('https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_model-weights_manifest.json'),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri('https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json'),
      faceapi.nets.faceRecognitionNet.loadFromUri('https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_recognition_model-weights_manifest.json')

    ])
  }
  loadModels();
}, []);

const [imageSrc, setImageSrc]= useState(null);


const onUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve) => { 
      reader.onload = () => {  
          setImageSrc(reader.result || null); // 파일의 컨텐츠
          resolve();

      }; 

  });

}


//여기에 솔리디티 접근제어 메소드 및 버튼 추가해서 반영할것
//요청서 형식으로 ui변경해서 반영

async function discriptorFromImage(e)
{
  try {
  const labeledFaceDescriptors =await  loadImage();
  const descriptor=JSON.stringify(labeledFaceDescriptors[0])

  //여기서 processrequest 파라미터는 입력탭 만들어서 받아야한다.
  const processRequest = await contract.methods.processRequest(cname,nationality,age,crime,amount,descriptor).send({from:accounts[0]});
  const requstid=processRequest.events.RequestReceived.returnValues[0]
  const issueRedNotice = await contract.methods.issueRedNotice(requstid).send({from:accounts[0]});
  console.log(issueRedNotice)
} 
catch (error) {  
  console.log(error)
}
}

async function getCriminal()
{
  try {
    const result = await contract.methods.getCriminal(5).call();
      console.log(result)


} 
catch (error) {  
  console.log(error)
}
}

async function addAllowedUser()
{
  try {
    const result = await contract.methods.addAllowedUser(selectaddr).send({from:accounts[0]});
    console.log(result)
} 
catch (error) {  
  console.log(error)
}
}





  return (

  <div className='Deploys' >

<WagmiConfig client={wagmiClient} >            
            </WagmiConfig>
        <Web3Modal projectId="ad51cb658b57c4bb5916b92e7f4a4ff7"ethereumClient={ethereumClient}/>


<div className='Procedure'>


      
      <div className='container'>
    <div className='CrimeDetail' style={{display:'inline-block'}}>
      <div style={{display:'inline-block'}} >
      <div>
      <input name="cname" placeholder='성명' onChange={onChange} value={cname} style={{width:'200px'}} />
      </div>
      <div>
       <input name="nationality"placeholder='국가' onChange={onChange} value={nationality} style={{width:'200px'}}/>
      </div>
      <div>
       <input name="age"placeholder='나이' onChange={onChange} value={age} style={{width:'200px'}}/>
      </div>
      <div>
       <input name="crime"placeholder='범죄' onChange={onChange} value={crime} style={{width:'200px'}}/>
      </div>
      <div>
      <input name="amount"placeholder='자산' onChange={onChange} value={amount} style={{width:'200px'}}/>
      </div>
     
      </div>       
      
      <div style={{display:'inline-block' , width:'200px'}}>
      <img id="myImg"
          width={'100px'} height={'100px'} 
          src={imageSrc} 
      />
       <input 
          accept="image/*" 
          multiple type="file"
          onChange={e => onUpload(e)}
          style={{right:'25%'}}
      />
              <label>discriptions 추출</label>

      </div>
   </div>
<div>

<label  onClick={addAllowedUser}   className='custom-btn2' >Authorize</label>

      <input name='selectaddr' placeholder='insert address for athorization' value={selectaddr} onChange={onChange} style={{width:'300px'}}></input>
</div>
<label  onClick={getCriminal}   className='custom-btn2' >criminal log</label>
<label type="fileupload" onClick={discriptorFromImage} id="fileup"  className='custom-btn2' >transaction</label>

    </div>

    <Web3Button  />    
    </div>


    

  </div>

  
   
  );
}




export default Footer;
