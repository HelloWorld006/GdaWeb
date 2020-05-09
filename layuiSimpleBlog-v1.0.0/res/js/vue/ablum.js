import {dataFun} from '../util/systemTool.js'
const baseUrl = dataFun.getBaseUrl();
var albumapp = new Vue({
    el: '#albumapp',
    data: {
        albums: [{}],
        album: {},
        user: {
            ip: '1.1.1.1',
            area: '北京市',
            brower: 'chrome',
            os: 'windows7',
            action: 'album'
        }
    },
    mounted() {
        this.initDetail();
        this.initUserDate();
    },
    methods: {
        initDetail() {
            const url = baseUrl + '/album/getAlbum';
            this.$http.get(url).then(function (res) {
                this.albums = res.data.data.albums;
                this.initAlbum();
            }, function () {
                console.log('请求失败处理');
            });
        },
        initAlbum() {
            var a = 0
            for (let album of this.albums) {
                if (a == 0) {
                    this.album = album;
                    break;
                }
            }
        },
        initUserDate() {
            this.user.ip = sessionStorage.getItem('ip')
            this.user.area = sessionStorage.getItem('area')
            this.user.brower = dataFun.GetCurrentBrowser()
            this.user.os = dataFun.GetOs()
            console.log(this.user);
            const pUrl = baseUrl + "/visitor/doAdd"
            this.$http.post(pUrl, this.user, {emulateJson: true}).then(function (res) {
                // window.location.href = "";
            }, function (res) {
                console.log(res.status);
            });
        }
    },
});



