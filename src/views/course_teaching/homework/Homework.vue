<template>
  <a-card  :bordered="true" style="width: 80vw;height: 9.5vh;">
    <a-card style="float: left;margin-left: -3vw;font-size: 16px;text-align: left;height: 5vh;">
      共{{number}}个活动
    </a-card>
    <a-card style="float: right;margin-top: -1vh;height: 5vh;">
      <a-dropdown>
      <template #overlay>
        <a-menu @click="" >
          <a-menu-item key="1">
            <UserOutlined />
            按添加时间升序
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
            按添加时间降序
          </a-menu-item>
          <a-menu-item key="3">
            <UserOutlined />
            按名称升序
          </a-menu-item>
          <a-menu-item key="4">
            <UserOutlined />
            按名称降序
          </a-menu-item>
        </a-menu>
      </template>
      <a-button :size="size">
        <SortAscendingOutlined />
        排序
        <DownOutlined />
      </a-button>
    </a-dropdown>
    <a-button :size="size">
      <CheckSquareOutlined />
        批量操作
    </a-button>
    <a-button :size="size">
      <DownloadOutlined />
        下载所有的作业
    </a-button>
    <a-button type="primary" shape="round"  style="background-color: rgba(10, 189, 111, 0.849);" :size="size"
      @click="addHomework">
      <AppstoreAddOutlined />
      添加作业
    </a-button>
  
    </a-card>
  </a-card>


  <a-card :bordered="true" style="width: 80vw;text-align: left;">
      <a-list item-layout="horizontal"  :data-source ="listData">
          <template #renderItem="{ item }">
            <a-list-item :key="item.title">
              <a-list-item-meta 
                 :description=item.description>
                 
                 <template #title> 
                   <a href="#" style="font-size: 16px;">{{ item.title}}</a>
                   <!-- 如果未发布 -->
                   <div v-if="item.showpub" style="float: right;">
                      <a href="#" style="font-size: 26px;margin-right: 1vw;float: left;">
                        <SendOutlined />
                        <p style="font-size: 16px;color: black;margin-left:-0.3vw;">发布</p>
                      </a>
                      <a href="#" style="font-size: 26px;margin-right: 1vw;float: left;">
                        <EllipsisOutlined />
                        <p style="font-size: 16px;color: black;margin-left:-0.3vw;">更多</p>
                      </a>
                   </div>
                   <div v-else="item.showpub"  style="float: right;">
                      <a href="#" style="font-size: 26px;margin-right: 2vw;float: left;">
                        {{ item.approved}}
                        <p style="font-size: 16px;color: black;margin-left:-1.3vw;">已批完</p>
                      </a>
                      <a href="#" style="font-size: 26px;margin-right: 2vw;float: left;">
                        {{ item.unapproved}}
                        <p style="font-size: 16px;color: black;margin-left:-1.3vw;">未批完</p>
                      </a>
                      <a href="#" style="font-size: 26px;margin-right: 2vw;float: left;">
                        {{ item.unpaid}}
                        <p style="font-size: 16px;color: black;margin-left:-0.7vw;">未交</p>
                      </a>
                   </div>
                 </template>
                 <template #avatar>
                   <a-avatar :size="size" src="src/assets/image/zuoye.png">
                  </a-avatar>
                   <p style="margin-left: 0.3vw;font-size: 16px;">作业</p>
                 </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
      </a-list>
  </a-card>
  

  <!-- 添加作业或修改发布作业对话框 -->
  <template>
    <a-modal v-model:open= "displayAdd" :title="homeTitle" @ok="handleOk" width="70vw" cancelText="取消" okText="确定">
      <a-card >
        <a-form ref="formRef" :model="addFormState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div>
            <a>导入作业</a>
          </div>
          <a-form-item label="作业类型" name="resource" :rules="resource">
            <a-radio-group v-model:value="resource">
              <a-radio value="1">个人作业</a-radio>
              <a-radio value="2">小组作业</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="homeTitle" :rules="[{ required: true, message: '作业标题' }]">
            <a-input v-model="addFormState.title" size="large" style="width: 30vw" placeholder="请输入作业标题"  />
          </a-form-item>
          <a-form-item name="content" v-model="addFormState.content"   :rules="[{ required: true, message: '请输入作业内容!'}]"
              style="margin-left: 4vw;">
            <RichText />
          </a-form-item>
          
          <a-card>
            <div style="display: flex;">
              <a-form-item label="活动内容标签" style="flex: 1; margin-right: 20px;">
                <a-input v-model="addFormState.typeLabel" size="large" placeholder="作业" />
              </a-form-item>
                <div style="flex: 1;">
                    <a-form-item
                            label="知识共享协议"
                            name="shareProtocol"
                            placeholder="不使用"
                    >
                        <a-tree-select
                                v-model:value="addFormState.shareProtocol"
                                style="width: 33vh;"
                                :tree-data="treeData"
                                placeholder="请选择" />
                        <p style="display: inline-block; font-size:larger"> &nbsp &nbsp</p>
                        <QuestionOutlined />
                    </a-form-item>
                </div>
            </div>
            <div style="display: flex;">
                <a-form-item label="应用环节" name="process">
                    <a-tree-select
                            v-model:value="addFormState.process"
                            style="width: 33vh;"
                            :tree-data="Process"
                            placeholder="请选择" />
                    </a-form-item>
              <a-form-item label="所属章节" style="flex: 1; margin-right: 20px;">
                <a-input size="large" placeholder="请选择" />
              </a-form-item>
            </div>
          </a-card>

          <a-form-item  name="delivery" style="margin-left: 4vw;">
            <a-switch v-model:checked="delivery" />
            <scan style="border:none;color: rgba(255, 68, 0, 0.829);font-size: 18px;">是否立即发布</scan>
          </a-form-item>
          </a-form>
          <div style="margin-left: 4vw;padding-left:1vw;display: flex;background-color: rgba(218,220,224,0.22)" v-if="delivery ? true : false">
              <el-form-item label="发布时间" style="margin-top: 2vh;" prop="publishDate">
                  <el-date-picker clearable
                                  v-model="addFormState.publishDate"
                                  type="datetime"
                                  placeholder="请选择发布时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item style="margin-left: 4vw;margin-top: 2vh;" label="截至时间" prop="deadline">
                  <el-date-picker clearable
                                  v-model="addFormState.deadline"
                                  type="datetime"
                                  placeholder="请选择截至时间">
                  </el-date-picker>
              </el-form-item>
          </div>
          <div style="margin-left: 4vw;padding-left:1vw;background-color: rgba(218,220,224,0.22)" v-if="delivery ? true : false">
              <el-form-item label="总分" prop="totalScore">
                  <el-input style="width: 4vw" v-model="addFormState.totalScore" placeholder="请输入总分" />
              </el-form-item>
              <a-form-item  name="isCheck" >
                  <a-switch v-model:checked="isCheck" />
                  <scan style="border:none;color: rgba(94,149,210,0.83);font-size: 18px;">进行查重</scan>
              </a-form-item>
              <div style="display: flex;" v-if="isCheck ? true : false">
                  <el-form-item label="查重警戒值" prop="checkNumber">
                      <el-input style="width: 3vw" v-model="addFormState.checkNumber"  />
                      <span>%</span>
                  </el-form-item>
                  <a-form-item style="margin-left: 4vw;"  name="isCheck" >
                      <a-switch v-model:checked="ifBack" />
                      <scan style="border:none;font-size: 18px;">自动打回</scan>
                  </a-form-item>
              </div>
          </div>
        </a-card>
    </a-modal>
  </template>
