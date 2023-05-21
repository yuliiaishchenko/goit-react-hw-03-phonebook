import React, { Component } from "react";
import { ContactForm } from "components/ContactForm/ContactForm";
import { ContactList } from "components/ContactList/ContactList";
import Filter from "components/Filter/Filter";
import initialContacts from '../initialContacts';
import { Section, Title } from "./App.styled";



export  class App extends Component {

  state = {
    contacts: initialContacts,
    filter: '',
  };

  componentDidMount(){
    const localStorageContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localStorageContacts);
    if (!parsedContacts) return;
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }


  addContact = newContact => {

    const { contacts } = this.state;

   contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    )
      ? alert(`${newContact.name}: is already in contacts`)
      : this.setState(prevState => {
          return {
            contacts: [newContact, ...prevState.contacts],
          };
        });
  };




deleteContact = contactId => {
  this.setState(prevState => {
    return {
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactId
      ),
    };
  });
};

changeFilter = e => {
  this.setState({ filter: e.currentTarget.value.toLowerCase()});
};

getVisibleContacts = () => {
  const { filter, contacts } = this.state;
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
};

render(){
  const { filter } = this.state;
  const visibleContacts = this.getVisibleContacts();

  return(
    <Section> 
    <Title>Phonebook</Title>
    <ContactForm onAddContact={this.addContact}/>
   <Filter value={filter} onChange={this.changeFilter}/>
   <Title>Contacts </Title>
   <ContactList contacts={visibleContacts} onDelete={this.deleteContact}/>
  
    </Section>
  )
}
}
