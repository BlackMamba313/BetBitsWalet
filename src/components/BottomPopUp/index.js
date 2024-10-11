import React from 'react';
import styles from './BottomPopUp.module.css';

const BottomPopUp = ({children, isOpen, setIsOpen}) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {  // Проверяем, что клик был по фону, а не по содержимому
      setIsOpen(false);
    }
  };

  return (
    <>
      <div onClick={handleClose} className={`${styles.popup} ${isOpen ? styles.open : ''}`}>
          <div className={styles.popupContent} onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
    </>
  );
};

export default BottomPopUp;
