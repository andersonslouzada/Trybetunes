import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    songList: [],
    isLoading: true,
    infoAlbum: {},
  };

  componentDidMount() {
    this.getMusics();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: false });
    const [albumInfo, ...songs] = await getMusics(id);
    this.setState({ songList: songs, isLoading: true, infoAlbum: albumInfo });
  };

  render() {
    const { songList, isLoading,
      infoAlbum: { artistName, collectionName } } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { !isLoading && <Loading /> }
        <div>
          <p data-testid="artist-name">{artistName}</p>
          <p data-testid="album-name">{collectionName}</p>
          {(songList.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              song={ song }
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
