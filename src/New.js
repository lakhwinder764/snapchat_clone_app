import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCameraImage } from './features/cameraSlice';

function New() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { link } = state;
  const dispatch = useDispatch();
  const [src, setSrc] = useState(link);
  const [crop, setCrop] = useState({ unit: '%', aspect: 0.63, height: 80 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
  };

  return (
    <>
      {!output && src && (
        <div>
          <ReactCrop
            src={src}
            onImageLoaded={setImage}
            crop={crop}
            onChange={setCrop}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <button onClick={cropImageNow}>Crop</button>
        </div>
      )}
      {output && (
        <img
          src={output}
          alt=""
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <button
        onClick={() => {
          dispatch(setCameraImage(output));
          navigate('/preview');
        }}
      >
        Go to Preview Screen
      </button>
    </>
  );
}

export default New;
