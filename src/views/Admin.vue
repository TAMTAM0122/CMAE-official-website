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
          <el-menu-item index="/admin/job">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">人才招聘管理</span>
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
  // 假设你的后端有一个登出接口
  this.$http.post('User/Logout', null, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  })
  .then(response => {
    // 1. 打印响应
    window.console.log('用户成功登出', response);

    // 2. 清除存储的 token
    sessionStorage.removeItem('token');

    // 3. 跳转到登录页面
    // this.$router.push('/login');
    window.location.href = '/login'
    
    this.$message({
      message: '成功退出登录',
      type: 'success'
    });
  })
  .catch(error => {
    window.console.error('退出登录失败', error);

    this.$message({
      message: '退出登录失败，请重试',
      type: 'error'
    });
  });
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

.el-container {
  display: flex;
  flex-direction: row;
  height: 100vh; /* 设置整个页面高度 */
}

.el-aside {
  height: 100%; /* 让aside高度随父容器调整 */
  overflow: hidden;
  background-color: #343a40; /* 深色背景 */
  color: white; /* 白色字体 */
}

.el-menu {
  background-color: #343a40; /* 确保菜单背景与aside背景一致 */
  color: white; /* 白色字体 */
}

.el-menu-item {
  color: #ffffff; /* 菜单项的字体颜色 */
}

.el-menu-item:hover {
  background-color: #495057; /* 悬停时背景颜色 */
}

.el-menu-item.is-active {
  background-color: #007bff; /* 激活状态下的背景颜色 */
}

.el-footer {
  line-height: 60px;
}

// /* header 样式调整 */
// .header {
//   color: white;
//   height: 60px;
//   line-height: 60px;
//   display: flex;
//   justify-content: space-between;
//   padding: 0 20px; /* 内边距调整 */
// }

// .header-content {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
// }

// .logo {
//   display: flex;
//   align-items: center;
//   img {
//     width: 150px; /* 调整 logo 的大小 */
//   }
// }

.header {
  background-color: #2b2d30; /* 深色背景 */
  color: white; /* 字体颜色 */
  height: 60px;
  width: 100%; /* 确保宽度为100% */
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px; /* 内边距调整 */
  margin: 0; /* 确保没有外边距，防止不必要的空白 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 添加下方阴影 */
}


.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* 调整 logo 样式，使其适应新的 header 背景 */
.logo img {
  width: 150px;
}

/* 登出按钮调整为与 header 相同的深色风格 */
.logout-button {
  background-color: #FF4D4F; /* 红色背景，用于登出按钮 */
  border-color: #FF4D4F;
  color: white; /* 按钮文字为白色 */
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