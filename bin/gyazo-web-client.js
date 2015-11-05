#!/bin/node/env node

import { env } from 'process';
import server from '../src/server';

let port = env.PORT || 8080;
server.listen(port);
