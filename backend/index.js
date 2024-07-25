import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use('/books', bookRoute);

app.get('/', (request, response) => {
    console.log(`request is ${request}`);
    return response.status(234).send('Welcome to bookstore');
});

mongoose
    .connect(mongoDBURL)
    .then(
        () => {
            console.log("App connected to the database");
            app.listen(port, () => {
                console.log(`App is listening to port : ${port}`);
            });
        }
    ).catch(
        (error) => {
            console.log(error);
        }
    );