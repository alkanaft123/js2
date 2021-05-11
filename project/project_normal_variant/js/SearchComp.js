Vue.component('search', {
    data(){
        return {
            userSearch: '',
        }
    },
    methods: {
        filter(){
            this.filtered = this.$root.$refs.products.filter(this.userSearch);
        }
    },
    mounted(){
           
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="filter">
            <input type="text" class="search-field" v-model="userSearch">
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
});