const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'db4free.net',
    user: env.DB_USER || 'alanmorataya',
    password: env.DB_PASSWORD || '199715alan',
    database: env.DB_NAME || 'alanprueb_flowin',
  },
};


module.exports = config;