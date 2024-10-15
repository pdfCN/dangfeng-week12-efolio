// src/authState.js
import { ref } from 'vue';


export const isAuthenticated = ref(false); 
export const userRole = ref(null); 
export const currentUser = ref(null);