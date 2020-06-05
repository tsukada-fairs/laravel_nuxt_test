<template>
  <div class="container">
    <h1>テスト</h1>
    <!-- <router-link to="/user/1">user1</router-link> -->
    <button v-show="page > 1" @click="onclick('prev')">左</button>
    <button @click="onclick('next')">右</button>
    <transition-group :name="transName">
      <h2 key="1" v-show="page == 1">ページ1</h2>
      <h2 key="2" v-show="page == 2">ページ2</h2>
      <h2 key="3" v-show="page == 3">ページ3</h2>
   </transition-group>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      show: false,
      page: 1,
      transName: '',
      interviews: [
        'interview1',
        'interview2',
        'interview3',
        'interview4',
      ]
    }
  },
  // transition (to, from) {
  //   // return 'slide-left';
  //   if (!from) { return 'slide-left' }
  //   console.log(to.query.page);
  //   return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  // },
  mounted() {
    // console.log(this.$nuxt)
  },
  methods: {
    onclick: function(direction) {
      if (direction == 'prev') {
        this.page--;
        this.$router.push('/user?page=' + this.page);
        this.transName = 'prev';
      } else {
        this.page++;
        this.$router.push('/user?page=' + this.page);
        this.transName = 'next';
      }
      // console.log(direction)
      // console.log(this.$nuxt)
    }
  }
//   transition: {
//    name: 'slide-left',
//  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.next-enter-active, .next-leave-active,
.prev-enter-active, .prev-leave-active  {
  transition: all .8s ease-out;
}
.next-enter {
  transform: translateX(450px);
}
.next-enter-to {
  transform: translateX(0);
}
.next-leave {
  transform: translateX(0);
}
.next-leave-to {
  transform: translateX(-450px);
}
.prev-enter {
  transform: translateX(-450px);
}
.prev-enter-to {
  transform: translateX(0);
}
.prev-leave {
  transform: translateX(0);
}
.prev-leave-to {
  transform: translateX(450px);
}

h2 {
  position: absolute;
  margin: 0;
  // font-size: 3em;
}
.slide-left-leave-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active {
     transition: 1s;
}
.slide-left-enter,
.slide-right-enter {
     transform: translate(100%, 0);
}
.slide-left-leave-to {
     transform: translate(-100%, 0);
}
.slide-left-leave-to {
     transform: translate(200%, 0);
}
</style>