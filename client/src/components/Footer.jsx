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
import { goerli } from "wagmi";

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
  const[inputs, setInputs]=useState({name1:'',name2:'',number:'',date1:'',institution1:'',date2:'',institution2:'',usage1:'',usage2:'',location:'',dgrade:'',guardian:'',education:'',awards:'',relationship:'',member1:'',member2:'',submit1:'',submit2:'',duration:'',severe:'',work:''});
  const {member2,name2 } =inputs;
  const inputss = document.getElementById('myImg')


  const chains =[goerli];
  
  
  
  const {provider} = configureChains(chains,[w3mProvider({ projectId:'ad51cb658b57c4bb5916b92e7f4a4ff7'})]);
    
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
  
      projectId:'ad51cb658b57c4bb5916b92e7f4a4ff7',
      version: "2", 
  
    chains,
    
  }),
  provider,
  });

  
  const ethereumClient = new EthereumClient(wagmiClient,chains);
  



async function howmany()
{

//   const num =await contract.methods.totalSupply().call();
//   try{
//     for(let i=0; i<num; i++)
//   {

//     await contract.methods.tokenURI(i).call();
//     numset(i);
  
//   }
// }

// catch(error)
//   { 
//     console.log("마지막아이디1");
    
    
//   }
} 
useEffect(() => {
  howmany()
 input= document.getElementById('myImg')

  console.log(yournumber)
  
}, []);

async function onChange2(e)
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

  //     console.log(input)
  // const labeledFaceDescriptors =  loadImage();
  // console.log(labeledFaceDescriptors)
          //여기서 labeledface~의 json데이터 뽑아서 민팅 ㄱㄱ
        //다른 함수에서 loadimage 함수써서 뽑던지 하자 4/27
  });

}
async function authentify3(e)
{
  try {

  // let json3= `{"links":{
  //     "loc":[
  //       {
  //         "장애인인증서":"${url1}"
  //       },
  //       {
  //         "본인경력인증서":"${url2}"
  //       }
  //     ]
  //   },"attributes":[{"trait_type": "Unknown","value": "Unknown"}]
  // }`
  // const added3 = await client2.add(json3)
  // const url3 = `https://auth.infura-ipfs.io/ipfs/${added3.path}`;
  // console.log(url3);




  // const output = await contract.methods.safeMint(accounts[0],url3).send({from:accounts[0]});
  // console.log(output)


  const labeledFaceDescriptors =await  loadImage();
  console.log(JSON.stringify(labeledFaceDescriptors[0]))
  
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
    <div className='ProDetail2'>
        <Web3Button  />
      <h1 style={{color:'white'}}>마지막 토큰아이디:{yournumber}</h1>
    <h1 style={{color:'white'}}>본인 정보를 입력해주세요</h1>
      <div style={{display:'inline-block'}} >
      <div >
         <input name="name2" placeholder='성명' onChange={onChange2} value={name2} style={{width:'130px'}} />
      </div> 
      <div >
       <input name="member2"placeholder='생년월일' onChange={onChange2} value={member2} style={{width:'130px'}}/>
      </div>
      </div>      
      <br>
      </br>

      <br>
      </br>
   <h1 style={{color:'white'}}>얼굴 업로드</h1>
   <div>
        <input 
          accept="image/*" 
          multiple type="file"
          onChange={e => onUpload(e)}
      />
      
      </div>
      <div>
      <img id="myImg"
          width={'100px'} height={'100px'} 
          src={imageSrc} 
      />
      <br />
      <label type="fileupload" onClick={authentify3} id="fileup"  className='custom-btn2' >특징추출</label>
      <br />
      </div>

   </div>
   
    </div>
    
    <div  className='ProDetail1'>
      
        </div>
    </div>

  </div>

  
   
  );
}




export default Footer;
