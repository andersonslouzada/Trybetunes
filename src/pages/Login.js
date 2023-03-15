import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    isLoading: false,
    disabledButton: true,
    user: '',
    changePage: false,
  };

  handleChange = ({ name, value }) => {
    const userMinLength = 3;
    this.setState({ [name]: value });
    if (value.length >= userMinLength) this.setState({ disabledButton: false });
    else (this.setState({ disabledButton: true }));
  };

  handleUserAPI = async () => {
    const { user } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    this.setState({ isLoading: false, changePage: true });
  };

  render() {
    const { disabledButton, user, changePage, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { !isLoading
          ? (
            <form>
              <label htmlFor="user">
                Digite seu usuário:
                <input
                  name="user"
                  type="text"
                  value={ user }
                  onChange={ ({ target }) => this.handleChange(target) }
                  data-testid="login-name-input"
                />
              </label>
              <button
                name="button"
                onClick={ this.handleUserAPI }
                data-testid="login-submit-button"
                disabled={ disabledButton }
              >
                Entrar
              </button>
            </form>)
          : <Loading />}
        { changePage && <Redirect to="/search" /> }
      </div>
    );
  }
}
