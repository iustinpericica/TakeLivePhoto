'use client'

import React,  { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import {ImagePreview} from './imagePreview';
import 'react-html5-camera-photo/build/css/index.css';

function App (props) {
  const [dataUri, setDataUri] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }

  return (
    <>
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
          />
          :
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
      onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
      onCameraError = { (error) => { handleCameraError(error); } }
      idealFacingMode = {FACING_MODES.ENVIRONMENT}
      idealResolution = {{width: 640, height: 480}}
      imageType = {IMAGE_TYPES.JPG}
      imageCompression = {0.97}
      isMaxResolution = {true}
      isImageMirror = {false}
      isSilentMode = {false}
      isDisplayStartCameraError = {true}
      isFullscreen = {false}
      sizeFactor = {1}
      onCameraStart = { (stream) => { handleCameraStart(stream); } }
      onCameraStop = { () => { handleCameraStop(); } }
    />
      }
    </div>
    <div>
      { dataUri && 
        <button onClick={() => {setDataUri('')}}>Retake</button>
      }
    </div>
    <div>
    <hr class="dashed"></hr>
    <label>Your Image File
    <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
      { selectedImage && 
        <div>
          <img style={{width: "300px"}} src={URL.createObjectURL(selectedImage)} alt="myImage" />
        </div>}
    </label>
    </div>
    
    { (!!selectedImage && !!dataUri) && 
      <button>
        Upload Images
      </button>
    }
    </>
  );
}

export default App;