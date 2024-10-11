import React, {useEffect, useState} from "react";
import styles from './QrCode.module.css';
import QRCode from "react-qr-code";
import {walletData} from "../../store/auth/selectors";
import {useSelector} from "react-redux";
import ShareButtons from "../ShareButtons";
import useToast from "../../hooks/useToast";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import BottomPopUp from "../BottomPopUp";

const QrCode = () => {
  const {t} = useTranslation();
  const [amountValue, setAmountValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const activeWallet = useSelector(walletData)
  const showToast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeWallet?.wallet);
      await showToast({icon: 'info', title: 'copied'})
    } catch (err) {
      console.error('Не удалось скопировать текст: ', err);
      await showToast({icon: 'error', title: 'error'})
    }
  };
  const location = useLocation();

  const handleAmountChange = (e) => {
    setAmountValue(e.target.value);
  };


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('amount');
    if (amount) {
      setAmountValue(amount);
    }
  }, [location, setAmountValue]);

  return (
    <div className={styles.wrapper}>
      <div onClick={handleCopy}>
        <p className={styles.walletAddress}>{activeWallet?.wallet}</p>
      </div>
      {activeWallet.wallet ?
        <>
          <p className={styles.text}>{t("receivePage.receive")}</p>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*[.,]?[0-9]*"
            placeholder={t("receivePage.placeholder")}
            className={styles.input}
            value={amountValue}
            onChange={handleAmountChange}/>
          <div className={styles.button} onClick={() => setIsOpen(!isOpen)}>{t("receivePage.btn")}</div>
          <div className={styles.wrapperQr}>
            < QRCode bgColor={'#d2d3d5'} size={210} value={activeWallet.wallet}/>
          </div>
        </> :
        <p className={styles.text}>{t("receivePage.notCurrency")}</p>
      }
      <BottomPopUp setIsOpen={setIsOpen} isOpen={isOpen}>
        <ShareButtons url={"t.me/LikeWalletPay_bot/LikePayWallet"} description={`${t("receivePage.message1")} ${activeWallet.address}.
           ${t("receivePage.message2")} ${amountValue} ${activeWallet.token} ${t("receivePage.message3")}  ${activeWallet.network}`}/>
      </BottomPopUp>
    </div>
  );
}
export default QrCode;