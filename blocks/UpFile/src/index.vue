<template>
  <div class=" cRKBfT">
    <my-upload
      ref="myUpload"
      action="https://fy.jd.com/selectionNotice/attachUpload"
      :file-list="fileList"
      :on-success="uploadSuccess"
      :on-progress="uploadProgress"
      :on-failed="uploadFailed"
      :on-finished="uploadFinished"
      :multiple = false
      :limit="5"
    >
    </my-upload>
    <div class="jsiOBP cailiao">

      <div class="cailiaod"></div>

      <label class="cailiaot" for="my-upload">
        <span>上传文件</span>
      </label>
      <p class="cp">请上传公告中要求提交的审核材料（1、支持PNG、JPG、DOCX、PDF类型文件；2、最多可上传5个文件，每个文件不超过50M大小。）</p>
      <table class="tab"  width="500px" cellpadding="0" cellspacing="0">
        <tr>
          <th>文件名</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in fileList" :key="index+'_fileList'">
          <td class="td-name">{{item.originalFileName}}</td>
          <td class="td-state" >上传成功</td>
          <td class="lasttd" >
            <span class="operationde" @click="removeFile(index)"> 删除</span>
          </td>
        </tr>
      </table>
      <div  class="nofile" v-if="fileList.length ==0">请选择文件</div>
    </div>
  </div>
</template>
<script>
import myUpload from './my-upload'
export default {
  name: 'action',
  data () {
    return {
      fileList: [],//上传文件列表，无论单选还是支持多选，文件都以列表格式保存
    }
  },
  created () {

  },
  props: [],
  components: {
    myUpload
  },
  mounted () {

  },
  methods: {
    removeFile (index) {
      let fileList = [...this.fileList]
      if (fileList.length) {
        fileList.splice(index, 1)
        this.onChange(fileList)
      }
    },
    onChange(fileList){//监听文件变化，增减文件时都会被子组件调用
      this.fileList = [...fileList];
      console.log(this.fileList,'调用onChange');
    },
    uploadSuccess(response, file){//某个文件上传成功都会执行该方法，index代表列表中第index个文件
      console.log(response,file,'某个文件上传成功调用uploadSuccess');
      if(response.code==='0000'){
        var fileobj = {originalFileName:'',jssFileName:'',name:'', status:'',type:''}
        fileobj.originalFileName = response.data.originalFileName
        fileobj.jssFileName = response.data.jssFileName
        fileobj.status = 'success'
        fileobj.type = file.datame.type
        let fileList = [...this.fileList];
        fileList.push(fileobj)
        this.onChange(fileList);
      }else{
        console.log('上传失败，');
      }
    },
    uploadProgress(progress){//上传进度，上传时会不断被触发，需要进度指示时会很有用
      const{ percent } = progress;
      console.log(percent,'上传进度调用uploadProgress');
    },
    uploadFailed( err){//某文件上传失败会执行，index代表列表中第index个文件
      console.log(err,'某文件上传失败uploadFailed');
    },
    uploadFinished(result){//所有文件上传完毕后（无论成败）执行，result: { success: 成功数目, failed: 失败数目 }
      console.log(result,'所有文件上传完毕onFinished');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./css/mixin";
  .cRKBfT {
    padding: 20px 30px 30px 40px;
    background: rgb(255, 255, 255);
    //上传材料
    .cailiao{
      position: relative;
      .sureupload{
        position: absolute;
        top:3px;
        left:140px;
        width:100px;
        height: 30px;
        background: #1b8f68;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 30px;
      }
      .sureupload:hover{
        cursor: pointer;
      }
      .displaynone{
        display: none;
      }
      .nofile{
        width:498px;
        text-align: center;
        background: #fff;
        font-size: 12px;
        color: #666666;
        height:36px;
        line-height: 36px;
        border:1px solid #F3F3F3;
      }
      .cailiaot {
        margin-left: 16px;
        display: inline-block;
        width:100px;
        height: 30px;
        background: #C7171E;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        line-height: 30px;
      }
      .cailiaot:hover{
        cursor: pointer;
      }
      .cailiaod{
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-top: 18px ;
        border-radius: 4px;
        background: rgb(199, 22, 34);
      }
      .cp{
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 20px;
        padding:5px 0 10px 0;
      }
      .tab{
        border:1px solid #F5F7F9;
        tr{
          height: 35px;
          line-height: 35px;
          border-top:1px solid #F5F7F9;
          font-size: 12px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
        }
        th{
          background: #F3F3F3;
          text-align: center;
          font-size: 12px;
          color: #666666;
        }
        .td-state{
          //background: url(../../assets/img/close.png) center center no-repeat;
          //background-size: 12px 12px;
        }
        .operationadd{
          cursor:pointer;
          display: inline-block;
          width:40px;
          color: #1b8f68;

        }
        .operationde{
          cursor:pointer;
          display: inline-block;
          width:40px;
          color: #C7171E;
        }
      }

    }
  }

</style>
