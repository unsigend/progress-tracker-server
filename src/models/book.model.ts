import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    description: { type: String, required: false },
    pages: { type: Number, required: false },
    image: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    ISBN: { type: String, required: false },
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
