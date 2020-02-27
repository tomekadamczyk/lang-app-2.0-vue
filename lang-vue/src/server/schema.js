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
const { Word, PartOfSpeech, GrammaticalCase } = require('./connector.js');


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
    partsOfSpeech: {
      type: new GraphQLList(PartOfSpeechType),
      resolve(obj, args) {
        return PartOfSpeech.findAll({ where: args });
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

// const mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addProject: {
//       type: ProjectType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         description: { type: GraphQLString },
//         statusId: { type: new GraphQLNonNull(GraphQLInt) },
//         priorityId: { type: new GraphQLNonNull(GraphQLInt) },
//         clientId: { type: new GraphQLNonNull(GraphQLInt) },
//       },
//       resolve(obj, {
//         name, description, statusId, priorityId, clientId,
//       }, context) {
//         return Project.create({
//           name,
//           description,
//           statusId,
//           priorityId,
//           clientId,
//         });
//       },
//     },
//     updateProject: {
//       type: ProjectType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLString },
//         description: { type: GraphQLString },
//         statusId: { type: GraphQLInt },
//         priorityId: { type: GraphQLInt },
//       },
//       resolve: async (obj, {
//         id, description, name, statusId, priorityId,
//       }, context) => {
//         const project = await Project.findByPk(id);
//         project.set('name', name);
//         project.set('description', description);
//         project.set('statusId', statusId);
//         project.set('priorityId', priorityId);
//         return project.save();
//       },
//     },
//     addTask: {
//       type: TaskType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         description: { type: GraphQLString },
//         statusId: { type: new GraphQLNonNull(GraphQLInt) },
//         priorityId: { type: new GraphQLNonNull(GraphQLInt) },
//         projectId: { type: new GraphQLNonNull(GraphQLInt) },
//       },
//       resolve(obj, {
//         name, description, statusId, priorityId, projectId,
//       }, context) {
//         return Task.create({
//           name,
//           description,
//           statusId,
//           priorityId,
//           projectId,
//         });
//       },
//     },
//     updateTask: {
//       type: TaskType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLString },
//         description: { type: GraphQLString },
//         statusId: { type: GraphQLInt },
//         priorityId: { type: GraphQLInt },
//       },
//       resolve: async (obj, {
//         id, name, description, statusId, priorityId,
//       }, context) => {
//         const task = await Task.findByPk(id);
//         task.set('name', name);
//         task.set('description', description);
//         task.set('statusId', statusId);
//         task.set('priorityId', priorityId);
//         return task.save();
//       },
//     },
//     addUser: {
//       type: UserType,
//       args: {
//         id: { type: GraphQLInt },
//         valid: { type: GraphQLBoolean },
//         format_valid: { type: GraphQLBoolean },
//         query: { type: GraphQLString },
//         country_code: { type: GraphQLString },
//         vat_number: { type: GraphQLString },
//         company_name: { type: GraphQLString },
//         company_address: { type: GraphQLString },
//         login: { type: GraphQLString },
//       },
//       resolve(obj, {
//         valid, format_valid, query, country_code, vat_number, company_name, company_address, login,
//       }, context) {
//         return User.create({
//           valid,
//           format_valid,
//           query,
//           country_code,
//           vat_number,
//           company_name,
//           company_address,
//           login,
//         });
//       },
//     },
//     addUserData: {
//       type: UserDataType,
//       args: {
//         id: { type: GraphQLInt },
//         short_name: { type: GraphQLString },
//         full_name: { type: GraphQLString },
//         locality: { type: GraphQLString },
//         street: { type: GraphQLString },
//         house_number: { type: GraphQLString },
//         flat_number: { type: GraphQLString },
//         post_code: { type: GraphQLString },
//         post: { type: GraphQLString },
//         phone_number: { type: GraphQLString },
//         email_address: { type: GraphQLString },
//         first_name: { type: GraphQLString },
//         last_name: { type: GraphQLString },
//       },
//       resolve(obj, {
//         short_name, full_name, locality, street, house_number, flat_number, post_code, post, phone_number, email_address, first_name, last_name,
//       }, context) {
//         return UserData.create({
//           short_name,
//           full_name,
//           locality,
//           street,
//           house_number,
//           flat_number,
//           post_code,
//           post,
//           phone_number,
//           email_address,
//           first_name,
//           last_name,
//         });
//       },
//     },
//     login: {
//       type: UserType,
//       args: {
//         email: { type: GraphQLJSONObject },
//         uniqueURL: { type: GraphQLJSONObject },
//         password: { type: GraphQLJSONObject },
//       },
//       resolve: async (obj, { email, uniqueURL, password }, context) => {
//         const user = await User.findOne({
//           where: {
//             email,
//             uniqueURL,
//             password,
//           },
//         });
//         return user;
//       },
//     },
//   },
// });

const schema = new GraphQLSchema({
  query: rootQuery,
});


module.exports = schema;
