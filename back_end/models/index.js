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
db.MedicinePurposeData = require('./MedicinePurposeData')(sequelize, Sequelize);
db.MedicineEvaluationData = require('./MedicineEvaluationData')(sequelize, Sequelize);
db.MedicineSideEffectsData = require('./MedicineSideEffectsData')(sequelize, Sequelize);

/* User:Profile = 1:1 */
db.User.hasOne(db.Profile, { as: 'Profile', foreignKey: 'fkUserId' });
db.Profile.belongsTo(db.User, { as: 'Profile', foreignKey: 'fkUserId' });
/* (Follow) User:User = N:M */
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });

/* User:Post = 1:N */
db.User.hasMany(db.Post, { as: 'Posts', foreignKey: 'fkUserId' });
db.Post.belongsTo(db.User, { as: 'Posts', foreignKey: 'fkUserId' });
/* Post:PostComment = 1:N */
db.Post.hasMany(db.PostComment, { as: 'RegisteredPostComments', foreignKey: 'fkPostId' });
db.PostComment.belongsTo(db.Post, { as: 'RegisteredPostComments', foreignKey: 'fkPostId' });
/* User:PostComment = 1:N */
db.User.hasMany(db.PostComment, { as: 'RegisteringPostComments', foreignKey: 'fkUserId' });
db.PostComment.belongsTo(db.User, { as: 'RegisteringPostComments', foreignKey: 'fkUserId' });
/* (PostBadge) User:Post = N:M */
db.User.belongsToMany(db.Post, { through: 'PostBadge', as: '', foreignKey: '' });
db.Post.belongsToMany(db.User, { through: 'PostBadge', as: '', foreignKey: '' });

/* User:Center = 1:N */
db.User.hasMany(db.Center, { as: 'RegisteringCenter', foreignKey: 'fkUserId' });
db.Center.belongsTo(db.User, { as: 'RegisteringCenter', foreignKey: 'fkUserId' });
/* User:CenterComment = 1:N */
db.User.hasMany(db.CenterComment, { as: 'RegisteringCenterComment', foreignKey: 'fkUserId' });
db.CenterComment.belongsTo(db.User, { as: 'RegisteringCenterComment', foreignKey: 'fkUserId' });
/* Center:CenterComment = 1:N */
db.Center.hasMany(db.CenterComment, { as: 'RegisteredCenterComment', foreignKey: 'fkCenterId' });
db.CenterComment.belongsTo(db.Center, { as: 'RegisteredCenterComment', foreignKey: 'fkCenterId' });
/* (CenterBadge) User:CenterBadge = N:M */
db.User.belongsToMany(db.Center, { through: 'CenterBadge', as: '', foreignKey: '' });
db.Center.belongsToMany(db.User, { through: 'CenterBadge', as: '', foreignKey: '' });

/* User:Station = 1:N */
db.User.hasMany(db.Station, { as: 'RegisteringStation', foreignKey: 'fkUserId' });
db.Station.belongsTo(db.User, { as: 'RegisteringStation', foreignKey: 'fkUserId' });
/* User:StationComment = 1:N */
db.User.hasMany(db.StationComment, { as: 'RegisteringStationComment', foreignKey: 'fkUserId' });
db.StationComment.belongsTo(db.User, { as: 'RegisteringStationComment', foreignKey: 'fkUserId' });
/* Station:StationComment = 1:N */
db.Station.hasMany(db.StationComment, { as: 'RegisteredStationComment', foreignKey: 'fkStationId' });
db.StationComment.belongsTo(db.Station, { as: 'RegisteredStationComment', foreignKey: 'fkStationId' });
/* (StationBadge) User:StationBadge = N:M */
db.User.belongsToMany(db.Station, { through: 'StationBadge', as: '', foreignKey: '' });
db.Station.belongsToMany(db.User, { through: 'StationBadge', as: '', foreignKey: '' });

/* Diagnosis:DiagnosisData = 1:N */
db.Diagnosis.hasMany(db.DiagnosisData, { as: 'RegisteredDiagnosisData', foreignKey: 'fkDiagnosisId' });
db.DiagnosisData.belongsTo(db.Diagnosis, { as: 'RegisteredDiagnosisData', foreignKey: 'fkDiagnosisId' });
/* User:DiagnosisData = 1:N */
db.User.hasMany(db.DiagnosisData, { as: 'RegisteringDiagnosisData', foreignKey: 'fkUserId' });
db.DiagnosisData.belongsTo(db.User, { as: 'RegisteringDiagnosisData', foreignKey: 'fkUserId' });

/* Symptom:SymptomData = 1:N */
db.Symptom.hasMany(db.SymptomData, { as: 'RegisteredSymptomData', foreignKey: 'fkSymptomId' });
db.SymptomData.belongsTo(db.Symptom, { as: 'RegisteredSymptomData', foreignKey: 'fkSymptomId' });
/* User:SymptomData = 1:N */
db.User.hasMany(db.SymptomData, { as: 'RegisteringSymptomData', foreignKey: 'fkUserId' });
db.SymptomData.belongsTo(db.User, { as: 'RegisteringSymptomData', foreignKey: 'fkUserId' });

