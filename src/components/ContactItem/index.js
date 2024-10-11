import React from 'react';
import styles from './ContactList.module.css';
import {userData} from "../../store/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {DelContact} from "../../store/contacts";
import DelIcon from "../../assets/icons/DelIcon";
import {useLocation, useNavigate} from "react-router-dom";


const ContactItem = ({contact}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {id} = useSelector(userData)
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');

  const clickDel = (e) => {
    e.stopPropagation();
    const params = {
      id: id,
      cid: contact.cid
    }
    dispatch(DelContact(params))
  }

  const clickContact = (e) => {
    e.stopPropagation();
    // Передаем amount вместе с адресом, если он доступен
    navigate(`/send?address=${contact.addr}${amount ? `&amount=${amount}` : ''}`);
  }

  return (
    <div onClick={clickContact} className={styles.container}>
      <div>{contact.name}</div>
      <div className={styles.btns}>
        {contact.cid!== '-1' && <div className={styles.icon} onClick={clickDel}>
          <DelIcon width={35} height={35}/>
        </div>}
      </div>
    </div>
  );
};

export default ContactItem;
