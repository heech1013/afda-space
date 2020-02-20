require('dotenv').config();
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

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
db.MedicineData = require('./MedicineData')(sequelize, Sequelize);
db.MedicineDosageData = require('./MedicineDosageData')(sequelize, Sequelize);
db.ReasonOfStop = require('./ReasonOfStop')(sequelize, Sequelize);
db.MedicinePurposeData = require('./MedicinePurposeData')(sequelize, Sequelize);
db.MedicineEvaluationData = require('./MedicineEvaluationData')(sequelize, Sequelize);
db.MedicineSideEffectsData = require('./MedicineSideEffectsData')(sequelize, Sequelize);

/* User:Profile = 1:1 */
db.User.hasOne(db.Profile, { foreignKey: 'fkUserId' });
db.Profile.belongsTo(db.User, { foreignKey: 'fkUserId' });
/* (Follow) User:User = N:M */
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });

/* User:Post = 1:N */
db.User.hasMany(db.Post, { foreignKey: 'fkUserId' });
db.Post.belongsTo(db.User, { foreignKey: 'fkUserId' });
/* Post:PostComment = 1:N */
db.Post.hasMany(db.PostComment, { foreignKey: 'fkPostId' });
db.PostComment.belongsTo(db.Post, { foreignKey: 'fkPostId' });
/* User:PostComment = 1:N */
db.User.hasMany(db.PostComment, { foreignKey: 'fkUserId' });
db.PostComment.belongsTo(db.User, { foreignKey: 'fkUserId' });
/* (PostBadge) User:Post = N:M */
db.User.belongsToMany(db.Post, { through: 'PostBadge', as: '', foreignKey: '' });
db.Post.belongsToMany(db.User, { through: 'PostBadge', as: '', foreignKey: '' });

/* User:Center = 1:N */
db.User.hasMany(db.Center, { foreignKey: 'fkUserId' });
db.Center.belongsTo(db.User, { foreignKey: 'fkUserId' });
/* User:CenterComment = 1:N */
db.User.hasMany(db.CenterComment, { foreignKey: 'fkUserId' });
db.CenterComment.belongsTo(db.User, { foreignKey: 'fkUserId' });
/* Center:CenterComment = 1:N */
db.Center.hasMany(db.CenterComment, { foreignKey: 'fkCenterId' });
db.CenterComment.belongsTo(db.Center, { foreignKey: 'fkCenterId' });
/* (CenterBadge) User:CenterBadge = N:M */
db.User.belongsToMany(db.Center, { through: 'CenterBadge', as: '', foreignKey: '' });
db.Center.belongsToMany(db.User, { through: 'CenterBadge', as: '', foreignKey: '' });

/* User:Station = 1:N */
db.User.hasMany(db.Station, { foreignKey: 'fkUserId' });
db.Station.belongsTo(db.User, { foreignKey: 'fkUserId' });
/* User:StationComment = 1:N */
db.User.hasMany(db.StationComment, { foreignKey: 'fkUserId' });
db.StationComment.belongsTo(db.User, { foreignKey: 'fkUserId' });
/* Station:StationComment = 1:N */
db.Station.hasMany(db.StationComment, { foreignKey: 'fkStationId' });
db.StationComment.belongsTo(db.Station, { foreignKey: 'fkStationId' });
/* (StationBadge) User:StationBadge = N:M */
db.User.belongsToMany(db.Station, { through: 'StationBadge', as: '', foreignKey: '' });
db.Station.belongsToMany(db.User, { through: 'StationBadge', as: '', foreignKey: '' });

/* Diagnosis:DiagnosisData = 1:N */
db.Diagnosis.hasMany(db.DiagnosisData, { foreignKey: 'fkDiagnosisId' });
db.DiagnosisData.belongsTo(db.Diagnosis, { foreignKey: 'fkDiagnosisId' });
/* User:DiagnosisData = 1:N */
db.User.hasMany(db.DiagnosisData, { foreignKey: 'fkUserId' });
db.DiagnosisData.belongsTo(db.User, { foreignKey: 'fkUserId' });

/* Symptom:SymptomData = 1:N */
db.Symptom.hasMany(db.SymptomData, { foreignKey: 'fkSymptomId' });
db.SymptomData.belongsTo(db.Symptom, { foreignKey: 'fkSymptomId' });
/* User:SymptomData = 1:N */
db.User.hasMany(db.SymptomData, { foreignKey: 'fkUserId' });
db.SymptomData.belongsTo(db.User, { foreignKey: 'fkUserId' });

