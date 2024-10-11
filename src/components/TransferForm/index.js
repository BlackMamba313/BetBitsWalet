import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom'; // Импортируем useLocation
import styles from './TransferForm.module.css';
import {useTranslation} from "react-i18next";
import ContactsIcon from "../../assets/icons/ContactsIcon";

const TransferForm = ({onSubmit, balance}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    setValue,
    clearErrors // Импортируем clearErrors для очистки ошибок
  } = useForm();

  const currentAmount = watch('amount');
  const location = useLocation(); // Получаем текущий URL
  const handleNavigateToContacts = () => {
    // Добавляем currentAmount к URL, если он доступен
    navigate(`/contacts${currentAmount ? `?amount=${currentAmount}` : ''}`);
  };
  console.log('balance',balance)
  console.log('currentAmount',currentAmount)
  console.log( Number(currentAmount) < Number(balance))
  // Извлекаем параметр 'address' из URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('amount');
    const address = queryParams.get('address');
    if (address) {
      setValue('address', address);
    }
    if (amount) {
      setValue('amount', amount);
    }
  }, [location, setValue]);
  useEffect(() => {
    // Очищаем ошибки валидации токена, если токен теперь доступен
    if (balance) {
      clearErrors('amount');
    }
  }, [balance, clearErrors]);
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <input
          {...register("wallet_address_to",
            {required: `${t("sendPage.error1")}`})}
          type="text"
          placeholder={t("sendPage.placeholder1")}
          className={`${styles.input} ${styles.extraPadding}`}
        />
        <div onClick={handleNavigateToContacts} className={styles.iconInput}>
          <ContactsIcon/>
        </div>
        {errors.address && <span className={styles.error}>{errors.address.message}</span>}
      </div>
      <div className={styles.inputGroup}>
        <input
          {...register("amount", {
            required: `${t("sendPage.error1")}`,
            pattern: {
              value: /^[0-9]*[.,]?[0-9]*$/,
              message: `${t("sendPage.error2")}`
            },
            validate: {
              hasToken: () => balance ? null : `${t("sendPage.noTokenError")}`,
              maxAmount: value => parseFloat(value.replace(',', '.')) <= Number(balance) || `${t("sendPage.error3")}`
            }
          })}
          type="text"
          inputMode="decimal"
          placeholder={t("sendPage.placeholder2")}
          className={styles.input}
        />
        {errors.amount && <span className={styles.error}>{errors.amount.message}</span>}
      </div>
      <button type="submit" className={styles.sendButton}>
        {t("sendPage.btn")}
      </button>
    </form>
  );
};

export default TransferForm;

