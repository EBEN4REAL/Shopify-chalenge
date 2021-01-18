this.state = {
    movies: [],
    nominatedMovies: []
};

function processMovies() {
    document.querySelector(".search-movies").addEventListener('input', (e) => {
        document.querySelector(".search_text").textContent = e.target.value
        const getMovies = async () => {
            const response = await  fetch(`https://www.omdbapi.com/?s=${e.target.value}&apikey=4a3b711b`)
            .then(response => {
              return response.json();
            })
            .then(movies => {
                console.log(movies.Search)
                this.state.movies = movies.Search
                if(movies.Response == 'True') {
                    movies.Search.forEach(el => {
                        el.nominated = false
                    })
                    document.querySelector('.movies-list').innerHTML = '';
                    document.querySelector('.nominations-list').innerHTML = '';
                    let parentDiv = document.createElement('div')
                    let nominationParentDiv = document.createElement('div')
                    const renderMovies = movies => {
                        this.state.movies.forEach(el => {
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
                            nominate_button.classList.add('nominate-movie')
                            nominate_button.setAttribute('data-imdb' , el.imdbID)
                            nominate_button.textContent = `${!el.nominated ? 'Nominate' : "Nominated"} `
                            nominate_button.addEventListener('click', (e) => {
                                let nominatedMovie = this.state.nominatedMovies.findIndex(mv => mv.imdbID === el.imdbID) 
                                if(nominatedMovie === -1) {
                                    this.state.nominatedMovies.push(el)
                                    e.target.classList.add('disabled-button')
                                    this.getNominatedMovies(this.state.nominatedMovies)
                                }
                                console.log(this.state.nominatedMovies)
                            })
                            search_action.append(nominate_button)
                            results_wrapper.append(movie_title, search_action)
                            parentDiv.appendChild(results_wrapper)
                            document.querySelector('.movies-list').append(parentDiv)
                        })
                        this.state.movies = movies.Search
                    }
                    this.getNominatedMovies = (data) => {
                        console.log(data)
                        data.forEach(nominatedMovie => {
                            console.log(nominatedMovie)
                            let results__wrapper = document.createElement('div')
                            results__wrapper.classList.add('results__wrapper') 
                            results__wrapper.classList.add('mt-2')
                            results__wrapper.classList.add('mb-3')
                            results__wrapper.setAttribute('id', nominatedMovie.imdbID)
                            let movie__title  = document.createElement('div')
                            movie__title.classList.add('movie__title')
                            let movie__header = document.createElement('h5')
                            movie__title.append(movie__header)
                            movie__header.innerHTML = `${nominatedMovie.Title} (${nominatedMovie.Year})`
                            let search__action  = document.createElement('div')
                            search__action.classList.add('search__action')
                            let nominate__button = document.createElement('button')
                            nominate__button.classList.add('remove')
                            nominate__button.classList.add('nominate__movie')
                            nominate__button.textContent = `Remove`
                          

                            nominate__button.addEventListener('click', (e) => {
                                let nominatedMov = this.state.nominatedMovies.findIndex(mv => mv.imdbID === nominatedMovie.imdbID) 
                                this.state.nominatedMovies.splice(nominatedMov, 1)
                                console.log(this.state.nominatedMovies)
                            })

                            search__action.append(nominate__button)
                            results__wrapper.append(movie__title, search__action)
                            nominationParentDiv.appendChild(results__wrapper)
                            console.log(nominationParentDiv)
                            document.querySelector('.nominations-list').append(nominationParentDiv)
                        })
                    }
                    renderMovies(this.state.movies)
                }else {
                    document.querySelector('.movies-list').innerHTML = '';
                    document.querySelector('.nominations-list').innerHTML = '';
                }
            });
        }
       getMovies()
    })
 }

processMovies()