<template>
  <div>
    <el-button type="primary" @click="openDialog()">新增用户</el-button>
    <el-table border :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="loginName" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="isAction" label="是否启用">
        <template slot-scope="scope">{{ scope.row.isAction ? '是':'否' }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="scope.row.loginName == 'admin'"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="scope.row.loginName == 'admin'"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息操作" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input v-model="formData.loginName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-radio v-model="formData.isAction" :label="true" border>是</el-radio>
          <el-radio v-model="formData.isAction" :label="false" border>否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateOrModify()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tableData: [],
      formData: {
        id: 0,
        loginName: "",
        password: "",
        isAction: true,
        createTime: new Date()
      },
      options: {}
    };
  },
  mounted() {
    let token = sessionStorage.getItem("token");
    //window.console.log(token);
    this.options = {
      headers: {
         Authorization: `Bearer ${token}`
      }
    };

    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      this.$http
        .post("User/GetUserAll", null, this.options)
        .then(response => {
          window.console.log(response);
          this.tableData = response.data;
          this.loading = false;
        })
        .catch(e => {
          this.$message({
            message: "网络或程序异常！" + e,
            type: "error"
          });
        });
    },
    openDialog() {
      // 清除数据
      this.formData.id = 0;
      this.formData.loginName = "";
      this.formData.password = "";
      this.formData.isAction = true;
      this.formData.createTime = new Date();

      this.dialogFormVisible = true;
    },
    // 新增
    handleCreateOrModify() {
      window.console.log(this.formData);
      //window.console.log(JSON.stringify(this.formData));
      if (!this.formData.id) {
        // ID 无效时 视为新增
        this.loading = true;
        this.$http
          .post("User/CreateUser", this.formData, this.options)
          .then(response => {
            this.loading = false;
            window.console.log(response);
            this.$message({
              message: "创建成功！",
              type: "success"
            });
            this.dialogFormVisible = false;
            this.loadData();
          })
          .catch(e => {
            this.$message({
              message: "网络或程序异常！" + e,
              type: "error"
            });
          });
      } else {
        this.loading = true;
        this.$http
          .post("User/ModifiedUser", this.formData, this.options)
          .then(response => {
            this.loading = false;
            window.console.log(response);
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.dialogFormVisible = false;
            this.loadData();
          })
          .catch(e => {
            this.$message({
              message: "网络或程序异常！" + e,
              type: "error"
            });
          });
      }
    },
    handleEdit(index, row) {
      window.console.log(index, row);
        // 使用深拷贝来避免数据引用问题
      this.formData = JSON.parse(JSON.stringify(row));

        // 确保 isAction 的数据类型为布尔值
      this.formData.isAction = Boolean(this.formData.isAction);
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 已确认删除
          // 调接口删除
          this.loading = true;
          this.$http
            .post(`User/DeleteUser?id=${row.id}`, null, this.options)
            .then(response => {
              this.loading = false;
              window.console.log(response);
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.loadData();
            })
            .catch(e => {
              this.$message({
                message: "网络或程序异常！" + e,
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //时间格式化
    dateFormat: function(row) {
      //row 表示一行数据, CreateTime 表示要格式化的字段名称
      let t = new Date(row.createTime);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    }
  }
};
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>