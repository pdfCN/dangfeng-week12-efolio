<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <BookList></BookList>
  </div>
</template>
<script>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '@/components/BookList.vue';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');
    
    const addBook = async () => {
      // Basic validation: Ensure fields are not empty
      if (!name.value || !isbn.value) {
        alert('Please enter both ISBN and book name.');
        return;
      }

      try {
        // Step 1: Call the upperBookName cloud function to convert the name to uppercase
        console.log('Sending book data for conversion:', { name: name.value, isbn: isbn.value });
        const upperResponse = await fetch('https://upperbookname-lxracvw3gq-uc.a.run.app', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value // Send the original book name
          })
        });

        if (!upperResponse.ok) {
          const errorText = await upperResponse.text();
          alert(`Error converting book name: ${errorText}`);
          return;
        }

        // Get the uppercase name from the response
        const upperData = await upperResponse.json();
        console.log('Full response from cloud function:', upperData);

        // Check if upperName exists in the response
        const upperName = upperData.name || null;

        if (!upperName) {
          throw new Error('Uppercase name is undefined.');
        }

        console.log('Uppercase name received:', upperName);

        // Step 2: Write the uppercase name and ISBN to Firestore
        await addDoc(collection(db, 'books'), {
          name: upperName,  // Use the uppercase name
          isbn: isbn.value
        });

        alert('Book added successfully with uppercase name!');
        // Clear the input fields
        name.value = '';
        isbn.value = '';
      } catch (error) {
        console.error('Error adding book:', error);
        alert(`Error adding book: ${error.message}`);
      }
    };

    return {
      isbn,
      name,
      addBook
    };
  },
  components: {
    BookList
  }
};
</script>