<script setup lang="ts">
const apps = [
  {
    title: 'Тренажер собеседований',
    description: 'Случайный вопрос из базы собеседований с фильтрами по теме и уровню.',
    to: '/apps/interview-trainer',
    icon: 'mdi-forum-outline',
    color: 'deep-purple',
  },
  {
    title: 'Калькулятор специфичности CSS',
    description: 'Тренажер для расчета специфичности случайно собранных CSS-селекторов.',
    to: '/apps/css-specificity',
    icon: 'mdi-target-variant',
    color: 'blue',
  },
]
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <h1 class="text-h4 font-weight-bold mb-3">Приложения</h1>
      <p class="text-body-1 text-medium-emphasis mb-6">
        Небольшие интерактивные инструменты для практики и проверки знаний.
      </p>

      <v-row>
        <v-col v-for="app in apps" :key="app.to" cols="12" md="6">
          <v-card variant="outlined" hover class="h-100" :to="app.to">
            <v-card-text class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar :color="app.color" size="large" class="mr-4">
                  <v-icon :icon="app.icon" size="large" />
                </v-avatar>
                <div>
                  <h2 class="text-h6 font-weight-bold mb-1">{{ app.title }}</h2>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ app.description }}</p>
                </div>
              </div>
            </v-card-text>

            <v-card-actions class="pa-6 pt-0">
              <v-btn :color="app.color" variant="tonal" append-icon="mdi-arrow-right">
                Открыть
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
