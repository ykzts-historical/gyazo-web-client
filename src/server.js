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
import handleErrorAction from './actions/handleErrorAction';

let server = new Koa();

server.use(convert(serve(`${__dirname}/../public`)));

server.use(async (ctx, next) => {
  ctx.context = application.createContext();
  await next();
  let html = ReactDOM.renderToStaticMarkup(React.createElement(RootComponent, {
    state: `window.App=${serialize(application.dehydrate(ctx.context))};`,
    markup: ReactDOM.renderToString(createElementWithContext(ctx.context)),
    context: ctx.context.getComponentContext()
  }));
  ctx.body = `<!DOCTYPE html>\n${html}`;
});

server.use(async (ctx, next) => {
  try {
    await ctx.context.executeAction(navigateAction, {
      url: ctx.url
    });
  } catch (error) {
    let statusCode = error.statusCode || 500;
    await ctx.context.executeAction(handleErrorAction, {
      message: error.message
    });
    ctx.status = statusCode;
  }
});

export default server;
