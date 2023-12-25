import React, { useEffect, useState } from 'react';
import { urlBackend } from '../helpers/credentials';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState("hello")

    const navigate = useNavigate()



    const handleLogin = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique d'authentification avec le email et le password
        alert("hello")
        if (email !== "" && password !== "") {

            const user = {
                email: email,
                password: password
            }
            // console.log(user);

            fetch(urlBackend + "login/", {
                method: 'POST',
                accept: 'application/json',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        navigate("/")
                    }
                    else {
                        alert(data.message);
                        console.log(data);
                    }
                }).catch(error => console.error('Erreur:', error));

            // fetch(urlBackend + "login/", {
            //     method: 'GET',
            //     accept: 'application/json'
            // })
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Échec de la requête. Statut: ' + response.status);
            //         }
            //         return response.text();
            //     })
            //     .then(data => {
            //         setResponse(data)
            //         console.log(data);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
        }
        // history.push('/dashboard');
    };

    return (
        <div className="container mt-5">
            <h2>Connectez vous à votre espace</h2>
            <form onSubmit={(e) => handleLogin(e)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Entrer votre adresse email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Entrer votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: "space-around", alignItems: "flex" }}>
                    <input type="submit" className="btn btn-primary" value="Se connecter" />

                    <Link to="/sign-up">S'inscrire</Link>
                </div>
            </form >
        </div >
    );
};

export default Login;
