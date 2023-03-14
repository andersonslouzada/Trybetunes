import { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchInput: '',
    disabledButton: true,
  };

  handleChange = ({ name, value }) => {
    const searchMinLength = 2;
    this.setState({ [name]: value });
    if (value.length >= searchMinLength) this.setState({ disabledButton: false });
  };

  render() {
    const { searchInput, disabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="searchInput"
            value={ searchInput }
            onChange={ ({ target }) => this.handleChange(target) }
            placeholder="Nome do álbum ou artista"
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ disabledButton }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