</template>
<script setup lang="ts">
import {
    SortAscendingOutlined,
    CheckSquareOutlined,
    DownloadOutlined,
    AppstoreAddOutlined,
    SendOutlined,
    EllipsisOutlined,
    QuestionOutlined, ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import type { FormInstance } from 'ant-design-vue';
import {createVNode, onMounted, reactive, ref} from 'vue';
import {fetchHomeworkData,addHomeworkT} from "../../../api/homework.js";
import RichText from '../../../components/RichText.vue';
import {Modal, notification, TreeSelectProps} from "ant-design-vue";


//变量
const size = ref<SizeType>('large');
const open = ref(false);
interface Homework {
  homeworkId: number;
  title: string;
  content: string;
  userId: number | null;
  typeLabel: string;
  shareProtocol: string;
  process: string;
  chapterId: number | null;
  ifPublish: number | null;
  publishDate: string;
  deadline: string;
  totalScore: number;
  approved: number | null;
  unpaid: number | null;
  isCheck: string;
  checkNumber: number | null;
  ifBack: string;
  status: number | null;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string | null;
  remark: string | null;
}
const number = ref(0);
// 存放从后端获取的作业数据
const homeworkList = ref<Homework[]>([]);
const listData= ref<Record<string, string | boolean>[]>([]);





const getHomeworkContentInfoAll = () => {
  fetchHomeworkData().then((res)=>{
    homeworkList.value = res;
    number.value = homeworkList.value.length; // 更新 number 的值
    fullList(homeworkList);  
  })
}

function fullList(homeworkList){
  listData.value = [];
  for(let i = 0;i<number.value;i++){
        listData.value.push({
          title:homeworkList.value[i].title,
          description:homeworkList.value[i].ifPublish === 1 ? `已发布 | 提交截止时间：${homeworkList.value[i].deadline} | 个人作业` : '未发布 | 个人作业',
          unpaid:`${homeworkList.value[i].unpaid}` === "null"? `0` : `${homeworkList.value[i].unpaid}`,
          approved:`${homeworkList.value[i].approved}` === "null"? `0` : `${homeworkList.value[i].approved}`,
          //这个是总人数减去未交的再减去已批的
          unapproved:`${homeworkList.value[i].approved}` === "null"? `0` : `${homeworkList.value[i].approved}`,
          showpub:homeworkList.value[i].ifPublish === 0?false:true
      })
    }
}
onMounted(() => {
  getHomeworkContentInfoAll();
})

//添加作业
const formRef = ref<FormInstance>();
const homeTitle = ref('添加作业')
const displayAdd = ref(false)
const resource = ref()
const delivery = ref()
const isCheck = ref()
const ifBack = ref()
const treeData = ref<TreeSelectProps['treeData']>([
    { id: 1, pId: 0, value: '1', title: '不使用' },
    { id: 2, pId: 0, value: '2', title: '署名（CC-BY）' },
    { id: 3, pId: 0, value: '3', title: '署名-相同方式共享（CC-BY-SA）' },
    { id: 4, pId: 0, value: '4', title: '署名-非商业（CC-BY-NC）' },
    { id: 5, pId: 0, value: '5', title: '署名-禁止演绎（CC-BY-ND）' },
    { id: 6, pId: 0, value: '6', title: '署名-非商业-禁止演绎（CC-BY-NC-ND）' },
    { id: 7, pId: 0, value: '7', title: '署名-非商业-相同方式共享（CC-BY-NC-SA）' },
]);
const Process = ref<TreeSelectProps['treeData']>([
    { id: 1, pId: 0, value: '1', title: '课前' },
    { id: 2, pId: 0, value: '2', title: '课中' },
    { id: 3, pId: 0, value: '3', title: '课后' },
    { id: 4, pId: 0, value: '4', title: '期中' },
    { id: 5, pId: 0, value: '5', title: '期末' },
]);
const addFormState = reactive<Homework>({
  homeworkId: 0,
  title: '',
  content: '',
  userId: 0,
  typeLabel: '',
  shareProtocol: '',
  process: '',
  chapterId: 0,
  ifPublish:  0,
  publishDate: '',
  deadline: '',
  totalScore: 0,
  approved: 0,
  unpaid: 0,
  isCheck: '',
  checkNumber:  0,
  ifBack: '',
  status: 0,
  createBy: '',
  createTime: '',
  updateBy: '',
  updateTime:  '',
  remark: '',
})
const addHomework = () => {
  homeTitle.value = '添加作业';
  resource.value = [{ required: true, message: ' ', trigger: 'change' }]
  delivery.value = false;
  displayAdd.value = true;
  isCheck.value = false;
  ifBack.value = false;

    Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定删除本次测试吗？',
        onOk() {
            addHomeworkT(addFormState).then((res)=>{
                this.open = false;
                console.log(res)
            })
            location.reload();
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));

        },
        onCancel() {},
    });
}


//提交
const handleOk = e => {
  displayAdd.value = false;
}

const labelCol = {
  style: {
    width: '10vw',
  },
};
const wrapperCol = {
  span: 20,
};
</script>
<style lang="less" scoped>
</style>