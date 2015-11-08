import React from 'react';

class RootComponent extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet='UTF-8'/>
          <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'/>
          <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha/css/bootstrap.min.css'/>
          <title>gyazo-web-client</title>
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.markup}}/>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}/>
          <script src='/bundle.js'/>
        </body>
      </html>
    );
  }
}

export default RootComponent;
