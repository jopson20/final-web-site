<template>
  <div id="app">
    <v-app id="inspire">
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-app>
  </div>
</template>

<script>
export default {
    data () {
    return {
      items: [
        {
          src: ' https://cdn.pixabay.com/photo/2017/01/13/19/09/feedback-1978036_960_720.png',
        },
        {
          src: ' https://cdn.pixabay.com/photo/2017/01/09/10/47/social-1966010_960_720.jpg',
        },
        {
          src: ' https://cdn.pixabay.com/photo/2015/07/15/08/16/web-845803_960_720.jpg',
        },
        {
          src: ' https://einatec.com/wp-content/uploads/2018/04/diseno-logotipo-e1522743381438.jpg',
        },
      ],
    }
  },
}
</script>
