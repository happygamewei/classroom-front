<template>
  <div>
    <Header />

  <a-menu class="menu" v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handleMenuClick"/>
    <div v-if="current[0] === 'TestDetail'" style="margin: 3vh 0vh 0vh 8vh;">
      <a-card style="width: 185vh; height: 25vh; border-color: rgba(197, 201, 205, 0.679); position: relative;">
        <div style="width: 7vh; height: 5vh; background-color: rgb(239, 219, 39); position: absolute; top: 0; left: 0;">
            <p style="color: white; margin-top: 1vh;">测试</p>
        </div>
        <div style="width: 150vh; height: 23vh;display: inline-block; float: left;">
          <div v-if="OneTest?.publishDate != null" style="float: left; display: inline-block; background-color: rgba(108, 255, 137, 0.615); width: 6.5vh; height: 3vh; border-radius: 10%; margin: 3vh 0vh 0vh 1.5vh;">
            <p style="color: rgba(79, 170, 63, 0.805);">进行中</P>
          </div>
          <div v-else style="float: left; display: inline-block; background-color: rgba(255, 226, 220, 0.951); width: 6.5vh; height: 3vh; border-radius: 10%; margin: 3vh 0vh 0vh 1.5vh;">
            <p style="color: rgba(243, 88, 32, 0.812);">未发布</P>
          </div>
            <h2 style="margin: 2vh 0vh 0vh 3vh; float: left; display: inline-block;">{{ OneTest?.title }}</h2>
            <div style="margin-top: 8vh;margin-left: 1vh; background-color:rgba(219, 227, 227, 0.736); width: 9vh; height: 3vh; border-radius: 10%;">
              <p style="color:darkgrey">普通测试</P>
            </div>

            <div style="width: 140vh; height: 9vh; margin: 2vh 0vh 0vh 1vh;text-align: left;">{{ OneTest?.content }}</div>
        </div>

        <div style="width: 25vh;display: inline-block;float: right;">

          <div style="float: left; margin-top: 6vh; cursor: pointer;">
            <div class="change" style="font-size: 3vh;">
              <CustomerServiceOutlined />
            </div>
            <p>讲解</p>
          </div>
          <div style="float: left; margin: 6vh 0vh 0vh 4vh;cursor: pointer;">
            <div class="change" style="font-size: 3vh;">
              <EyeOutlined/>
           </div>
              <p>监控</p>
          </div>



          <a-dropdown>
            <div class="change" @click.prevent style=" font-size: 3vh; margin-top: 2vh;cursor: pointer;">
              <MoreOutlined />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">编辑</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

          <div style="width: 20vh; height: 3vh; display: block;margin-top: 10vh;">

            <a-popover trigger="hover">
              <template #content>
                {{ OneTest?.shareProtocol }}
              </template>
              <p style="color:darkgrey;font-size: small;display: inline-block;">知识共享协议: &nbsp</p>
              <TeamOutlined />
              <SmileOutlined />
            </a-popover>
          </div>
        </div>
      </a-card>
<div>
<a-card
  style="width: 40vh;height: 70vh;display: inline-block;float: left;margin-top: 3vh;"
  :tab-list="tabList"
  :active-tab-key="Key"
  @tabChange="key => onTabChange(key, 'Key')"
>
  <div v-if="Key === 'ViewExamPaper'">试卷概览</div>
  <div v-else="Key === 'AddQuestion'">
      <div>
        <a-button style="width: 15vh;height: 5vh; float: left; margin-bottom: 2vh;">
          <div style="color: rgb(252, 85, 85); display: inline-block;">
            <CheckOutlined />
          </div>
          <b>&nbsp 判断题</b>
        </a-button>

      <a-button style="width: 15vh;height: 5vh; float: right;margin-bottom: 2vh;">
        <div style="color: rgb(25, 186, 135); display: inline-block;">
          <CheckCircleOutlined />
        </div>
        <b>&nbsp 单选题</b>
      </a-button>

      <a-button style="width: 15vh;height: 5vh; float: left;margin-bottom: 2vh;">
        <div style="color: rgb(104, 199, 63); display: inline-block;">
          <PlusSquareOutlined />
          </div>
        <b>&nbsp 多选题</b>
      </a-button>

      <a-button style="width: 15vh;height: 5vh;float: right;margin-bottom: 2vh;">
        <div style="color: rgb(252, 85, 85); display: inline-block;">
          <MenuUnfoldOutlined />
          </div>
        <b>&nbsp 不定项题</b>
      </a-button>

      <a-button style="width: 15vh;height: 5vh;float: left;margin-bottom: 2vh;">
        <div style="color: rgb(96, 187, 214); display: inline-block;">
          <CalculatorOutlined />
          </div>
        <b>&nbsp 填空题</b>
      </a-button>

      <a-button style="width: 15vh;height: 5vh;float: right;margin-bottom: 2vh;">
        <div style="color: rgb(196, 166, 75); display: inline-block;">
          <FileSearchOutlined />
          </div>
        <b>&nbsp 文件题</b>
      </a-button>

      <a-button style="width: 15vh;height: 5vh;float: left;margin-bottom: 2vh;">
        <div style="color: rgb(156, 77, 185); display: inline-block;">
          <ControlOutlined />
          </div>
        <b>&nbsp 简答题</b>
      </a-button>


      <a-button style="width: 33vh;height: 5vh;float: left;margin-bottom: 2vh;">
        <div style="color: rgba(78, 147, 221, 0.995); display: inline-block;">
          <UnorderedListOutlined />
          </div>
        <b>&nbsp 段落说明</b>
      </a-button>
    </div>
  </div>
