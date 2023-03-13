import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    isLoading: true,
    disabledButton: true,
    user: '',
    changePage: false,
  };

  handleUserChange = (event) => {
    const userMinLength = 3;
    const { target } = event;
    this.setState({ user: target.value });
    if (target.value.length >= userMinLength) this.setState({ disabledButton: false });
  };

  handleAPI = async () => {
    const { user } = this.state;
    this.setState({ isLoading: false });
    await createUser({ name: user });
    this.setState({ isLoading: true, changePage: true });
  };

  render() {
    const { disabledButton, user, changePage, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading
          ? (
            <form>
              <label htmlFor="login">
                Digite seu nome:
                <input
                  id="login"
                  name="login"
                  type="text"
                  value={ user }
                  onChange={ this.handleUserChange }
                  data-testid="login-name-input"
                />
              </label>
              <button
                name="button"
                onClick={ this.handleAPI }
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
