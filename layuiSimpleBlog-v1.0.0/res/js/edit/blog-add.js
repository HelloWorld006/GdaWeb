// const baseUrl = "http://localhost:8080/blog";
const baseUrl = "http://111.229.42.116:8080/blog";
layui.use(['form', 'layer', 'upload'], function () {
    var layer = layui.layer;
    var upload = layui.upload;
    var $ = layui.jquery;

    upload.render({
        elem: '#upload',
        url: baseUrl + '/add/add',
        auto: false,//选择文件后不自动上传
        bindAction: '#commit',
        //上传前的回调
        before: function () {
            this.data = {
                title: $('input[name="title"]').val(),
                place: $('input[name="place"]').val(),
                type: $('select[name="type"]').val(),
                isShow: $('input[name="isShow"]').val(),
                content: $('textarea[name="content"]').val()
            }
        },
        //选择文件后的回调
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                $('#preview').attr('src', result);
            })
        },
        //操作成功的回调
        done: function (res, index, upload) {
            var code = res.code === '200' ? 1 : 2;
            console.log(res.data)
            layer.alert(res.msg, {icon: code}, function () {
                parent.window.location.reload();
                if (res.data.type == 'paper') {
                    window.location.href = "../../index.html";
                } else if (res.data.type == 'whisper') {
                    window.location.href = "../../whisper.html";
                } else if (res.data.type == 'album') {
                    window.location.href = "../../album.html";
                }
            });
        },
        //上传错误回调
        error: function (index, upload) {
            layer.alert('上传失败！' + index);
        }
    });
});