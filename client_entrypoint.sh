#!/usr/bin/env sh
bash
cd client
chown node:node -R .
npm install
npm start