/* Medicine:MedicineData = 1:N */
db.Medicine.hasMany(db.MedicineData, { as: 'RegisteredMedicineData', foreignKey: 'fkMedicineId' });
db.MedicineData.belongsTo(db.Medicine, { as: 'RegisteredMedicineData', foreignKey: 'fkMedicineId' });
/* User:MedicineData = 1:N */
db.User.hasMany(db.MedicineData, { as: 'RegisteringMedicineData', foreignKey: 'fkUserId' });
db.MedicineData.belongsTo(db.User, { as: 'RegisteringMedicineData', foreignKey: 'fkUserId' });

/* Medicine:MedicineDosageData = 1:N */
db.Medicine.hasMany(db.MedicineDosageData, { as: 'RegisteredMedicineDosageData', foreignKey: 'fkMedicineId' });
db.MedicineDosageData.belongsTo(db.Medicine, { as: 'RegisteredMedicineDosageData', foreignKey: 'fkMedicineId' });
/* User:MedicineDosageData = 1:N */
db.User.hasMany(db.MedicineDosageData, { as: 'RegisteringMedicineDosageData', foreignKey: 'fkUserId' });
db.MedicineDosageData.belongsTo(db.User, { as: 'RegisteringMedicineDosageData', foreignKey: 'fkUserId' });

/* Medicine:MedicinePurposeData = 1:N */
/** 하나의 처방약이 여러 개의 진단명/증상에 대해 처방될 수 있는 것이 최종 설계이지만 mvp에서는 기능상 처방 목적을 하나만 등록할 수 있다.
 * 다만 최종 설계로의 확장 용이성을 위해 일대다로 설계한다.
 */
db.Medicine.hasMany(db.MedicinePurposeData, { as: 'RegisteredMedicinePurposeData', foreignKey: 'fkMedicineId' });
db.MedicinePurposeData.belongsTo(db.Medicine, { as: 'RegisteredMedicinePurposeData', foreignKey: 'fkMedicineId' });
/* Diagnosis:MedicinePurposeData = 1:N */
db.Diagnosis.hasMany(db.MedicinePurposeData, { as: 'UsedMedicineForDiagnosis', foreignKey: 'fkDiagnosisId' });
db.MedicinePurposeData.belongsTo(db.Diagnosis, { as: 'UsedMedicineForDiagnosis', foreignKey: 'fkDiagnosisId' });
/* Symptom:MedicinePurposeData = 1:N */
db.Symptom.hasMany(db.MedicinePurposeData, { as: 'UsedMedicineForSymptom', foreignKey: 'fkSymptomId' });
db.MedicinePurposeData.belongsTo(db.Symptom, { as: 'UsedMedicineForSymptom', foreignKey: 'fkSymptomId' });
/* User:MedicinePurposeData = 1:N */
db.User.hasMany(db.MedicinePurposeData, { as: 'RegisteringMedicinePurposeData', foreignKey: 'fkUserId' });
db.MedicinePurposeData.belongsTo(db.User, { as: 'RegisteringMedicinePurposeData', foreignKey: 'fkUserId' });

/* Medicine:MedicineEvaluationData = 1:N */
db.Medicine.hasMany(db.MedicineEvaluationData, { as: 'RegisteredMedicineEvaluationData', foreignKey: 'fkMedicineId' });
db.MedicineEvaluationData.belongsTo(db.Medicine, { as: 'RegisteredMedicineEvaluationData', foreignKey: 'fkMedicineId' });
/* User:MedicineEvaluationData = 1:N */
db.User.hasMany(db.MedicineEvaluationData, { as: 'RegisteringMedicineEvaluationData', foreignKey: 'fkUserId' });
db.MedicineEvaluationData.belongsTo(db.User, { as: 'RegisteringMedicineEvaluationData', foreignKey: 'fkUserId' });

/* Medicine:MedicineSideEffectsData = 1:N */
db.Medicine.hasMany(db.MedicineSideEffectsData, { as: 'RegisteredMedicineSideEffectsData', foreignKey: 'fkMedicineId' });
db.MedicineSideEffectsData.belongsTo(db.Medicine, { as: 'RegisteredMedicineSideEffectsData', foreignKey: 'fkMedicineId' });
/* Symptom:MedicineSideEffectsData = 1:N */
db.Symptom.hasMany(db.MedicineSideEffectsData, { as: 'SymptomOfSideEffects', foreignKey: 'fkSymptomId' });
db.MedicineSideEffectsData.belongsTo(db.Symptom, { as: 'SymptomOfSideEffects', foreignKey: 'fkSymptomId' });
/* User:MedicineSideEffectsData = 1:N */
db.User.hasMany(db.MedicineSideEffectsData, { as: 'RegisteringMedicineSideEffectsData', foreignKey: 'fkUserId' });
db.MedicineSideEffectsData.belongsTo(db.User, { as: 'RegisteringMedicineSideEffectsData', foreignKey: 'fkUserId' });


module.exports = db;