import moment from 'moment';
import React from 'react';

class ImageCardComponent extends React.Component {
  static propTypes = {
    uri: React.PropTypes.string.isRequired,
    uploadedAt: React.PropTypes.string.isRequired
  };

  handleClick(event) {
    event.preventDefault();
    return false;
  }

  render() {
    return (
      <div className='ImageCardComponent'>
        <div className='card'>
          <button aria-label='close' className='close' onClick={::this.handleClick} style={{ position: 'absolute', right: '-17px', top: '-12px' }} type='button'>
            <span aria-hidden='true'>&times;</span>
          </button>
          <a href={this.props.uri}>
            <img className='card-image-top img-responsive' src={this.props.uri}/>
          </a>
          <div className='card-block hidden-xs-down'>
            <a href={this.props.uri} style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>{this.props.uri}</a>
          </div>
          <footer className='card-footer text-muted text-right'>
            <span className='uploaded-at'>
              <time dateTime={this.props.uploadedAt}>{moment(this.props.uploadedAt).fromNow()}</time>
            </span>
          </footer>
        </div>
      </div>
    );
  }
}

export default ImageCardComponent;
