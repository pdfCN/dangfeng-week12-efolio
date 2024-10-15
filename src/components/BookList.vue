<template>
    <div>
        <h1>Where</h1>
        <div>
            <label>Minimum ISBN: </label>
            <input v-model.number="minimumNumber" @change="fetchBooks" />
        </div>

        <h1>Order by</h1>
        <div>
            <label for="sortOrder">Sort by ISBN:</label>
            <select v-model="sortOrder" @change="fetchBooks">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>

        <h1>Limit</h1>
        <div>
            <label for="itemsPerPage">Items per page:</label>
            <input v-model="itemsPerPage" @change="fetchBooks" />
        </div>

        <h1>Result</h1>
        <table>
            <thead>
                <tr>
                    <th>Book Name</th>
                    <th>ISBN</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.name }}</td>
                    <td>{{ book.isbn }}</td>
                    <td><button @click="deleteBook(book.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, limit, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);
        const sortOrder = ref('asc'); 
        const itemsPerPage = ref(10);
        const totalItems = ref(0);
        const lastVisible = ref(null); 
        const minimumNumber = ref(0);

        const fetchBooks = () => {
            try {
                const q = query(
                    collection(db, 'books'),
                    // where('isbn', '>', minimumNumber.value),
                    orderBy('isbn', sortOrder.value), // Sort by ISBN with the selected order
                    limit(itemsPerPage.value) // Limit the number of results per page
                );

                onSnapshot(q, (querySnapshot) => {
                    const booksArray = [];
                    querySnapshot.forEach((doc) => {
                        booksArray.push({ id: doc.id, ...doc.data() });
                    });
                    books.value = booksArray;
                    totalItems.value = querySnapshot.size;
                    lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1]; // Store the last document for pagination
                });
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        const deleteBook = async (bookId) => {
            try {
                await deleteDoc(doc(db, 'books', bookId));
                alert('Book deleted successfully!');
            } catch (error) {
                console.error('Error deleting book:', error);
                alert('Failed to delete the book.');
            }
        };

        onMounted(() => {
            fetchBooks();
        });

        return {
            books,
            sortOrder,
            itemsPerPage,
            fetchBooks,
            deleteBook,
            minimumNumber
        };
    },
};
</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f4f4f4;
    text-align: left;
}

button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

button:hover {
    background-color: darkred;
}
</style>