import React, {useState} from 'react';
import Header from "../components/Header";
import SendPanel from "../components/SendPanel";
import CardsSlider from "../components/CardsSlider";
import {useTranslation} from "react-i18next";

const SendPage = () => {
  const { t } = useTranslation();
  // const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <>
      <Header hasRate title={t("sendPage.title")}/>
      <CardsSlider/>
      <SendPanel/>
    </>
  );
};

export default SendPage;