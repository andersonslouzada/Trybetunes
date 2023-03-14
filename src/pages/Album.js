import { Component } from 'react';
import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  // componentDidMount() {
  //   this.getMusics();
  // }

  // getMusics = async () => {
  //   console.log(this.props);
  //   const musics = await getMusics();
  //   console.log(musics);
  // };

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album:</p>
      </div>
    );
  }
}
