import React, {useEffect, useRef} from 'react';
import jsQR from 'jsqr';
import styles from './QRScanModal.module.css';
import useToast from "../../hooks/useToast";

const QRScanModal = ({ onScan }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const showToast = useToast();
  useEffect(() => {
    // Функция для запроса доступа к камере и запуска видеопотока
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}});
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQRCode();
        }
      } catch (err) {
        await showToast({icon: 'error', title: 'Error!'})
      }
    };

    // Функция для сканирования QR-кода из видео потока
    const scanQRCode = () => {
      const canvasElement = canvasRef.current;
      const context = canvasElement.getContext('2d');

      const scan = () => {
        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          canvasElement.height = videoRef.current.videoHeight;
          canvasElement.width = videoRef.current.videoWidth;
          context.drawImage(videoRef.current, 0, 0, canvasElement.width, canvasElement.height);
          const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code) {
            onScan(code.data); // Передаем данные сканированного QR-кода
          } else {
            requestAnimationFrame(scan); // Продолжаем сканирование, если QR-код не найден
          }
        } else {
          requestAnimationFrame(scan);
        }
      };

      scan();
    };

    startVideo().then(r => {});
  }, [onScan, showToast]);

  return (
    <div className={styles.wrapper}>
      <video
        className={styles.scaner}
        ref={videoRef}
        playsInline
      />
    </div>
  );
};

export default QRScanModal;
