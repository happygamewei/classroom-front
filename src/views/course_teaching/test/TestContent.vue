<template>
  <div>
    <Header />

  <a-menu class="menu" v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handleMenuClick"/>
    <div v-if="current[0] === 'TestDetail'" style="margin: 3vh 0vh 0vh 8vh;">
      <a-card style="width: 185vh; height: 28vh; border-color: rgba(197, 201, 205, 0.679); position: relative;">
        <div style="width: 7vh; height: 5vh; background-color: rgb(239, 219, 39); position: absolute; top: 0; left: 0;">
            <p style="color: white; margin-top: 1vh;">测试</p>
        </div>
        <div style="width: 150vh; height: 23vh;display: inline-block; float: left;">
          <div style="float: left; display: inline-block; background-color: rgba(0, 255, 170, 0.437); width: 6.5vh; height: 3vh; border-radius: 10%; margin: 3vh 0vh 0vh 1.5vh;">
            <p style="color: rgb(76, 233, 65);">进行中</P>
          </div>
            <h2 style="margin: 2vh 0vh 0vh 3vh; float: left; display: inline-block;">{{ OneTest?.title }}</h2>
            <div style="margin-top: 8vh;margin-left: 1vh; background-color:rgba(219, 227, 227, 0.736); width: 9vh; height: 3vh; border-radius: 10%;">
              <p style="color:darkgrey">普通测试</P>
            </div>

            <div style="width: 140vh; height: 9vh; margin: 2vh 0vh 0vh 1vh;text-align: left;">{{ OneTest?.content }}</div>
        </div>

        <div style="width: 25vh; height: 23vh;display: inline-block;float: right;">

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

          <div style="width: 20vh; height: 3vh; display: block;margin-top: 12vh;">

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
    </div>

    <div v-if="current[0] === 'TestSettings'" style="margin-left: 13vh;">
      <h1>48484</h1>
    </div>

  </div>
</template>

<script lang='ts' setup>
import Header from '../../../components/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue';
import { EyeOutlined,CustomerServiceOutlined,MoreOutlined,SmileOutlined,TeamOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import { SelectTest } from '../../../api/test';

const route = useRoute()
const router = useRouter
const OneTest = ref(null)
const testId = route.query.testId

if(testId !== undefined){
  SelectTest(testId).then((res)=>{
    OneTest.value = res
  })
}

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
