import React, {useEffect, useState} from 'react';
import styles from './KPIShow.module.css';
import CircularProgressBar from "../CircularProgressBar";
import {refStatData, userData} from "../../store/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {GetStat} from "../../store/auth";
import {GetContacts} from "../../store/contacts";
import {useTranslation} from "react-i18next";
import ShareButtons from "../ShareButtons";
import BottomPopUp from "../BottomPopUp";


const KPIShow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {id} = useSelector(userData)
  const stat = useSelector(refStatData)
  // Функция для обработки нажатия кнопки поделиться

  const refShare = `${process.env.REACT_APP_URL_JOKER_REG}?ref=${id}`;

  useEffect(() => {
    dispatch(GetStat({id: id}))
    dispatch(GetContacts({id: id}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {stat && <>
        <div className={styles.stat}>
          {t("referralPage.total")}<br/>
          <span className={styles.statValue}>{stat.count}</span>
        </div>
        <div className={styles.subtitle}>
          {t("referralPage.balance")}<br/>
          <span className={styles.statValue}>{stat.bal} usdt</span>
        </div>
        <CircularProgressBar value={stat.kpi}/>
        <div
          className={styles.shareButtonBottom}
          onClick={() => setIsOpen(!isOpen)}
        >
          {t("referralPage.share")}
        </div>
      </>
      }
      <BottomPopUp setIsOpen={setIsOpen} isOpen={isOpen}>
        <ShareButtons url={refShare} description={'Заходи и выигрывай с нами!'}/>
      </BottomPopUp>
    </div>
  );
};

export default KPIShow;
