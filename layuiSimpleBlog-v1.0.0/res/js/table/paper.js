
const baseUrl = "http://localhost:8088/gda/gda"
layui.use('table', function () {
    var table = layui.table;

    //方法级渲染
    table.render({
        elem: '#LAY_table_user'
        , url: baseUrl +"/list"//数据接口
        , response: {
            statusCode: 200 //规定成功的状态码，默认：0
        }
        ,parseData:function (res) {
            return{
                "code":res.code,
                "msg":res.message,
                "data":res.data.data
            }
        }
        , cols: [[
             {field: 'id', title: '项目id', width: 180, sort: true, fixed: true}
             ,{field: 'title', title: '项目名称', width: 180}
            ,{field: 'url', title: '项目地址', width: 180}
            , {field: 'pic', title: '项目图片', width: 180}
            , {field: 'isShow', title: '显示', width: 60}
            , {field: 'right', title: '操作', width: 300, toolbar: "#barDemo"}
        ]]
        , id: 'testReload'
        , height: 600
        , width: 1200
        , even: true
        , page: true //是否显示分页
        , limits: [3, 5, 10, 20]
        , limit: 10 //每页默认显示的数量
        ,count:"count"
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
        if (obj.event === 'detail') {
            //window.location.href = "../../details.html?id=" + data.id
            // layer.msg('ID：' + data.id + ' 的查看操作');
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                console.log({"uvid": data.id, "action": "delete"});
                $.ajax({
                    url: baseUrl + "/doDelete?id=" + data.id,
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
        } else if (obj.event === 'edit') {
            //跳转页面进行编辑
           // window.location.href = "../edit/paper-update.html?id=" + data.id
        }
    });

});

// window.onload = function () {
//     var papertableapp = new Vue({
//         el: '#papertableapp',
//         data: {
//             user: {
//                 ip: '1.1.1.1',
//                 area: '北京市',
//                 brower: 'chrome',
//                 os: 'windows7',
//                 action: 'paperTable'
//             }
//         },
//         mounted() {
//             this.initUserDate();
//         },
//         methods: {
//             initUserDate() {
//                 this.user.ip = sessionStorage.getItem('ip')
//                 this.user.area = sessionStorage.getItem('area')
//                 this.user.brower = dataFun.GetCurrentBrowser()
//                 this.user.os = dataFun.GetOs()
//                 console.log(this.user);
//                 const pUrl = baseUrl + "/visitor/doAdd"
//                 this.$http.post(pUrl, this.user, {emulateJson: true}).then(function (res) {
//                     // window.location.href = "";
//                 }, function (res) {
//                     console.log(res.status);
//                 });
//             }
//         }
//     });
// };