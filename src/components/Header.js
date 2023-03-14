import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    isLoading: false,
    recoveredUser: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false, recoveredUser: user.name });
  }

  render() {
    const { isLoading, recoveredUser } = this.state;
    return (
      <header data-testid="header-component">
        { !isLoading
          ? <p data-testid="header-user-name">{recoveredUser}</p>
          : <Loading />}
      </header>
    );
  }
}
