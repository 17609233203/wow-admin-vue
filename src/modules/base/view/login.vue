<template>
    <div class="wrap">
        <div class="loginBlack">
            <!-- <h1>系统登录</h1> -->
            <el-form 
                :model="formData"
                ref="ruleFormRef"
                :rules="rules"
            >
                <el-form-item prop="userName">
                    <el-input placeholder="账号" v-model="formData.userName" clearable :prefix-icon="UserFilled" />
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input placeholder="密码" type="passWord" show-passWord v-model="formData.passWord" :prefix-icon="Lock" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button class="submitBtn" type="primary" @click="submitForm(ruleFormRef)">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {reactive,ref} from 'vue'
import {login} from '../api'
import {UserFilled,Lock} from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import {addLocalStorage} from '../../../utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const formData = reactive({
    userName:'',
    passWord:''
})
const rules = reactive<FormRules>({
    userName:[{ required: true, message: 'Please input userName', trigger: 'change' }],
    passWord:[{ required: true, message: 'Please input passWord', trigger: 'change' }]
})
const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl:FormInstance | undefined)=>{
    if(!formEl){
        return
    }
    await formEl?.validate((valid,fields)=>{
        if(valid){
            console.log('submit!')
            login(formData).then(res=>{
                addLocalStorage('token',res.token)
                router.push({
                    path: "/"
                })
            })
        }else{
            console.log('error submit!', fields)
        }
    })
}
</script>
<style lang="scss" scoped>
.wrap {
    background-color:#333;
    width: 100vw;
    height: 100vh;
    .loginBlack{
        margin: 0;
        max-width: 400px;
        width: 100%;
        color: #fff;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        h1{
            margin-top: 0;
        }
    }
    .submitBtn {
        width: 100%;
    }
}
</style>