<script setup>
  import HeaderVue from './components/Header.vue';
  import NavVue from './components/Nav.vue';
  import FooterVue from './components/Footer.vue';
</script>

<template>
  <div id="page-container" class="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed main-content-narrow">
    <NavVue></NavVue>
    <HeaderVue></HeaderVue>

    <main id="main-container">
      <div class="content">
        <div class="d-md-flex justify-content-md-between align-items-md-center py-3 pt-md-3 pb-md-0 text-center text-md-left">
          <router-view :key="$route.path"></router-view>
        </div>
      </div>
    </main>

    <FooterVue></FooterVue>
  </div>
</template>

<style scoped>

</style>
