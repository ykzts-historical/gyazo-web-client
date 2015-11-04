import fs from 'fs';
import http from 'http';
import serialize from 'serialize-javascript';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { navigateAction } from 'fluxible-router';
import { createElementWithContext } from 'fluxible-addons-react';
import application from './application';
import RootComponent from './components/RootComponent';

class Server extends http.Server {
  constructor(requestListener) {
    super(requestListener);
    this.staticFileDirectory = `${__dirname}/../public`;
    this.on('request', this.handleRequest);
  }

  handleRequest(request, response) {
    return this.serveStaticFile(request, response, () => {
      return this.executeApplication(request, response, () => {
        return this.handleError(request, response);
      });
    });
  }

  handleError(request, response) {
    response.writeHeader(404, {
      'Content-type': 'text/plain'
    });
    response.write('not found.\n');
    response.end();
  }

  serveStaticFile(request, response, callback) {
    let absolutePath = `${this.staticFileDirectory}${request.url}`;
    fs.readFile(absolutePath, function(error, data) {
      if (error instanceof Error) {
        return callback(request, response);
      }
      response.writeHeader(200, {
        'Content-type': {
          'favcion.ico': 'image/x-icon',
          '/bundle.js': 'application/javascript'
        }[request.url]
      });
      response.write(data);
      return response.end();
    });
  }

  executeApplication(request, response, callback) {
    let context = application.createContext();

    context.executeAction(navigateAction, {
      url: request.url
    }, function(error) {
      if (error instanceof Error) {
        callback(request, response);
        return;
      }
      let html = ReactDOM.renderToStaticMarkup(React.createElement(RootComponent, {
        state: `window.App=${serialize(application.dehydrate(context))};`,
        markup: ReactDOM.renderToString(createElementWithContext(context)),
        context: context.getComponentContext()
      }));
      response.writeHeader(200, {
        'Content-type': 'text/html'
      });
      response.write('<!DOCTYPE html>\n');
      response.write(html);
      response.end();
    });
  }
}

export default Server;
