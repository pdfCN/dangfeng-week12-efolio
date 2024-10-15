<template>
    <pre>{{ jsondata }}</pre>
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
            jsondata: null
        };
    },
    methods: {
        async getAllBookAPI() {
            this.isLoadingList = true;
            try {
                const response = await axios.get('https://getallbooks-lxracvw3gq-uc.a.run.app');
                this.jsondata = response.data;
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

    mounted() {
        this.getAllBookAPI()
    }
};


</script>

<style scoped>
pre{
    text-align: center;
}
</style>