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
  

  <!-- 添加作业 -->
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
            <a-input size="large" style="width: 30vw" placeholder="请输入名称"  />
          </a-form-item>
          <a-form-item name="content"   :rules="[{ required: true, message: '请输入内容!'}]"
              style="margin-left: 4vw;">
            <RichText />
          </a-form-item>
          
          <a-card>
            <div style="display: flex;">
              <a-form-item label="活动内容标签" style="flex: 1; margin-right: 20px;">
                <a-input size="large" placeholder="作业" />
              </a-form-item>

              <a-form-item label="知识共享协议" style="flex: 1;">
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click.prevent>
                  <a-input size="large" placeholder="不使用" />
                    <DownOutlined />
                  </a>

                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <a href="">署名（CC-BY）</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">署名-相同方式共享（CC-BY—SA）</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">署名-非商业（CC-BY—NC）</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">署名-禁止演绎（CC-BY—ND）</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">署名-非商业-禁止演绎（CC-BY—NC-ND）</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="">署名-非商业-相同方式共享（CC-BY—NC-SA）</a>
                    </a-menu-item>
                  </a-menu>
                </template>
                </a-dropdown>
              </a-form-item>
            </div>
            <div style="display: flex;">
              <a-form-item label="应用环节" style="flex: 1; margin-right: 20px;">
                <a-input size="large" placeholder="请选择" />
              </a-form-item>
              <a-form-item label="所属章节" style="flex: 1; margin-right: 20px;">
                <a-input size="large" placeholder="请选择" />
              </a-form-item>
            </div>
          </a-card>

          <a-form-item  name="delivery" style="margin-left: 4vw;">
            <a-switch v-model:checked="delivery" />
            <scan style="color: rgba(255, 68, 0, 0.829);font-size: 18px;">是否立即发布</scan>
          </a-form-item>
          </a-form>
        </a-card>
    </a-modal>
  </template>
</template>
<script setup lang="ts">
import { SortAscendingOutlined,CheckSquareOutlined,DownloadOutlined,AppstoreAddOutlined,SendOutlined,EllipsisOutlined } from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import type { FormInstance } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue';
import {fetchHomeworkData} from "../../../api/homework.js";
import RichText from '../../../components/RichText.vue';
// import  AddHomework from './AddHomework.vue';


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