<template>
  <div>
    <input style="display:none" @change="addFile" :multiple="multiple" type="file" :name="name" id="my-upload"/>
  </div>
</template>

<script>
export default {
  name: 'my-upload',
  props: {
    name: String,
    action: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      default: []
    },
    multiple: Boolean,
    limit: Number,
    onProgress: Function,
    onSuccess: Function,
    onFailed: Function,
    onFinished: Function
  },
  methods: {
    addFile({target: {files}}){//input标签触发onchange事件时，将文件加入待上传列表
      console.log(files[0],'hongmeizaicshi')
      if(this.fileList.length == 5){
        alert('最多可上传5个文件')
        return
      }
      if(files[0].size >= 52428800){
        alert('请您上传小于50M的文件')
        return
      }
      var typefile = files[0].type;
      if(/\/png/.test(typefile)){
        files[0].datame = {type:82,file:files[0]}
      }else if(/\/jpeg/.test(typefile)){
        files[0].datame = {type:82,file:files[0]}
      }else if(/\/pdf/.test(typefile)){
        files[0].datame = {type:81,file:files[0]}
      }else if(/\.document/.test(typefile)){
        files[0].datame = {type:81,file:files[0]}
      }else{
        alert('请您上传系统支持的文件格式')
        return
      }
      files[0].url = URL.createObjectURL(files[0]);//创建blob地址，不然图片怎么展示？
      files[0].status = 'ready';//开始想给文件一个字段表示上传进行的步骤的，后面好像也没去用......
      this.submit(files)
    },
    submit(files){
      if ( typeof XMLHttpRequest !== 'undefined'){
        this.xhrSubmit(files[0])
      } else {
        this.fetchSubmit(files)
      }
    },
    xhrSubmit(files){
      const _this = this;
      let option = {
        data: files.datame,
        action: _this.action,
        onProgress(e){
          _this.onProgress( e);//闭包
        },
        onSuccess(res){
          _this.onSuccess(res,files);
        },
        onFinished(res){
          _this.onFinished(res);
        },
        onError(err){
          _this.onFailed(err);
        }
      };
      let send = async option => {
        await _this.sendRequest(option);
      };
      send(option);
    },
    fetchSubmit(newfileList){
      let action = this.action;
      const promises = newfileList.map(each => {
        each.status = "uploading";
        return fetch(action, {
          method: 'POST',
          headers: {
          },
          body: each.datame
        }).then(res => res.text()).then(res => JSON.parse(res));//这里res.text()是根据返回值类型使用的，应该视情况而定
      });
      // "Content-Type" : "application/x-www-form-urlencoded"
      // 'Content-Type': 'multipart/form-data'menglin
      //'Content-Type': 'multipart/image/png'
      Promise.all(promises).then(resArray => {//多线程同时开始，如果并发数有限制，可以使用同步的方式一个一个传，这里不再赘述。
        let success = 0, failed = 0;
        resArray.forEach((res, index) => {
          if(res.code == '0000'){
            success++;                  //统计上传成功的个数，由索引可以知道哪些成功了
            this.onSuccess(res, newfileList[0]);
          }else{      //约定失败的返回值是520
            failed++;                  //统计上传失败的个数，由索引可以知道哪些失败了
            this.onFailed(res);
          }
        });
        return { success, failed };     //上传结束，将结果传递到下文
      }).then(this.onFinished);           //把上传总结果返回
    },
    sendRequest(option){

      upload(option);

      function getError(action, option, xhr) {
        var msg = void 0;
        if (xhr.response) {
          msg = xhr.status + ' ' + (xhr.response.error || xhr.response);
        } else if (xhr.responseText) {
          msg = xhr.status + ' ' + xhr.responseText;
        } else {
          msg = 'fail to post ' + action + ' ' + xhr.status;
        }

        var err = new Error(msg);
        err.status = xhr.status;
        err.method = 'post';
        err.url = action;
        return err;
      }

      function getBody(xhr) {
        var text = xhr.responseText || xhr.response;
        if (!text) {
          return text;
        }

        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      }

      function upload(option) {
        if (typeof XMLHttpRequest === 'undefined') {
          return;
        }

        var xhr = new XMLHttpRequest();
        var action = option.action;

        if (xhr.upload) {
          xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
              e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
          };
        }

        var formData = new FormData();

        if (option.data) {
          Object.keys(option.data).map(function (key) {
            formData.append(key, option.data[key]);
          });
        }

        formData.append(option.filename, option.file);

        xhr.onerror = function error(e) {
          option.onError(e);
        };

        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(action, option, xhr));
          }

          option.onSuccess(getBody(xhr));
        };

        xhr.open('post', action, true);

        if (option.withCredentials && 'withCredentials' in xhr) {
          xhr.withCredentials = true;
        }

        var headers = option.headers || {};
        // headers['Content-Type'] = 'multipart/form-data'
        // xhr.setRequestHeader("Content-Type","multipart/form-data");

        for (var item in headers) {
          if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
          }
        }
        xhr.send(formData);

        return xhr;
      }
    },
  }
}
</script>
