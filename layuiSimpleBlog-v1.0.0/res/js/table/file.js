import {dataFun} from '../util/systemTool.js'
const baseUrl = dataFun.getBaseUrl();
layui.use('table', function () {
    var table = layui.table;
    //方法级渲染
    table.render({
        elem: '#LAY_table_user'
        , url: baseUrl + '/file/getFileList' //数据接口
        , response: {
            statusCode: 200 //规定成功的状态码，默认：0
        }
        , cols: [[
            {field: 'fileName', title: '文件名', width: 180, sort: true, fixed: true}
            , {field: 'fileType', title: '文件类型', width: 100}
            , {field: 'filePath', title: '文件路径', width: 180}
            , {field: 'loadNum', title: '下载次数', width: 180}
            , {field: 'createDate', title: '创建时间', width: 30}
            , {field: 'right', title: '操作', width: 300, toolbar: "#barDemo"}
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
                console.log({"uvid": data.id, "action": "delete"});
                $.ajax({
                    url: baseUrl + "/file/deleteFile?id=" + data.id,
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
        } else if (obj.event === 'download') {
            var a = document.createElement("a");
            a.download = data.fileName;
            a.href = "http://111.229.42.116:80/usr/local/blog/pic/file/" + data.fileName;
            $("body").append(a);
            a.click();
            $(a).remove();
        }
    });

    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#uploadExample' //绑定元素
            , url: baseUrl + "/file/addFile" //上传接口
            , accept: 'file'
            , done: function (res) {
                layui.use('layer', function () {
                    window.location.href = "fileTable.html";
                });
            }
            , error: function () {
                //请求异常回调
            }
        });
    });

});
window.onload = function () {
    var ablumtableapp = new Vue({
        el: '#ablumtableapp',
        data: {
            user: {
                ip: '1.1.1.1',
                area: '北京市',
                brower: 'chrome',
                os: 'windows7',
                action: 'albumTable'
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