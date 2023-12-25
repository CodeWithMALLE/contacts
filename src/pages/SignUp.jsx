import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urlBackend } from '../helpers/credentials';



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique d'authentification avec le email et le password
        if (email !== "" && password !== "") {
            const user = {
                email: email,
                password: password,
                nom: nom,
                prenom: prenom,
                tel: tel
            }
            // console.log(user);

            fetch(urlBackend + "signup/", {
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
                        // localStorage.setItem('token', data.token);
                        // localStorage.setItem('user', JSON.stringify(data.user));
                        navigate("/login")
                    }
                    else {
                        alert(data.message);
                    }
                    // console.log(data.success);
                }).catch(error => console.error('Erreur:', error));
        };
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">
                        Nom
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        placeholder="Entrer votre nom"
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
                        placeholder="Entrer votre Prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
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
                        placeholder="Entrer votre adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn btn-primary">
                        S'inscrire
                    </button>
                    <Link to="/login">Se connecter</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp

