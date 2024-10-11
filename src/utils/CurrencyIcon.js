import { ReactComponent as USD } from '../assets/fiat/USD.svg';
import { ReactComponent as EUR } from '../assets/fiat/EUR.svg';
import { ReactComponent as RUB } from '../assets/fiat/RUB.svg';
import { ReactComponent as GBP } from '../assets/fiat/GBP.svg';
import { ReactComponent as BYN } from '../assets/fiat/BYN.svg';
import { ReactComponent as MNT } from '../assets/fiat/MNT.svg';
import { ReactComponent as TRX } from '../assets/crypto/TRX.svg';
import { ReactComponent as USDT } from '../assets/crypto/USDT.svg';
import { ReactComponent as CAD } from '../assets/fiat/CAD.svg';
import { ReactComponent as CNY } from '../assets/fiat/CNY.svg';
import { ReactComponent as AUD } from '../assets/fiat/AUD.svg';

import { ReactComponent as DefaultIcon } from '../assets/icons/del.svg';

const currencyIcons = {
  USD: USD,
  EUR: EUR,
  RUB: RUB,
  GBP: GBP,
  BYN: BYN,
  CAD: CAD,
  CNY: CNY,
  AUD: AUD,
  TRX: TRX,
  USDT: USDT,
  MNT: MNT
  // Добавьте другие валюты и их иконки здесь
};

const CurrencyIcon = ({currencyCode}) => {
  const Icon = currencyIcons[currencyCode] || DefaultIcon;
  return <Icon />;
};

export default CurrencyIcon