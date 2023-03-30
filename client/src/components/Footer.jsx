import { useState,useCallback,useEffect } from 'react'
import { create } from 'ipfs-http-client'
import React from 'react';
import "./Footer.css"
import useEth from "../contexts/EthContext/useEth";
import { Buffer } from 'buffer';
// const client2= create('/ip4/127.0.0.1/tcp/5001');

// import {
//   EthereumClient,
//   modalConnectors,
//   walletConnectProvider,
// } from "@web3modal/ethereum";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from "@web3modal/ethereum";


import { Web3Button } from "@web3modal/react";

import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi";


// import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
// const { Canvas, Image, ImageData } = canvas;
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const projectId = '2L2d01In1I9OFbre81IirWt0szw';
const projectSecret = '7c43815b40bc5ae32c34ad9d6db87dad';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
var minturl=''


const client2 = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
});


let ipfsurl = ""
let authenticaiton1=""
let authenticaiton2=""
var newjson=[]
var songs=""


function Footer() {  
  const [fileUrl, updateFileUrl] = useState("");
  const{state: {contract,accounts,web3}} = useEth();
  const[yournumber,numset]=useState("");
  const[inputs, setInputs]=useState({name1:'',name2:'',number:'',date1:'',institution1:'',date2:'',institution2:'',usage1:'',usage2:'',location:'',dgrade:'',guardian:'',education:'',awards:'',relationship:'',member1:'',member2:'',submit1:'',submit2:'',duration:'',severe:'',work:''});
  const {name1 ,name2 ,number,date1,institution1,date2,institution2,usage1,usage2,location,dgrade,guardian,education,awards,relationship,member1,member2,submit1,submit2,duration,severe,work} =inputs;
  const inputss = document.getElementById('myImg')
  const chains =[goerli];




  const {provider} = configureChains(chains,[w3mProvider({ projectId: "251542da3c8552393e55d6d3b636127e" })]);
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
      version: "1", 
      chains,
      projectId: "251542da3c8552393e55d6d3b636127e",
      
    }),
    provider,
  });


  const ethereumClient = new EthereumClient(wagmiClient,chains);


async function howmany()
{

  try{
    for(let i=0; i<100; i++)
  {

    await contract.methods.tokenURI(i).call();
    numset(i);
  
  }
}

catch(error)
  { 
    console.log("마지막아이디1");
    console.log(yournumber);
    
  }
} 
useEffect(() => {
  howmany()
  
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

async function onChangeprofile1(e) {
  const referenceImage = e.target.files[0]

  
  try {
 
    // const added = await client2.add(file)
    // console.log(added)
    // // const url = `http://ipfs.io/ipfs/${added.path}`
    
    // const url = `https://auth.infura-ipfs.io/ipfs/${added.path}`
    // authenticaiton1 = url
    // console.log(url)
    // updateFileUrl(url)
    
  // create FaceMatcher with automatically assigned labels
  // from the detection results for the reference image
  

  } catch (error) {
    console.log('Error uploading file: ', error)
  } 
}

async function onChangeprofile2(e) {
  const file = e.target.files[0]
  try {
 
    const added = await client2.add(file)
    console.log(added)
    // const url = `http://ipfs.io/ipfs/${added.path}`
    
    const url = `https://auth.infura-ipfs.io/ipfs/${added.path}`
    authenticaiton2= url
    updateFileUrl(url)
    console.log(url)
  } catch (error) {
    console.log('Error uploading file: ', error)
  } 
}



async function authentify(e)
{
  try {
  let json = `{"url":"${ipfsurl}"
  ,"name":"${name1}","number":"${number}","institution":"${institution1}"
  ,"date":"${date1}","dgrade":"${dgrade}","severe":"${severe}"
  ,"member":"${member1}","location":"${location}","submit1":"${submit1}","usage1":"${usage1}"
  "links":{
    "images":[
      {
        "장애인인증서":"${authenticaiton1}"
      }
      ,
      {
        "경력인증서":"${authenticaiton2}"
      }
    ]
  },"guardian":"${guardian}","relationship":"${relationship}","duration":"${duration}",
  "work":"${work}","education":"${education}","awards":"${awards}",
  "submit2":"${submit2}","usage2":"${usage2}"
  ,"attributes":[{"trait_type": "Unknown","value": "Unknown"}]
}`


  const added = await client2.add(json)
  const url = `https://authenticaiton.infura-ipfs.io/ipfs/${added.path}`
  
//  initTransaction(accounts);

  const output = await contract.methods.safeMint(accounts[0],url).send({from:accounts[0]});
  
  console.log(contract)   
} 
catch (error) {  
  console.log(error)
}
}

async function authentify3(e)
{
  try {

    let json1 = `{"name":"${name1}","number":"${number}","institution":"${institution1}" 
    ,"guardian":"${guardian}","relationship":"${relationship}"
    ,"date":"${date1}","dgrade":"${dgrade}","severe":"${severe}"
    ,"member":"${member1}","location":"${location}"
    ,"submit":"${submit1}","usage":"${usage1}",
    "links":{
      "images":[
        {
          "장애인인증서":"${authenticaiton1}"
        }
      
      ]
    }
    ,"attributes":[{"trait_type": "Unknown","value": "Unknown"}]
  }`
  

    const added1 = await client2.add(json1);
    const url1 = `https://auth.infura-ipfs.io/ipfs/${added1.path}`;
    console.log(url1);



    let json2 = `{"name":"${name2}","member":"${member2}","institution":"${institution2}"
    ,"date":"${date2}","duration":"${duration}","work":"${work}"
    ,"education":"${education}","awards":"${awards}"
    ,"submit":"${submit2}","usage":"${usage2}",
    "links":{
      "images":[
        
        {
          "본인경력인증서":"${authenticaiton2}"
        }
      ]
    },"attributes":[{"trait_type": "Unknown","value": "Unknown"}]
  }`
  const added2 = await client2.add(json2);
  const url2 = `https://auth.infura-ipfs.io/ipfs/${added2.path}`;
  console.log(url2);


  let json3= `{"links":{
      "loc":[
        {
          "장애인인증서":"${url1}"
        },
        {
          "본인경력인증서":"${url2}"
        }
      ]
    },"attributes":[{"trait_type": "Unknown","value": "Unknown"}]
  }`
  const added3 = await client2.add(json3)
  const url3 = `https://auth.infura-ipfs.io/ipfs/${added3.path}`;
  console.log(url3);



  const output = await contract.methods.safeMint(accounts[0],url3).send({from:accounts[0]});
  console.log(output)
  
} 
catch (error) {  
  console.log(error)
}
}





const MAX_VISIBILITY = 3;



  return (

  <div className='Deploys' >

<div className='Procedure'>
      
      <div className='container'>
       

    <div className='ProDetail2'>
    <WagmiConfig client={wagmiClient} >
            <Web3Button  />
            </WagmiConfig>
        <Web3Modal projectId="251542da3c8552393e55d6d3b636127e" ethereumClient={ethereumClient}/>
        
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
   
   <img id="myImg" src="my.jpg" style={{height:'200px'}}></img>
   
      <div>
        
      <label for="profileupload1" className='custom-btn'> 얼굴 사진 여기서 고르고 모델돌리자 </label>
   
      </div>
      
      <div>
    
      <br />
      <label type="fileupload" onClick={authentify3} id="fileup"  className='custom-btn2' >블록체인에 기록</label>
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
