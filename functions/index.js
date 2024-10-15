/* eslint-disable */
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();
const db = admin.firestore();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      console.log("Fetching books collection...");
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      console.log("Books fetched successfully:", snapshot.size);

      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.upperBookName = onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).send('The "name" field is required.');
    return;
  }

  const upperName = name.toUpperCase();
  res.status(200).json({ name: upperName });
});

exports.addBook = onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        const {name, isbn} = req.body;
  
        // Check that the required fields are passed
        if (!name || !isbn) {
          res.status(400).send('Both name and isbn are required');
          return;
        }
  
        // Check whether the ISBN is valid
        const isbnNumber = Number(isbn);
        if (isNaN(isbnNumber)) {
          res.status(400).send('ISBN must be a valid number');
          return;
        }
  
        // Convert the book name and ISBN to uppercase
        const upperName = name.toUpperCase();
        const upperIsbn = isbn.toString().toUpperCase();
  
    // Add a new book entry to Firestore
        await db.collection('books').add({
          name: upperName,
          isbn: upperIsbn
        });
  
        res.status(200).send('Book added successfully!');
      } catch (error) {
        console.error('Error adding book:', error.message);
        res.status(500).send('Error adding book, please try again.');
      }
    });
  });

  exports.getAllBooks = onRequest(async (req, res) => {
    cors(req, res, async () => {
      try {
        const booksCollection = db.collection('books');
        const snapshot = await booksCollection.get();
  
        if (snapshot.empty) {
          res.status(404).send('No books found');
          return;
        }
  
        const booksArray = [];
        snapshot.forEach(doc => {
          booksArray.push({
            id: doc.id,
            ...doc.data()
          });
        });
  
        res.status(200).json(booksArray);
      } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
      }
    });
  });