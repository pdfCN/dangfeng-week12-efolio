<template>
    <div class="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage the users and application settings.</p>
      <div class="admin-actions">
        <p>Role: {{ userRole }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { isAuthenticated, userRole } from '../authState'; 
  
  </script>
  
  <style scoped>
  .admin-page {
    text-align: center;
  }
  
  .admin-actions {
    margin-top: 20px;
  }
  
  .admin-actions button {
    margin-right: 10px;
  }
  </style>