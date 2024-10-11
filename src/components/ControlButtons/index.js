import React from 'react';
import styles from './ControlButtons.module.css';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {walletData} from "../../store/auth/selectors";
import {useTranslation} from "react-i18next";

const ControlButtons = ({sourceAmount}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const activeWallet = useSelector(walletData)
  return (
    <div className={styles.wrapper}>
      {activeWallet &&
        <div className={styles.buttonWrapper}>
          <div className={styles.button} onClick={() => navigate(`/receive?amount=${sourceAmount}`)} style={{marginTop: 7}}>
            {t("general.btnReceive")}
          </div>
          <div className={styles.button} onClick={() => navigate(`/send?amount=${sourceAmount}`)} style={{marginTop: 7}}>
            {t("general.btnSend")}
          </div>
        </div>
      }
    </div>
  );
};

export default ControlButtons;