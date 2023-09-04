<template>
  <div>
    <h1>课堂派</h1>
    <div class="card">
      <router-link to="/classDetail">课程</router-link>
    </div>
  </div>
</template>
<script setup>
import axios from "../utils/request.js";
import {onMounted} from "vue";

onMounted(() => {
  getInfo()
})


const getInfo = () => {
  axios.get("/classroom/course/1").then((res) => {
    console.log(res)
  })
}

</script>
<style>
.card{
  width: 13vw;
  height: 30vh;
  border: 1px solid red;
  border-radius: 10px;
}
</style>
