import serialize from 'serialize-javascript';
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { navigateAction } from 'fluxible-router';
import { createElementWithContext } from 'fluxible-addons-react';
import application from './application';
import RootComponent from './components/RootComponent';

let server = new Koa();

server.use(convert(serve(`${__dirname}/../public`)));

server.use(async (ctx, next) => {
  let context = application.createContext();
  await context.executeAction(navigateAction, {
    url: ctx.url
  });
  let html = ReactDOM.renderToStaticMarkup(React.createElement(RootComponent, {
    state: `window.App=${serialize(application.dehydrate(context))};`,
    markup: ReactDOM.renderToString(createElementWithContext(context)),
    context: context.getComponentContext()
  }));
  ctx.body = `<!DOCTYPE html>\n${html}`;
});

export default server;
