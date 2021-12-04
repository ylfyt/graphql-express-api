import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList } from 'graphql';
import _ from 'lodash';

import Books from '../models/Books';
import Authors from '../models/Authors';

const BookType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		_id: { type: GraphQLID },
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
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {
				return Books.find({ authorId: parent._id });
			},
		},
	}),
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		book: {
			type: BookType,
			args: { _id: { type: GraphQLID } },
			resolve: (parent, args) => {
				return Books.findById(args._id);
			},
		},
		author: {
			type: AuthorType,
			args: { _id: { type: GraphQLID } },
			resolve: (parent, args) => {
				return Authors.findById(args._id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {
				return Books.find();
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: (parent, args) => {
				return Authors.find();
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
			},
			resolve: (parent, args) => {
				const author = new Authors({ name: args.name });
				return author.save();
			},
		},

		addBook: {
			type: BookType,
			args: {
				title: { type: GraphQLString },
				year: { type: GraphQLInt },
				authorId: { type: GraphQLID },
			},
			resolve: (parent, args) => {
				const book = new Books({
					title: args.title,
					year: args.year,
					authorId: args.authorId,
				});

				return book.save();
			},
		},
	},
});

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
