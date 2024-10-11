import React, {useEffect} from 'react';
import {userData} from "../../store/auth/selectors";
import {useDispatch, useSelector} from "react-redux";
import {GetContacts} from "../../store/contacts";
import {contactsData} from "../../store/contacts/selectors";
import {map} from "lodash";
import ContactItem from "../ContactItem";


const ContactList = () => {
  const dispatch = useDispatch();
  const {id} = useSelector(userData)
  const contacts = useSelector(contactsData)

  useEffect(() => {
    dispatch(GetContacts({id: id}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {map(contacts, (contact) => (
        <ContactItem contact={contact}/>
      ))}
    </>
  );
};

export default ContactList;
