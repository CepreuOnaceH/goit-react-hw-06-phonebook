import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from 'redux/contactsSlice';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      dispatch(addContact(JSON.parse(savedContacts)));
    }
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
    localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handleFilterChange = newFilter => {
    dispatch(setFilter(newFilter));
  };
  console.log('contacts:', contacts);
  console.log('filter:', filter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        gap: '5px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
