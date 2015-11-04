#!/bin/node/env node

import { env } from 'process';
import Server from '../src/server';

let server = new Server();
let port = env.PORT || 8080;
server.listen(port);
