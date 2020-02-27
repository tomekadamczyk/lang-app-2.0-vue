const Sequelize = require('sequelize');

const db = new Sequelize('lang_vue', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

db.authenticate()
  .then(() => {
    console.log('Connection established');
  })
  .catch((err) => {
    console.error('Unable to connect:', err);
  });

const WordModel = db.define('word', {
  id: {
    type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_word',
  },
  value: { type: Sequelize.STRING, field: 'value' },
  translation: { type: Sequelize.STRING, field: 'translation' },
  wordSpecific: { type: Sequelize.JSON, field: 'wordSpecific' },
  createdAt: { type: Sequelize.DATE, field: 'createdAt' },
  updatedAt: { type: Sequelize.DATE, field: 'updatedAt' },
  closedAt: { type: Sequelize.DATE, field: 'closedAt' },
});

const PartOfSpeechModel = db.define('partofspeech', {
  id: {
    type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_partofspeech',
  },
  value: { type: Sequelize.STRING, field: 'value' },
  createdAt: { type: Sequelize.DATE, field: 'createdAt' },
  updatedAt: { type: Sequelize.DATE, field: 'updatedAt' },
  closedAt: { type: Sequelize.DATE, field: 'closedAt' },
});

const GrammaticalCaseModel = db.define('grammaticalcase', {
  id: {
    type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id_grammaticalcase',
  },
  value: { type: Sequelize.STRING, field: 'value' },
  createdAt: { type: Sequelize.DATE, field: 'createdAt' },
  updatedAt: { type: Sequelize.DATE, field: 'updatedAt' },
  closedAt: { type: Sequelize.DATE, field: 'closedAt' },
});

WordModel.belongsTo(PartOfSpeechModel);
PartOfSpeechModel.hasMany(WordModel);
WordModel.belongsTo(GrammaticalCaseModel);
GrammaticalCaseModel.hasMany(WordModel);

const Word = db.models.word;
const PartOfSpeech = db.models.partofspeech;
const GrammaticalCase = db.models.grammaticalcase;

db.sync().then(() => {
  PartOfSpeech.create({
    id: 1,
    value: 'noun',
  }),
  PartOfSpeech.create({
    id: 2,
    value: 'verb',
  }),
  PartOfSpeech.create({
    id: 3,
    value: 'adjective',
  }),
  GrammaticalCase.create({
    id: 1,
    value: 'nominative',
  }),
  GrammaticalCase.create({
    id: 2,
    value: 'genitive',
  }),
  GrammaticalCase.create({
    id: 3,
    value: 'dative',
  }),
  Word.create({
    id: 1,
    value: 'Kurtka',
    translation: 'Bunda',
    wordSpecific: {
      lp: {
        nominative: 'kurtka',
        genitive: 'kurtki',
        dative: 'kurtce',
        accusative: 'kurtkę',
        instrumental: 'kurtce',
        locative: 'kurtką',
        vocative: 'kurtko!',
      },
    },
    grammaticalcase: 1,
  })
});

module.exports = {
  Word, PartOfSpeech, GrammaticalCase,
};
