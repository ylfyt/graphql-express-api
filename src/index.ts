import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';

import schema from './schema/schema';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
const DB_CONNECT = process.env.DB_CONNECT!;

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

// DB Connection
mongoose.connect(DB_CONNECT, () => console.log('DB is Connected!'));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT} ...`);
});
