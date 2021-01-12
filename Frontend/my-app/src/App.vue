<template>
  <v-app id="inspire">
    <v-system-bar app>
      <!-- <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon> -->
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Marketing para todos</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-card class="mx-auto" width="300">
        <v-list>
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item to="Usuarios">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-group :value="true" prepend-icon="mdi-briefcase">
            <template v-slot:activator>
              <v-list-item-title>Portafolio</v-list-item-title>
            </template>
            <v-list-item
              v-for="([title, icon, ruta], i) in cruds"
              :key="i"
              :to="ruta"
              link
            >
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-item to="About">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Acerca de nosotros</v-list-item-title>
          </v-list-item>
          <v-list-item to="Login">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item>
          <v-list-item @click="cerrarSesion()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import swal from 'sweetalert';
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: null,
    cruds: [
      ["Productos", "mdi-cart", "Articulos"],
      ["Servicios", "mdi-view-list", "Categorias"],
    ],
    //
  }),
  methods: {
        cerrarSesion(){
          localStorage.removeItem("token")
          swal("Éxito", "Ha cerrado sesión correctamente", "success")
        }

    }
};
</script>
