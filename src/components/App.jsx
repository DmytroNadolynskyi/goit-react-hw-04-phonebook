import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Conteiner } from './App.styled';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const existContact = contacts.find(
      contact => contact.name === newContact.name
    );
    if (existContact) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    const contact = {
      ...newContact,
      id: nanoid(),
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const onInputChange = filterValue => {
    setFilter(filterValue);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    const selContacts = contacts.filter(contact => contact.id !== id);
    setContacts(selContacts);
  };
  return (
    <Conteiner>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter onInputChange={onInputChange} />
          <ContactList
            filterContacts={filterContacts()}
            deleteContact={deleteContact}
          />
        </>
      )}
    </Conteiner>
  );
}
