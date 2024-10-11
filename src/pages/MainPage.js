import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import ControlButtons from "../components/ControlButtons";
import CardsSlider from "../components/CardsSlider";
import TransactionsList from "../components/TransactionsList";
import {GetTrans} from "../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {converterData, rateData, transactionsData, userData, walletData} from "../store/auth/selectors";
import {filter} from "lodash";
import {useNavigate} from "react-router-dom";
import Converter from "../components/Converter";
import {useTranslation} from "react-i18next";


const MainPage = () => {
  const [sourceAmount, setSourceAmount] = useState('');
  const { t } = useTranslation();
  const currentWallet = useSelector(walletData);
  const rate = useSelector(rateData)

  return (
    <>
      <Header hasRate title={t("mainPage.title")}/>
      <CardsSlider/>
      <ControlButtons sourceAmount={sourceAmount}/>
      {currentWallet && rate && <Converter sourceAmount={sourceAmount} setSourceAmount={setSourceAmount}/>}
    </>
  );
};

export default MainPage;