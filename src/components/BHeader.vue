<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <!-- <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">
            Login
          </router-link>
        </li> -->

        <li class="nav-item">
          <router-link to="/userpage" class="nav-link" active-class="active">
            User Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/adminpage" class="nav-link" active-class="active">
            Admin Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">
            Get Book Count
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/addbook" class="nav-link" active-class="active">
            Add Book
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/weatherCheck" class="nav-link" active-class="active">
            Get Weather
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">
            Count Book API
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">
            Get All Book API
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/firelogin" class="nav-link" active-class="active">
            FirebaseLogin
          </router-link>
        </li>
        <!-- 登录后显示登出按钮 -->
        <li class="nav-item" v-if="isAuthenticated">
          <a href="#" class="nav-link" @click="logout">Logout</a>
        </li>
        <li class="nav-item">
          <router-link to="/fireRegister" class="nav-link" active-class="active">
            FirebaseRegister
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated, userRole, currentUser } from '../authState'; 

const router = useRouter();
const userEmail = currentUser;
const logout = () => {
  isAuthenticated.value = false;
  userRole.value = null;
  router.push({ name: 'FireLogin' });
  console.log("User: "+ userEmail.value +" have logged out.")
};
</script>

<style scoped></style>