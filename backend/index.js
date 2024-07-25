import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

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