<template>
  <div class="admin">
    <el-container>
      <!-- 顶部 Header -->
      <el-header class="header">
        <div class="header-content">
          <!-- 左侧 logo -->
          <div class="logo">
            <img src="../assets/img/logo.jpg" alt />
          </div>
          <!-- 右侧登出按钮 -->
          <el-button class="logout-button" type="danger" @click="handleLogout">
            登出
          </el-button>
        </div>
      </el-header>
      <el-container>
      <el-aside width="200px">
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-menu-item index="/admin/user">
            <i class="el-icon-star-off"></i>
            <span slot="title">后台用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/news">
            <i class="el-icon-news"></i>
            <span slot="title">新闻咨询管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/cases">
            <i class="el-icon-location-outline"></i>
            <span slot="title">案例信息管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/honor">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">荣誉墙管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/dictionary">
            <i class="el-icon-setting"></i>
            <span slot="title">数据字典管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/page">
            <i class="el-icon-setting"></i>
            <span slot="title">测试分页</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <div class="base-padding">
            <router-view />
          </div>
        </el-main>
        <el-footer>2024@麒麟集团版权所有</el-footer>
      </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
  name: "admin",
  methods: {
    handleLogout() {
      // 登出逻辑，例如清除 token 跳转到登录页
      console.log('用户点击了登出');
    }
  }
};
</script>

<style lang="scss" soped>
.admin {
  border-top: 1px solid rgb(238, 238, 238);
}

.base-padding {
  padding: 20px;
}

.el-footer {
  line-height: 60px;
}

/* header 样式调整 */
.header {
  color: white;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px; /* 内边距调整 */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  img {
    width: 150px; /* 调整 logo 的大小 */
  }
}
/* 登出按钮的样式 */
.logout-button {
  background-color: #FF4D4F;
  border-color: #FF4D4F;
  color: white;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>