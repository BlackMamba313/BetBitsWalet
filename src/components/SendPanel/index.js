import React, {useState} from 'react';
import QRScanModal from '../QRScanModal';
import TransferForm from '../TransferForm';
import TransferConfirmation from '../TransferConfirmation';
import {useDispatch, useSelector} from "react-redux";
import { userData, walletData} from "../../store/auth/selectors";
import {transfer} from "../../store/auth";
import styles from './SendPanel.module.css';
import {useTranslation} from "react-i18next";

const SendPanel = ({isScannerOpen, setIsScannerOpen}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // Хуки, состояния, функции обработки...
  const [transferData, setTransferData] = useState(null);
  const {id} = useSelector(userData) || {};

  const {token, network, balance} = useSelector(walletData) || {};
  // Остальные состояния и логика...
  const onSubmit = async data => {
    try {
      const dataForRequest = {...data, id, token, network, checkOnly: true};
      // Предполагаем, что dispatch(transfer()) асинхронный и возвращает данные о переводе
      const response = await dispatch(transfer(dataForRequest));
      if (response.type === 'transfer/fulfilled') {
        setTransferData(response); // Сохраняем данные о переводе
      }
    } catch (error) {
      // Обработка ошибок выполнения запроса на перевод
    }
  };
  // Функции onSubmit, onConfirm и т.д...

  const handleScan = async data => {
    const parsedData = JSON.parse(data);
    setIsScannerOpen(false); // Закрываем сканер после сканирования
    try {
      const response = await dispatch(transfer({...parsedData, id, checkOnly: true}));
      if (response.type === 'transfer/fulfilled') {
        setTransferData(response);
      } else {
        // Обработка ошибки или недостаточной информации для перевода
      }
    } catch (error) {
    }
  };

  if (transferData) {
    return <TransferConfirmation transferData={transferData} setTransferData={setTransferData}/>;
  }


  // Возвращение TransferForm и QRScanModal, если не в режиме подтверждения
  return (
    <>
      {isScannerOpen ? <QRScanModal onScan={handleScan}/> :
        <>
          {<div className={styles.scanBtn} onClick={() => setIsScannerOpen(true)}>{t("sendPage.scan")}</div>}
          <TransferForm onSubmit={onSubmit} balance={balance}/></>}
    </>
  );
};

export default SendPanel;
