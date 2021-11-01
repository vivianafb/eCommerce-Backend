// Update with your config settings.

module.exports = {
    production: {
      client: 'sqlite3',
      connection: { filename: './mySqlite' },
      useNullAsDefault: true,
      migrations: {
        directory: __dirname + '/db/migrations',
      },
      seeds: {
        directory: __dirname + '/db/seeds',
      },
    },
    
    development: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'entregable17',
      },
      migrations: {
        directory: __dirname + '/db/migrations',
      },
      seeds: {
        directory: __dirname + '/db/seeds',
      },
    },

   
  };
  