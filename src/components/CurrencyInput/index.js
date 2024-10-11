import React, {useState} from 'react';
import styles from './CurrencyInput.module.css';
import CurrencyIcon from "../../utils/CurrencyIcon";

const CurrencyInput = ({rate, selectedFiat, selectedCrypto, setSourceAmount, sourceAmount}) => {

  const [targetAmount, setTargetAmount] = useState('');
  const [lastChanged, setLastChanged] = useState(null);

  const handleSourceAmountChange = (e) => {
    const newAmount = e.target.value;
    setSourceAmount(newAmount);
    setTargetAmount((newAmount / rate).toFixed(2));
    setLastChanged('source');
  };

  const handleTargetAmountChange = (e) => {
    const newAmount = e.target.value;
    setTargetAmount(newAmount);
    setSourceAmount((newAmount * rate).toFixed(2));
    setLastChanged('target');
  };
  // Если курс изменился и последнее изменение было в исходном поле, обновляем целевое поле и наоборот.
  React.useEffect(() => {
    if (lastChanged === 'source') {
      setTargetAmount((sourceAmount / rate).toFixed(2));
    } else if (lastChanged === 'target') {
      setSourceAmount((targetAmount * rate).toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate]);
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.box}>
        <div className={styles.icon}>
          <CurrencyIcon currencyCode={selectedCrypto}/>
        </div>
        <input
          className={styles.input}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={sourceAmount}
          placeholder={'0.00'}
          onChange={handleSourceAmountChange}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.icon}>
          <CurrencyIcon currencyCode={selectedFiat}/>
        </div>
        <input
          className={styles.input}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          value={targetAmount}
          placeholder={'0.00'}
          onChange={handleTargetAmountChange}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
