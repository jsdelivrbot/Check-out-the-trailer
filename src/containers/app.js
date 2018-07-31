import React, {Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import VideoDetail from '../components/video-detail'
import Video from '../components/video'
import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const SEARCH_URL = "search/movie?language=fr&include_adult=false"
const API_KEY = "api_key=60764d00ee28af8b55a226eb67c7eb64"


class App extends Component {
    constructor(props){
      super(props)
      this.state = {movieList:{}, currentMovie:{}}
    }

    // CHARGE COMPONENT AVEC FILMS LES PLUS POPULAIRES DU MOMENT
    componentWillMount() {
      this.initMovies();
    }

    // SET STATE CURRENTMOVIE AVEC LE PREMIER FILM ET SET LES 5 SUIVANTS EN STATE MOVIELIST
    initMovies(){
      axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
      .then(function(response) {
        this.setState({movieList:response.data.results.slice(1,6), 
          currentMovie:response.data.results[0]
        }, function(){
          this.applyVideoToCurrentMovie();
        });
      }.bind(this));
    }

    // RECUPERE ID MOVIE ET ID YOUTUBE STOCKÉ DANS CONST ET L'AJOUTE A LA STATE CURRENT MOVIE
    applyVideoToCurrentMovie(){
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
      .then(function(response) {
        const youtubeKey = response.data.videos.results[0].key
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey;
        this.setState({currentMovie : newCurrentMovieState})
        console.log('Video', newCurrentMovieState)
      }.bind(this));
    }

    // AU CLIC SUR LIST, ID STOCKÉ DANS PROPS
    // REMONTE AU PARENTS JUSQU'A APPS
    // L'ID PASSE EN STATE CURRENTMOVIE
    // LA LISTE DES RECOMMANDATIONS S'ACTUALISE
    onClickListItem(movie){
      this.setState({currentMovie:movie},function(){
        this.applyVideoToCurrentMovie();
      })
      this.setRecommendation();
    }

    // REQUETE POUR RECUPERER RECOMMANDATIONS EN FONCTION ID CURRENTMOVIE
    // GARDE 5 PREMIERS RESULTATS
    setRecommendation(){
      axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?&${API_KEY}&language=fr`)
      .then(function(response) {
        this.setState({movieList:response.data.results.slice(0,5)});
      }.bind(this));
    }

    // RECOIT LA PROPS DE LA BARRE DE RECHERCHE
    // VERIF SI TEXT EXISTE
    // REQUETE AXIOS POUR RECUPERER LE MOVIE
    // VERIF SI BIEN RESPONSE ET CONTIENT RESULTAT
    // VERIF SI RESULTAT EST DIFFERENT DU FILM DEJA AFFICHE
    // SI TOUT OK MISE À JOUR CURRENT MOVIE
    // ET MISE À JOUR RECOMMANDATIONS
    onClickSearch(searchText){
      if(searchText){
        axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
        .then(function(response) {
          if(response.data && response.data.results[0]){
            if(response.data.results[0].id !== this.state.currentMovie.id){
              this.setState({currentMovie: response.data.results[0]}, () => {
                this.applyVideoToCurrentMovie();
                this.setRecommendation();
              })
            }
          }
        }.bind(this));
      }
    }

    render() {
      const renderVideoList = () => {
        // CONDITION POUR RETOURNER MOVIE LIST UNE FOIS QUE LA STATE A CHARGÉ LES 5 FILMS
        // PARCE QUE REQUETE AXIOS ASYNC
        if(this.state.movieList.length>=5){
          return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)}/>
        }
      }
      return (
        <div>
          <div className="search_bar">
            <SearchBar callback={this.onClickSearch.bind(this)}/>
          </div>
          <div className="row">
            <div className="col-md-8">
              <Video videoId={this.state.currentMovie.videoId}/>
              <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
            </div>
            <div className="col-md-4">
              {renderVideoList()}
            </div>
          </div>
        </div>
    )
  }
}
  export default App;