import React, { useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import Container from "./Nav/Container";
import { useSmallScreen } from "../../hooks/useSmallScreen";
import Thematic from "../../interfaces/Thematic";
import Coopernet from "../../services/Coopernet";
import { disconnect } from "../../services/login";
import { IoPeople } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

interface PropsInterface {
  thematics: Thematic[];
}

// TODO Ajouter des transitions pour:
//  - Fermer le formulaire au submit
//  - Retirer le texte au submit
//  - Retirer le texte quand on ferme le formulaire
//  - Retirer les boutons et mettre en sous-brillance quand on supprime un terme

// TODO Modifier le click pour afficher la liste d'enfants (Mettre sur le bouton fleche et non le tout)

function SideMenu({ thematics }: PropsInterface) {
  const fetcher = useFetcher();
  const [showSideBar, setShowSideBar] = useState(false);
  const isSmall = useSmallScreen();

  // TODO Cacher le menu après avoir charger les données
  function hideSideBar() {
    if (isSmall) setShowSideBar(false);
  }

  return (
    <aside
      className={`max-h-full w-full xl:max-w-max ${
        showSideBar && isSmall ? "fixed h-full w-full bg-white" : null
      }`}
    >
      <section className={`flex items-center justify-between p-5`}>
        <p className="pr-6 text-3xl font-extrabold text-blue-800">Memopus</p>
        <button
          className="xl:hidden"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <HiMenu className="text-2xl text-blue-800" />
        </button>
      </section>
      <div
        className={
          showSideBar && isSmall
            ? "h-full w-full bg-white"
            : isSmall
            ? "hidden"
            : ""
        }
      >
        <nav className="mx-6 flex flex-col border-b border-b-blue-500 py-4 text-blue-800">
          <ul>
            <li>
              <Link
                className="flex items-center gap-2 p-2.5 hover:bg-blue-100"
                to="/"
                onClick={hideSideBar}
              >
                <FaHome />
                Accueil
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 p-2.5 hover:bg-blue-100"
                to={`/users/${Coopernet.user.id}/thematics`}
                state={Coopernet.user.name}
                onClick={hideSideBar}
              >
                <IoMdPerson />
                Mes thématiques
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                onClick={hideSideBar}
                className="flex items-center gap-2 p-2.5 hover:bg-blue-100"
              >
                <IoPeople />
                Autres utilisateurs
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  disconnect();
                  hideSideBar();
                }}
                to="/login"
                className="flex items-center gap-2 text-red-400 p-2.5 hover:bg-red-100"
              >
                <RiLogoutBoxFill />
                Déconnexion
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="mx-6 mt-8">
          <Container
            title="Mes thématiques"
            dataArray={thematics}
            hideSideBar={hideSideBar}
          />
        </nav>
        <nav className="mx-6 mt-4">
          {fetcher.state === "idle" && fetcher.data ? (
            <Container
              title="Autres utilisateurs"
              dataArray={fetcher.data}
              hideSideBar={hideSideBar}
            />
          ) : (
            <fetcher.Form
              method="get"
              action="users"
              className="flex items-center justify-between"
            >
              <button
                className={`text-lg font-bold ${
                  fetcher.state === "loading"
                    ? "text-blue-500"
                    : "text-blue-900"
                }`}
              >
                {fetcher.state === "loading"
                  ? "Chargement..."
                  : "Charger les utilisateurs"}
              </button>
              {fetcher.state === "loading" ? (
                <svg
                  aria-hidden="true"
                  className="mr-2 inline h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
              ) : null}
            </fetcher.Form>
          )}
        </nav>
      </div>
    </aside>
  );
}

export default SideMenu;
