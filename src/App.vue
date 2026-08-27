<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
    <SiteChat />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterSection from './components/FooterSection.vue';
import SiteChat from './components/SiteChat.vue';

export default {
  name: 'App',
  components: { NavBar, FooterSection, SiteChat },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
