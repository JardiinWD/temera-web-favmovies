# Temera Web Favmovies

Questa web app è stata sviluppata utilizzando `Typescript` e `React`. Il suo obiettivo principale è quello di visualizzare la lista dei film più popolari effettuando chiamate ad un `API` pubblica di `MovieDB`. L'applicazione consente di visualizzare i dettagli di un film specifico e di aggiungerlo ai preferiti tramite l'utilizzo di `LocalStorage`. Nella schermata `Home` viene invece data la possibilità di trovare altri film (di solito di 8 in 8 cards) grazie alla funzionalità `infinite scroll`


## Demo

Al seguente indirizzo è possibile provare le demo del codice che ho prodotto per questa prova tecnica.

Link : ``
## Dipendenze e installazione.

Per clonare il progetto localmente.

```bash
  git clone https://github.com/JardiinWD/temera-web-favmovies
```

per navigare verso la directory

```bash
  cd temera-web-favmovies
```

Per installare tutte le dipendenze necessarie del progetto presenti nel `package.json`.

```bash
  npm install
```

Script per l'avvio dell'applicazione in modalità sviluppo

```bash
  npm run start
```
***
## Drawio e schema mentale.

Prima di iniziare a scrivere codice, ho ideato uno schema su `diagrams.net`. Con lo schema sotto mano ho potuto valutare il funzionamento della demo e, con ciò, ho intuito la gestione delle diverse parti dell'applicazione. Il link al `diagrams.net` utilizzato lo trovate qui : 

`https://app.diagrams.net/?src=about#G1L_6gbzExT1Bq4Fm_7tpkw6ia8EuJg4I8` 

Nel caso di problemi di accesso ho fornito il `.JPEG` dello schema all'interno della repository.
***
## API

In questo caso è doveroso fare una premessa. Nonostante si tratti di una API pubblica (disponibile quindi in rete) sono a conoscenza del fatto che la `API key` **non deve** in alcun modo essere **lasciata incustodita nella documentazione o all'interno di `componenti/pagine`**. Di conseguenza avrei optato per l'utilizzo di un file `.env`, non versionato grazie al file `gitignore`. Durante questa prova tecnica però ho optato per tenerla nei `componenti/pagine` per semplicità d'utilizzo.

#### Top Rated movies paginated

```http
https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec6
3d7&page=1
```

| Parametro | Type | Descrizione |
| :-------- | :------- | :------------------------- |
| `API_TOP_RATED` | `string` | **Required**. Api per i film Top Rated. |

#### Movie Details

```http
https://api.themoviedb.org/3/movie/${id}?api_key=a74169393e0da3cfbc2c58c5feec63d7
```

| Parametro | Type     | Descrizione |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id dell'item da Fetchare. |

#### Img Path iniziale

```http
https://image.tmdb.org/t/p/w500
```

| Parametro | Type     | Descrizione |
| :-------- | :------- | :-------------------------------- |
| `imgInitialPath`| `string` | **Required**. Percorso iniziali delle immagini. |


#### Struttura stato `singleMovie` e `moviesList`

| Parametro | Type     | Descrizione |
| :-------- | :------- | :-------------------------------- |
| `backdrop_path` | `string` | Immagine di sfondo |
| `id` | `number` | ID del film |
| `overview` | `string` | Trama |
| `poster_path` | `string` | Copertina |
| `release_date` | `string` | Data di rilascio |
| `title` | `string` | Titolo |
| `vote_average` | `number` | Media voti |


### roundToDecimal(rating)

Funzione per arrotondare il rating dei film.

### getOnlyMovieFullYear(date)

Function per formattare la data di ogni oggetto movieList e prendere solo l'anno d'uscita.

### singleMovieFormatDate(date)
Function per formattare la data con formato `en-GB` nella pagina FilmDetails.
***

## Scelte Progettuali

Per lo sviluppo responsive dell'applicazione è stata utilizzata la libreria `react-strap`. Reactstrap utilizza Bootstrap come base per i suoi componenti, significa che tutti i componenti di Reactstrap sono già stilizzati. Tramite poi le Media Queries e la gestione delle variabili sono stato in grado di gestire le parti responsive, fino a una width di `400px`.

***
## Struttura Progetto

#### Layout

La cartella `layout` ospita il file di layout della mia webApp. In questo file vengono richiamati il `routers` e la `navbar`. 

#### Routers

La cartella `routers` ospita il file di routing della mia webApp. 


#### Pages

La cartella `pages` ospita le diverse pagine dell'applicazione che l'utente può visualizzare.

`Favorites.tsx` : E' la pagina dove sono presenti i preferiti (presi dal `LocalStorage`).

`FilmDetails.tsx` : E' la pagina con i dettagli del singolo film.

`Home.tsx` : E' la homepage dove "atterra" l'utente la prima volta.


#### Components

La cartella `components` ospita i diversi componenti del progetto che vengono richiamati dalle `pages`. Tra questi si trovano:

`Button.tsx` : E' un componente generico che accetta diversi parametri, tra cui :

| Parametro | Type     | Descrizione |
| :-------- | :------- | :-------------------------------- |
| `text`      | `string` | Testo del button |
| `type`      | `load - add - remove` | Type del button |
| `onClick`   | `function` | Riceve una function tramite props |

Cosi facendo ho potuto eseguire un render differente in base al `type` che decidevo di passargli. ecco un esempio:

```ts
/* Se passo il button type 'load' */
if (props.type === 'load') {
    return (
        <button onClick={props.onClick} className='btn-load_more'>
            {props.text}
        </button>
    )
}
```

`Heading.tsx` : E' un componente generico (come button) che accetta diversi parametri, tra cui :

| Parametro | Type     | Descrizione |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Titolo heading |
| `type`      | `single-movie - logo-title` | Type del button |

Cosi facendo, anche qui, ho potuto eseguire un render differente in base al `type` che decidevo di passargli.

`Helmet.tsx` : E' un componente ideato per fornire all'utente un'idea di quale sia la pagina corrente che sta visualizzando, grazie al `document.title`.

`MovieList.tsx` : Questo è un componente fondamentale poiché rappresenta, nella `home` e nei `favorites` la struttura delle `cards` che visualizza l'utente.

`Navbar.tsx` : E' il componente `Navbar` presente in tutte le `pages`

#### Utils

In utils si trova il file predisposto alla formattazione dei dati fetchati nell'API (`Format.ts`). Oltre a ciò, nella cartella `src/styles` è presente anche un file `utils.scss` dove sono presenti gli elementi `:root` che mi hanno permesso di creare una buona struttura nei fogli di stile singoli e, ancora più importanti, si trovano le `@mixin` per la formattazione del `testo/buttons`
***

