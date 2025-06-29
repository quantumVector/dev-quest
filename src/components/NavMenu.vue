<script setup lang="ts">

</script>

<template>
  <v-navigation-drawer :width="210">
    <v-list-item to="/" title="Главная" prepend-icon="mdi-home-outline" />
    <v-list-item to="/tests" title="Тесты" prepend-icon="mdi-format-list-checks" />
    <v-list-item to="/interview" title="Собеседование" prepend-icon="mdi-forum-outline" />
  </v-navigation-drawer>
</template>
