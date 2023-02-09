// path corretto per le immagini del poster e del backdrop
export const imgInitialPath = 'https://image.tmdb.org/t/p/w500'

/** Function per formattare la data come richiesto nella pagina FilmDetails
 * 
 * @param {string} date La data che ricevo nel responso dell'API  
 * @returns la data con il giusto formatter richiesto
 */
export const singleMovieFormatDate = (date: string) => {
    // Salvo in una nuova costante il parametro formalizzato come Date()
    const dateObject = new Date(date);
    // Eseguo il format in base alle caratteristiche richieste
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(dateObject);
}

/** Funzione per arrotondare il rating dei film.
 * 
 * @param {number} rating Il numero del rating che deve essere arrotondato
 * @returns Il valore arrotondato da Math.Round
 */
export const roundToDecimal = (rating: number) => {
    return Math.round(rating * 10) / 10;
}

/** Function per formattare la data di ogni oggetto movieList e prendere solo l'anno d'uscita
 * 
 * @param {} date La data che ricevo nel responso dell'API 
 * @returns restituisce solo l'anno
 */
export const getOnlyMovieFullYear = (date: string) => {
    // Salvo in una nuova costante il parametro formalizzato come Date()
    const dateObject = new Date(date);
    // Eseguo return soltanto dell'anno
    return dateObject.getFullYear();
}

