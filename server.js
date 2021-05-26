require("dotenv").config();
import schema from "./schema";
import { ApolloServer } from "apollo-server";

const server = new ApolloServer({
    schema,
});

const PORT = process.env.PORT;

server.listen(PORT)
    .then(({ url }) => console.log(`Server is running on ${url}`));