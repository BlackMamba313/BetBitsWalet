
export const userData = ({ auth }) => auth.user;
export const walletsData = ({ auth }) => auth.wallets;

export const currentRate = ({ auth }) => auth.currentRate;

export const transactionsData = ({ auth }) => auth.trans?.data;

export const walletData = ({ auth }) => auth.currentWallet;

export const fullBalance = ({ auth }) => auth.fullBalance;

export const refStatData = ({ auth }) => auth.refStat;

export const fiatCurrency = ({ auth }) => auth.fiat;

export const rateData = ({ auth }) => auth.rate;

export const cryptoCurrency = ({ auth }) => auth.crypto;


