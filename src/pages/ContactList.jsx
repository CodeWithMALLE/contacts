// ContactList.js
import React, { useEffect, useState } from 'react';
import './ContactList.css';
import SignleContact from './SignleContact';

const ContactList = (props) => {

    const handleToggle = (id) => {

        // console.log(id);

        const copieContacts = [...props.contacts]
        copieContacts.forEach(contact => {
            if (contact.id === id) {
                contact.show = !contact.show
            }
            else {
                contact.show = false
            }
            // console.log(contact.id);
        })
        props.setContacts(copieContacts)
    }

    return (
        <div className="contact-list-container">

            {/* <SignleContact contacts={contacts} /> */}

            {props.contacts.length > 0 ? <h2>Liste des contacts</h2> : <h2 className="text-info">Vous n'avez pas de contacts sur ce compte !</h2>}
            <ul className="contact-list">
                {props.contacts.map(contact => (
                    <li key={contact.id} className="contact-item">
                        <SignleContact contact={contact} handleToggle={handleToggle} />
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default ContactList;
