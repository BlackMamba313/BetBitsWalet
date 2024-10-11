import React from 'react';
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import {useTranslation} from "react-i18next";


const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <>
      {/*{!loading && !error && (*/}
      <>
        <Header title={t("profilePage.title")}/>
        <UserProfile/>
      </>
      {/*)}*/}
    </>
  );
};

export default ProfilePage;