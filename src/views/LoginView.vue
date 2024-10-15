<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
    <p v-if="loginError" class="error">Invalid username or password.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isAuthenticated } from '../router'; 
const username = ref("");
const password = ref("");
const loginError = ref(false);
const router = useRouter();
const route = useRoute(); 

const hardcodedUsername = "admin";
const hardcodedPassword = "root";

const handleSubmit = () => {
  if (username.value === hardcodedUsername && password.value === hardcodedPassword) {
    isAuthenticated.value = true; 
    loginError.value = false;

    const redirectPath = route.query.redirect || '/'; // Gets the redirection path, which redirects to the home page by default
    router.push(redirectPath); // After successful login, you are redirected to the target page
  } else {
    loginError.value = true;
  }
};
</script>


  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>