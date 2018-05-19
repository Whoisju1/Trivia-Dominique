/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const resolvers = require('./resolvers');

const typeDefs = fs.readFileSync('./schema.gql', { encoding: 'utf8' });

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress(req => ({
  schema,
  context: {
    req,
  },
})));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
