Utilisation de React, React router 6.9, Tailwind-css et Typescript

├── node_modules  
├── [public](public)  
├── [src](src)  
│ ├── [components](src%2Fcomponents)  
│ │ ├── [Column](src%2Fcomponents%2FColumn) // Tout ce qui est en lien avec les colonnes de thème  
│ │ │ ├── [Card.tsx](src%2Fcomponents%2FColumn%2FCard.tsx) // Affiche une carte avec question, réponse...  
│ │ │ ├── [CardForm.tsx](src%2Fcomponents%2FColumn%2FCardForm.tsx) // Affiche un formulaire en forme de carte afin d'en
créer une.  
│ │ │ └── [Column.tsx](src%2Fcomponents%2FColumn%2FColumn.tsx) // Affiche les colonnes d'un thème avec les cartes
dessous  
│ │ ├── [DataList](src%2Fcomponents%2FDataList)  
│ │ │ └── [DataList.tsx](src%2Fcomponents%2FDataList%2FDataList.tsx) // Affiche une liste de données ex : thèmes  
│ │ ├── [InlineAddThematic](src%2Fcomponents%2FInlineAddThematic)  
│ │ │ └── [InlineAddThematic.tsx](src%2Fcomponents%2FInlineAddThematic%2FInlineAddThematic.tsx) // Affiche un formulaire
de création de thème dans le side menu  
│ │ ├── [SideMenu](src%2Fcomponents%2FSideMenu) // Tout ce qui est en lien avec les colonnes de thème  
│ │ │ ├── [Nav](src%2Fcomponents%2FSideMenu%2FNav)  
│ │ │ │ ├── [ActionButtonGroup.tsx](src%2Fcomponents%2FSideMenu%2FNav%2FActionButtonGroup.tsx) // Groupe de boutons pour
supprimer ou modifier des cartes et thèmes  
│ │ │ │ ├── [Button.tsx](src%2Fcomponents%2FSideMenu%2FNav%2FButton.tsx) // Bouton lien pour la navigation  
│ │ │ │ ├── [Container.tsx](src%2Fcomponents%2FSideMenu%2FNav%2FContainer.tsx) // conteneur contenant le formulaire de
filtre et la liste de boutons  
│ │ │ │ ├── [List.tsx](src%2Fcomponents%2FSideMenu%2FNav%2FList.tsx) Liste de boutons  
│ │ │ ├── [SideMenu.tsx](src%2Fcomponents%2FSideMenu%2FSideMenu.tsx) // Tout le side menu sans la navigation entre
thèmes et utilisateurs  
│ │ └── [ThematicTable](src%2Fcomponents%2FThematicTable) //Tableau qui affiche le nombre de cartes par colonne par
thème  
│ ├── [hooks](src%2Fhooks) // Hooks personnalisés  
│ ├── [interfaces](src%2Finterfaces) // Interfaces typescript  
│ ├── [layout](src%2Flayout) // Conteneurs pour les pages  
│ ├── [pages](src%2Fpages) // Les pages crées via par des composants  
│ ├── [router](src%2Frouter)  
│ ├── [routes](src%2Froutes) // Action et loader  
│ ├── [services](src%2Fservices) // Contient les fonctions pour fetcher les données du serveur  
│ ├── [index.css](src%2Findex.css)  
│ ├── [index.tsx](src%2Findex.tsx)  
│ └── [react-app-env.d.ts](src%2Freact-app-env.d.ts)  
├── [.gitignore](.gitignore)  
├── [package.json](package.json)  
├── [package-lock.json](package-lock.json)  
├── [README.md](README.md)  
└── [tailwind.config.js](tailwind.config.js)

## 1. index.tsx

Rend le composant App.tsx dans le DOM

## 2. App.tsx

Ce fichier sert de routeur.

On utilise `createBrowserRouter` afin de créer un routeur.
Et on utilise `createRoutesFromElements` pour formater le routeur en élément TSX.

Toutes les routes contiennent un path.

Certaines routes contiennent un element et un loader, ce sont des routes qui vont afficher du contenu.
Le loader permet de charger des données avant l'affichage de l'élément.

D'autres vont contenir une action, ces routes-ci vont servir d'action pour nos formulaires.

Rappel :

| Vocabulaire |                                                  Explication                                                   |
|:-----------:|:--------------------------------------------------------------------------------------------------------------:|
|    path     |                                         Url pour accéder à cette route                                         |
|   element   |                                      Élément TSX permettant un affichage                                       |
|   loader    |                             Permet de charger des données via une fonction (fetch)                             |
|   action    | On fait appel à ces routes via nos formulaires afin d'effectuer des actions (suppression, ajout, modification) |

```tsx
<Route path="/" element={<Layout/>} loader={thematicLoader}>
    <Route index element={<Dashboard/>} loader={dashboardLoader}/>

    <Route path="/thematics" action={thematicAction}>
        <Route path=":thematicId" action={thematicAction}>
            <Route
                path="edit"
                element={<ThematicForm/>}
                loader={flatArrayLoader}
            />
        </Route>
    </Route>

    <Route path="/cards" action={cardAction}>
        <Route path=":cardId" action={cardAction}/>
    </Route>

    <Route
        path="/users"
        element={<DataList title={"Autres utilisateurs"}/>}
        loader={userLoader}
    />

    <Route
        path={`/users/:userId/thematics`}
        element={<DataList title={"Liste de Thématiques"}/>}
        loader={flatArrayLoader}
    />

    <Route
        path={`/users/:userId/thematics/:thematicId`}
        element={<ThematicColumns/>}
        loader={columnLoader}
    />
</Route>
<Route path="/login" element={<Login/>} loader={loginLoader}/>
```

