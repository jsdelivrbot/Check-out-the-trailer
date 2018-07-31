import React, {Component} from 'react'

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText:"", 
      intervalBeforeRequest:800, 
      lockRequest: false
    }
  }
    render(){
        return (
          <div className="row">
            <div className="col-lg-8 input-group">
              <input type="text" className="form-control input-lg" onKeyUp={this.handleChange.bind(this)} placeholder="Rechercher un film..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>Go</button>
              </span>
            </div>
          </div>
        )
    }

    // A CHAQUE FRAPPE
    // SI LOCKER FALSE
    // SET LOCKER TRUE
    // SETTIMEOUT APPEL FONCTION SEARCH APRES UNE SECONDE
    handleChange(e){
      this.setState({searchText:e.target.value})
      if(!this.state.lockRequest) {
        this.setState({lockRequest:true})
        setTimeout(function(){this.search()}.bind(this),this.state.intervalBeforeRequest)
      }
    }
    
    handleOnClick(e){
      this.search()
    }

    // AU CLIC LE TEXT EST ENVOYÉ EN PROPS 
    // AU PARENT (APPS) DANS CONSTANTE NOMMÉE CALLBACK
    // REOUVRE LE LOCKER POUR PROCHAIN LANCEMENT SETTIMEOUT
    search(){
      this.props.callback(this.state.searchText)
      this.setState({lockRequest:false})
    }

}

export default SearchBar;