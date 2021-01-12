<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      :loading="cargando"
      loading-text="Cargando, por favor espere"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Base de usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar usuario
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                      outlined
                      shaped
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.rol"
                      label="Rol"
                      outlined
                      shaped
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                      outlined
                      shaped
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                      type="password"
                      outlined
                      shaped
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title 
                >Esta seguro que desea cambiar el estado del
                usuario?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon @click="deleteItem(item)">
          <template v-if="item.estado"> mdi-toggle-switch </template>
          <template v-else> mdi-toggle-switch-off-outline </template>
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cargando: true,
    iconoCambio: "",
    headers: [
      { text: "ID", align: "start", value: "id", sortable: false },
      { text: "Nombre", value: "nombre" },
      { text: "Rol", value: "rol" },
      { text: "E-mail", value: "email" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    usuarios: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre: "",
      rol: "",
      password: "",
      email: "",
      estado: 1,
    },
    defaultItem: {
      id: 0,
      nombre: "",
      rol: "",
      password: "",
      email: "",
      estado: 1,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuarios";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    list() {
      this.$axios
        .get("/usuario/list")
        .then((response) => {
          this.usuarios = response.data;
          this.cargando = false;
        })
        .catch((error) => {
          return error;
        });
    },
    initialize() {
      this.list();
    },

    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        this.$axios
          .put("/usuario/deactivate", { id: this.editedItem.id })
          .then(() => {
            this.list();
          });
      } else {
        this.$axios
          .put("/usuario/activate", { id: this.editedItem.id })
          .then(() => {
            this.list();
          });
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        let objetoBusqueda = {
          nombre: this.editedItem.nombre,
          rol: this.editedItem.rol,
          email: this.editedItem.email,
          password: this.editedItem.password,
          estado: this.editedItem.estado,
          id: this.editedItem.id,
        };
        this.$axios.put("/usuario/update", objetoBusqueda).then(() => {
          this.list();
        });
        Object.assign(this.usuarios[this.editedIndex], this.editedItem);
      } else {
        let objetoBusqueda = {
          nombre: this.editedItem.nombre,
          email: this.editedItem.email,
          rol: this.editedItem.rol,
          password: this.editedItem.password,
          estado: 1,
        };
        this.$axios.post("/usuario/add", objetoBusqueda).then(() => {
          this.list();
        });

        this.usuarios.push(this.editedItem);
      }
      //Actualizar tabla
      this.close();
    },
  },
};
</script>