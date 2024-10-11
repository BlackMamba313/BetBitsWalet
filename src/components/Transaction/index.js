import React from 'react';
import styles from './Transaction.module.css';
import { format } from "date-fns";
import {useTranslation} from "react-i18next";

const Transaction = ({ transaction }) => {
  const { t } = useTranslation();
  const transactionClasses = {
    1: `${t("history.receive")}`,
    '-1': `${t("history.send")}`, // Если знак может быть только 1 или -1
  };

  const transactionColors = {
    1: '#4dcc5e',
    '-1': '#fff',
  };

  const currencyColors = {
    'TRX': '#d21d25',
    'USDT': '#52ae94',
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardRow}>
        <div
          style={{ color: transactionColors[transaction.sign] }}
          className={styles.dateTime}
        >
          {transactionClasses[transaction.sign]}
        </div>
        <div className={styles.amount}>
          {transaction.am}
        </div>
      </div>
      <div className={styles.cardRow}>
        <div className={styles.dateTime}>
          {format(new Date(transaction.dt), 'd MMM yyyy, HH:mm')}
        </div>
        <div style={{ color: currencyColors[transaction.token] }}>
          {transaction.token}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
