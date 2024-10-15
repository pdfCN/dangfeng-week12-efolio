<template>
    <div class="container mt-5">
        <div class="row mb-3">
            <div class="col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <h1 class="text-center">🗄 W5. Library Registration Form(Changed week12)</h1>
                <h6 class="text-center">Let's build some more advanced features into out form.</h6>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="username" class="form-label">Username</label>
                            <input v-model="formData.username" type="text" id="username"
                                @blur="() => validateName(true)" @input="() => validateName(false)" class="form-control"
                                name="username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6  ">
                            <label for="gender" class="form-label">Gender</label>
                            <select v-model="formData.gender" id="gender" class="form-select"
                                @blur="() => validateGender(true)" @input="() => validateGender(false)">
                                <option value="">Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>

                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="password" class="form-label">Password</label>
                            <input v-model="formData.password" type="password" id="password"
                                @blur="() => validatePassword(true)" @input="() => validatePassword(false)"
                                class="form-control" name="password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>

                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="confirm-password" class="form-label">Confirm password</label>
                            <input type="password" class="form-control" id="confirm-password"
                                @blur="() => validateComfirmPassword(true)" @input="() => validateComfirmPassword(true)"
                                v-model="formData.confirmPassword" />
                            <div v-if="errors.confirmPassword" class="text-danger">
                                {{ errors.confirmPassword }}
                            </div>

                        </div>
                        <div class="col-md-6 col-sm-6">

                            <label for="isAustralian" class="form-label">Australian Resident?</label>
                            <div class="form-check">

                                <div>
                                    <div>
                                        <label for="isAustralianYes" class="form-check-label me-3">
                                            <input v-model="formData.isAustralian" type="radio" id="isAustralianYes"
                                                value="true" @blur="() => validateIsAustralian(true)"
                                                @input="() => validateIsAustralian(false)" class="form-check-input"
                                                name="isAustralian">
                                            Yes
                                        </label>
                                    </div>
                                    <div>
                                        <label for="isAustralianNo" class="form-check-label">
                                            <input v-model="formData.isAustralian" type="radio" id="isAustralianNo"
                                                value="false" @blur="() => validateIsAustralian(true)"
                                                @input="() => validateIsAustralian(false)" class="form-check-input"
                                                name="isAustralian">
                                            No
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
                        </div>

                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason For Joining</label>
                        <textarea v-model="formData.reason" id="reason" class="form-control" name="reason" rows="3"
                            @blur="() => validateReason(true)" @input="() => validateReason(true)">
                        </textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                        <div v-if="reasonMessage" class="text-reasonMessage">{{ reasonMessage }}</div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Suburb</label>
                        <input type="text" class="form-control" id="suburb" v-model="formData.suburb" />
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="container mt-5 " v-if="submittedCards.length">
            <DataTable :value="submittedCards" :columns="columns" :tableStyle="'min-width: 50rem'">
                <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
            </DataTable>
        </div>
    </div>



</template>

<script setup>
// Our logic will go here
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: null,
    reason: '',
    suburb: 'Clayton',
    gender: ''
});

const columns = ref([
    { field: 'username', header: 'Username' },
    { field: 'password', header: 'Password' },
    { field: 'isAustralian', header: 'Australian Resident' },
    { field: 'gender', header: 'Gender' },
    { field: 'reason', header: 'Reason for joining' }
]);

const submittedCards = ref([]);

// const submittedCards = ref([
//     { username: 'Jinx', password: '12345Qq@', isAustralian: true, gender: 'male', reason: 'None' },
//     { username: 'Delvin', password: '12344Q#Ww', isAustralian: true, gender: 'male', reason: 'Love reading' },
//     { username: 'Yiwei', password: '45678QSr', isAustralian: true, gender: 'male', reason: 'Feel Boring' }
// ]);

const submitForm = () => {
    validateName(true);
    validatePassword(true);
    validateIsAustralian(true);
    validateGender(true);
    validateReason(true);
    validateComfirmPassword(true);

    if (!errors.value.username && !errors.value.password && !errors.value.isAustralian && !errors.value.gender && !errors.value.reason && !errors.value.confirmPassword) {
        submittedCards.value.push({
            ...formData.value
        });
        clearForm();
    }
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        confirmPassword: '',
        isAustralian: null,
        reason: '',
        gender: ''
    };
    // submittedCards.value = [];
};

const errors = ref({
    username: null,
    password: null,
    confirmPassword: null,
    isAustralian: null,
    gender: null,
    reason: null,
});

const reasonMessage = ref();
const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
};

const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
};

const validateComfirmPassword = (blur) => {
    const password = formData.value.password;
    const confirmPassword = formData.value.confirmPassword;

    if (password == confirmPassword) {
        errors.value.confirmPassword = null;
    } else {
        if (blur) errors.value.confirmPassword = "Password is not match!"
    }

};

const validateIsAustralian = (blur) => {
    if (formData.value.isAustralian == null) {
        if (blur) errors.value.isAustralian = "Please confirm if you are an Australian resident.";
    } else {
        errors.value.isAustralian = null;
    }
};

const validateGender = (blur) => {
    if (!formData.value.gender) {
        if (blur) errors.value.gender = "Please select a gender.";
    } else {
        errors.value.gender = null;
    }
};

const validateReason = (blur) => {
    if (formData.value.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters long.";
    } else {
        errors.value.reason = null;
    }
    if (formData.value.reason.includes('friend')) {
        if (blur) reasonMessage.value = "Great to have a friend";
    } else {
        reasonMessage.value = null;
    }
};


</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.list-group-item {
    padding: 10px;
}

.text-reasonMessage {
    color: green;
}
</style>