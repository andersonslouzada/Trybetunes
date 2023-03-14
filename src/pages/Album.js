import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    musicList: [],
    isLoading: true,
    infoAlbum: {},
  };

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: false });
    const musics = await getMusics(id);
    const informationAlbum = musics.shift();
    this.setState({ musicList: musics, isLoading: true, infoAlbum: informationAlbum });
  };

  render() {
    const { musicList, isLoading, infoAlbum } = this.state;
    // console.log(infoAlbum);
    // console.log(musicList);
    return (
      <div data-testid="page-album">
        <Header />
        { !isLoading
          && <Loading /> }
        <div>
          <h3 data-testid="artist-name">{infoAlbum.artistName}</h3>
          <h4 data-testid="album-name">{infoAlbum.collectionName}</h4>
        </div>
        <div>
          {(musicList.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          )))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
