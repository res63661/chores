/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.config({
    path: path.join(__dirname, '../.env'),
    example: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: 'no-reply@chore-db-2.com',
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  },
  test: { },
  development: {
    mongo: {
      //uri: 'mongodb://localhost/chore-db-2-dev',
      uri: 'mongodb://user1:overLord8@ds051833.mlab.com:51833/chore-db-2-dev-cloud?connectTimeoutMS=10000&authSource=chore-db-2-dev-cloud&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=chore+db+dev+CLOUD&3t.databases=chore-db-2-dev-cloud',
      options: {
        debug: true,
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/chore-db-2'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
