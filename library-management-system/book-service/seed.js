const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./src/models/Book');

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Fiction",
    publisher: "Scribner",
    rackNumber: "A-101",
    quantity: 5,
    availableCopies: 5,
    description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    publisher: "HarperCollins",
    rackNumber: "A-102",
    quantity: 3,
    availableCopies: 3,
    description: "The story of racial injustice and the loss of innocence in the American South."
  },
  // Add more books...
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log('Books seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedBooks();