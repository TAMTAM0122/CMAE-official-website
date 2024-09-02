<template>
    <div class="go-in">
      <banner img="../assets/img/bgtop.jpg" title="關於燦文" />
      <div class="section" v-loading="loading">
        <div class="section-content">
          <div class="content-summary">
            <div class="summary-left">
              <p class="title">關於燦文</p>
              <p class="eTitle">ABOUT CHAIRMAN</p>
              <p class="content">
                燦文建築設計有限公司，以設計為核心，為業主提供綜合性設計服務，包括項目策劃、規劃設計、建築設計、結構設計、機電系列工程設計、市政道路設計、室外環境設計、室內裝飾設計、工程顧問、工料測量、工程估價及工程監理等業務。
                <br>&nbsp;&nbsp;&nbsp;&nbsp;作為專業的綜合性建築設計公司，通過完成眾多大型國際性項目的成功案例，無論超高層建築、大型住宅社區或政府公共建築，特別是澳澳門望廈社會房屋、北安灣大型住宅區等超高層建築群，積累了豐富的設計和市場實踐經驗，整合優質人力資源，提供非凡的創意和為客戶實現目標的誠意，更保障細節的完成能經受時間的考驗。
                <br>&nbsp;&nbsp;&nbsp;&nbsp;公司前身為黃燦文建築工程師樓，成立於一九九二年，經過多年的不懈努力，現有各類專業設計技術人員五十多人，其中包括澳門註冊建築師、澳門註冊土木工程師、澳門註冊機電工程師、中國一級註冊建築師、中國一級註冊結構工程師、中國註冊公用設備工程師、中國註冊電氣工程師、中國一級註冊建造師、中國註冊監理工程師、中國註冊造價工程師等專業技術人員。
                <br>&nbsp;&nbsp;&nbsp;&nbsp;目前公司正運用ISO9001標準，提高內部管理體系，以提供一流的服務水準。
                <br>&nbsp;&nbsp;&nbsp;&nbsp;燦文建築設計有限公司源於澳門，以世界的眼光積極開拓更廣闊的市場，為配合公司策略，並已在中國大陸地區設立燦文建築設計（珠海）有限公司，在香港地區設立香港燦文建築設計有限公司，並聘請專業人員為全世界的客戶提供優質高效的服務，以先進的設計理念及服務鑄就更高品質、更富情感的世界建築精品！
                <br>&nbsp;&nbsp;&nbsp;&nbsp;燦文一貫秉持“專業、高效、盡責、創新”的企業理念，不但贏得了業主的廣泛好評，也獲得同行的肯定和認同，在業界贏得良好的口碑和信譽。
                <br>&nbsp;&nbsp;&nbsp;&nbsp;未來，公司將繼續保持良好的服務質素，務求為客戶提供最優質滿意的服務。
              </p>
            </div>
            <div class="summary-right">
              <img src="../assets/img/jianjietopmin.jpg" alt />
            </div>
          </div>
          <el-divider class="el-divider-active">
            <i class="el-icon-arrow-down el-icon-arrow-down-active"></i>
          </el-divider>
          <!-- 发展历程 -->
          <!-- <div class="content-course">
            <div class="top">
              <h3>发展历程</h3>
              <p>DEVELOPMENT</p>
              <div class="border"></div>
              <div class="timeline"></div>
            </div>
            <div class="course-time">
              <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,index) in courseList" :key="index">
                  <div class="time-show">
                    <div class="time-show-item" v-for="(courseOne,one) in item" :key="one">
                      <div class="item-top" :class="{'order-top' : one%2===1}"></div>
                      <el-divider>
                        <i class="el-icon-mobile-phone"></i>
                      </el-divider>
                      <div class="item-bottom" :class="{'order' : one%2===1}">
                        <div class="item-bottom-content">
                          <p>{{courseOne.Content}}</p>
                          <p>{{courseOne.Year}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div> -->
  
          <div class="content-culture">
            <h3>企業文化</h3>
            <h3>CULTURE</h3>
            <p>專業、高效、盡責、創新——是我們獨特的企業理念</p>
            <span>高品質、富情感的世界建築精品——是我們不懈的追求</span>
            <span>您關注的目光——是我們發展的無窮動力</span>
          </div>
          <!-- 公司荣誉 -->
          <div class="content-honor">
            <div class="honor-big-img">
              <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible">
                <img v-lazy="dialogUrl" alt />
              </el-dialog>
            </div>
            <div class="top">
              <h3>公司荣誉</h3>
              <p>HONOR</p>
              <div class="border"></div>
            </div>
            <ul class="honor-show">
              <li v-for="(honor,index) in honorList" :key="index">
                <img
                  v-lazy="imgserver+honor.Img"
                  @click="dialogTableVisible = true ;dialogUrl = imgserver + honor.Img;dialogTitle= honor.Remark"
                />
              </li>
            </ul>
            <p>点击图片查看大图</p>
          </div>
          <!-- 团队风采 -->
          <div class="content-team">
            <div class="top">
              <h3>团队风采</h3>
              <p>TEAM</p>
            </div>
            <el-carousel :interval="4000" type="card">
              <el-carousel-item v-for="(team,index) in teamItem" :key="index">
                <div class="swiper-img" v-lazy:background-image="imgserver + team.Img"></div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- 合作伙伴 -->
          <!-- <div class="content-partner">
            <div class="top">
              <h3>合作伙伴</h3>
              <p>RARTNERS</p>
              <ul class="partner-img">
                <li v-for="(partner,i) in partnerImg" :key="i">
                  <img v-lazy="imgserver+partner.Img" alt />
                </li>
              </ul>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Banner from "../components/Banner";
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  export default {
    components: {
      Banner,
      swiper,
      swiperSlide
    },
    data() {
      return {
        loading: true,
        honorList: [],
        partnerImg: [],
        courseList: [],
        teamItem: [],
        swiperOption: {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        },
        dialogTableVisible: false,
        dialogUrl: "",
        dialogTitle: ""
      };
    },
    mounted() {
      this.$http
        .all([
          this.$http.get("Honor/GetHonorAll"),
          this.$http.get("Enterprise/GetEnterpriseAll"),
          this.$http.get(`Team/GetTeamAll`),
          this.$http.get(`Course/GetCourseAll`)
        ])
        .then(
          this.$http.spread(
            (responseHonor, responseEnterprise, responseTeam, responseCourse) => {
              this.honorList = responseHonor.data;
              this.partnerImg = responseEnterprise.data;
              this.teamItem = responseTeam.data;
  
              var groupCount = Math.ceil(responseCourse.data.length / 2);
              window.console.log(groupCount);
              for (let i = 0; i < groupCount; i++) {
                let img2 = [];
                for (let j = 0; j < 2; j++) {
                  if (responseCourse.data.length - 1 >= i * 2 + j) {
                    img2.push(responseCourse.data[i * 2 + j]);
                  }
                }
                this.courseList.push(img2);
              }
              window.console.log(this.courseList);
              this.loading = false;
            }
          )
        );
    }
  };
  </script>
  
  <style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  
  .go-in {
    width: 100%;
    height: 100%;
    background-color: #14679f;
    position: relative;
    overflow: hidden;
    .section {
      width: 100%;
      &-content {
        width: 1240px;
        margin: 0 auto;
        background-color: #fff;
  
        .content-summary {
          //height: 500px;
          display: flex;
          justify-content: space-around;
          padding: 100px 0;
          .summary-left {
            width: 600px;
            .title {
              font-size: 25px;
              color: #e13834;
            }
            .eTitle {
              font-size: 17px;
              color: #e13834;
              padding: 20px 0;
            }
            .content {
              color: #14679f;
              font-size: 14px;
              text-indent: 25px;
              line-height: 30px;
            }
          }
  
          .summary-right {
            width: 400px;
            height: 310px;
            border: 2px solid #1d42b9;
            //animation: imgboxkey 4s infinite;
            border-radius: 10px;
            margin-top: 80px;
            text-align: center;
  
            img {
              width: 360px;
              height: 270px;
              margin-top: 20px;
              //animation: imgbo 4s infinite;
            }
          }
        }
  
        //发展历程
        .content-course {
          padding: 50px 0;
          .course-time {
            width: 1000px;
            height: 400px;
            margin: 20px auto;
            .swiper-container {
              height: 100%;
            }
            .time-show {
              width: 700px;
              height: 100%;
              margin: 0 auto;
              display: flex;
              .time-show-item {
                width: 350px;
                height: 100%;
                overflow: hidden;
                display: flex;
                flex-direction: column;
  
                .item-top,
                .item-bottom {
                  height: 190px;
                }
                .item-bottom {
                  // display: flex;
                  // align-content: center;
                  .item-bottom-content {
                    background-color: #1667a0;
                    margin: 20px 0;
                    p {
                      color: #fff;
                      text-align: center;
                      padding: 15px;
                    }
                  }
                }
              }
            }
          }
        }
  
        //企业文化
        .content-culture {
          height: 450px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 100px;
          background-color: #c2daeb;
          h3 {
            color: #3c6088;
            font-size: 26px;
          }
          p {
            color: #3c6088;
            font-size: 26px;
            padding: 5px 0;
          }
          span {
            font-weight: 400;
            line-height: 36px;
            font-size: 18px;
            padding: 5px 0;
          }
        }
  
        //公司荣誉
        .content-honor {
          padding: 50px 0;
          .honor-show {
            width: 1000px;
            margin: 30px auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: flex-start;
  
            li {
              width: 220px;
              height: 320px;
              margin-left: 15px;
              list-style: none;
              border: 1px solid palegoldenrod;
  
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          p {
            text-align: center;
            color: #3c6088;
          }
        }
  
        //团队风采
        .content-team {
          padding: 50px 100px;
          .swiper-img {
            height: 400px;
            background: no-repeat center;
            background-size: cover;
          }
        }
  
        //合作伙伴
        .content-partner {
          padding: 50px 0;
          .partner-img {
            width: 950px;
            margin: 20px auto;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
              width: 107px;
              height: 107px;
              list-style: none;
              margin: 10px 25px;
  
              img {
                width: 100%;
                height: 100%;
                border: 1px solid rgb(194, 218, 235);
              }
            }
          }
        }
      }
    }
  }
  
  @keyframes imgboxkey {
    0% {
      border: solid rgb(29, 66, 185) 2px;
    }
    40% {
      border: solid rgb(255, 255, 255) 2px;
    }
    60% {
      border: solid rgb(255, 255, 255) 2px;
    }
    100% {
      border: solid rgb(29, 66, 185) 2px;
    }
  }
  
  @keyframes imgbo {
    0% {
      transform: scale(1);
      box-shadow: 0px 0px 0px 0px #ababab;
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0px 0px 10px 5px #ababab;
    }
    100% {
      transform: scale(1);
      box-shadow: 0px 0px 0px 0px #ababab;
    }
  }
  .el-divider--horizontal {
    margin: 1px 0;
  }
  
  .top {
    h3,
    p {
      text-align: center;
      color: #3c6088;
      font-weight: 400;
      padding: 10px 0;
    }
    h3 {
      font-size: 30px;
    }
    p {
      font-size: 20px;
    }
    .border {
      border-bottom: 1px solid #3c6088;
      width: 15%;
      margin: 0 auto;
    }
  }
  // .swiper-button-disabled {
  //   display: none;
  // }
  .order {
    order: -1;
  }
  .order-top {
    order: 1;
  }
  .el-divider {
    background-color: red;
    height: 3px;
    .el-divider__text {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      padding: 0px;
      color: #fff;
      border: 3px solid red;
    }
  }
  .el-divider-active {
    background-color: #3c6088;
  }
  .honor-big-img {
    width: 100%;
    height: 100%;
    z-index: 10;
    text-align: center;
    padding-bottom: 20px;
    padding: 5%;
    //background-color: #14679f;
    .el-dialog__wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      margin: 0;
  
      .el-dialog__body {
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
  </style>