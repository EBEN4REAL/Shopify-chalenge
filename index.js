 (function () {
    document.querySelector(".search-movies").addEventListener('input', (e) => {
        console.log(e.target.value)
        document.querySelector(".search_text").textContent = e.target.value
        const getMovies = async () => {
            const response = await  fetch(`https://www.omdbapi.com/?s=${e.target.value}&apikey=4a3b711b`)
            .then(response => {
              return response.json();
            })
            .then(jsonResponse => {
                if(jsonResponse.Response == 'True') {
                    jsonResponse.Search.forEach(el => {
                        el.nominated = false
                    })
                    document.querySelector('.movies-list').innerHTML = '';
                    let parentDiv = document.createElement('div')
                    parentDiv.classList.add('movie__list')
                    jsonResponse.Search.forEach(el => {
                        let results_wrapper = document.createElement('div')
                        results_wrapper.classList.add('results_wrapper') 
                        results_wrapper.classList.add('mt-2')
                        results_wrapper.classList.add('mb-3')
                        let movie_title  = document.createElement('div')
                        movie_title.classList.add('movie_title')
                        let movie_header = document.createElement('h5')
                        movie_title.append(movie_header)
                        movie_header.innerHTML = `${el.Title} (${el.Year})`
                        let search_action  = document.createElement('div')
                        search_action.classList.add('search_action')
                        let nominate_button = document.createElement('button')
                        nominate_button.textContent = `${!el.nominated ? 'Nominate' : "Nominated"} `
                        search_action.append(nominate_button)

                        results_wrapper.append(movie_title, search_action)
                        parentDiv.appendChild(results_wrapper)
                        document.querySelector('.movies-list').append(parentDiv)
                    })
                }else {
                    document.querySelector('.movies-list').innerHTML = '';
                }
            });
        }
       getMovies()
    })
 })()



