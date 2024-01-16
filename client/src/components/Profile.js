import React, { useEffect } from "react";
import "./Profile.css";
import useEth from "../contexts/EthContext/useEth";
import { useState } from "react";
import { useRef } from "react";
import { transferData } from "../api/transfer";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement("canvas"),
  createImageElement: () => document.createElement("img"),
});

function Profile() {
  const {
    state: { contract },
  } = useEth();

  const videoRef = useRef();
  const videoHeight = 1050;
  const videoWidth = 1400;
  const canvasRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  const CustomloadImage2 = async () => {
    const max = await contract.methods.totalSupply().call();
    let CriminalList = [];
    let DiscriptorList = [];
    let labels = [];

    for (let i = 0; i < max; i++) {
      const info = await contract.methods.getCriminal(i).call();
      CriminalList.push(info);
      labels.push(i);
      let att = JSON.parse(CriminalList[i][5]);
      let newarray = new Float32Array(att.descriptors[0]);
      DiscriptorList.push(newarray);
    }

    return Promise.all(
      labels.map(async (label) => {
        let descriptions = [];
        descriptions.push(DiscriptorList[label]);

        return new faceapi.LabeledFaceDescriptors(
          label.toString(),
          descriptions
        );
      })
    );
  };

  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(
          "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json"
        ),
        faceapi.nets.faceLandmark68Net.loadFromUri(
          "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_model-weights_manifest.json"
        ),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(
          "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json"
        ),
        faceapi.nets.faceRecognitionNet.loadFromUri(
          "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/face_recognition_model-weights_manifest.json"
        ),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceLandmarks();
        const detected = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const resizedDetected = faceapi.resizeResults(detected, displaySize);
        const labeledFaceDescriptors = await CustomloadImage2();
        const faceMatcher = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          0.6
        );
        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);

        resizedDetected.forEach((detection) => {
          let sim = faceMatcher.findBestMatch(detection.descriptor).distance;
          console.log(sim);
          const { x, y, width, height } = detection.detection.box;
          const requestdata = detection.descriptor;

          transferData(requestdata).then((data) => {
            console.log(data);
            if (sim < 0.4) {
              const boxColor = "red";
              canvasRef.current.getContext("2d").strokeStyle = boxColor;
              canvasRef.current
                .getContext("2d")
                .strokeRect(x, y, width, height);
              canvasRef &&
                canvasRef.current &&
                faceapi.draw.drawFaceLandmarks(
                  canvasRef.current,
                  resizedDetections
                );
            } else {
              canvasRef &&
                canvasRef.current &&
                faceapi.draw.drawFaceLandmarks(
                  canvasRef.current,
                  resizedDetections
                );
            }
          });
        });
      }
    }, 300);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  function authentifier() {
    return (
      <div className="Profile">
        <div className="Authentication">
          {captureVideo ? (
            modelsLoaded ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <video
                    ref={videoRef}
                    height={videoHeight}
                    width={videoWidth}
                    onPlay={handleVideoOnPlay}
                    style={{ borderRadius: "10px" }}
                  />
                  <canvas
                    ref={canvasRef}
                    style={{ position: "absolute", border: "1px solid red" }}
                  />
                </div>
              </div>
            ) : (
              <div>loading...</div>
            )
          ) : (
            <></>
          )}

          <div style={{ textAlign: "center", padding: "10px" }}>
            {captureVideo && modelsLoaded ? (
              <button
                onClick={closeWebcam}
                style={{
                  cursor: "pointer",
                  backgroundColor: "black",
                  color: "white",
                  padding: "15px",
                  fontSize: "25px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Close Webcam
              </button>
            ) : (
              <button
                onClick={startVideo}
                style={{
                  cursor: "pointer",
                  backgroundColor: "black",
                  color: "white",
                  padding: "15px",
                  fontSize: "25px",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Open Webcam
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <React.Fragment>{authentifier()}</React.Fragment>;
}

export default Profile;
