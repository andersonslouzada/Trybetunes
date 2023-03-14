import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { albumImg, albumName, artistName, collectionId } = this.props;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div>
            <img
              src={ albumImg }
              alt={ `${artistName} ${albumName}` }
            />
            <span>{ albumName }</span>
            <span>{ artistName }</span>
          </div>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  albumImg: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
