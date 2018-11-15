moment.locale("fr")

const vm = new Vue({
    el: '#form',
    data: {
        pwd: ""
    },
    methods: {
        putDatas: function(){
            return fetch('http://localhost:4001/secret', {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"secret":this.pwd}),
            }).then(res => res.json())
        }
    },
})
