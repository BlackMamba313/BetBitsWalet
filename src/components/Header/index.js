import React from 'react';
import styles from './Header.module.css';
import ReturnIcon from "../../assets/ReturnIcon";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {walletData, userData} from "../../store/auth/selectors";
import AccountIcon from "../../assets/AccountIcon";
import {useTranslation} from "react-i18next";

const Header = ({title, hasRate}) => {
  const { t } = useTranslation();
  const activeWallet = useSelector(walletData)
  const navigate = useNavigate();
  const user = useSelector(userData);
  return (
    <div>
      {title && <div className={styles.header}>
        <div onClick={() => navigate(-1)} className={styles.btnReturn}>
          <ReturnIcon/>
        </div>
        <h2>{title}</h2>
        <div onClick={() => navigate(`/profile`)} className={styles.profile}>
          <AccountIcon/>
        </div>
      </div>
      }
      <div className={styles.cost}>
      {activeWallet &&
        <div >
          {t("general.rate")}<span className={styles.currency}> {activeWallet.token} </span>{(activeWallet.exchange_rate).toFixed(2)} {user?.iso}
        </div>
      }
      </div>
    </div>
  );
};

export default Header;