<template>
    <div class="page">
        <h1>Book Counter</h1>
        <button @click="getBookCount" :disabled="isLoadingCount">
            <span v-if="!isLoadingCount">Get Book Count</span>
            <span v-else>Loading...</span>
        </button>
        <p v-if="isLoadingCount">Loading data, please wait...</p>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>

        <h2>Book List</h2>
        <button @click="getBookList" :disabled="isLoadingList">
            <span v-if="!isLoadingList">Get Book List</span>
            <span v-else>Loading list...</span>
        </button>
        <ul v-if="books.length">
            <li v-for="book in books" :key="book.id">{{ book.name }} - ISBN: {{ book.isbn }}</li>
        </ul>
        <p v-if="!books.length && !isLoadingList">No books available.</p>
        <p v-if="listError">{{ listError }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null,
            isLoadingCount: false, 
            books: [],
            isLoadingList: false,
            listError: null,
        };
    },
    methods: {
        async getBookCount() {
            this.isLoadingCount = true; 
            try {
                const response = await axios.get('https://countbooks-lxracvw3gq-uc.a.run.app');
                this.count = response.data.count;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error.message;
                this.count = null;
            } finally {
                this.isLoadingCount = false; 
            }
        },
        async getBookList() {
            this.isLoadingList = true;
            try {
                const response = await axios.get('https://getallbooks-lxracvw3gq-uc.a.run.app');
                this.books = response.data;
                this.listError = null;
            } catch (error) {
                console.error('Error fetching book list:', error);
                this.listError = error.message;
                this.books = [];
            } finally {
                this.isLoadingList = false;
            }
        }
    },
};
</script>

<style scoped>
.page {
    width: 300px;
    margin: 0 auto;
}

h1, h2 {
    color: #333;
    font-size: 2em;
    margin-bottom: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 25px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

ul {
    padding: 0;
    list-style-type: none;
}

li {
    margin: 10px 0;
}

p {
    font-size: 1.2em;
    color: #555;
    margin-top: 20px;
}

p.error {
    color: #e74c3c;
}
</style>