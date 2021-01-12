<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="articulos"
      :loading="cargando"
      loading-text="Cargando, por favor espere"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Productos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar producto
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
                      v-model="editedItem.codigo"
                      label="Codigo"
                      outlined
                      shaped
                    ></v-text-field>
                  </v-row>

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
                      v-model="editedItem.precio"
                      label="Precio"
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
                  <v-row>
                    <v-select
                      v-model="editedItem.categoria"
                      label="Categoria"
                      :items="categorias"
                      item-text="nombre"
                      item-value="id"
                      return-object
                    ></v-select>
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
                >Esta seguro que desea cambiar el estado de este
                producto?</v-card-title
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
      { text: "Codigo", value: "codigo" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Categoria", value: "categoria.nombre" },
      { text: "Precio", value: "precio" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    articulos: [],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre: "",
      descripcion: "",
      codigo: 0,
      precio: 0,
      estado: 1,
      categoria: {
        id: 0,
        nombre: "",
        estado: 0,
      },
    },
    defaultItem: {
      id: 0,
      nombre: "",
      descripcion: "",
      categoriaId: "",
      codigo: 0,
      precio: 0,
      estado: 1,
      categoria: {
        id: 0,
        nombre: "",
        estado: 0,
      },
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Producto" : "Editar Productos";
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
        .get("/articulo/list")
        .then((response) => {
          this.articulos = response.data;
          this.cargando = false;
        })
        .catch((error) => {
          return error;
        });
    },
    listCategorias() {
      this.$axios
        .get("/categoria/list")
        .then((response) => {
          this.categorias = response.data;
        })
        .catch((error) => {
          return error;
        });
    },
    initialize() {
      this.list();
      this.listCategorias();
    },

    editItem(item) {
      this.editedIndex = this.articulos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.articulos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        this.$axios.put("/articulo/deactivate", { id: this.editedItem.id });
      } else {
        this.$axios.put("/articulo/activate", { id: this.editedItem.id });
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
      this.list();
    },

    save() {
      if (this.editedIndex > -1) {
        let objetoBusqueda = {
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          codigo: this.editedItem.codigo,
          precio: this.editedItem.precio,
          categoriaId: this.editedItem.categoria.id,
          id: this.editedItem.id,
        };
        this.$axios.put("/articulo/update", objetoBusqueda).then(() => {
          this.list();
        });
        Object.assign(this.articulos[this.editedIndex], this.editedItem);
      } else {
        let objetoBusqueda = {
          nombre: this.editedItem.nombre,
          descripcion: this.editedItem.descripcion,
          codigo: this.editedItem.codigo,
          precio: this.editedItem.precio,
          categoriaId: this.editedItem.categoria.id,
          estado: 1,
        };
        this.$axios.post("/articulo/add", objetoBusqueda).then(() => {
          this.list();
        });

        this.articulos.push(this.editedItem);
      }
      //Actualizar tabla
      this.list();
      this.close();
    },
  },
};
</script>