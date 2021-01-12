<template>
  <div class="container-fluid" id="Miembros">
    <h2 class="bg-dark">Miembros</h2>
    <div class="row justify-content-center mb-5">
      <div class="col mt-5" v-for="(miembro, index) of Team" :key="index">
        <team-card v-bind:member="miembro"> </team-card>
      </div>
    </div>
  </div>
</template>

<script>
import TeamCard from "../components/TeamCard.vue";

export default {
  components: {
    TeamCard,
  },
  data() {
    return {
      Team: [
        {
          codigo: 1,
          nombre: "Alejandro Zapata Alzate",
          descripcion: "Desarrollador de páginas y aplicaciones WEB.",
          rol: "CEO y cofundador",
          image: "https://i.imgur.com/6j8nrjq.png",
        },
        {
          codigo: 2,
          nombre: "Eduardo Malagón Puentes",
          descripcion: "Asesor en fidelización de clientes.",
          rol: "Marketing leader y cofundador",
          image: "https://i.imgur.com/piXalN2.png",
        },
        {
          codigo: 3,
          nombre: "Marcela Cely Prieto ",
          descripcion:
            "Asesora Internacional en diseño y desarrollo de marcas.",
          rol: "Program manager de digitalización y cofundadora",
          image: "https://i.imgur.com/B7b7X8R.png",
        },
        {
          codigo: 4,
          nombre: "Andrés Zuluaga Estrada",
          descripcion: "Experto en negocios digitales.",
          rol: "Consultor y transformador digital y cofundador",
          image: "https://i.imgur.com/kQQ3Pev.png",
        },
      ],
    };
  },
};
</script>

<style>
.card {
  height: 100%;
}
h2 {
  text-align: center;

  margin-top: 50px;
  font-family: "verdana" "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, Helvetica, sans-serif;
  color: white;
}
</style>
