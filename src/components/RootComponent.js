import React from 'react';

class RootComponent extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet='UTF-8'/>
          <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'/>

          <script src='//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'/>
          <title>gyazo-web-client</title>
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.markup}}/>
          <script src='//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'/>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}/>
          <script src='/bundle.js'/>
        </body>
      </html>
    );
  }
}

export default RootComponent;
