<script setup lang="ts">
import NavMenu from "@/components/NavMenu.vue";
</script>

<template>
  <v-app>

    <NavMenu />

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
