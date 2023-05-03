import React, { useEffect } from 'react';
import './Profile.css'
import useEth from '../contexts/EthContext/useEth';
import { useState } from 'react';
import { useRef } from 'react';

import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({
  Canvas:HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img')
  })


function Profile() 
{    
  const[yournumber,numset]=useState("");
  const{state: { contract, accounts,web3 } } = useEth();
  const[inputs, setInputs] =  useState({number:''});
  const {number} =inputs;

  const videoRef = useRef();
  const videoHeight = 1050;
  const videoWidth = 1400;
  const canvasRef =useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  let input = document.getElementById('myImg')


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

      ]).then(setModelsLoaded(true));
    }
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  }

  const handleVideoOnPlay = () => {
      
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }


    
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks();
        const detected = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
        // console.log(detections)
        // let marks=[detections[0].landmarks.positions]
        // console.log(marks)

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const resizedDetected = faceapi.resizeResults(detected, displaySize);
        

        const labeledFaceDescriptors = await loadImage();
       
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
        const label = faceMatcher.findBestMatch(resizedDetected[0].descriptor).toString();
        
        
        console.log(label)
        

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

        // canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 1)
  }

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

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
  //     console.log(yournumber);
      
  //   }
  }
  useEffect(() => {
    howmany()
    console.log(yournumber)
  }, []);

async function getqr()
{

  try {
    
    
    const Writer= await contract.methods.tokenURI(number).call();
    console.log(Writer)
    
    const response = await fetch(Writer);
      if(!response.ok)
      throw new Error(response.statusText);
      const json = await response.json();
      
      let gjson=json.links.loc[0].장애인인증서;
      let jjson=json.links.loc[1].본인경력인증서;

      const response1 = await fetch(gjson);
      if(!response1.ok)
      throw new Error(response1.statusText);
      const json1 = await response1.json();

      
      const response2 = await fetch(jjson);
      if(!response2.ok)
      throw new Error(response2.statusText);
      const json2 = await response2.json();

      let autsrc=json1.links.images[0].장애인인증서;
      let autsrc1=json2.links.images[0].본인경력인증서;

      
      
} 

catch (error) {  
  console.log(error)
}
}


function authentifier()
{
  
  return(
    <div  className='Profile' >    
      
    <img id="myImg" src="umsel.jpeg" style={{width:'100px',height:'100px'}} ></img>
    
      <div className='Authentication'>
      
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }

<div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Close Webcam
            </button>
            :
            <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
              Open Webcam
            </button>
        }
      </div>


  </div>

    

    </div>
    
    
  )
}


  
    return(

      
      
    <React.Fragment>





{authentifier()}



    </React.Fragment>
    
      
    );
}


export default Profile;
