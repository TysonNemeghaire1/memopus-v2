// @flow
import React, {useState} from 'react';
import Coopernet from "../../services/Coopernet";
import {useNavigate} from "react-router-dom";

type inputsType = "name" | "password";

export default function Login() {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({name: {value: "", isValid: true}, password: {value: "", isValid: true}});
    const [error, setError] = useState("");
    const isValidForm = inputs.name.value && inputs.password.value;

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name as inputsType;
        setInputs({...inputs, [inputName]: {...inputs[inputName], value: event.target.value}});
    };
    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputName = event.target.name as inputsType;

        if (inputs[event.target.name as inputsType].value === "") {
            setInputs({...inputs, [inputName]: {...inputs[inputName], isValid: false}});
            return;
        }
        setInputs({...inputs, [inputName]: {...inputs[inputName], isValid: true}});
    }
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        for (const inputKey in inputs) {
            Coopernet.user[inputKey as inputsType] = inputs[inputKey as inputsType].value;
        }
        try {
            await Coopernet.setOAuthToken();
            await Coopernet.getUserId();
            console.log("test")
            navigate("/");
        } catch (error) {
            if (error instanceof Error) setError(error.message);
        }
    }

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            <aside className="flex h-full items-center justify-center bg-indigo-500 py-16 lg:w-1/2 lg:p-0">
                <div className="flex w-5/6 flex-col text-white lg:w-3/5">
                    <span className="text-4xl font-extrabold lg:text-6xl">Lorem ipsum dolor sit.</span>
                    <span className="mt-5 text-lg lg:text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, provident, totam. Accusamus alias, eius facere fugiat illum inventore, iure necessitatibus porro quam ratione tenetur ut vero voluptate? Ducimus, laborum, voluptatem.</span>
                </div>
            </aside>

            <main
                className="order-first flex h-full items-center justify-center bg-neutral-100 py-20 text-indigo-500 lg:order-none lg:w-1/2 lg:p-0">
                <section className="mx-auto flex w-5/6 flex-col gap-8 lg:w-3/5">
                    <h1 className="text-center text-5xl">Bonjour ! Bienvenue</h1>
                    <p className="text-sm">
                        Les champs obligatoires sont suivis de <strong><span aria-label="requis"
                                                                             className="text-red-600">*</span></strong>
                    </p>
                    <form onSubmit={onSubmitHandler}>
                        <p className="flex flex-col gap-2.5">
                            <label htmlFor="name">Nom d'utilisateur
                                <strong><span aria-label="requis" className="text-red-600"> *</span></strong>
                            </label>
                            <input className="rounded-lg py-3 text-black px-2.5" id="name" name="name"
                                   placeholder="Entrer votre nom d'utilisateur" type="text" required
                                   value={inputs.name.value}
                                   onChange={onChangeHandler}
                                   onBlur={onBlurHandler}/>
                            {!inputs.name.isValid && <span className="text-red-500">
                                Le nom d'utilisateur est requis.
                            </span>}
                        </p>
                        <p className="flex flex-col pt-5 gap-2.5">
                            <label htmlFor="name">Mot de passe
                                <strong><span aria-label="requis" className="text-red-600"> *</span></strong></label>
                            <input className="rounded-lg py-3 text-black px-2.5" id="password" name="password"
                                   placeholder="Entrer votre mot de passe" type="password" required
                                   value={inputs.password.value}
                                   onChange={onChangeHandler}
                                   onBlur={onBlurHandler}/>
                            {!inputs.password.isValid && <span className="text-red-500">
                                Le mot de passe est requis.
                            </span>}
                        </p>
                        <p className="flex gap-2 pt-4">
                            <input className="accent-indigo-500" type="checkbox" id="stayConnected"/>
                            <label htmlFor="stayConnected">Rester connecté ?</label>
                        </p>
                        <section> {/* Méthode pour le bouton conseiller sur la Mozilla / https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form*/}
                            <p>
                                <button disabled={!isValidForm}
                                        className="mt-6 w-full rounded-lg bg-indigo-500 text-white py-2.5 disabled:bg-indigo-200"
                                        type="submit">Se connecter
                                </button>
                            </p>
                        </section>
                        {error && (
                            <section>
                                <p className="text-red-500 pt-2">{error}</p>
                            </section>)}

                    </form>
                </section>
            </main>
        </div>
    );
}