</a-card>
<div style="border: rgba(167, 164, 164, 0.422) solid 1px;border-radius: 2vh; height: 7vh; width: 140vh;
            display: flex; align-items: center; margin-top: 3vh; margin-left: 45vh;">
  <div style="height: 7vh;width: 20vh; display: flex; align-items: center;margin-left: 5vh;">
    <b>
      <p style="display: inline;">共</p>
      <p style="display: inline;color: rgb(74, 153, 255);">{{ 0 }}</p>
      <p style="display: inline;">题，总分</p>
      <p style="display: inline;color: rgb(74, 153, 255);">{{ 0 }}</p>
      <p style="display: inline;">分</p>
    </b>
  </div>
  <div style="height: 7vh;width: 20vh; display: flex; align-items: center;margin-left: 7vh;margin-top: 2.5vh;">
    <p style="display: inline;color: rgb(74, 153, 255);">
      <OrderedListOutlined />
      &nbsp 批量排序</p>
  </div>
  <div style="height: 7vh;width: 20vh; display: flex; align-items: center;margin-left: 3vh;margin-top: 2.5vh;">
    <p style="display: inline;color: rgb(74, 153, 255);">
      <MinusCircleOutlined />
      &nbsp 批量删除</p>
  </div>
  <div style="height: 7vh;width: 20vh; display: flex; align-items: center;margin-left: 3vh;margin-top: 2.5vh;">
    <p style="display: inline;color: rgb(74, 153, 255);">
      <FileDoneOutlined />
      &nbsp 批量改分值</p>
  </div>
  <div style="height: 7vh;width: 20vh; display: flex; align-items: center;margin-left: 3vh;margin-top: 2.5vh;">
    <p style="display: inline;color: rgb(74, 153, 255);">
      <FileWordOutlined />
      &nbsp 导出word</p>
  </div>
  <div style="height: 7vh;width: 20vh; display: flex; align-items: center;margin-left: 3vh;margin-top: 2.5vh;">
    <p style="display: inline;color: rgb(74, 153, 255);">
      <EyeOutlined />
      &nbsp 预览试题</p>
  </div>
</div>



</div>
<div>

</div>

    </div>

<div v-if="current[0] === 'TestSettings'" style="margin-left: 13vh;">
      <div class="steps-content" style=" background-color: white; display: inline-block; width: 180vh; height: 75vh;">
  <div>
    <h3 style="float: left;position: absolute; margin: 3vh 0vh 0vh 3vh;"><b>试卷标签设置</b></h3>

    <a-form ref="formRef" :model="testForm">
      <a-form-item
      style="margin: 9vh 0vh 0vh 3vh;position: absolute;"
        label="试卷标签"
        name="testLabel"
      >
      <div style="display: inline-block;float: left; margin-top: 0.5vh;">
        <QuestionOutlined />
      </div>
      <a-radio-group  v-model:value="testForm.testLabel" style="display: inline-block; float: left; margin-left: 20vh;">
        <a-radio :value="1">普通测试</a-radio>
        <a-radio :value="2">考试</a-radio>
      </a-radio-group>
    </a-form-item>
    </a-form>
</div>
</div>
</div>

<div v-if="current[0] === 'ApprovalTesting'" style="margin-left: 13vh;">
批阅测试
</div>

<div v-if="current[0] === 'TestAnalysis'" style="margin-left: 13vh;">
测试分析
</div>

  </div>
</template>

<script lang='ts' setup>
import Header from '../../../components/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue';
import { EyeOutlined,CustomerServiceOutlined,MoreOutlined,SmileOutlined,TeamOutlined,OrderedListOutlined,
        MinusCircleOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import { SelectTest } from '../../../api/test';
import { QuestionOutlined,CheckOutlined,CheckCircleOutlined,PlusSquareOutlined,
          UnorderedListOutlined,FileSearchOutlined,CalculatorOutlined,ControlOutlined,
          MenuUnfoldOutlined,FileWordOutlined,FileDoneOutlined,} from '@ant-design/icons-vue';

const route = useRoute()
const router = useRouter
const OneTest = ref(null)
const testId = route.query.testId
const current0 = ref<number>(0);
if(testId !== undefined){
  SelectTest(testId).then((res)=>{
    OneTest.value = res
  })
}
const testForm = ref({
    title: '',
    chapterId:'',
    typeLabel:'测试',
    shareProtocol:'',
    testLabel:1,
    process:'',
    publishDate:'',
    deadline:'',
    courseId:'',
  })
const Key = ref('');
const key = ref();
  const onTabChange = (value: string, type: string) => {
  console.log(value, type);
  if (type === 'key') {
    key.value = value;
  } else if (type === 'Key') {
    Key.value = value;
  }
};

  const tabList = [
{
    key: 'AddQuestion',
    tab: '添加试题',
  },
  {
    key: 'ViewExamPaper',
    tab: '试卷概览',
  },
]

const current = ref<string[]>(['TestDetail']);
const items = ref<MenuProps['items']>([
  {
    key: 'TestDetail',
    label: '测试详细',
    title: 'TestDetail',
  },
  {
    key: 'TestSettings',
    label: '测试设置',
    title: 'TestSettings',
  },{
    key:'ApprovalTesting',
    label:'批阅测试',
    title:'ApprovalTesting'
  },{
    key:'TestAnalysis',
    label:'测试分析',
    title:'TestAnalysis'
  }

]);

const handleMenuClick = (key) => {
      current.value = key;
    };


</script>
<style scoped>

.change:hover{
  color: hsl(202, 5%, 44%);

  }

.menu{
  margin-top: 12vh;
  margin-left: 8vh;
}
</style>
