Vue.component('error', {
    data(){
        return {
            visible: false,
        }
    },
    methods: {
        
    },
    mounted(){
           
    },
    template: `
        <p v-show="visible">No data</p>
    `
});