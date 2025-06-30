<script setup lang="ts">
// Здесь можно добавить логику для получения статистики по каждой теме
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title class="text-h3 text-center pa-6">
            Подготовка к интервью
            <div class="text-subtitle-1 text-medium-emphasis mt-2">
              Вопросы и ответы для технического интервью по Frontend разработке
            </div>
          </v-card-title>

          <v-card-text>
            <v-row>
              <!-- HTML блок -->
              <v-col cols="12" md="6">
                <v-card
                  variant="outlined"
                  hover
                  class="h-100"
                  to="/html/html-interview"
                >
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar
                        color="orange"
                        size="large"
                        class="mr-4"
                      >
                        <v-icon size="large">mdi-language-html5</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">HTML</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Язык разметки веб-страниц
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip
                        color="success"
                        size="small"
                        class="mr-2 mb-2"
                      >
                        Junior: 1
                      </v-chip>
                      <v-chip
                        color="warning"
                        size="small"
                        class="mr-2 mb-2"
                      >
                        Middle: 1
                      </v-chip>
                      <v-chip
                        color="error"
                        size="small"
                        class="mr-2 mb-2"
                      >
                        Senior: 0
                      </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по основам HTML, семантической верстке, доступности и современным возможностям языка разметки.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn
                      color="orange"
                      variant="tonal"
                      append-icon="mdi-arrow-right"
                    >
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- CSS блок (пока заглушка) -->
              <v-col cols="12" md="6">
                <v-card
                  variant="outlined"
                  hover
                  class="h-100"
                  disabled
                >
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar
                        color="blue"
                        size="large"
                        class="mr-4"
                      >
                        <v-icon size="large">mdi-language-css3</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">CSS</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Каскадные таблицы стилей
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip
                        color="grey"
                        size="small"
                        class="mr-2 mb-2"
                      >
                        Скоро будет доступно
                      </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по селекторам, специфичности, flexbox, grid, анимациям и другим возможностям CSS.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn
                      color="blue"
                      variant="tonal"
                      disabled
                      append-icon="mdi-arrow-right"
                    >
                      В разработке
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- JavaScript блок (пока заглушка) -->
              <v-col cols="12" md="6">
                <v-card
                  variant="outlined"
                  hover
                  class="h-100"
                  disabled
                >
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar
                        color="yellow-darken-2"
                        size="large"
                        class="mr-4"
                      >
                        <v-icon size="large">mdi-language-javascript</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">JavaScript</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Язык программирования
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip
                        color="grey"
                        size="small"
                        class="mr-2 mb-2"
                      >
                        Скоро будет доступно
                      </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по основам языка, асинхронности, DOM, событиям и современным возможностям JavaScript.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn
                      color="yellow-darken-2"
                      variant="tonal"
                      disabled
                      append-icon="mdi-arrow-right"
                    >
                      В разработке
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- React блок (пока заглушка) -->
              <v-col cols="12" md="6">
                <v-card
                  variant="outlined"
                  hover
                  class="h-100"
                  disabled
                >
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar
                        color="cyan"
                        size="large"
                        class="mr-4"
                      >
                        <v-icon size="large">mdi-react</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">React</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Библиотека для UI
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip
                        color="grey"
                        size="small"
                        class="mr-2 mb-2"
                      >
                        Скоро будет доступно
                      </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по компонентам, хукам, состоянию, жизненному циклу и экосистеме React.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn
                      color="cyan"
                      variant="tonal"
                      disabled
                      append-icon="mdi-arrow-right"
                    >
                      В разработке
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <!-- Информационный блок -->
            <v-row class="mt-6">
              <v-col cols="12">
                <v-alert
                  type="info"
                  variant="tonal"
                  class="mb-4"
                >
                  <v-alert-title>💡 Как использовать</v-alert-title>
                  <p class="mb-2">
                    Каждая тема содержит вопросы разного уровня сложности:
                  </p>
                  <ul class="mb-2">
                    <li><strong>Junior</strong> — базовые концепции и основы</li>
                    <li><strong>Middle</strong> — углубленные знания и практический опыт</li>
                    <li><strong>Senior</strong> — архитектурные решения и экспертные знания</li>
                  </ul>
                  <p class="mb-0">
                    Ответы содержат не только правильную информацию, но и объяснения, которые помогут вам лучше понять тему.
                  </p>
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover:not([disabled]) {
  transform: translateY(-4px);
}
</style>
