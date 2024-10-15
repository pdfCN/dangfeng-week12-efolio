<template>
  <div>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="handleLogin">Sign in via Firebase</button></p>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p> <!-- 错误信息展示 -->
    <p v-if="successMessage" style="color: green">{{ successMessage }}</p> <!-- 成功信息展示 -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { getDatabase, ref as dbRef, get } from "firebase/database"; // 引入 Realtime Database
import { isAuthenticated, userRole, currentUser } from "../authState"; // 引入全局角色状态

// 响应式变量，用于存储用户输入的邮箱和密码
const email = ref("");
const password = ref("");
const errorMessage = ref(''); // 错误信息
const successMessage = ref(''); // 成功信息

const auth = getAuth();
const db = getDatabase(); // 获取 Realtime Database 实例
const router = useRouter();

// 处理登录逻辑
const handleLogin = () => {
  // 清空之前的消息
  errorMessage.value = '';
  successMessage.value = '';

  // 输入验证
  if (email.value === '' || password.value === '') {
    errorMessage.value = 'Email and password cannot be empty!';
    console.error('Email or password empty!');
    return;
  }

  // 调用登录函数
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // 登录成功
      const user = userCredential.user;
      const userId = user.uid;
      console.log("User successfully logged in:", user);

      const userRef = dbRef(db, `users/${userId}`);
      return get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.val(); 
          userRole.value = user.role;  
          currentUser.value = user.email;
          isAuthenticated.value = true;

          console.log("User role is:", userRole.value); 
          successMessage.value = `Login successful as ${currentUser.value}! Redirecting...`;

          console.log("Current role:", userRole.value, "Current user email:", currentUser.value); 
        } else {
          console.error("No role found for this user.");
        }
      }).catch((error) => {
        console.error("Error retrieving user role:", error);
      });
    })
    .then(() => {
      // 跳转到主页或根据角色跳转到不同的页面
      if (userRole.value === 'admin') {
        router.push("/admin");
      } else if (userRole.value === 'user') {
        router.push("/userpage");
      } else {
        router.push("/");
      }
    })
    .catch((error) => {
      // 捕获登录错误
      errorMessage.value = "Error logging in: " + error.message;
      console.error("Error logging in:", error);
    });
};
</script>