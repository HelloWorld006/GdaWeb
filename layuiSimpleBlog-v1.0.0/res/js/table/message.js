import {dataFun} from '../util/systemTool.js'
const baseUrl = dataFun.getBaseUrl();
layui.use('table', function () {
    var table = layui.table;
    //方法级渲染
    table.render({
        elem: '#LAY_table_user'
        , url: baseUrl + '/message/getMessageList' //数据接口
        , response: {
            statusCode: 200 //规定成功的状态码，默认：0
        }
        , cols: [[
            {field: 'title', title: '标题', width: 180, fixed: true}
            , {field: 'content', title: '内容', width: 450}
            , {field: 'type', title: '类型', width: 80}
            , {field: 'username', title: '用户', width: 80}
            , {field: 'createDate', title: '创建时间', width: 180, sort: true}
            , {field: 'right', title: '操作', width: 110, toolbar: "#barDemo"}
        ]]
        , id: 'testReload'
        , height: 600
        , width: 1200
        , even: true
        , page: true //是否显示分页
        , limits: [3, 5, 10, 20]
        , limit: 10 //每页默认显示的数量
    });
    var $ = layui.$, active = {
        reload: function () {
            var demoReload = $('#demoReload');
            console.log(demoReload.val());
            table.reload('testReload', {
                where: {
                    keyword: demoReload.val()
                }
            });
        }
    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    //监听工具条
    table.on('tool(useruv)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                $.ajax({
                    url: baseUrl + "/message/deleteMessage?id=" + data.id,
                    type: "GET",
                    // data: {"id": data.id, "action": "delete"},
                    // dataType: "json",
                    success: function (data) {
                        console.log(data)
                        if (data.code == 200) {
                            //删除这一行
                            obj.del();
                            //关闭弹框
                            layer.close(index);
                            layer.msg("删除成功", {icon: 6});
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    }

                });
            });
        }
    });

});

window.onload = function () {
    var messagetableapp = new Vue({
        el: '#messagetableapp',
        data: {
            user: {
                ip: '1.1.1.1',
                area: '北京市',
                brower: 'chrome',
                os: 'windows7',
                action: 'messageTable'
            }
        },
        mounted() {
            this.initUserDate();
        },
        methods: {
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
        }
    });
};