/* Medicine:MedicineData = 1:N */
db.Medicine.hasMany(db.MedicineData, { foreignKey: 'fkMedicineId' });
db.MedicineData.belongsTo(db.Medicine, { foreignKey: 'fkMedicineId' });
/* User:MedicineData = 1:N */
db.User.hasMany(db.MedicineData, { foreignKey: 'fkUserId' });
db.MedicineData.belongsTo(db.User, { foreignKey: 'fkUserId' });

/* Medicine:MedicineDosageData = 1:N */
db.Medicine.hasMany(db.MedicineDosageData, { foreignKey: 'fkMedicineId' });
db.MedicineDosageData.belongsTo(db.Medicine, { foreignKey: 'fkMedicineId' });
/* User:MedicineDosageData = 1:N */
db.User.hasMany(db.MedicineDosageData, { foreignKey: 'fkUserId' });
db.MedicineDosageData.belongsTo(db.User, { foreignKey: 'fkUserId' });

/** ReasonOfStop:MedicineDosageData = 1:1 */
db.MedicineDosageData.hasOne(db.ReasonOfStop, { foreignKey: 'fkMedicineDosageDataId'});
db.ReasonOfStop.belongsTo(db.MedicineDosageData, { foreignKey: 'fkMedicineDosageDataId'});

/* Medicine:MedicinePurposeData = 1:N */
/** 하나의 처방약이 여러 개의 진단명/증상에 대해 처방될 수 있는 것이 최종 설계이지만 mvp에서는 기능상 처방 목적을 하나만 등록할 수 있다.
 * 다만 최종 설계로의 확장 용이성을 위해 일대다로 설계한다.
 */
db.Medicine.hasMany(db.MedicinePurposeData, { foreignKey: 'fkMedicineId' });
db.MedicinePurposeData.belongsTo(db.Medicine, { foreignKey: 'fkMedicineId' });
/* Diagnosis:MedicinePurposeData = 1:N */
db.Diagnosis.hasMany(db.MedicinePurposeData, { foreignKey: 'fkDiagnosisId' });
db.MedicinePurposeData.belongsTo(db.Diagnosis, { foreignKey: 'fkDiagnosisId' });
/* Symptom:MedicinePurposeData = 1:N */
db.Symptom.hasMany(db.MedicinePurposeData, { foreignKey: 'fkSymptomId' });
db.MedicinePurposeData.belongsTo(db.Symptom, { foreignKey: 'fkSymptomId' });
/* User:MedicinePurposeData = 1:N */
db.User.hasMany(db.MedicinePurposeData, { foreignKey: 'fkUserId' });
db.MedicinePurposeData.belongsTo(db.User, { foreignKey: 'fkUserId' });

/* Medicine:MedicineEvaluationData = 1:N */
db.Medicine.hasMany(db.MedicineEvaluationData, { foreignKey: 'fkMedicineId' });
db.MedicineEvaluationData.belongsTo(db.Medicine, { foreignKey: 'fkMedicineId' });
/* User:MedicineEvaluationData = 1:N */
db.User.hasMany(db.MedicineEvaluationData, { foreignKey: 'fkUserId' });
db.MedicineEvaluationData.belongsTo(db.User, { foreignKey: 'fkUserId' });

/* Medicine:MedicineSideEffectsData = 1:N */
db.Medicine.hasMany(db.MedicineSideEffectsData, { foreignKey: 'fkMedicineId' });
db.MedicineSideEffectsData.belongsTo(db.Medicine, { foreignKey: 'fkMedicineId' });
/* Symptom:MedicineSideEffectsData = 1:N */
db.Symptom.hasMany(db.MedicineSideEffectsData, { foreignKey: 'fkSymptomId' });
db.MedicineSideEffectsData.belongsTo(db.Symptom, { foreignKey: 'fkSymptomId' });
/* User:MedicineSideEffectsData = 1:N */
db.User.hasMany(db.MedicineSideEffectsData, { foreignKey: 'fkUserId' });
db.MedicineSideEffectsData.belongsTo(db.User, { foreignKey: 'fkUserId' });


module.exports = db;