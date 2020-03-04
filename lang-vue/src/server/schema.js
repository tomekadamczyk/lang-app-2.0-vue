/* eslint-disable max-len */
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const {
  Word, PartOfSpeech, GrammaticalCase, TimePerson,
} = require('./connector.js');


const PartOfSpeechType = new GraphQLObjectType({
  name: 'PartOfSpeech',
  fields: () => ({
    id: { type: GraphQLInt },
    value: { type: GraphQLString },
  }),
});

const GrammaticalCaseType = new GraphQLObjectType({
  name: 'GrammaticalCase',
  fields: () => ({
    id: { type: GraphQLInt },
    value: { type: GraphQLString },
  }),
});

const TimePersonType = new GraphQLObjectType({
  name: 'TimePerson',
  fields: () => ({
    id: { type: GraphQLInt },
    value: { type: GraphQLString },
  }),
});

const WordType = new GraphQLObjectType({
  name: 'Word',
  fields: () => ({
    id: { type: GraphQLInt },
    value: { type: GraphQLString },
    translation: { type: GraphQLString },
    wordSpecific: { type: GraphQLJSON },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt },
    projectId: { type: GraphQLInt },
    partofspeechId: {
      type: PartOfSpeechType,
      resolve(word) {
        return word.getPartofspeech();
      },
    },
    grammaticalcaseId: {
      type: GrammaticalCaseType,
      resolve(word) {
        return word.getGrammaticalcase();
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    words: {
      type: new GraphQLList(WordType),
      resolve(obj, args) {
        return Word.findAll({ where: args });
      },
    },
    word: {
      type: WordType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(obj, args) {
        return Word.findByPk(args.id);
      },
    },
    allPartsOfSpeech: {
      type: new GraphQLList(PartOfSpeechType),
      resolve(obj, args) {
        return PartOfSpeech.findAll({ where: args });
      },
    },
    allTimePersons: {
      type: new GraphQLList(TimePersonType),
      resolve(obj, args) {
        return TimePerson.findAll({ where: args });
      },
    },
    partOfSpeech: {
      type: PartOfSpeechType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(obj, args) {
        return PartOfSpeech.findByPk(args.id);
      },
    },
    grammaticalCases: {
      type: new GraphQLList(GrammaticalCaseType),
      resolve(obj, args) {
        return GrammaticalCase.findAll({ where: args });
      },
    },
    grammaticalCase: {
      type: GrammaticalCaseType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(obj, args) {
        return GrammaticalCase.findByPk(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addWord: {
      type: WordType,
      args: {
        value: { type: new GraphQLNonNull(GraphQLString) },
        translation: { type: GraphQLString },
        partofspeechId: { type: GraphQLInt },
        wordSpecific: { type: GraphQLJSON },
      },
      resolve(obj, {
        value, translation, wordSpecific, partofspeechId,
      }, context) {
        return Word.create({
          value,
          translation,
          wordSpecific,
          partofspeechId,
        });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation,
});


module.exports = schema;
