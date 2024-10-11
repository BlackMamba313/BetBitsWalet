import React, {useState} from 'react';
import styles from './TransferConfirmation.module.css';
import SliderButton from "../SliderButton";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getWallets, transfer} from "../../store/auth";
import useToast from "../../hooks/useToast";
import {useTranslation} from "react-i18next";

const TransferConfirmation = ({ transferData, setTransferData }) => {
  const { t } = useTranslation();
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();
  const showToast = useToast();
  const dispatch = useDispatch();
  const onConfirm = async  () =>  {
    try {
      const response = await dispatch(transfer(transferData));
      if (response.type === 'transfer/fulfilled') {
        dispatch(getWallets())
        setIsSend(true)
        setTimeout(() => {
          navigate(`/`); // Редирект на главную страницу
        }, 1500);
      } else {
        await showToast({icon: 'error', title: 'transfer error!'})
        setTimeout(() => {
          setTransferData(null)
        }, 1500);
      }
    } catch (error) {
      await showToast({icon: 'error', title: 'transfer error!'})
      setTimeout(() => {
        setTransferData(null)
      }, 1500);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p className={styles.text}>{t("sendPage.confirm1")}</p>
        <p>{t("sendPage.confirm2")} {transferData.network_name}</p>
        <p>{t("sendPage.confirm3")} {Number(transferData.amount)} {transferData.token_name}</p>
        <p>{t("sendPage.confirm4")} 0.00 {transferData.token_name}</p>
        <p>{t("sendPage.confirm5")} </p>
        <p>{transferData.wallet_address_to}</p>
      </div>
      <SliderButton isSend={isSend} onConfirm={onConfirm}/>
    </div>
  );
};

export default TransferConfirmation;
