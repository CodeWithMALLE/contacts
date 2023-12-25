import React, { useState } from 'react';
import { urlBackend } from '../helpers/credentials';
import { useNavigate } from 'react-router-dom';

const SignleContact = ({ contact, handleToggle }) => {

    const navigate = useNavigate()

    const listIcon = [
        {
            icon: "telephone-fill",
            handleClick: (contact) => handleCall(contact)
        },
        {
            icon: "envelope",
            handleClick: (contact) => sendMail(contact)
        },
        {
            icon: "trash",
            handleClick: (contact) => handleDelete(contact)
        },
    ]

    const handleCall = (contact) => {
        const url = `tel:${contact.tel}`;
        window.location.href = url;
    }

    const sendMail = (contact) => {
        const url = `mailto:${contact.email}`;
        window.location.href = url;
    }

    const handleDelete = (contact) => {

        try {
            const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer " + contact.prenom + " de votre liste de contact ?")

            if (confirmation) {
                fetch(urlBackend + "deleteContact/", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({ id: contact.id })
                })
                    .then(response => response.json())
                    .then((data) => {
                        if (data.success) {
                            window.alert(contact.prenom + " a bel et bin supprimé de votre liste de contact.")
                            window.location.reload()
                        }
                        else {
                            window.alert("Une erreur s'est produite lors de la suppéssion.\n Veuillez réessayer plus tard.")
                        }
                    })
                    .catch((err) => {
                        console.log("Erreur: " + err.message);
                    })
            }
            else {
                window.alert("Suppression annulée.")
            }

        } catch (err) {
            console.log("Erreur: " + err.message);
        }

    }

    return (
        <div className="container mt-4" style={{ cursor: "pointer" }}>
            <div className="row" onClick={() => handleToggle(contact.id)}>
                <div className="col-3">
                    <img src="https://placehold.co/50x50/png" style={styles.img} className="card-img-top" />
                </div>
                <div className="col-6">
                    <div className="row">
                        <h3 className='col-12'>{contact.prenom} {contact.nom}</h3>
                        {/* <h3 className='col-6'></h3> */}
                    </div>
                    <div className="row">
                        <span className="badge badge-primary d-flex justify-content-start">{contact.profession}</span>
                    </div>
                </div>
                <div className="col-3 d-flex align-items-start justify-content-end" style={{}}>
                    <p>
                        <i className="bi bi-three-dots-vertical text-white bg-primary " style={{ borderRadius: "50%", padding: "10px", width: 40, height: 40 }}></i>
                    </p>
                </div>
            </div>
            {/* bottom */}
            {contact.show && <div className="row d-flex align-items-center">
                {listIcon.map((item, index) => (
                    <div key={index} className="col-4 d-flex align-items-center justify-content-center">
                        <p onClick={() => item.handleClick(contact)}>
                            <i className={`bi bi-${item.icon} text-white bg-primary`} style={{ borderRadius: "50%", padding: "10px", width: 40, height: 40 }}></i>
                        </p>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default SignleContact;

const styles = {
    img: {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
    },
    menu: {
        borderRadius: '50%',
        backgroundColor: '#007bff',
        padding: '10px',
        width: "25px",
        height: "25px",
        backgroundColor: "yellow"
    }

};
