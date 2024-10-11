import './App.css';
import React, {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import ReceivePage from "./pages/ReceivePage";
import SendPage from "./pages/SendPage";
import {useDispatch, useSelector} from "react-redux";
import {auth, GetCrypto, getCurrencyRate, GetFiat, getWallets} from "./store/auth";
import {userData, walletData} from "./store/auth/selectors";
import ProfilePage from "./pages/ProfilePage";
import ReferralPage from "./pages/ReferralPage";
import ContactsPage from "./pages/ContactsPage";
import i18n from "i18next";

function App() {
  const dispatch = useDispatch();
  const wallet = useSelector(walletData);
  const user = useSelector(userData);
  const {userTG} = useTelegram();
  const token = localStorage.getItem('accessToken');
  // const userMock = {
  //   allows_write_to_pm: 1,
  //   first_name: "Alex",
  //   id: 1062567639,
  //   is_premium: 1,
  //   language_code: "en",
  //   username: "AleksKonstant"
  // }

  useEffect(() => {
    if (userTG) {
      dispatch(auth(userTG));
    }
    // else {
    //   dispatch(auth(userMock));
    //   console.log('user is not')
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getWallets())
      dispatch(GetFiat())
      dispatch(GetCrypto())
      dispatch(getCurrencyRate("USD"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function changeTheme(currency) {
    let root = document.documentElement;
    if (currency === 'USDT') {
      root.style.setProperty('--currency-color', '#52ae94');
    } else if (currency === 'TRX') {
      root.style.setProperty('--currency-color', '#d21d25');
    }
  }

  useEffect(() => {
    if (wallet?.token) {
      changeTheme(wallet.token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  useEffect(() => {
    if (user?.languageCode) {
      i18n.changeLanguage(user?.languageCode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path={'receive'} element={<ReceivePage/>}/>
        <Route path={'send'} element={<SendPage/>}/>
        <Route path={'profile'} element={<ProfilePage/>}/>
        <Route path={'referral'} element={<ReferralPage/>}/>
        <Route path={'contacts'} element={<ContactsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
