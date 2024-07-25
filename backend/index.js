import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(`request is ${request}`);
    return response.status(234).send('Welcome to bookstore');
});

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(234).send({ count: books.length, data: books });
    }

    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(234).send(book);
    }

    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.put('/books/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).send({ message: "Book not found" });
        }
        return response.status(200).send({ message: "Book updated succesfully" });
    }

    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send({ message: "Book not found" });
        }
        return response.status(200).send({ message: "Book deleted succesfully" });
    }

    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
}
);

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