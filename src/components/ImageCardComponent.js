import React from 'react';

class ImageCardComponent extends React.Component {
  static propTypes = {
    uri: React.PropTypes.string.isRequired,
    uploadedAt: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <div className='ImageCardComponent'>
        <div className='card'>
          <a href={this.props.uri}>
            <img className='card-image-top img-responsive' src={this.props.uri}/>
          </a>
          <div className='card-block hidden-xs-down'>
            <a href={this.props.uri} style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>{this.props.uri}</a>
          </div>
          <footer className='card-footer text-muted text-right'>
            <span className='uploaded-at'>
              <time dateTime={this.props.uploadedAt} is='relative-time'>{this.props.ploadedAt}</time>
            </span>
          </footer>
        </div>
      </div>
    );
  }
}

export default ImageCardComponent;
