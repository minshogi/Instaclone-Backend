import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        hello3: String
    }
`;


const resolvers = {
    Query: {
        hello3: () => "bebe",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen()
    .then(({ url }) => console.log("Server is running on ${url}"));