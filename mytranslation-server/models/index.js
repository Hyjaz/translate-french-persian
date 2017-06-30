import Sequelize from 'sequelize'
import mydbconfig from '../config'
import Translation from './translation'

const database = mydbconfig.database;
const username = mydbconfig.username;
const password = mydbconfig.password;
const mysqldialect = mydbconfig.dialect;

const sequelize = new Sequelize(database, username, password, {
  dialect: mysqldialect,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
  }
});

sequelize.authenticate()
  .then(() => console.log('connected'))
  .catch((err) => {
    console.error('Error: ', err.message);
  })
  .done();

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
  unhandledRejections.set(p, reason);
});

const db = {
  Translation: sequelize.import('./translation'),
};

db.sequelize = sequelize;

export default db;