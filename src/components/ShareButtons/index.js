import React from 'react';
import {
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  ViberShareButton,
  TelegramIcon,
  FacebookIcon,
  WhatsappIcon,
  ViberIcon,
} from 'react-share';
import styles from "./ShareButtons.module.css";
import {showToast} from "../../utils/ShowToast";

const ShareButtons = ({ url, description }) => {

  const size = 40

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      await showToast({icon: 'info', title: 'Copy!'})
    } catch (err) {
      await showToast({icon: 'error', title: 'Copy!'})
      console.error('Не удалось скопировать текст: ', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '10px'}}>
      {/* Telegram Button */}
      <TelegramShareButton url={url} title={description}>
        <TelegramIcon
          bgStyle={{ boxShadow: '0 8px 16px rgba(f, f,  f, 0.5)' }}
          size={size}
          round
        />
      </TelegramShareButton>

      {/* Facebook Button */}
      <FacebookShareButton url={url} quote={description}>
        <FacebookIcon size={size} round/>
      </FacebookShareButton>

      {/* WhatsApp Button */}
      <WhatsappShareButton url={url} title={description}>
        <WhatsappIcon size={size} round/>
      </WhatsappShareButton>

      {/* Viber Button */}
      <ViberShareButton url={url} title={description}>
        <ViberIcon size={size} round/>
      </ViberShareButton>

      <button
        className={styles.shareButton}
        onClick={handleCopy}
        style={{ width: size, height: size, fontSize: `${size / 2.7}px` }}
      >
        copy
      </button>
    </div>
  );
};

export default ShareButtons;





