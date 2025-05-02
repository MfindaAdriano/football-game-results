const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");

const {ApolloServer, gql} = require('apollo-server-express');

const dbRouter = require('./routers/db.js');

// app port
const port = process.env.PORT || 4500;

//static folder
const staticFolder = path.join(__dirname, "../client/build");

// create  express app
const app = express();
//create http server passing the express app
const server = http.createServer(app);

// create an io object using Server from socket.io
const io = new Server(server);

//apollo-server-express config

const props = [{hello: () => "this is Mfinda page"}, {nums: () => 37}];
// construct schema, using GraphQL' schema language
let typeDefs = gql`
    type Player {
        hello: String
        nums: Int
    }
    type Query {
        hello: String
        nums: Int
    }

`;

// Provide resolver functions for our schema fields
let resolvers = {
    Query: {
        hello: () => 'This is Mfinda, the Programmer!',
        nums: () => 30 * 50,
        
    }
};

const playerSchema = new mongoose.Schema()

async function startApolloServer(typeDefs, resolvers){
    // Apollo Server setup
    const apolloServer = new ApolloServer({typeDefs, resolvers});

    // start apolloServer
    await apolloServer.start();

    // Apply the Apollo GraphQL middleware and set the path to /dbs/api
    apolloServer.applyMiddleware({app, path: '/api'});
    app.listen(port, () => console.log(`Apollo Server at ${process.env.serverURL}/${apolloServer.graphqlPath}`));
}

startApolloServer(typeDefs, resolvers);



server.listen(port, () => console.log(`The Server is listen at port ${port}`));

// set express app staticFolder
app.use(express.static(staticFolder));

// middleware
app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.clientURL);

    next();
})

app.use(express.text());

app.use("/dbs", dbRouter);

app.get("/api", (req, res) => {
    console.log("Hello Apollo Server");
})
app.post("/keys", (req, res) => {
    //console.log("Hello Apollo Server");
    const keys = JSON.parse(req.body);
    console.log(keys);

    /*
    typeDefs = gql`
    type Query {
        ${keys[0]}: String
        ${keys[1]}: Int
    }
    `;

    resolvers.Query[keys[0]] = () => "Hey Mfinda";
    resolvers.Query[keys[1]] = () => "key two";
    
    startApolloServer(typeDefs, resolvers);
    */

})


app.get("/", (req, res) => {
    console.log("Hello Universe, from Mfinda");
    
    // redirect para react app server
    //res.redirect(process.env.clientURL);

    //open static reactRootFolder/build/index.html file instead
    res.sendFile(path.join(staticFolder, "index.html"));

})

//app.post("/", (req, res) => {console.log("Hello post /")})


