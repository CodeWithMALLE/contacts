import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { urlBackend } from '../helpers/credentials';
import PlusIconSVG from '../components/PlusIconSVG';
import ContactList from './ContactList';

const Home = (props) => {
    // states
    const navigate = useNavigate()
    // const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    const [contacts, setContacts] = useState([])

    const [loading, setLoading] = useState(true)



    useEffect(() => {

        if (!user) {
            navigate("/login")
        }
        else {
            props.setUser(user)
            fetch(urlBackend + "getContact/", {
                method: 'POST',
                accept: 'application/json',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then(response => response.json())
                .then(data => {
                    const contacts = data.contacts
                    setContacts(contacts)
                    setLoading(false)
                })
                .catch(err => console.error("Erreur:", err))
        }
    }, [])

    useEffect(() => {
        const contactsWithShow = contacts.map(contact => {
            return { ...contact, show: false }
        })

        setContacts(contactsWithShow)
    }, [])

    return (
        <div>
            <div>
                {loading ?
                    <p>Chargement...</p> :
                    <div>
                        <ContactList contacts={contacts} setContacts={setContacts} />
                    </div>
                }
            </div>
            <div className="plus-icon">
                <Link to="/createContact"><PlusIconSVG /></Link>
            </div>
        </div>
        // <h1>Home</h1>
    );
}

export default Home;
