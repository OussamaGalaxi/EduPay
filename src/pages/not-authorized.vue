<script setup lang="ts">
import pages401 from '@images/pages/401.png';
import miscMaskDark from '@images/pages/misc-mask-dark.png';
import miscMaskLight from '@images/pages/misc-mask-light.png';

import { useAuthStore } from '@/store/useAuthStore';
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant';

definePage({
  alias: '/pages/misc/not-authorized',
  meta: {
    layout: 'blank',
    public: true,
  },
})


// const userData = useCookie<Record<string, unknown> | null | undefined>('userData')
// const userRole = userData.value?.roles.includes('ROLE_ADMIN') ? "ADMIN" : userData.value?.roles.includes('ROLE_STUDENT') ? "STUDENT" : null

// const currentUser = useCookie('userData').value?.includes('ROLE_ADMIN') ? "ADMIN" : "STUDENT"
const authStore = useAuthStore()
const { currentUser } = storeToRefs(authStore)

console.log("👀 ->", currentUser.value?.role)
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)
</script>

<template>
  <div v-if="currentUser" class="misc-wrapper">
    <ErrorHeader status-code="401" title="You are not authorized! 🔐" description="You don’t have permission to access this page. Go Home!." />

    <VBtn class="mb-11" :to="currentUser.value?.role==='ADMIN' ?   {name:'root'} : currentUser.value?.role === 'STUDENT' ?{name:'student-list'} : {name:'login'}">
      {{  currentUser.value?.role === "ADMIN" ?  'Back To Home' : currentUser.value?.role === 'STUDENT' ? 'Back To Student History' : 'Back To Login' }}
    </VBtn>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg :src="pages401" alt="not autorized" :max-height="$vuetify.display.smAndDown ? 350 : 500" class="mx-auto" />
    </div>

    <img class="misc-footer-img d-none d-md-block" :src="authThemeMask" alt="misc-footer-img" height="320">
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
