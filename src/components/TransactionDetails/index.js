import React, {useState} from 'react';
import styles from './TransactionDetails.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userData} from "../../store/auth/selectors";
import { SetContacts} from "../../store/contacts";
import {useTranslation} from "react-i18next";

const TransactionDetails = ({transaction}) => {
  const { t } = useTranslation();
  const [name, setName] = useState()
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useSelector(userData)
  const openModal = (e) => {
    e.stopPropagation();
    setVisible(!visible)
  }

  const clickSafe = (e) => {
    e.stopPropagation();
    const params = {
      id: id,
      network: transaction.network,
      addr: transaction.addr,
      name: name,
      cid: 0
    }
    dispatch(SetContacts(params))
    setVisible(!visible)
  }

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const clickSend = (e) => {
    e.stopPropagation();
    navigate(`/send?address=${transaction.acc}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardRow}>
        <div>
          id {transaction.id}
        </div>
        <div>
          {transaction.acc}
        </div>
      </div>
      <div className={styles.buttons}>
        <div onClick={(e)=> openModal(e)} className={styles.buttonL}>
          {t("history.safeBtn")}
        </div>
        <div onClick={(e)=> clickSend(e)} className={styles.buttonR}>
          {t("history.sendBtn")}
        </div>
      </div>

      {visible &&
        <div className={styles.modal}>
        <h2 className={styles.title}>{t("history.titlePopUp")}</h2>
          <div className={styles.inputWrapper}>
        <input
          onClick={(e)=>  e.stopPropagation()}
          className={styles.input}
          type="text"
          value={name}
          onChange={handleChange}
        />
          <div className={styles.btn}
               onClick={(e)=> clickSafe(e)}
          >{t("history.safeBtn")}</div>
          </div>
      </div>}
    </div>
  );
};

export default TransactionDetails;



