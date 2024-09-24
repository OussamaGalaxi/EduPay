<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore';
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant';
import misc404 from '@images/pages/404.png';
import miscMaskDark from '@images/pages/misc-mask-dark.png';
import miscMaskLight from '@images/pages/misc-mask-light.png';

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)


const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

console.log("👀 ->", currentUser.value?.role)


definePage({
  alias: '/pages/misc/not-found/:error(.*)',
  meta: {
    layout: 'blank',
    public: true,
  },
})
</script>

<template>
  <div v-if="currentUser" class="misc-wrapper">
    <ErrorHeader status-code="404" title="Page Not Found ⚠️" description="We couldn't find the page you are looking for." />

    <VBtn class="mb-11" :to="currentUser.value?.role==='ADMIN' ?   {name:'root'} : currentUser.value?.role === 'STUDENT' ?{name:'student-list'} : {name:'login'}">
      {{  currentUser.value?.role === "ADMIN" ?  'Back To Home' : currentUser.value?.role === 'STUDENT' ? 'Back To Student History' : 'Back To Login' }}
    </VBtn>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg :src="misc404" alt="error 404" :max-height="$vuetify.display.smAndDown ? 350 : 500" class="mx-auto" />
    </div>

    <img class="misc-footer-img d-none d-md-block" :src="authThemeMask" alt="misc-footer-img" height="320">
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
