import NumberOfTermInColumn from "../interfaces/NumberOfTermInColumn";
import columnIndexType from "../interfaces/ColumnIndex";
import Thematic from "../interfaces/Thematic";
import User from "../interfaces/User";

interface oAuth {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  expires_at?: number;
}

class Coopernet {
  //region VARIABLES

  static url = "https://coopernet.fr/";
  static user: { id: string; name: string; password: string } = {
    id: "",
    name: "",
    password: "",
  };
  static oAuthToken: oAuth = {
    access_token: "",
    refresh_token: "",
    token_type: "",
    expires_in: 0,
  };

  //endregion

  //region CONNEXION

  /**
   * @param {boolean} toRefresh
   * true si on veut rafraichir notre token /
   * false si on souhaite créer un token
   */
  static getOauthPayload = async (toRefresh: boolean) => {
    const payload = new FormData();

    payload.append("client_id", await Coopernet.getClientID());
    payload.append("client_secret", "pkyuRTHr8hy:;O6tTo");

    if (toRefresh) {
      payload.append("grant_type", "refresh_token");
      payload.append("refresh_token", Coopernet.oAuthToken.refresh_token);
      return payload;
    }

    payload.append("grant_type", "password");
    payload.append("username", Coopernet.user.name);
    payload.append("password", Coopernet.user.password);

    return payload;
  };
  static getClientID = async (): Promise<string> => {
    const response = await fetch(`${Coopernet.url}oauth/memo/clientId`);
    if (response.ok) return response.json();
    throw new Error("Erreur lors de la récupération du client ID");
  };

  /**
   * Appel au serveur pour créer / rafraichir le token d'authentification
   * @param {boolean} toRefresh
   * true : Demande un rafraichissement du token
   * false : Demande la création d'un token
   */
  static fetchOauth = async (toRefresh: boolean) => {
    const response = await fetch(`${Coopernet.url}oauth/token`, {
      method: "POST",
      body: await Coopernet.getOauthPayload(toRefresh),
    });

    if (response.ok) {
      Coopernet.oAuthToken = await response.json();
      Coopernet.oAuthToken.expires_at =
        Date.now() + Coopernet.oAuthToken.expires_in * 1000;
      return true;
    }
    if (response.status >= 400 && response.status < 500)
      throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
    if (response.status >= 500)
      throw new Error(
        "Impossible de se connecter, veuillez réessayer plus tard."
      );
  };

  static setOAuthToken = async () => {
    if (Coopernet.oAuthToken.access_token === "") {
      return Coopernet.fetchOauth(false); // Créer une demande de création du token
    }

    if (
      Coopernet.oAuthToken.expires_at &&
      Coopernet.oAuthToken.expires_at - Date.now() < 0
    ) {
      return Coopernet.fetchOauth(true); // Créer une demande de rafraichissement du token
    }

    return true; // Pas de demande
  };

  static login = async () => {
    await Coopernet.setOAuthToken();
    const response = await fetch(`${Coopernet.url}/memo/is_logged`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      Coopernet.user.id = user["user id"];
      return Coopernet.user.id;
    }
  };

  //endregion

  //#region TABLEAU ACCUEIL

  static fetchTermsAndColumns = async (user_id?: number) => {
    console.time("fetchTermsAndColumns");
    await Coopernet.setOAuthToken();
    const response = await fetch(
      `${Coopernet.url}rest/cards${user_id ? "/" + user_id : ""}?_format=json`,
      {
        method: "GET",
        headers: {
          Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
        },
      }
    );
    console.timeEnd("fetchTermsAndColumns");
    if (response.ok) return response.json();
    throw new Error(
      `Erreur HTTP lors de la récupération des termes et colonnes. Statut: ${response.status}`
    );
  };
  static getTermsAndColumns = async (
    user_id?: number
  ): Promise<NumberOfTermInColumn[]> => {
    const sortedTerms = [];
    const datas = user_id
      ? await Coopernet.fetchTermsAndColumns(user_id)
      : await Coopernet.fetchTermsAndColumns();

    for (let i = 0; i < datas.length - 1; i++) {
      const { name, field_card_theme, field_card_column } = datas[i];
      if (
        i === 0 ||
        parseInt(field_card_theme) !== parseInt(datas[i - 1].field_card_theme)
      ) {
        sortedTerms.push({
          name,
          card_theme_id: field_card_theme,
          cols: { 17: 0, 18: 0, 19: 0, 20: 0 },
        }); // 17, 18, 19, 20 sont les id des colonnes
      }
      const index = sortedTerms.findIndex(
        (term) => parseInt(term.card_theme_id) === parseInt(field_card_theme)
      );
      sortedTerms[index].cols[field_card_column as columnIndexType]++;
    }
    return sortedTerms.filter(
      (term) =>
        term.cols["17"] !== 0 ||
        term.cols["18"] !== 0 ||
        term.cols["19"] !== 0 ||
        term.cols["20"] !== 0
    ) as NumberOfTermInColumn[];
  };

  //#endregion

  //#region TERMS ALIAS thematics

  static getThematics = async (
    userId: string = Coopernet.user.id
  ): Promise<Thematic[]> => {
    console.time("getThematics");
    await Coopernet.setOAuthToken();

    const response = await fetch(`${Coopernet.url}memo/themes/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
    });
    console.timeEnd("getThematics");

    if (response.ok) return response.json();
    throw new Error("Problème dans la récupération des thèmes");
  };

  static deleteThematic = async (id: string) => {
    await Coopernet.setOAuthToken();
    const response = await fetch(`${Coopernet.url}api/term/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          Coopernet.oAuthToken.token_type +
          " " +
          Coopernet.oAuthToken.access_token,
      },
    });
    if (!response.ok)
      throw new Error("Erreur lors de la suppression de la thématique");
  };

  static addOrEditThematic = async (
    label: string,
    ptid: number | string = 0,
    tid: number | string = 0
  ) => {
    await Coopernet.setOAuthToken();
    const response = await fetch(Coopernet.url + "memo/term?_format=json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
      body: JSON.stringify({
        label: [
          {
            value: label,
          },
        ],
        tid: [
          {
            value: tid,
          },
        ],
        ptid: [
          {
            value: ptid,
          },
        ],
      }),
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(
      "Erreur lors de l'update ou de la création d'une thématique"
    );
  };

  //#endregion

  static getUsers = async (): Promise<User[]> => {
    console.time("getUsers");
    await Coopernet.setOAuthToken();
    const response = await fetch(Coopernet.url + "memo/users/", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
    });
    if (response.ok) {
      console.timeEnd("getUsers");
      console.log("test");
      const dataArray: { uid: string; uname: string }[] = await response.json();
      return dataArray.map((dataItem) => {
        return { uname: dataItem.uname, uid: dataItem.uid };
      });
    }
    throw new Error("Erreur lors de la récupération Users");
  };
}

export default Coopernet;
