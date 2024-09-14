<template>
    <div class="cases">
        <el-form :model="QueryData" inline>
      <!-- 新增岗位按钮 -->
      <el-form-item>
        <el-button type="primary" @click="openDialog">新增岗位</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="QueryData.job" placeholder="请输入岗位名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

      <el-table border :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="job" label="岗位名称" width="180"></el-table-column>
        <el-table-column prop="type" label="岗位类型">
        <template slot-scope="scope">{{scope.row.type == 1 ? '全职':'兼职'}}</template>
      </el-table-column>
        <el-table-column prop="location" label="工作地点" width="180"></el-table-column>
        <el-table-column prop="statement" label="工作职责"></el-table-column>
        <el-table-column prop="requirement" label="工作要求"></el-table-column>
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
  
      <el-dialog title="岗位编辑" :visible.sync="dialogFormVisible">
        <el-form :model="formData">
          <el-form-item label="岗位名称" :label-width="formLabelWidth">
            <el-input v-model="formData.job" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="岗位类型" :label-width="formLabelWidth">
                <el-radio v-model="formData.type" :label="1">全职</el-radio>
                <el-radio v-model="formData.type" :label="2">兼职</el-radio>
          </el-form-item>
          <el-form-item label="岗位地点" :label-width="formLabelWidth">
            <el-input v-model="formData.location" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作职责" :label-width="formLabelWidth">
            <el-input v-model="formData.statement" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作要求" :label-width="formLabelWidth">
            <el-input v-model="formData.requirement" autocomplete="off"></el-input>
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
        QueryData: { job: '' },  // 修改为对象，初始为 job 空字符串
        formData: {
          id: 0,
          job: "",
          type: "",
          location: "",
          statement: "",
          requirement: "",
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
        handleQuery() {
        const queryObject = this.QueryData;  // 直接使用对象
        console.log(queryObject);  // 输出查询对象，应该包含 { job: 'xxx' }
        this.$http
        .post("Job/FindJobsByJob", queryObject)
        .then(response => {
            // 假设后端返回查询结果
            this.tableData = response.data;
        })
        .catch(error => {
          console.error('查询失败:', error);
        });
    },
    resetForm() {
      this.QueryData = {
        job: ''
      };
      this.QueryData = []; // 重置表格数据
    },
      // 加载表格数据
      loadData() {
        this.loading = true;
  
        const token = sessionStorage.getItem('token');  // 从 sessionStorage 获取 token
  
        if (!token) {
          this.$router.push('/login'); // 如果没有Token，重定向到登录页面
        }
  
        this.$http
          .get("Job/GetJobsAll", {
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
        this.formData.job = "";
        this.formData.type = "";
        this.formData.location = "";
        this.formData.statement = "";
        this.formData.requirement = "";
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
            .post("Job/CreateJobs", this.formData, this.options)
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
            .post("Job/ModifiedJobs", this.formData, this.options)
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
        this.formData.type = Number(this.formData.type);
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
              .post(`Job/DeleteJobs?id=${row.id}`, null, this.options)
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
  
  