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
        async getBookCountAPI() {
            this.isLoadingCount = true; 
            try {
                const response = await axios.get('https://countbooks-lxracvw3gq-uc.a.run.app');
                this.jsondata = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error.message;
                this.count = null;
            } finally {
                this.isLoadingCount = false; 
            }
        }
    },

    mounted() {
        this.getBookCountAPI()
    }
};


</script>

<style scoped>
pre{
    text-align: center;
}
</style>