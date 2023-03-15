import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  // state = { isLoading: false, favorite: false };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.addFavoriteSong);
  };

  // addFavoriteSong = async () => {
  //   const { music } = this.props;
  //   const { favorite } = this.state;
  //   console.log(music);
  //   this.setState({ isLoading: false });
  //   await addSong(music);
  //   this.setState({ isLoading: true });
  //   console.log(addSong());
  // };

  render() {
  //   const { favorite } = this.state;
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
            name="favorite"
            // onChange={ this.handleChange }
            // checked={ favorite }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // music:
};
