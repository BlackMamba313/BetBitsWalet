import React from 'react';
import styles from './CurrencyList.module.css';
import {findIndex, map} from "lodash";
import CurrencyIcon from "../../utils/CurrencyIcon";
import {useSelector} from "react-redux";
import {rateData, userData} from "../../store/auth/selectors";

const CurrencyList = ({currencies, onSelectCurrency}) => {
  const rates = useSelector(rateData)
  const handleCurrencyChange = (currency, index) => {
    onSelectCurrency(currency, index); // для обновления курса в `CurrencyInput`
  };

  return (
    <div className={styles.listWrapper}>
      {map(currencies, (currency, index) => {

        const curentRate = rates[findIndex(rates, { 'convertible_currency': currency.currency_name})] // Формирование ключа для доступа к курсу
        console.log(curentRate)
        const currencyRate = curentRate ? (1/parseFloat(curentRate?.price)).toFixed(2) + ' USD' : '-' // Получение курса для данной валюты
        return (
          <div onClick={() => handleCurrencyChange(currency.currency_name, index)} className={styles.listItem} key={index}>
            <CurrencyIcon currencyCode={currency.currency_name} />
            <div>
              {currency.currency_name}
              {/* Проверка на наличие sb или se и их отображение с дефисом перед ними */}
              <p>{currencyRate || "N/A"}</p> {/* Отображение курса валюты или "N/A", если курс не найден */}
            </div>
          </div>
        );
      })}
    </div>
  )
};

export default CurrencyList;