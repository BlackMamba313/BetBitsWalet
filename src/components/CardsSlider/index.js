import React, {useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import {walletData, walletsData} from "../../store/auth/selectors";
import {setActiveWallet} from "../../store/auth";
import {map} from "lodash";
import SwipeAnimation from "../../utils/swipeAnimation";
import styles from './CardsSlider.module.css';

const EnhancedSwipeableViews = bindKeyboard(SwipeableViews);

const CardsSlider = () => {
  const dispatch = useDispatch();
  const dataWallets = useSelector(walletsData);
  const currentWallet = useSelector(walletData);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const wallets = dataWallets?.wallets

  const handleChangeIndex = (index) => {
    setCurrentIndex(index);
    dispatch(setActiveWallet({...wallets[index], index: index}));
  };

  useEffect(() => {
    setCurrentIndex(currentWallet?.index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWallet]);

  return (
    <div className={styles.wrapper}>
      {currentIndex === 0 && <SwipeAnimation/>}
      <EnhancedSwipeableViews index={currentIndex} onChangeIndex={handleChangeIndex}>
        {map(wallets, (card) => (
          <Card  card={card} />
        ))}
      </EnhancedSwipeableViews>
    </div>
  );
};

export default CardsSlider;
