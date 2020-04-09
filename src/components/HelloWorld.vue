<template>
  <v-container>
    <v-btn class="btnOpenCardOption" tile color="indigo" dark @click="changeStateCardOption(true)">
      Añadir Pregunta
      <v-icon right>mdi-forum</v-icon>
    </v-btn>
    <transition name="fade">
      <v-card class="mx-auto cardOption" width="300px" v-show="showCardOption">
        <v-card-title class="pb-0">Generar pregunta con:</v-card-title>
        <v-btn
          color="dark"
          fab
          x-small
          dark
          class="btnCloseCardOption"
          @click="changeStateCardOption(false)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-list flat :dense="dense">
          <v-list-item-group color="indigo">
            <v-list-item @click="addShortAswers()">
              <v-list-item-icon>
                <v-icon>mdi-text-short</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Respuesta Corta</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-text-subject</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Respuesta Larga</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="addMultipleChoices()">
              <v-list-item-icon>
                <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Opción Múltiple</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-crop-square</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Casillas de Verificación</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </transition>
    <!-- ENCUESTA INICIO -->
    <v-col class="mx-auto" cols="12" md="6">
      <v-card>
        <v-card-text>
          <v-col cols="12" class="col-input">
            <v-text-field v-model="form.title" label="Título" color="primary" outlined></v-text-field>
          </v-col>
          <v-col cols="12" class="col-input">
            <v-textarea v-model="form.description" outlined rows="2" label="Descripción"></v-textarea>
          </v-col>

          <v-divider></v-divider>

          <div class="mt-5">
            <transition-group name="fade">
              <v-card class="mb-4" v-for="(input,i) in form.shortAswers" :key="'A' + i">
                <v-card-text>
                  <v-col cols="12" class="col-input input-question">
                    <v-text-field
                      v-model="input.question"
                      label="Pregunta"
                      color="primary"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="col-input">
                    <v-text-field value="Respuesta breve" disabled color="primary"></v-text-field>
                  </v-col>
                  <v-divider></v-divider>
                  <div class="mt-2 d-flex justify-end">
                    <v-btn color="error" @click="removeShortAswers(i)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </transition-group>

            <transition-group name="fade">
              <v-card class="mb-4" v-for="(input, i) in form.multipleChoices" :key="'B' + i">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="col-input input-question">
                      <v-text-field
                        v-model="input.question"
                        label="Pregunta"
                        color="primary"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-for="(item, j) in form.multipleChoices[i].options" :key="j">
                    <v-col cols="9" class="col-input">
                      <v-text-field v-model="item.option" placeholder="Opción" color="primary"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-btn
                        @click="removeMultipleChoicesItems(i, j)"
                        v-show="form.multipleChoices[i].options.length > 1"
                        class="mr-2"
                        color="error"
                        outlined
                        fab
                        x-small
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <v-btn
                        @click="addMultipleChoicesItems(i)"
                        v-show="j == form.multipleChoices[i].options.length - 1"
                        color="info"
                        outlined
                        fab
                        x-small
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <div class="mt-2 d-flex justify-end">
                    <v-btn color="error" @click="removeMultipleChoices(i)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </transition-group>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- ENCUESTA FINAL -->
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    dense: true,
    showCardOption: false,
    form: {
      title: "Formulario 01",
      description: "Un bonito formulario",
      shortAswers: [],
      multipleChoices: []
    }
  }),
  methods: {
    changeStateCardOption(state) {
      this.showCardOption = state;
    },
    addShortAswers() {
      this.form.shortAswers.push({
        question: ""
      });
      this.showCardOption = false;
    },
    removeShortAswers(index) {
      this.form.shortAswers.splice(index, 1);
    },
    addMultipleChoices() {
      this.form.multipleChoices.push({
        question: "",
        options: [{ option: "" }]
      });
      this.showCardOption = false;
    },
    removeMultipleChoices(index) {
      this.form.multipleChoices.splice(index, 1);
    },
    addMultipleChoicesItems(index) {
      this.form.multipleChoices[index].options.push({
        option: ""
      });
    },
    removeMultipleChoicesItems(k, index) {
      this.form.multipleChoices[k].options.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.btnOpenCardOption {
  position: fixed;
  bottom: 2vh;
  left: 50%;
  transform: translate(-50%, -2vh);
  z-index: 1;
}
.btnCloseCardOption {
  position: fixed;
  top: -10px;
  right: -10px;
  z-index: 1;
}
.cardOption {
  position: fixed;
  bottom: 1.5vh;
  left: 50%;
  transform: translate(-50%, -1.5vh);
  z-index: 1;
}
.col-input {
  padding-top: 0;
  padding-bottom: 0;
}
.input-question {
  height: 60px;
}
</style>

// ecosystem: [
//   {
//     text: "vuetify-loader",
//     href: "https://github.com/vuetifyjs/vuetify-loader"
//   },
//   {
//     text: "github",
//     href: "https://github.com/vuetifyjs/vuetify"
//   },
//   {
//     text: "awesome-vuetify",
//     href: "https://github.com/vuetifyjs/awesome-vuetify"
//   }
// ],
// importantLinks: [
//   {
//     text: "Documentation",
//     href: "https://vuetifyjs.com"
//   },
//   {
//     text: "Chat",
//     href: "https://community.vuetifyjs.com"
//   },
//   {
//     text: "Made with Vuetify",
//     href: "https://madewithvuejs.com/vuetify"
//   },
//   {
//     text: "Twitter",
//     href: "https://twitter.com/vuetifyjs"
//   },
//   {
//     text: "Articles",
//     href: "https://medium.com/vuetify"
//   }
// ],
// whatsNext: [
//   {
//     text: "Explore components",
//     href: "https://vuetifyjs.com/components/api-explorer"
//   },
//   {
//     text: "Select a layout",
//     href: "https://vuetifyjs.com/layout/pre-defined"
//   },
//   {
//     text: "Frequently Asked Questions",
//     href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
//   }
// ]