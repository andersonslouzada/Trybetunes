import { Component } from 'react';
import Header from '../components/Header';

export default class Favorite extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favoritas:</p>
      </div>
    );
  }
}
