<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="categorias"
      :loading="cargando"
      loading-text="Cargando, por favor espere"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Servicios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar servicio
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
                    <v-textarea
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                      counter="240"
                      outlined
                      shaped
                    ></v-textarea>
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
                >Esta seguro que desea cambiar el estado de la
                categoria?</v-card-title
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
      { text: "Descripcion", value: "descripcion" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre: "",
      descripcion: "",
      estado: 1,
    },
    defaultItem: {
      id: 0,
      nombre: "",
      descripcion: "",
      estado: 1,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Servicio" : "Editar Servicios";
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
        .get("/categoria/list")
        .then((response) => {
          this.categorias = response.data;
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
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        this.$axios
          .put("/categoria/deactivate", { id: this.editedItem.id })
          .then(() => {
            this.list();
          });
      } else {
        this.$axios
          .put("/categoria/activate", { id: this.editedItem.id })
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
          descripcion: this.editedItem.descripcion,
          id: this.editedItem.id,
        };
        this.$axios.put("/categoria/update", objetoBusqueda).then(() => {
          this.list();
        });
        Object.assign(this.categorias[this.editedIndex], this.editedItem);
      } else {
        let objetoBusqueda = {
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          estado: 1,
        };
        this.$axios.post("/categoria/add", objetoBusqueda).then(() => {
          this.list();
        });

        this.categorias.push(this.editedItem);
      }
      //Actualizar tabla
      this.close();
    },
  },
};
</script>