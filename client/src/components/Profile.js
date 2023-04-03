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
  var axios = require("axios").default;
  const[yournumber,numset]=useState("");
  const [onChainUrl1, updateonChainUrl1] = useState("");  
  const [onChainUrl2, updateonChainUrl2] = useState("");
  const [isexist,setExist] = useState(false);  
  const [swap,setswap]=useState(true);
  const [swap1,setswap1]=useState(true);

  const{state: { contract, accounts,web3 } } = useEth();

  const [au,auSwap]=useState(false);
  const [job,jobSwap]=useState(false);

  

  const[inputs, setInputs] =  useState({number:''});
  const {number} =inputs;

 
  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef =useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);


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
        let marks=[detections[0].landmarks.positions]
        console.log(marks)

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        // canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 100)
  }

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

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

 

  const intToString = (num) => {
    return String(num).padStart(2, "0");
  };
  
  const Timer = ({ss}) => {
    const SS = ss ? parseInt(ss) : 0;
    
    const count = useRef(SS);
    const interval = useRef(null);
  
    const [second, setSecond] = useState(intToString(SS));
  
    useEffect(() => {
      interval.current = setInterval(() => {
        count.current -= 1;
  
        setSecond(intToString((count.current % 60)));
      }, 1000);
    }, []);
  
    useEffect(() => {
      if (count.current <= 0) {
        clearInterval(interval.current);
      
        if(au&&swap==true)
        {
          setswap(false);
          getqr2();
        }
        else if(au&&swap==false){
          setswap(true);
          getqr();
        } 
        
        if(job&&swap1==true)
        {
          setswap1(false);
          getqr4();
        }
        else if(job&&swap1==false){
          setswap1(true);
          getqr3();
        }  
      }
      

    }, [second]);

    


    //QR로직 수정하셈 
  
    return (
      <div>
        {second}
      </div>
    );
  };






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
//edit qr url code
  var options1 = {
    method: 'POST',
    url: 'https://qrtiger.com/api/campaign/edit/YINX',
    headers: {'Content-Type': 'application/json', Authorization:'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'},
    data: {
      qr: {
        size: 500,
        colorDark: 'rgb(5,64,128)',
        logo: '',
        eye_outer: 'eyeOuter2',
        eye_inner: 'eyeInner1',
        qrData: 'pattern0',
        backgroundColor: 'rgb(255,255,255)',
        transparentBkg: false,
        qrCategory: 'url',
        text: 'https://www.qrcode-tiger.com.com/'
      },
      qrUrl: `${onChainUrl1}`,
      qrType: 'qr2',
      qrCategory: 'url'
    }
  };
  
  axios.request(options1).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

  //불러오기 데이터 QR로
  var options = {
    method: 'GET',
    url: 'https://qrtiger.com/data/YINX',
    params: {period: 'month', tz: 'Asia/Singapore'},
    headers: {'Content-Type': 'application/json', Authorization:  'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'}
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });


  setExist(true);
 
  
}

async function getqr2()
{



var options2 = {
  method: 'POST',
  url: 'https://qrtiger.com/api/campaign/edit/4XQU',
  headers: {'Content-Type': 'application/json', Authorization:'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'},
  data: {
    qr: {
      size: 500,
      colorDark: 'rgb(5,64,128)',
      logo: '',
      eye_outer: 'eyeOuter2',
      eye_inner: 'eyeInner1',
      qrData: 'pattern0',
      backgroundColor: 'rgb(255,255,255)',
      transparentBkg: false,
      qrCategory: 'url',
      text: 'https://www.qrcode-tiger.com.com/'
    },
    qrUrl: `${onChainUrl1}`,
    qrType: 'qr2',
    qrCategory: 'url'
  }
};

axios.request(options2).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

var options3 = {
  method: 'GET',
  url: 'https://qrtiger.com/data/4XQU',
  params: {period: 'month', tz: 'Asia/Singapore'},
  headers: {'Content-Type': 'application/json', Authorization:  'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'}
};

axios.request(options3).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
}

 async function getqr3()
 {
  
  var options1 = {
    method: 'POST',
    url: 'https://qrtiger.com/api/campaign/edit/E7NM',
    headers: {'Content-Type': 'application/json', Authorization:'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'},
    data: {
      qr: {
        size: 500,
        colorDark: 'rgb(5,64,128)',
        logo: '',
        eye_outer: 'eyeOuter2',
        eye_inner: 'eyeInner1',
        qrData: 'pattern0',
        backgroundColor: 'rgb(255,255,255)',
        transparentBkg: false,
        qrCategory: 'url',
        text: 'https://www.qrcode-tiger.com.com/'
      },
      qrUrl: `${onChainUrl2}`,
      qrType: 'qr2',
      qrCategory: 'url'
    }
  };
  
  axios.request(options1).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
 
  var options = {
    method: 'GET',
    url: 'https://qrtiger.com/data/E7NM',
    params: {period: 'month', tz: 'Asia/Singapore'},
    headers: {'Content-Type': 'application/json', Authorization:  'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'}
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  

 }

 async function getqr4()
 {

  var options2 = {
    method: 'POST',
    url: 'https://qrtiger.com/api/campaign/edit/4XQU',
    headers: {'Content-Type': 'application/json', Authorization:'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'},
    data: {
      qr: {
        size: 500,
        colorDark: 'rgb(5,64,128)',
        logo: '',
        eye_outer: 'eyeOuter2',
        eye_inner: 'eyeInner1',
        qrData: 'pattern0',
        backgroundColor: 'rgb(255,255,255)',
        transparentBkg: false,
        qrCategory: 'url',
        text: 'https://www.qrcode-tiger.com.com/'
      },
      qrUrl: `${onChainUrl2}`,
      qrType: 'qr2',
      qrCategory: 'url'
    }
  };
  
  axios.request(options2).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

  var options3 = {
    method: 'GET',
    url: 'https://qrtiger.com/data/4XQU',
    params: {period: 'month', tz: 'Asia/Singapore'},
    headers: {'Content-Type': 'application/json', Authorization:  'Bearer 4c65ef80-84fb-11ed-88f6-3fe97310821f'}
  };
  
  axios.request(options3).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
 }



function authentifier()
{
  
  return(
    <div  className='Profile' >      
    
      <div className='Authentication'>

   <img id="myImg" src="my.jpg" style={{height:'200px'}}></img>
  

  </div>

    

    </div>
    
    
  )
}


//23/0101 추가할거 공증마크가 위변조 되어지지 않았다는것 그리고 pdf 혹은  png에서 원하는 정보 파싱하는거
//후자부분은 표준화된 증명서가 있으면 가능할거같음 예시를들어서 내가 해야할 부분인거같다. 이거만 추가하면 완벽함
  
    return(

      
      
    <React.Fragment>
{/* {authentifier()} */}

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


    </React.Fragment>
    
      
    );
}


export default Profile;
