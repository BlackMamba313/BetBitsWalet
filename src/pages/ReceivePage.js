import React from 'react';
import Header from "../components/Header";
import QrCode from "../components/QrCode";
import CardsSlider from "../components/CardsSlider";
import {useSelector} from "react-redux";
import {walletData} from "../store/auth/selectors";
import {useTranslation} from "react-i18next";

const ReceivePage = () => {
  const { t } = useTranslation();
  // const activeWallet = useSelector(walletData)
  return (
    <>
      <Header hasRate title={t("receivePage.title")}/>
      <CardsSlider/>
      {<QrCode/>}
    </>
  );
};

export default ReceivePage;