|                                PATH                                |      ELEMENT      |                                                                  DESCRIPTION ELEMENT                                                                  |                                                                                                                  LOADER                                                                                                                  |                                     ACTION                                     |
|:------------------------------------------------------------------:|:-----------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------:|
|                                `/`                                 |     `Layout`      | L'élément TSX `Layout` crée le side menu <br/>et un espace qui permet d'afficher l'élément d'un enfant via l'élément `Outlet` fourni par React-Router | le `thematicLoader` permet de charger thèmes de l'utilisateur afin des les afficher dans le side menu.<br/> Comme tout Loader, je vérifie aussi si l'utilisateur est connecté et s'il l'est pas, je le renvoie vers la page de connexion |                                                                                |
|                              `/login`                              |      `Login`      |                                                          Affiche le formulaire de connexion                                                           |                                                                               Vérifie si l'utilisateur est connecté. Si oui, le renvoie vers le dashboard                                                                                |                                                                                |
| `index` permet d'utiliser la route de parent donc son path est `/` |    `Dashboard`    |                                         Affiche un tableau contenant le nombre de carte par colonne par thème                                         |                                                                            Le `dashboardLoader` récupère le nombre de cartes de chaque colonne par thématique                                                                            |                                                                                |
|                            `/thematics`                            |                   |                                                                                                                                                       |                                                                                                                                                                                                                                          |         Ce path + l'action thematicAction permettent de créer un thème         |
|                      `/thematics/:thematicId`                      |                   |                                                                                                                                                       |                                                                                                                                                                                                                                          | Ce path + l'action thematicAction permettent de modifier ou supprimer un thème |
|                   `/thematics/:thematicId/edit`                    |  `ThematicForm`   |                                                     Affiche un formulaire pour modifier un thème                                                      |                                                                             `flatArrayLoader` récupère la liste des thèmes et la formate sur un seul niveau                                                                              |                                                                                |
|                              `/cards`                              |                   |                                                                                                                                                       |                                                                                                                                                                                                                                          |          Ce path + l'action cardAction permettent de créer une carte           |
|                          `/cards/:cardId`                          |                   |                                                                                                                                                       |                                                                                                                                                                                                                                          |  Ce path + l'action cardAction permettent de modifier ou supprimer une carte   |
|                              `/users`                              |    `DataList`     |                                                             Affiche une liste de données                                                              |                                                                                              `userLoader` récupère la liste des utilisateur                                                                                              |                                                                                |
|                     `/users/:userId/thematics`                     |    `DataList`     |                                                             Affiche une liste de données                                                              |                                                                             `flatArrayLoader` récupère la liste des thèmes et la formate sur un seul niveau                                                                              |                                                                                |
|               `/users/:userId/thematics/:thematicId`               | `ThematicColumns` |                                                       Affiche les colonnes de carte d'un thème                                                        |                                                                                            `columnLoader` récupère les colonnes et les cartes                                                                                            |                                                                                |

## Hooks utilisés

`useLocation` :
Lors de la création d'un lien, on peut lui passer des données dans la propriété `state`, ce hook permet de le récupérer

```tsx
// Dans ActionButtonGroup.tsx
<Link
    to={`/thematics/${data.id}/edit`}
    state={{data: data}}
    title="Modifier la thématique"
    className="rounded p-1 text-green-600 hover:bg-green-200"
    onClick={hideSideBar}
>
    <AiFillEdit/>
</Link>;

// Dans ThematicForm.tsx
const location = useLocation();
const currentThematic: Thematic = location.state?.data;
```

`useLoaderDate` :
Ce hook permet de récupérer les données associées à l'élément

```tsx
const thematics = useLoaderData() as Thematic[];
```

`useParams` :
Retourne un objet clé/valeur des paramètres de l'url actuel

`useFetcher`:
renvoie un objet permettant d'interagir avec React-Router sans changer d'url.

`fetcher.form` : Permet d'appeler une action   
`fetcher.data` : Récupère la valeur de l'action   
`fetcher.state` :
- idle - nothing is being fetched.
- submitting - A route action is being called due to a fetcher submission using POST, PUT, PATCH, or DELETE
- loading - The fetcher is calling a loader (from a fetcher.load) or is being revalidated after a separate submission or
  useRevalidator call

Exemple :

```tsx
const fetcher = useFetcher();
<fetcher.Form
    method="get"
    action="users" //url de l'action
    className="flex items-center justify-between"
>
    <button
        className={`text-lg font-bold ${
            fetcher.state === "loading" ? "text-blue-500" : "text-blue-900"
        }`}
    >
        {fetcher.state === "loading" ? "Chargement..." : "Charger les utilisateurs"}
    </button>
</fetcher.Form>;
```
