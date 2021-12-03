import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList } from 'graphql';
import _ from 'lodash';

import Books from '../models/Books';
import Authors from '../models/Authors';

const BookType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		year: { type: GraphQLInt },
		author: {
			type: AuthorType,
			resolve: (parent, args) => {
				return Authors.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {
				return Books.find({ authorId: parent.id });
			},
		},
	}),
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve: (parent, args) => {
				return Books.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve: (parent, args) => {
				return Authors.findById(args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {
				return Books.find({});
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: (parent, args) => {
				return Authors.find({});
			},
		},
	},
});

export default new GraphQLSchema({
	query: RootQuery,
});
