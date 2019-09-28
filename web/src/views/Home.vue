<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/554ae211a55f874ea312db2bc1948cb2.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2429f709513aa87c1eb3f73420e97fee.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/6e01b57b2059903f9386a960d3555a60.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2"
           slot="pagination">
      </div>
    </swiper>
    <!--    end of swiper-->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap ">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-1">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!--    end of nav-icons-->
    <!--    <m-card icon="Menu" title="新闻资讯">-->
    <!--      <div class="nav jc-between mt-3 px-2">-->
    <!--        <div class="nav-item active">新闻</div>-->
    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">新闻</div>-->
    <!--        </div>-->
    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">新闻</div>-->
    <!--        </div>-->
    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">新闻</div>-->
    <!--        </div>-->
    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">新闻</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="pt-2 px-2">-->
    <!--        <swiper>-->
    <!--          <swiper-slide v-for="m in 5" :key="m">-->
    <!--            <div class="py-2" v-for="n in 5" :key="n">-->
    <!--              <span>[新闻]</span>-->
    <!--              <span>|</span>-->
    <!--              <span>9月12日体验服停机更新公告</span>-->
    <!--              <span>06/02</span>-->
    <!--            </div>-->
    <!--          </swiper-slide>-->
    <!--        </swiper>-->
    <!--      </div>-->
    <!--    </m-card>-->
    <m-list-card icon="Menu" title="新闻资讯" :categories="newCats">
      <template #items="{category}">
        <div class="py-2 fs-lg d-flex" v-for="(list, i) in category.newsList" :key="i">
          <span class="text-info">[{{list.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis">{{list.title}}</span>
          <span class="text-grey-1 fs-sm">{{list.createdAt|date}}</span>
        </div>
      </template>
    </m-list-card>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroLists">
      <template #items="{category}">
        <div class="d-flex flex-wrap">
          <div class="p-2 text-center"
               style="width: 20%"
               v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </div>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
    import dayjs from 'dayjs'
    // @ is an alias to /src
    export default {
        filters: {
            date(val) {
                return dayjs(val).format('MM/DD')
            }
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.pagination-home'
                    },
                    // some swiper options...
                },
                newCats: [],
                heroLists: []
            }
        },
        created() {
            this.fetchNewsCats()
            this.fetchHeroList()
        },
        methods: {
            async fetchNewsCats() {
                const res = await this.$http.get('news/list')
                this.newCats = res.data
            },
            async fetchHeroList() {
                const res = await this.$http.get('heros/list')
                this.heroLists = res.data
            }
        }
    }
</script>
<style lang="scss">
  @import '../assets/scss/variables';

  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.1538rem;
      background: #fff;

      &.swiper-pagination-bullet-active {
        background: map-get($colors, 'info');
      }
    }
  }

  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;

      &:nth-child(4n) {
        border-right: none;
      }
    }

  }
</style>
