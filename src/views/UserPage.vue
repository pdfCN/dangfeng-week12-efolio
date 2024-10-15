<template>
    <div class="user-page">
      <h1>User Dashboard</h1>
      <p>Welcome, User! Here you can view your profile and access available features.</p>
      <div class="user-actions">
        {{ currentUser }}
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { currentUser } from '@/authState';

  </script>
  
  <style scoped>
  .user-page {
    text-align: center;
  }
  
  .user-actions {
    margin-top: 20px;
  }
  
  .user-actions button {
    margin-right: 10px;
  }
  </style>