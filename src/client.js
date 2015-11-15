import 'babel-polyfill';
import 'whatwg-fetch';
import 'relative-time-element';
import ReactDOM from 'react-dom';
import { createElementWithContext } from 'fluxible-addons-react';
import application from './application';

const dehydratedState = window.App;

application.rehydrate(dehydratedState, function(error, context) {
  if (error instanceof Error) {
    throw error;
  }
  ReactDOM.render(createElementWithContext(context), document.getElementById('app'));
});
