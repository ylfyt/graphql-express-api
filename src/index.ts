import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';

import schema from './schema/schema';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT} ...`);
});
