module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Biruk@123",
  DB: "gebeya",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
