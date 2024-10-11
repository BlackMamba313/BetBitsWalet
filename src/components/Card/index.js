import React from 'react';
import styles from './Card.module.css';
import {motion} from 'framer-motion';
import {fullBalance, userData} from "../../store/auth/selectors";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const Card = ({card}) => {
  const { t } = useTranslation();
  const user = useSelector(userData);
  const fiatBalance = useSelector(fullBalance)
  const cardAnimationStyle = user ? {filter: 'blur(0px)'} : {filter: 'blur(4px)'};

  return (
    <div className={styles.wrapper}>
      <motion.div
        initial={{filter: 'blur(0px)'}}
        animate={cardAnimationStyle}
        transition={{duration: 0.5}}
        className={styles.card}>
        <p className={styles.cardTitle}>{t("general.balance")}</p>
        {card?.balance ?
          <>
            <p className={styles.mainBalance}>{card.balance ? parseFloat(card.balance).toFixed(3) : '0.00'} {card.token}</p>
            <p className={styles.subBalance}>{card.convert_balance} {user?.iso}</p>
          </>
          :
          <p className={styles.mainBalance}>{fiatBalance?.toFixed(2) || '0.00'} {user?.iso}</p>
        }
      </motion.div>
    </div>
  );
};

export default Card;