import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    isLoading: false,
    user: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false, user: user.name });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        { !isLoading ? <p data-testid="header-user-name">{user}</p> : <Loading />}
      </header>
    );
  }
}
