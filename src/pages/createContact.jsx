import { useForm } from "react-cool-form";

import "./form.css"
import { useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlBackend } from "../helpers/credentials";


function CreateContact() {

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [profession, setProfession] = useState('');

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(() => {
        const userFromStorage = JSON.parse(localStorage.getItem("user"))
        setUser(userFromStorage)
    }, [])

    const createContact = (values) => {
        // console.log(user);
        // console.log(values);
        fetch(urlBackend + "createContact/", { method: "POST", body: JSON.stringify({ values, user }), headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                if (data.success) {
                    navigate("/")
                }
                else {
                    alert(data.message)
                }
            })
            .catch((error) => console.log("Erreur: " + error))
    }

    const verifyInput = (values) => {

        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                if (!values[key] || values[key].trim() === '') {
                    return false
                }
            }
        }

        return true
    }

    const handleCreate = (e) => {
        e.preventDefault();
        const values = {
            firstName: prenom,
            lastName: nom,
            email: email,
            profession: profession,
            tel: tel
        }
        if (verifyInput(values)) {
            fetch(urlBackend + "createContact/", { method: "POST", body: JSON.stringify({ values, user }), headers: { 'Content-Type': 'application/json' } })
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    if (data.success) {
                        navigate("/")
                    }
                    else {
                        alert(data.message)
                    }
                })
                .catch((error) => console.log("Erreur: " + error))
            // navigate("/")
        }
        else {
            alert("Veuillez renseigner tous les champs !")
        }
    }

    return (
        <div className="container mt-5">
            <h2>Ajouter un contact dans votre annuaire.</h2>
            <form onSubmit={(e) => handleCreate(e)}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">
                        Nom
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        placeholder="Entrer le nom de la personne"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">
                        Prénom
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        placeholder="Entrer le nom de la personne"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="profession" className="form-label">
                        Proféssion
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="profession"
                        placeholder="La proféssion de la personne"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">
                        Téléphone
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="tel"
                        placeholder="Entrer votre numéro de téléphone"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Entrer son adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: "space-around", alignItems: "flex" }}>
                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>
                    <Link to="/" className="btn btn-danger">Annuler</Link>
                </div>
            </form>
        </div >
    );
}

export default CreateContact