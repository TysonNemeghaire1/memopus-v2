interface oAuth {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    token_type: string;
    expires_at?: number
}

class Coopernet {
    //region VARIABLES
    static url = 'https://coopernet.fr/';
    static user = {
        id: 0, name: "", password: ""
    }
    static oAuthToken: oAuth = {access_token: '', refresh_token: '', token_type: '', expires_in: 0};
    //endregion

    //region CONNEXION
    /**
     * @param {boolean} toRefresh
     * true si on veut rafraichir notre token /
     * false si on veut créer un token
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

        return payload
    }
    static getClientID = async (): Promise<string> => {
        const response = await fetch(`${Coopernet.url}oauth/memo/clientId`)
        if (response.ok) return response.json();
        throw new Error('Erreur lors de la récupération du client ID')
    }

    /**
     * Appel au serveur pour créer / rafraichir le token d'authentification
     * @param {boolean} toRefresh
     * true : Demande un rafraichissement du token
     * false : Demande la création d'un token
     */
    static fetchOauth = async (toRefresh: boolean) => {
        console.log('fetchOauth')
        const response = await fetch(`${Coopernet.url}oauth/token`, {
            method: 'POST', body: await Coopernet.getOauthPayload(toRefresh)
        });

        if (response.ok) {
            Coopernet.oAuthToken = await response.json();
            Coopernet.oAuthToken.expires_at = Date.now() + Coopernet.oAuthToken.expires_in * 1000;
            return true;
        }
        if (response.status >= 400 && response.status < 500) throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
        if (response.status >= 500) throw new Error("Impossible de se connecter, veuillez réessayer plus tard.");
    }

    static setOAuthToken = async () => {
        if (Coopernet.oAuthToken.access_token === "") {
            console.log("Créer une demande de création du token")
            return Coopernet.fetchOauth(false); // Créer une demande de création du token
        }

        if (Coopernet.oAuthToken.expires_at && Coopernet.oAuthToken.expires_at - Date.now() < 0) {
            console.log("Créer une demande de rafraichissement du token")
            return Coopernet.fetchOauth(true); // Créer une demande de rafraichissement du token
        }

        return true;
    }
    //endregion
}

export default Coopernet;