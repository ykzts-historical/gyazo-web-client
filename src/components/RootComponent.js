import { env } from 'process';
import React from 'react';
import manifest from '../../public/manifest';

const DEBUG = env.NODE_ENV !== 'production';

class RootComponent extends React.Component {
  render() {
    console.log(env);
    return (
      <html>
        <head>
          <meta charSet='UTF-8'/>
          <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'/>
          <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha/css/bootstrap.min.css'/>
          <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'/>
          <title>gyazo-web-client</title>
        </head>
        <body style={{paddingTop: '70px'}}>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.markup}}/>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}/>
          <script src={`/${DEBUG ? 'bundle.js' : manifest['bundle.js']}`}/>
        </body>
      </html>
    );
  }
}

export default RootComponent;
