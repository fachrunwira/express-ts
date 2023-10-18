#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app } from "../main"
import http from "http";
import debug from "debug"
import 'dotenv/config'

/**
 * Get port from environment and store in Express.
 */

function normalizePort(port: number | string) {

  let val = (typeof port === 'string') ? parseInt(port, 10) : port

  if (isNaN(val)) {
    return port
  }

  if (val >= 0) {
    return val
  }

  return false
}

const port = normalizePort( process.env.PORT || 3000)

/**
 * Create Http Server.
 */

const server = http.createServer(app)

server.listen(port)
server.on("error", (err: any) => {
  if (err.syscall !== "listen") {
    throw err;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle spesific listen errors with friendly messages
  switch (err.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(`${bind} is already in use!`);
      process.exit(1);
      break;

    default: throw err
      break;
  }
})
server.on("listening", () => {
  let addr = server.address()
  let bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr

  debug('Listening on' + bind)
})