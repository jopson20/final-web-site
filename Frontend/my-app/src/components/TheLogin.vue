<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="secondary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login.email"
                    name="login"
                    label="Login"
                    type="text"
                    placeholder="name@example.com"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="login.password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="iniciarSesion" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
   
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        this.$axios
          .post("/Usuario/login", this.login)
          .then((response) => {
            let token = response.data.tokenReturn;
            let usuario = response.data.user;
            if (token) {
              localStorage.setItem("token", token);
              localStorage.setItem("usuario", JSON.stringify(usuario));
              swal(
                "Bienvenido!",
                "Has iniciado sesión correctamente",
                "success",
                {
                  button: "Continuar",
                }
              );
              this.$router.push("/");
            }
          })
          .catch((error) => {
            swal("Oops", "Datos de autenticación inválidos", "error");
          });
      } catch {
        swal("Oops", "Datos de autenticación inválidos", "error");
      }
    },
  },
};
</script>