import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLFloat } from 'graphql';
import _ from 'lodash';

import { books } from '../db/books';

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		edition: { type: GraphQLString },
		year: { type: GraphQLInt },
		price: { type: GraphQLFloat },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve: (parent, args) => {
				return _.find(books, { id: args.id });
			},
		},
	},
});

export default new GraphQLSchema({
	query: RootQuery,
});
