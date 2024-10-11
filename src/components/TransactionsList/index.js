import React, { useState } from 'react';
import styles from './TransactionsList.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import TransactionDetails from "../TransactionDetails";
import Transaction from "../Transaction";
import {map} from "lodash";

const TransactionsList = ({ transactions }) => {
  const [expanded, setExpanded] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleExpanded = (id, e) => {
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);
    e.stopPropagation();
    setExpanded(expanded === id ? null : id);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // предполагается, что ваша анимация занимает 500 мс
  };

  // Анимация для деталей
  const detailsAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <div className={styles.transactionList}>
      {map(transactions, (transaction) => (
        <motion.div key={transaction.id}
                    layout
                    initial="hidden"
                    animate={expanded === transaction.id ? "visible" : "hidden"}
                    className={styles.transactionCard}
                    onClick={(e) => toggleExpanded(transaction.id, e)}>
          <Transaction transaction={transaction}/>
          <AnimatePresence>
            {expanded === transaction.id && (
              <motion.div
                className={expanded === transaction.id ? styles.detailsVisible : styles.detailsHidden}
                variants={detailsAnimation}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <TransactionDetails transaction={transaction}/>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default TransactionsList;




