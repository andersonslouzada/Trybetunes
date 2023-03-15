import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = { isLoading: true, checked: false /* favoritedSongs: [] */ };

  async componentDidMount() {
    const { song } = this.props;
    this.setState({ isLoading: false });
    const favoriteSongs = await getFavoriteSongs();
    if (favoriteSongs.some((music) => music.trackId === song.trackId)) {
      this.setState({ checked: true, isLoading: true });
    } else {
      this.setState({ isLoading: true });
    }
    // this.setState({ favoritedSongs: favoriteSongs });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      { [name]: value },
      () => this.favoriteSong(),
    );
  };

  favoriteSong = async () => {
    const { song } = this.props;
    const { checked } = this.state;
    if (checked) {
      this.setState({ isLoading: false });
      await addSong(song);
      this.setState({ isLoading: true });
    }
  };

  // removeFavoriteSong = async () => {
  //   const { music } = this.props;
  //   const { checked } = this.state;
  //   if (checked === true) {
  //     this.setState({ isLoading: false });
  //     await removeSong(music);
  //     this.setState({ isLoading: true });
  //   }
  // };

  render() {
    const { checked, isLoading } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label>
          <input
            type="checkbox"
            name="checked"
            onChange={ this.handleChange }
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
        {!isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.shape().isRequired,
};
