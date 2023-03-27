import React, { useEffect } from 'react';
import './Profile.css'
import useEth from '../contexts/EthContext/useEth';
import { useState } from 'react';
import {TiChevronLeftOutline, TiChevronRightOutline} from 'react-icons/ti';
import { useRef } from 'react';


function Profile() 
{    
  var axios = require("axios").default;
  const[yournumber,numset]=useState("");
  const [onChainUrl1, updateonChainUrl1] = useState("");
  
  const [onChainUrl2, updateonChainUrl2] = useState("");
  const [imageUrl, updateImageUrl] = useState("");
  const [imageUrl2, updateImageUrl2] = useState("");
  // const [value, setValue] = useState("");
  const [isexist,setExist] = useState(false);  
  const [swap,setswap]=useState(true);
  const [swap1,setswap1]=useState(true);
  
  const [gprivateDetail,setgdetail]=useState(false);
  
  const [jprivateDetail,setjdetail]=useState(false);

  const{state: { contract, accounts,web3 } } = useEth();

  const [au,auSwap]=useState(false);
  const [job,jobSwap]=useState(false);

  

  const[inputs, setInputs] =
  useState({number:'',name:'',number1:'',usage:'',location:'',date:'',member:'',severe:'',dgrade:'',guardian:'',relationship:'',duration:'',work:'',education:'',awards:'',institution:''});
  const {number} =inputs;

  

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

  async function onChange3(e)
{
  const {value,name} =e.target
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
}

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
  const Gdetailset=()=>
  {
    if(gprivateDetail==true)
      {
        setgdetail(false);
      }
      else{
        setgdetail(true);
      }
  }

  const Jdetailset=()=>
  {
    if(jprivateDetail==true)
      {
        setjdetail(false);
      }
      else{
        setjdetail(true);
      }
  }

  const AuSwap=()=>
  {
    if(au==true)
      {
        auSwap(false);
      }
      else{
        auSwap(true);
      }
  }
  
  const JobSwap=()=>
  {
    if(job==true)
      {
        jobSwap(false);
      }
      else{                               
        getqr3();
        jobSwap(true);
      }
  }
  


const MAX_VISIBILITY = 3;


const CardGrade = () => (
  
  <div >
    {(!au)&&(isexist)&&<div className='Authentication2' onClick={AuSwap} >
    <div className='dicbar' style={{textAlign:'right',marginBottom:'-300px'}}>
          
          <img src='logomy.png'></img>
             </div>
    <h1 style={{color:'white' , marginTop:'330px' ,textAlign:'left' }} >장애인 등급인증서</h1>
 
<div className='prbottom2'>
    
<div style={{textAlign:'left'}}>
  </div>
</div>
</div>
}
<CardGrade2>
</CardGrade2>
  </div>
);

const CardGrade2 = ()=>
( <div>
{(au)&&<div className='Authentication2'>
    <h1 style={{color:'white' , marginTop:'25%',fontSize:'40px'}}>등급인증서</h1>

{(swap)&&<div >
<img src="https://qrtiger.com/qr/YINX.png" className='animatedimage'></img>
</div>}

{(!swap)&&<div  >
<img src="https://qrtiger.com/qr/4XQU.png"  className='animatedimage'></img>
</div>
}


 <div>

<div style={{fontSize:15, color:'white' }}>
<div>시간안에 인증해주세요</div>
<Timer ss="15"></Timer>
<div>필수 제출 정보</div>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>나이</span>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>장애정도</span>
<br>
</br>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>취득일자</span>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>용도</span>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>발급처</span>
</div>
    </div>
    
    <div style={{textAlign:'center',display:'inline-block'}}>  
    <br></br>
  <button type='button' onClick={Gdetailset} style={{height:'30px'}} >상세보기</button>  
 <button type='button' onClick={()=>window.open(` https://goerli.etherscan.io/token/0xa08af44a2e0c88d1f9e12dad8ece694c4ff779ea?a=${number}`,'_blank')}  style={{height:'30px'}}>블록체인 기록</button>
    
<button type='button' onClick={()=>window.open(`${imageUrl}`,'_blank')}  style={{height:'30px'}}>등급 인증서 사진</button>
  </div>

  <div className='prbottom2' >
    
    </div>
</div>

}

</div>

  
)

const CardJob = () => (

  <div>
    {(!job)&&(isexist)&&<div className='Authentication2'   onClick={JobSwap}>
    <div className='dicbar' style={{textAlign:'right',marginBottom:'-300px'}}>
          
          <img  src='logomy.png'></img>
             </div>
    <h1 style={{color:'white'  ,  marginTop:'300px' ,textAlign:'left' }}>본인 교육경력 인증서</h1>
 
<div className='prbottom2' >
    
<div style={{textAlign:'left'}}>
  </div>
</div>
</div>
}    

<CardJob2>
</CardJob2>

  </div>
);

const CardJob2 = ()=>
(
  <div>
    {(job)&&<div className='Authentication2'>
   <h1  style={{color:'white', marginTop:'25%',fontSize:'40px'}}>경력인증서</h1>

{(swap1)&&<div  >

<img src="https://qrtiger.com/qr/E7NM.png" className='animatedimage'></img>
</div>}

{(!swap1)&&<div  >

<img src="https://qrtiger.com/qr/4XQU.png" className='animatedimage'></img>
</div>}


 <div>
    
<div style={{fontSize:15, color:'white' }}>
<div>시간안에 인증해주세요</div>
<Timer ss="15"></Timer>
<div>필수 제출 정보</div>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>나이</span>
<br>
</br>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>취득일자</span>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>용도</span>
<span style={{border:'2px solid black' ,backgroundColor:'white' , color:'black'} }>발급기관</span>

</div>
    </div>
     
    <div style={{textAlign:'center',display:'inline-block'}} >
  <br></br>
  <button type='button' onClick={Jdetailset}  style={{height:'30px'}}>상세보기</button>
    
  <button type='button' onClick={()=>window.open(` https://goerli.etherscan.io/token/0xa08af44a2e0c88d1f9e12dad8ece694c4ff779ea?a=${number}`,'_blank')}  style={{height:'30px'}}>블록체인 기록</button>
  
  <button type='button' onClick={()=>window.open(`${imageUrl2}`,'_blank')}  style={{height:'30px'}}>경력 인증서 사진</button>
    </div>
    <div className='prbottom2' >
    
    </div>
</div>

}

  </div>
)




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

      // updatenumber(json1.number);
      // updateName1(json1.name);
      // updateusage1(json1.usage);
      // updateloc(json1.location);
      // updatedate1(json1.date);
      // updatemember1(json1.member);
      // updatesvere(json1.severe);
      // updatedgrade(json1.dgrade);
      // updateinstitution1(json1.institution);
      // updateguardian(json1.guardian);
      // updaterelationship(json1.relationship);
      // updatesubmit1(json1.submit);
      
    
      
      // updateName2(json2.name);
      // updateusage2(json2.usage);
      // updateduration(json2.duration);
      // updatework(json2.work)
      // updateeducation(json2.education);
      // updateawards(json2.awards);
      // updateinstitution2(json2.institution);
      // updatesubmit2(json2.submit);
      // updatedate2(json2.date);
      // updatemember2(json2.member);
    
      

      // updateonChainUrl1(gjson);
      // updateonChainUrl2(jjson);
      

      // updateImageUrl(autsrc);
      // updateImageUrl2(autsrc1);
      
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
      
        

    <div style={{textAlign:'center'}}>
      
    <button onClick={ getqr} style={{width:'50px'}}>확인</button>
    <br />
       </div>
  

       {/* <div className='prbottom'>
  </div>
  */}
  </div>
    
    

    </div>
    
    
  )
}


//23/0101 추가할거 공증마크가 위변조 되어지지 않았다는것 그리고 pdf 혹은  png에서 원하는 정보 파싱하는거
//후자부분은 표준화된 증명서가 있으면 가능할거같음 예시를들어서 내가 해야할 부분인거같다. 이거만 추가하면 완벽함
  
    return(

      
      
    <React.Fragment>
{authentifier()}

    </React.Fragment>
    
      
    );
}


export default Profile;
