<script setup lang="ts">
import pages401 from '@images/pages/401.png';
import miscMaskDark from '@images/pages/misc-mask-dark.png';
import miscMaskLight from '@images/pages/misc-mask-light.png';

import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant';

definePage({
  alias: '/pages/misc/not-authorized',
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const userData = useCookie('userData').value
const currentUser = userData?.role

console.log("👀 ->", currentUser)
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader status-code="401" title="You are not authorized! 🔐" description="You don’t have permission to access this page. Go Home!." />

    <VBtn class="mb-11" :to="currentUser==='ADMIN' ?   {name:'root'} : currentUser==='ADMIN'? {name:'student-payments-student'}:{name:'login'}">
      {{  currentUser === "ADMIN" ?  'Back To Home' : currentUser === "STUDENT" ?  'Back To Student History' : 'Back To Login' }}
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
