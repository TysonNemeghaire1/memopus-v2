// @flow
import * as React from 'react';

type Props = {

};

export function Login(props: Props) {
    return (
        <div className={"flex flex-col lg:flex-row  h-screen"}>
            <aside className={"flex justify-center items-center py-16 lg:p-0 lg:w-1/2 bg-indigo-500"}>
                <div className={"flex flex-col w-5/6 lg:w-3/5 text-white"}>
                    <span className={"text-4xl lg:text-6xl font-extrabold"}>Lorem ipsum dolor sit.</span>
                    <span className={"text-lg lg:text-lg mt-5"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, provident, totam. Accusamus alias, eius facere fugiat illum inventore, iure necessitatibus porro quam ratione tenetur ut vero voluptate? Ducimus, laborum, voluptatem.</span>
                </div>

            </aside>

            <main className={"flex justify-center items-center order-first lg:order-none py-20 lg:p-0 lg:w-1/2 bg-neutral-100 text-indigo-500"}>
                <div className="flex flex-col gap-8 w-5/6 lg:w-3/5 mx-auto ">
                    <h1 className={"text-5xl text-center"}>Bonjour ! Bienvenue</h1>
                    <form>
                        <div className={"flex flex-col gap-2.5"}>
                            <label htmlFor="name">Nom d'utilisateur</label>
                            <input className={"text-black px-2.5 py-3 rounded-lg"} id={"name"} placeholder={"Entrer votre nom d'utilisateur"} type="text" required />
                        </div>
                        <div className={"flex flex-col gap-2.5 pt-5"}>
                            <label htmlFor="name">Mot de passe</label>
                            <input className={"text-black px-2.5 py-3 rounded-lg"} id={"password"} placeholder={"Entrer votre nom d'utilisateur"} type="text" required />
                        </div>
                        <div className={"flex gap-2 pt-4"}>
                            <input className={"accent-emerald-300"} type="checkbox" id="stayConnected"/>
                            <label htmlFor="stayConnected">Rester connecté ?</label>
                        </div>
                        <button className={"bg-indigo-500 text-white w-full py-2.5 mt-6 rounded-lg"} type="submit">Se connecter</button>
                    </form>
                </div>
            </main>
        </div>
    );
};