module.exports = {
  "development": {
    "user": "root",
    "password": "111111",
    "database": "afda_space",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false,
    "logging": false
  },
  "production": {
    "user": process.env.RDS_USER,  // RDS master id
    "password": process.env.RDS_PASSWORD,  // RDS master password
    "database": process.env.RDS_DATABASE,  // RDS database name
    "host": process.env.RDS_HOST,  // RDS database host (endpoint)
    "port": process.env.RDS_PORT,  // RDS port
    "dialect": "mysql",
    "operatorsAliases": false,
    "logging": false
  }
}
