// @flow
import React, { useEffect, useState } from "react";
import Coopernet from "../../services/Coopernet";
import { redirect, useNavigate } from "react-router-dom";

type LoginInput = "name" | "password";

export function redirectIfConnected() {
  if (Coopernet.user.id) return redirect("/");
  return null;
}

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const isValidForm = inputs.name.value && inputs.password.value;

  useEffect(() => {
    disconnect();
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name as LoginInput;
    setInputs({
      ...inputs,
      [inputName]: { ...inputs[inputName], value: event.target.value },
    });
  };
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputName = event.target.name as LoginInput;

    if (inputs[event.target.name as LoginInput].value === "") {
      setInputs({
        ...inputs,
        [inputName]: { ...inputs[inputName], isValid: false },
      });
      return;
    }
    setInputs({
      ...inputs,
      [inputName]: { ...inputs[inputName], isValid: true },
    });
  };
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (const inputKey in inputs) {
      Coopernet.user[inputKey as LoginInput] =
        inputs[inputKey as LoginInput].value;
    }
    try {
      setIsPending(true);
      await Coopernet.login();

      const stayConnected = document.getElementById(
        "stayConnected"
      ) as HTMLInputElement;

      if (stayConnected.checked) {
        localStorage.setItem(
          "refresh_token",
          Coopernet.oAuthToken.refresh_token
        );
      }
      return navigate("/");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      setIsPending(false);
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <aside className="flex h-full items-center justify-center bg-blue-800 py-16 lg:w-1/2 lg:p-0">
        <div className="flex w-5/6 flex-col text-white lg:w-3/5">
          <span className="text-4xl font-extrabold lg:text-6xl">
            Lorem ipsum dolor sit.
          </span>
          <span className="mt-5 text-lg lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At,
            provident, totam. Accusamus alias, eius facere fugiat illum
            inventore, iure necessitatibus porro quam ratione tenetur ut vero
            voluptate? Ducimus, laborum, voluptatem.
          </span>
        </div>
      </aside>

      <main className="order-first flex h-full items-center justify-center bg-neutral-100 py-20 text-blue-800 lg:order-none lg:w-1/2 lg:p-0">
        <section className="mx-auto flex w-5/6 flex-col gap-8 lg:w-3/5">
          <h1 className="text-center text-5xl">Bonjour ! Bienvenue</h1>
          <p className="text-sm">
            Les champs obligatoires sont suivis de{" "}
            <strong>
              <span aria-label="requis" className="text-red-600">
                *
              </span>
            </strong>
          </p>
          <form onSubmit={onSubmitHandler}>
            <p className="flex flex-col gap-2.5">
              <label htmlFor="name">
                Nom d'utilisateur
                <strong>
                  <span aria-label="requis" className="text-red-600">
                    {" "}
                    *
                  </span>
                </strong>
              </label>
              <input
                className="rounded-lg py-3 text-black px-2.5 disabled:bg-gray-200"
                id="name"
                name="name"
                placeholder="Entrer votre nom d'utilisateur"
                type="text"
                required
                value={inputs.name.value}
                disabled={isPending}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
              {!inputs.name.isValid && (
                <span className="text-red-500">
                  Le nom d'utilisateur est requis.
                </span>
              )}
            </p>
            <p className="flex flex-col pt-5 gap-2.5">
              <label htmlFor="name">
                Mot de passe
                <strong>
                  <span aria-label="requis" className="text-red-600">
                    {" "}
                    *
                  </span>
                </strong>
              </label>
              <input
                className="rounded-lg py-3 text-black px-2.5 disabled:bg-gray-200"
                id="password"
                name="password"
                placeholder="Entrer votre mot de passe"
                type="password"
                required
                value={inputs.password.value}
                disabled={isPending}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
              {!inputs.password.isValid && (
                <span className="text-red-500">
                  Le mot de passe est requis.
                </span>
              )}
            </p>
            <p className="flex gap-2 pt-4">
              <input
                className="accent-blue-800"
                type="checkbox"
                id="stayConnected"
              />
              <label htmlFor="stayConnected">Rester connecté ?</label>
            </p>
            <section>
              {" "}
              {/* Méthode pour le bouton conseiller sur la Mozilla / https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form*/}
              <p>
                <button
                  disabled={!isValidForm || isPending}
                  className="mt-6 w-full rounded-lg bg-blue-800 text-white py-2.5 disabled:bg-blue-200"
                  type="submit"
                >
                  {isPending && (
                    <svg
                      aria-hidden="true"
                      className="mr-2 inline h-4 w-4 animate-spin fill-blue-600 text-gray-200"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  )}
                  {isPending ? "Connexion..." : "Se connecter"}
                </button>
              </p>
            </section>
            {error && (
              <section>
                <p className="pt-2 text-red-500">{error}</p>
              </section>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export function disconnect() {
  Coopernet.user = { id: "", password: "", name: "" };
  Coopernet.oAuthToken = {
    refresh_token: "",
    access_token: "",
    token_type: "",
    expires_in: 0,
  };
  localStorage.clear();
}

