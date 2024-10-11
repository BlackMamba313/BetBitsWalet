import React, {useEffect, useState} from 'react';
import CurrencyInput from "../CurrencyInput";
import CurrencyList from "../CurrencyList";
import styles from "./Converter.module.css";
import {useDispatch, useSelector} from "react-redux";
import {cryptoCurrency, fiatCurrency, rateData, userData, walletsData} from "../../store/auth/selectors";
import {getCurrencyRate, setActiveWallet} from "../../store/auth";
import {findIndex} from "lodash";

const Converter = ({ sourceAmount, setSourceAmount}) => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsData);
  const fiat = useSelector(fiatCurrency)
  const crypto = useSelector(cryptoCurrency)
  const rate = useSelector(rateData)
  // const user = useSelector(userData);

  const [selectedFiat, setSelectedFiat] = useState('USD'); // Установите начальное значение, например, первый элемент списка
  const [selectedCrypto, setSelectedCrypto] = useState(''); // То же самое для криптовалюты
  const [exchangeRate, setExchangeRate] = useState(1);
  const getExchangeRate = () => {
    const curentRate = rate[findIndex(rate, { 'convertible_currency': selectedCrypto})]
    return curentRate?.price;
  };

  // Обновляем курс обмена при изменении выбранных валют
  useEffect(() => {
    setExchangeRate(getExchangeRate(selectedFiat));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiat, selectedCrypto, rate]);

  const handleFiatChange = (currency) => {
    setSelectedFiat(currency);
  };

  const handleCryptoChange = (currency, index) => {
    setSelectedCrypto(currency);
    dispatch(setActiveWallet({...wallets[index+1], index: index + 1}));
  };

  useEffect(() => {
    dispatch(getCurrencyRate(selectedFiat))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiat]);


  return (
    <div className={styles.container}>
      <CurrencyInput
        sourceAmount={sourceAmount}
        setSourceAmount={setSourceAmount}
        rate={exchangeRate}
        selectedFiat={selectedFiat}
        selectedCrypto={selectedCrypto}
      />
      <div className={styles.list}>
        <CurrencyList
          currencies={crypto}
          onSelectCurrency={handleCryptoChange}
        />
        <CurrencyList
          currencies={fiat}
          onSelectCurrency={handleFiatChange}
        />
      </div>
    </div>
  );
};

export default Converter;
