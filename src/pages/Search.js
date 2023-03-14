import { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Card from '../components/Card';

export default class Search extends Component {
  state = {
    searchInput: '',
    disabledButton: true,
    albumList: [],
    artist: '',
    isLoading: false,
    checkAlbum: true,
  };

  handleChange = ({ name, value }) => {
    const searchMinLength = 2;
    this.setState({ [name]: value });
    if (value.length >= searchMinLength) this.setState({ disabledButton: false });
    else (this.setState({ disabledButton: true }));
  };

  handleSearchAPI = async () => {
    const { searchInput } = this.state;
    const nameArtist = searchInput;
    this.setState({ artist: searchInput, searchInput: '', isLoading: true });
    const data = await searchAlbumsAPI(nameArtist);
    this.setState({ albumList: data, isLoading: false, checkAlbum: false });
    console.log(data);
  };

  render() {
    const {
      searchInput, disabledButton, isLoading, albumList, artist, checkAlbum,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { !isLoading
          ? (
            <form>
              <input
                name="searchInput"
                value={ searchInput }
                onChange={ ({ target }) => this.handleChange(target) }
                placeholder="artista ou banda"
                data-testid="search-artist-input"
              />
              <button
                type="button"
                disabled={ disabledButton }
                data-testid="search-artist-button"
                onClick={ this.handleSearchAPI }
              >
                Pesquisar
              </button>
            </form>
          )
          : <Loading /> }
        <div>
          { albumList.length === 0
          && !checkAlbum
          && <p>Nenhum álbum foi encontrado</p> }
          { albumList.length > 0 && <p>{`Resultado de álbuns de: ${artist}`}</p> }
          { albumList.map((element) => (
            <Card
              key={ element.collectionId }
              albumImg={ element.artworkUrl100 }
              collectionId={ element.collectionId }
              artistName={ element.artistName }
              albumName={ element.collectionName }

            />

          ))}

        </div>
      </div>
    );
  }
}
