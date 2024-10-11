import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styles from './UserProfile.module.css';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {userData} from "../../store/auth/selectors";
import {SetUserData} from "../../store/auth";
import { omitBy, isNil, isEmpty } from "lodash";

const UserProfile = () => {
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState(user?.languageCode);
  const [selectedCurrency, setSelectedCurrency] = useState(user?.iso);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue
  } = useForm({
    defaultValues: {
      iso: user?.iso, // Устанавливаем дефолтное значение для валюты
      languageCode: user?.languageCode // Устанавливаем дефолтное значение для языка
    }
  });

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setValue("languageCode", newLanguage); // Обновляем форму
    setSelectedLanguage(newLanguage); // Обновляем локальное состояние
  };

  const changeCurrency = (event) => {
    const newCurrency = event.target.value;
    setValue("iso", newCurrency); // Обновляем форму
    setSelectedCurrency(newCurrency); // Обновляем локальное состояние
  };

  const onSubmit = data => {
    // Очистка данных от пустых значений
    const cleanedData = omitBy(data, value => isNil(value) || (typeof value === 'string' && isEmpty(value)));
    cleanedData.id = user.id
    console.log(cleanedData);
    dispatch(SetUserData(cleanedData));
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatarSection}>
        <button type="button" className={styles.verifyButton}>{t("profilePage.verifyBtn")}</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
        <input className={styles.input} {...register("email")} placeholder={t("profilePage.placeholder1")}/>
        <input className={styles.input} {...register("phone")} placeholder={t("profilePage.placeholder2")}/>
        <div className={styles.selectsWrapper}>
          <select value={selectedCurrency} onChange={changeCurrency} className={styles.select}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            {/* Добавить другие валюты по необходимости */}
          </select>
          <select value={selectedLanguage} onChange={changeLanguage} className={styles.select}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="de">Deutsch</option>
            <option value="fn">Français</option>
            <option value="es">Español</option>
          </select>
        </div>

        <button type="submit" className={styles.saveButton}>{t("profilePage.safeBtn")}</button>
        <button type="button" onClick={() => navigate(`/contacts`)} className={styles.saveButton}>{t("profilePage.contactBtn")}</button>
        <button type="button" onClick={() => navigate(`/referral`)} className={styles.partnerButton}>{t("profilePage.referralBtn")}</button>
      </form>
    </div>
  );
};

export default UserProfile;
