import React from 'react';
import Header from "../components/Header";
import {useSelector} from "react-redux";
import {userData} from "../store/auth/selectors";
import KPIContract from "../components/KPIContract";
import KPIShow from "../components/KPIShow";
import {useTranslation} from "react-i18next";

const ReferralPage = () => {
  const { t } = useTranslation();
  const {hasContract} = useSelector(userData);
  return (
    <>
      <Header hasRate title={t("referralPage.title")}/>
      {hasContract ?
        <KPIShow/>:
        <KPIContract/>
        }
    </>
  );
};

export default ReferralPage;