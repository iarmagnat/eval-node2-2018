moment.locale("fr")

function getData(url) {
    return fetch(url, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
}

const vm = new Vue({
    el: '#form',
    data: {
        pwd: ""
    },
    methods: {
        putDatas: function () {
            return fetch('http://localhost:4001/secret', {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"secret": this.pwd}),
            }).then(res => res.json())
        }
    },
    created: function () {
        console.log(this.pwd)
    }
})

let fetchTimeout

const app = new Vue({
    el: '#app',
    data: {
        servers: {
            time: {
                name: "Time Server (4000)",
                url: "http://localhost:4000",
                pk: "time",
                pos: 0,
            },
            secret: {
                name: "Secret Server (4001)",
                url: "http://localhost:4001/secret",
                pk: "secret",
                pos: 1,
            },
            history: {
                name: "Secret History Server (4002)",
                url: "http://localhost:4002/1",
                pk: "history",
                pos: 2,
            },
        },
        pileSize: 100,
        mode: "secret",
        serverData: [],
        reversed: false,
        page: 0,
        perPage: 25,
    },
    computed: {
        displayData() {
            let all = []
            if (this.reversed) {
                all = this.serverData.slice().reverse()
            } else {
                all = this.serverData
            }
            return all.slice(this.page * this.perPage, (this.page + 1) * this.perPage)
        },
    },
    methods: {
        pushToPile(newLine) {
            this.serverData.unshift(newLine)

            if (this.serverData.length > this.pileSize) {
                this.serverData.pop()
            }
        },
    },
    created() {
        fetchTimeout = setInterval(function () {
            const urls = []
            Object.keys(app.servers).forEach(serverName => {
                urls.push(app.servers[serverName].url)
            })

            Promise.all(urls.map(url => getData(url)))
                .then(data => {
                    data.push(moment())
                    app.pushToPile(data)
                })
                .catch(e => {
                        console.error(e)
                        app.pushToPile(["DOWN", "DOWN", "DOWN", moment()])
                    }
                )
        }, 1000)
    }
})