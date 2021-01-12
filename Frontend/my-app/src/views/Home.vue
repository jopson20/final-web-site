<template>
  <div class="home">
    <div>
      <mi-carrusel></mi-carrusel>
    </div>
    <div style="height: 120px"></div>

    <div>
      <mis-servicios> </mis-servicios>
    </div>

     <div>
      <testimonios> </testimonios>
    </div>

    <div style="height: 120px"></div>
    <the-footer></the-footer>
  </div>

  
</template>

<script>
// @ is an alias to /src
import MisServicios from "../components/MisServicios.vue";
import MiCarrusel from "../components/MiCarrusel.vue";
import Testimonios from "../components/Testimonios.vue"
import TheFooter from "../components/TheFooter.vue";

export default {
  components: {
    MisServicios,
    MiCarrusel,
    Testimonios,
    TheFooter
  },
};
</script>


<style>

TheFooter .card {
  height: 100%;
}
</style>