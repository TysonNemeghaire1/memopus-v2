import NumberOfTermInColumn from "../interfaces/NumberOfTermInColumn";
import columnIndexType from "../interfaces/ColumnIndex";
import Thematic from "../interfaces/Thematic";
import User from "../interfaces/User";
import Card from "../interfaces/Card";

interface oAuth {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  expires_at?: number;
}

class Coopernet {
  //region VARIABLES

  // La base de l'url pour les endpoints
  static url =
    process.env.NODE_ENV === "production"
      ? "https://coopernet.fr/"
      : "http://local.coopernet.my/";

  //Les données nécessaires sur l'utilisateur
  static user: { id: string; name: string; password: string } = {
    id: "",
    name: "",
    password: "",
  };

  //Les données reçues par le token d'identification
  static oAuthToken: oAuth = {
    access_token: "",
    refresh_token: "",
    token_type: "",
    expires_in: 0,
  };

  //endregion

  //region CONNEXION

  /**
   * Cette fonction renvoi un FormData contenant toutes les informations pour créer un nouveau token d'identification
   * On utilise le payload dans le body de la requête pour créer le nouveau token
   * @param {boolean} toRefresh
   * true si on veut rafraichir notre token /
   * false si on souhaite créer un token
   * @return Promise<FormData>
   */
  static getOauthPayload: (toRefresh: boolean) => Promise<FormData> = async (
    toRefresh: boolean
  ) => {
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

  /**
   * Cette fonction permet de récupérer une donnée nécessaire au payload
   * On l'utilise donc dans getOauthPayload
   */
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

  /**
   * Gère la demande de token d'authentification selon le besoin
   * Je l'utilise avant chaque appel d'api pour être sûr que l'utilisateur est connecté
   */
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

  /**
   * Fonction à utiliser lors de la connexion via formulaire
   */
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

  //#region TABLEAU DASHBOARD

  /**
   * Récupère et renvoie le nombre de cartes de chaque colonne par thématique en donnée non formatée
   * @param user_id
   */
  static fetchTermsAndColumns = async (user_id?: string) => {
    await Coopernet.setOAuthToken();
    const response = await fetch(
      `${Coopernet.url}rest/cards${user_id ? `/${user_id}` : ""}?_format=json`,
      {
        method: "GET",
        headers: {
          Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
        },
      }
    );
    if (response.ok) return response.json();
    throw new Error(
      `Erreur HTTP lors de la récupération des termes et colonnes. Statut: ${response.status}`
    );
  };

  /**
   * Récupère et renvoie le nombre de cartes de chaque colonne par thématique en donnée formatée
   * Cette fonction est à utiliser pour le tableau de la page d'accueil
   * @param user_id
   */
  static getTermsAndColumns = async (
    user_id?: string
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

  //#region TERMS ALIAS THEMATICS

  /**
   * Récupère les thèmes d'une personne
   * @param userId id de l'utilisateur
   */
  static getThematics = async (
    userId: string = Coopernet.user.id
  ): Promise<Thematic[]> => {
    await Coopernet.setOAuthToken();

    const response = await fetch(`${Coopernet.url}memo/themes/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
    });

    if (response.ok) return response.json();
    throw new Error("Problème dans la récupération des thèmes");
  };

  /**
   * Supprime un thème
   * @param id id du thème
   */
  static deleteThematic = async (id: string) => {
    await Coopernet.setOAuthToken();
    const response = await fetch(`${Coopernet.url}api/term/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
    });
    if (!response.ok)
      throw new Error("Erreur lors de la suppression de la thématique");
  };

  /**
   * Ajoute ou modifie un thème
   * @param label nom du thème
   * @param ptid id du thème parent | undefined pour créer à la racine
   * @param tid id du thème à modifier | undefined pour créer
   */
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
      return await response.json();
    }

