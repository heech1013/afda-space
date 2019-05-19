require('dotenv').config();
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('config/config')[env];

const sequelize = new Sequelize(
  config.database, config.user, config.password, config
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Profile = require('./Profile')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.PostComment = require('./PostComment')(sequelize, Sequelize);
db.Center = require('./Center')(sequelize, Sequelize);
db.CenterComment = require('./CenterComment')(sequelize, Sequelize);
db.Station = require('./Station')(sequelize, Sequelize);
db.StationComment = require('./StationComment')(sequelize, Sequelize);
db.Diagnosis = require('./Diagnosis')(sequelize, Sequelize);
db.DiagnosisData = require('./DiagnosisData')(sequelize, Sequelize);
db.Symptom = require('./Symptom')(sequelize, Sequelize);
db.SymptomData = require('./SymptomData')(sequelize, Sequelize);
db.Medicine = require('./Medicine')(sequelize, Sequelize);
db.MedicineDosageData = require('./MedicineDosageData')(sequelize, Sequelize);
db.MedicinePurposeData = require('./MedicinePurposeData')(sequelize, Sequelize);
db.MedicineEvaluationData = require('./MedicineEvaluationData')(sequelize, Sequelize);
db.MedicineSideEffectsData = require('./MedicineSideEffectsData')(sequelize, Sequelize);

/* User:Profile = 1:1 */
db.User.hasOne(db.Profile, { as: 'CounselorProfile', foreignKey: 'fkUserId' });
db.Profile.belongsTo(db.User, { foreignKey: 'fkUserId' });

module.exports = db;