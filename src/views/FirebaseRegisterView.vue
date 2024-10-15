<template>
    <div>
        <h1>Create an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="handleRegister">Save to Firebase</button></p>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p> <!-- 错误信息展示 -->
        <p v-if="successMessage" style="color: green">{{ successMessage }}</p> <!-- 成功信息展示 -->
    </div>
</template>

<script setup>
import { ref } from 'vue'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Auth 新版模块化导入
import { getDatabase, ref as dbRef, set } from "firebase/database"; // Realtime Database 模块化导入

// 响应式变量，用于存储用户输入的邮箱和密码
const email = ref('');
const password = ref('');
const role = ref('user'); // 默认角色为 'user'
const errorMessage = ref(''); // 错误信息
const successMessage = ref(''); // 成功信息

// 获取 Firebase Authentication 和 Realtime Database 的实例
const auth = getAuth();
const db = getDatabase();

// 邮箱格式验证函数
const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/; // 简单的邮箱格式验证
    return re.test(email);
};

// 处理注册逻辑
const handleRegister = () => {
    // 清空之前的消息
    errorMessage.value = '';
    successMessage.value = '';

    // 输入验证
    if (!validateEmail(email.value)) {
        errorMessage.value = 'Invalid email format!';
        console.error('Invalid email format!');
        return;
    }

    if (password.value.length < 6) {
        errorMessage.value = 'Password must be at least 6 characters long!';
        console.error('Password too short!');
        return;
    }

    // 调用注册函数并捕获调试信息
    console.log("Attempting to register user with email:", email.value);
    registerUser(email.value, password.value, role.value);
};

// 注册用户并保存用户数据到 Realtime Database
const registerUser = (email, password, role) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userId = user.uid;

            console.log("User successfully created:", user);  // 输出调试信息

            // 保存用户角色到 Realtime Database，使用 dbRef 而不是 ref
            return set(dbRef(db, 'users/' + userId), {
                email: email,
                role: role // 可以是 'admin' 或 'user'
            });
        })
        .then(() => {
            successMessage.value = "User registered and role saved successfully!";
            console.log("User registered and role saved successfully!");  // 确认成功写入数据库
        })
        .catch((error) => {
            errorMessage.value = "Error registering user: " + error.message;
            console.error("Error registering user:", error);  // 捕获并显示错误
        });
};
</script>