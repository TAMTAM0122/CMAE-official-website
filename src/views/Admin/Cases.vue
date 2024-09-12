<template>
  <div class="cases">
    <el-button type="primary" @click="openDialog()">新增案例</el-button>
    <el-table border :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="title" label="案例标题" width="180"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img style="width:100%" :src="imgserver + scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="content" label="案例内容"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="案例编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="案例标题" :label-width="formLabelWidth">
          <el-input v-model="formData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="案例图片" :label-width="formLabelWidth">
          <!-- :before-upload="beforeAvatarUpload" -->
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/Tool/Upload?type=cases"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="formData.img" :src="imgserver + formData.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="案例内容" :label-width="formLabelWidth">
          <el-input v-model="formData.content" autocomplete="off"></el-input>
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
        img: "",
        title: "",
        content: "",
        del: "",
        createTime: new Date()
      },
      options: {},
      headers: {}
    };
  },
  mounted() {
    let token = "Bearer " + sessionStorage.getItem("token");
    //window.console.log(token);
    this.options = {
      headers: {
        Authorization: token
      }
    };
    this.loadData();
  },
  methods: {
    // 处理上传成功后的响应
    handleSuccess(response, file, fileList) {
      window.console.log(response, file, fileList);
      this.formData.img = response;
    },
    // 加载表格数据
    loadData() {
      this.loading = true;

      const token = sessionStorage.getItem('token');  // 从 sessionStorage 获取 token

      if (!token) {
        this.$router.push('/login'); // 如果没有Token，重定向到登录页面
      }

      this.$http
        .get("Case/GetListAll", {
          headers: {
            Authorization: `Bearer ${token}`  // 确保 token 没有多余的空格
          }
        })
        .then(response => {
          window.console.log(response.data);
          if (response.status === 200) {
            this.tableData = response.data;
          } else {
            this.$message({
              message: '请求失败，状态码:${response.status}',
              type:"error"
            });
          }
          this.loading = false;
        })
        .catch(e => {
          this.$message({
            message: "网络或程序异常！" + e,
            type: "error"
          });
          this.loading = false; // 即使失败也要关闭加载状态
        });
    },
    openDialog() {
      // 清除数据
      this.formData.id = 0;
      this.formData.img = "";
      this.formData.title = "";
      this.formData.content = "";
      this.formData.del = "";
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
          .post("Case/CreateCases", this.formData, this.options)
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
          .post("Case/ModifiedCases", this.formData, this.options)
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
      // this.formData = row;
      this.formData = JSON.parse(JSON.stringify(row));
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
            .post(`Case/DeleteCases?id=${row.id}`, null, this.options)
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
      let t = new Date(row.CreateTime);
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

