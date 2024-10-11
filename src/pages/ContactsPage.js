import React from 'react';
import Header from "../components/Header";
import ContactList from "../components/ContactList";
import {useSelector} from "react-redux";
import {userData} from "../store/auth/selectors";
import {useTranslation} from "react-i18next";

const ContactsPage = () => {
  const user = useSelector(userData)
  const { t } = useTranslation();
  return (
    <>
      <Header title={t("contactPage.title")}/>
      {user &&
      <ContactList/>}
    </>
  );
};

export default ContactsPage;