    throw new Error(
      "Erreur lors de l'update ou de la création d'une thématique"
    );
  };

  //#endregion

  //region COLUMNS & CARDS

  /**
   * Récupère les colonnes et les cartes d'un utilisateur
   * @param thematicId
   * @param userId
   */
  static getCards = async (thematicId: string, userId = Coopernet.user.id) => {
    await Coopernet.setOAuthToken();
    const response = await fetch(
      `${Coopernet.url}memo/list_cards_term/${userId}/${thematicId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${this.oAuthToken.token_type} ${this.oAuthToken.access_token}`,
        },
      }
    );
    if (response.ok) return response.json();
    else
      throw new Error(
        "Problème lors de la récupération des cartes :  " + response.status
      );
  };

  /**
   * Supprime une carte
   * @param cardId
   */
  static deleteCard = async (cardId: string) => {
    await Coopernet.setOAuthToken();
    const response = await fetch(`${Coopernet.url}api/card/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.oAuthToken.token_type} ${this.oAuthToken.access_token}`,
      },
    });
    if (!response.ok) {
      throw new Error("La carte n'a pas été supprimée");
    }
  };

  /**
   * Ajoute une carte
   * La partie pour la photo n'est pas encore gérée
   */
  static addCard = async (card: Card, thematicId: string) => {
    await Coopernet.setOAuthToken();

    /*
                let question_file = null;
                // S'il y a un id au champ card.question_picture, c'est qu'on copie une carte sinon s'il y a juste une url, on ajoute une photo
                if (card?.question_picture?.id) question_file = await Coopernet.findImage(card.question_picture.id);
                else if (card?.question_picture?.url) question_file = await Coopernet.postImage(card.question_picture, 'question');
        
                let explanation_file = null;
                if (card.explanation_picture?.id) explanation_file = await Coopernet.findImage(card.explanation_picture.id);
                else if (card?.explanation_picture?.url) explanation_file = await Coopernet.postImage(card.explanation_picture, 'explanation');
        */

    const response = await fetch(`${Coopernet.url}api/add/card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
      body: JSON.stringify({
        title: card.question,
        field_card_question: card.question,
        field_card_answer: card.answer,
        field_card_explanation: card.explanation,
        field_card_column: card.column,
        field_card_theme: thematicId,
      }),
    });

    if (response.ok) {
      // const data = await response.json();
      /* if (question_file) {
                    // Les fonctions findImage et postImage renvoient 2 formats de données différents
                    const imageId = question_file.data?.id
                      ? question_file.data.id
                      : question_file.data[0].id;
                    await Coopernet.addImageToCard(data.uuid[0].value, imageId, "question");
                  }
            
                  if (explanation_file) {
                    const imageId = explanation_file.data?.id
                      ? explanation_file.data.id
                      : explanation_file.data[0].id;
                    await Coopernet.addImageToCard(
                      data.uuid[0].value,
                      imageId,
                      "explanation"
                    );
                  }*/
    }
  };

  //endregion

  //#region CARD IMAGE PAS ENCORE GERÉ

  /*static addImageToCard = async (card_uuid, image_uuid, inputType) => {
        console.debug('Dans addImageToCard', image_uuid)
        await Coopernet.setOAuthToken();
    
        const response = fetch(`${Coopernet.url}jsonapi/node/carte/${card_uuid}/relationships/field_card_${inputType}_picture`, {
          method: 'PATCH', headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            "Authorization": Coopernet.oAuthToken.token_type + " " + Coopernet.oAuthToken.access_token,
          }, body: JSON.stringify({
            "data": {
              "type": "file--file",
              "id": image_uuid
            }
          })
        })
        console.log((await response).status);
      }
      static deleteImageFromCard = async (card_uuid: string, inputType: string) => {
        console.debug('Dans addImageToCard')
        await Coopernet.setOAuthToken();
    
        const response = fetch(`${Coopernet.url}jsonapi/node/carte/${card_uuid}/relationships/field_card_${inputType}_picture`, {
          method: 'PATCH', headers: {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            "Authorization": Coopernet.oAuthToken.token_type + " " + Coopernet.oAuthToken.access_token,
          }, body: JSON.stringify({
            "data": null
          })
        })
        console.log((await response).status);
      }
    
      static postImage = async (image, inputField) => {
        console.debug('Dans postImage')
        await Coopernet.setOAuthToken();
    
        const infoImage = Coopernet.getFile(image.url);
        const response = await fetch(`${Coopernet.url}jsonapi/node/carte/field_card_${inputField}_picture`,
            {
              method: "POST", headers: {
                "Content-Type": 'application/octet-stream',
                "Accept": "application/vnd.api+json",
                "Content-Disposition": `file; filename="${Math.random().toString(36).replace(/[^a-z]+/g, '')}.${infoImage[1]}"`,
                "Authorization": Coopernet.oAuthToken.token_type + " " + Coopernet.oAuthToken.access_token,
              }, body: image.data.files[0]
            })
        if (response.ok) {
          return response.json();
        } else {
          console.debug('Fichier non envoyé', response.status);
        }
      }
      static getFile = (imageUrl) => {
        console.debug('imageURL', imageUrl)
        const path = imageUrl.split('\\');
        const finalPath = path[path.length - 1];
        return finalPath.split('.');
      }*/

  /* /!**
       * Fonction servant à trouver une photo via son id
       * @param id de l'image à trouver.
       * @returns {Promise<any>}
       *!/
      static findImage = async (id) => {
        const response = await fetch(`${Coopernet.url_server}jsonapi/file/file?filter[drupal_internal__fid]=${id}`)
        return await response.json();
      }*/

  //#endregion

  /**
   * Récupère la liste des utilisateurs
   */
  static getUsers = async (): Promise<User[]> => {
    await Coopernet.setOAuthToken();
    const response = await fetch(Coopernet.url + "memo/users/", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `${Coopernet.oAuthToken.token_type} ${Coopernet.oAuthToken.access_token}`,
      },
    });
    if (response.ok) {
      const dataArray: { uid: string; uname: string }[] = await response.json();
      return dataArray.map((dataItem) => {
        return { uname: dataItem.uname, uid: dataItem.uid };
      });
    }
    throw new Error("Erreur lors de la récupération Users");
  };
}

export default Coopernet;
