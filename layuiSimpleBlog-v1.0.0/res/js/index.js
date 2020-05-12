var app = new Vue({
    el: '#app',
    data: {
        gdas: [{}]
    },
    mounted() {
        this.initDetail();
    },
    methods: {
        initDetail() {
            const url = 'http://localhost:8088/gda/gda/list?page=1&limit=10';
            this.$http.get(url).then(function (res) {
                this.gdas = res.data.data.data;
            }, function () {
                console.log('请求失败处理');
            });
        },
    }
});



