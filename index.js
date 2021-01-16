 (function searchMovies () {
    document.querySelector(".search-movies").addEventListener('input', (e) => {
        document.querySelector(".search_text").textContent = e.target.value
        const getMovies = async () => {
            const response = await  fetch(`https://www.omdbapi.com/?s=${e.target.value}&apikey=4a3b711b`)
            .then(response => {
              return response.json();
            })
            .then(jsonResponse => {

            });
            return response
        }
        let movies = getMovies()
        return movies
    })
 })()


 console.log(searchMovies)

