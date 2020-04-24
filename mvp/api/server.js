const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { authenticator } = require('../middleware/middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticator, jokesRouter);

module.exports = server;
