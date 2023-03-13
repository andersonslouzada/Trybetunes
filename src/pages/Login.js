import { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <label htmlFor="login">
          Digite seu nome:
          <input name="login" type="text" data-testid="login-name-input" />
          <button onClick={ createUser } data-testid="login-submit-button">Entrar</button>
        </label>
      </div>
    );
  }
}
