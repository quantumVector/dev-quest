<script setup lang="ts">

</script>

<template>
  <v-navigation-drawer :width="210">
    <v-list-item to="/" title="Главная" prepend-icon="mdi-home-outline" />
    <v-list-item to="/tests" title="Тесты" prepend-icon="mdi-format-list-checks" />
    <v-list-item to="/interview" title="Собеседование" prepend-icon="mdi-forum-outline" />
    <v-list-item
      to="/frontend-live-coding"
      :active="$route.path.startsWith('/frontend-live-coding')"
      prepend-icon="mdi-code-braces"
    >
      <v-list-item-title class="text-wrap">Frontend Live Coding</v-list-item-title>
    </v-list-item>
    <v-list-item to="/apps" title="Приложения" prepend-icon="mdi-apps" />
  </v-navigation-drawer>
</template>
