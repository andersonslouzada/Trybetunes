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
    const [albumInfo, ...musics] = await getMusics(id);
    this.setState({ musicList: musics, isLoading: true, infoAlbum: albumInfo });
  };

  render() {
    const { musicList, isLoading,
      infoAlbum: { artistName, collectionName } } = this.state;
    // console.log(infoAlbum);
    // console.log(musicList);
    return (
      <div data-testid="page-album">
        <Header />
        { !isLoading && <Loading /> }
        <div>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
          {(musicList.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              music={ music }
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
