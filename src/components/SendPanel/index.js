import React, {useState} from 'react';
import QRScanModal from '../QRScanModal';
import TransferForm from '../TransferForm';
import TransferConfirmation from '../TransferConfirmation';
import {useDispatch, useSelector} from "react-redux";
import {userData, walletData} from "../../store/auth/selectors";
import {transfer} from "../../store/auth";
import styles from './SendPanel.module.css';
import {useTranslation} from "react-i18next";

const SendPanel = ({isScannerOpen, setIsScannerOpen}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  // Хуки, состояния, функции обработки...
  const [transferData, setTransferData] = useState(null);

  const {token, network, balance} = useSelector(walletData) || {};
  // Остальные состояния и логика...
  const onSubmit = data => {
    const dataFR = {
      network_name:network,
      token_name: token,
    }
    setTransferData({...data, ...dataFR});
  };

  if (transferData) {
    return <TransferConfirmation transferData={transferData} setTransferData={setTransferData}/>;
  }


  // Возвращение TransferForm и QRScanModal, если не в режиме подтверждения
  return (
    <>
      <div className={styles.scanBtn} onClick={() => setIsScannerOpen(true)}>
        {t("sendPage.scan")}
      </div>
      <TransferForm onSubmit={onSubmit} balance={balance}/>
    </>
  );
};

export default SendPanel;
