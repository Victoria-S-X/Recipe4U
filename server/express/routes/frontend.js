const express = require('express')
const app = require("../expressApp")
const path = require('path')
const history = require('connect-history-api-fallback')

// Support Vuejs HTML 5 history mode
app.use(history());

// Serve static assets
const root = path.normalize(__dirname + '/..')
const client = path.join(root, 'client', 'dist')
app.use(express.static(client))