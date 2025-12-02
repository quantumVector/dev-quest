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
                <v-card variant="outlined" hover class="h-100" to="/html/html-interview">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="orange" size="large" class="mr-4">
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
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 6 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 23 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 16 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по основам HTML, семантической верстке, доступности и современным
                      возможностям языка разметки.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="orange" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- CSS блок (пока заглушка) -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" to="/css/css-interview">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="blue" size="large" class="mr-4">
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
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 9 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 41 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 32 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по селекторам, специфичности, flexbox, grid, анимациям и другим
                      возможностям CSS.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="orange" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- TypeScript блок -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" to="/typescript/ts-interview">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="blue-darken-1" size="large" class="mr-4">
                        <v-icon size="large">mdi-language-typescript</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">TypeScript</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Типизированный JavaScript
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 8 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 25 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 18 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по типам, интерфейсам, дженерикам, утилитным типам и продвинутым
                      возможностям TypeScript.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="blue-darken-1" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- Паттерны блок -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" disabled>
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="purple" size="large" class="mr-4">
                        <v-icon size="large">mdi-puzzle-outline</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">Паттерны</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">Паттерны проектирования</p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 5 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 18 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 24 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по классическим паттернам проектирования, архитектурным решениям и
                      принципам SOLID.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="purple" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- Алгоритмы блок -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" disabled>
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="teal" size="large" class="mr-4">
                        <v-icon size="large">mdi-math-compass</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">Алгоритмы</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Алгоритмы и структуры данных
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 8 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 22 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 19 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по алгоритмам поиска, сортировки, структурам данных и анализу
                      сложности.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="teal" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- JavaScript Functions блок -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" to="/js/js-interview">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="yellow-darken-2" size="large" class="mr-4">
                        <v-icon size="large">mdi-language-javascript</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">JS Functions</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">JavaScript</p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 3 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 8 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 4 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по JavaScript: объявление, типы, замыкания, контекст
                      выполнения и продвинутые концепции.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="yellow-darken-2" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- WebAPI блок -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" to="/web-api/web-api-interview">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="green" size="large" class="mr-4">
                        <v-icon size="large">mdi-api</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">Web API</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Браузерные API
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 3 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 8 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 4 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по работе с Blob, File, загрузке файлов, чтению данных и обработке бинарного контента.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="green" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- React блок -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" to="/react/react-interview">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="cyan" size="large" class="mr-4">
                        <v-icon size="large">mdi-react</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">React</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">Библиотека для UI</p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 6 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 7 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 2 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по основам React, компонентам, Virtual DOM, JSX и ключевым концепциям библиотеки.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="cyan" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <!-- блок Web -->
              <v-col cols="12" md="6">
                <v-card variant="outlined" hover class="h-100" to="/web/web-interview">
                  <v-card-text class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-avatar color="indigo" size="large" class="mr-4">
                        <v-icon size="large">mdi-web</v-icon>
                      </v-avatar>
                      <div>
                        <h3 class="text-h5 mb-1">Web</h3>
                        <p class="text-body-2 text-medium-emphasis mb-0">
                          Веб-технологии
                        </p>
                      </div>
                    </div>

                    <div class="mb-4">
                      <v-chip color="success" size="small" class="mr-2 mb-2"> Junior: 4 </v-chip>
                      <v-chip color="warning" size="small" class="mr-2 mb-2"> Middle: 8 </v-chip>
                      <v-chip color="error" size="small" class="mr-2 mb-2"> Senior: 3 </v-chip>
                    </div>

                    <p class="text-body-2 mb-0">
                      Вопросы по протоколу HTTP, методам запросов, заголовкам, статусам, кэшированию и безопасности.
                    </p>
                  </v-card-text>

                  <v-card-actions class="pa-6 pt-0">
                    <v-btn color="indigo" variant="tonal" append-icon="mdi-arrow-right">
                      Начать подготовку
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <!-- Информационный блок -->
            <v-row class="mt-6">
              <v-col cols="12">
                <v-alert type="info" variant="tonal" class="mb-4">
                  <v-alert-title>💡 Как использовать</v-alert-title>
                  <p class="mb-2">Каждая тема содержит вопросы разного уровня сложности:</p>
                  <ul class="mb-2">
                    <li><strong>Junior</strong> — базовые концепции и основы</li>
                    <li><strong>Middle</strong> — углубленные знания и практический опыт</li>
                    <li><strong>Senior</strong> — архитектурные решения и экспертные знания</li>
                  </ul>
                  <p class="mb-0">
                    Ответы содержат не только правильную информацию, но и объяснения, которые
                    помогут вам лучше понять тему.
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
