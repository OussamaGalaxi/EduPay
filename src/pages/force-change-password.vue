<script setup lang="ts">
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import { ChangePWDTO } from "@/@core/types"
import { useAuthStore } from "@/store/useAuthStore"
import authV2ForgotPasswordIllustrationDark from '@images/pages/auth-v2-forgot-password-illustration-dark.png'
import authV2ForgotPasswordIllustrationLight from '@images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { jwtDecode } from 'jwt-decode'
import { VForm } from "vuetify/components/VForm"

const authThemeImg = useGenerateImageVariant(authV2ForgotPasswordIllustrationLight, authV2ForgotPasswordIllustrationDark)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

definePage({
  meta: {
    layout: "blank",
    unauthenticatedOnly: true,
  },
});


const refVForm = ref<VForm>()


const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)


const confirmPassword = ref('')
const changePWDTO = ref<ChangePWDTO>({
  oldPassword: "",
  newPassword: ""
})

const router = useRouter()
const route = useRoute()
const ability = useAbility();

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
});
const credentials = ref({
  email: "",
  password: "",
});
const authStore = useAuthStore();
const { login, changePassword, getCurrentUser, setCurrentUser, setToken } = authStore;
const loader = ref(false)


function decodeToken() {
  const accessToken = ref<string>(useCookie('accessToken').value)
  const userData = jwtDecode(accessToken.value.toString()) || {}
  return userData.sub
}
console.log(decodeToken());

const LogIn = async () => {
  try {
    loader.value = true
    // Fetch user data
    // console.table(credentials.value);

    // const data = await login(credentials.value);
    // setToken(data.access_token);
    // loader.value = true
    // const userData = await getCurrentUser();
    // setCurrentUser(userData);
    // console.log(userData);


    // let userAbilityRules = [];
    // if (userData?.scope.includes("ROLE_ADMIN")) {
    //   userAbilityRules = [
    //     { action: "manage", subject: "all" },
    //     { action: "manage", subject: "ADMIN" },
    //     { action: "manage", subject: "STUDENT" },
    //   ];
    // } else {
    //   userAbilityRules = [{ action: "manage", subject: "STUDENT" }];
    // }

    // useCookie("userAbilityRules").value = userAbilityRules;
    // ability.update(userAbilityRules);

    // Redirect
    const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value)
    if (isLoggedIn) {
      setTimeout(() => {
        loader.value = false
      }, 1000)
      router.push(route.query.to ? String(route.query.to) : "/");

    }
    else
      alert('Credentials Not Match')
    loader.value = false
    // await nextTick(() => {
    //   router.push(route.query.to ? String(route.query.to) : "/");
    // });
  } catch (err) {
    console.error(err);
  }
};


//👉 - Change Password
const updatePassword = () => {


  refVForm.value?.validate().then(({ valid }) => {
    if (valid) {

      if (confirmPassword.value == changePWDTO.value.newPassword)
        changePassword(changePWDTO.value).then(() => {
          credentials.value.email = decodeToken()
          credentials.value.password = changePWDTO.value.newPassword
          LogIn()
        })
    }
  })
}

</script>

<template>
  <RouterLink to="/">
    <div class="auth-logo d-flex align-center gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />
      <h1 class="auth-title">
        {{ themeConfig.app.title }}
      </h1>
    </div>
  </RouterLink>

  <VRow class="auth-wrapper bg-surface" no-gutters>
    <VCol md="8" class="d-none d-md-flex">
      <div class="position-relative bg-background w-100 me-0">
        <div class="d-flex align-center justify-center w-100 h-100" style="padding-inline: 150px;">
          <VImg max-width="468" :src="authThemeImg" class="auth-illustration mt-16 mb-2" />
        </div>

        <img class="auth-footer-mask" :src="authThemeMask" alt="auth-footer-mask" height="280" width="100">
      </div>
    </VCol>

    <VCol cols="12" md="4" class="d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <h4 class="text-h4 mb-1">
            Change Password first to enter our app? 🔒
          </h4>
          <p class="mb-0">
            Change It!!!
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="updatePassword">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <!-- 👉 current password -->
                {{ changePWDTO.oldPassword }}
                <AppTextField v-model="changePWDTO.oldPassword" :type="isCurrentPasswordVisible ? 'text' : 'password'" :append-inner-icon="isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" label="Current Password" autocomplete="on" placeholder="Current Password" @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible" :rules="[requiredValidator]" />
              </VCol>

              <VCol cols="12">
                <!-- 👉 new password -->
                {{changePWDTO.newPassword}}
                <AppTextField v-model="changePWDTO.newPassword" :type="isNewPasswordVisible ? 'text' : 'password'" :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" label="New Password" autocomplete="on" placeholder="New Password" @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible" :rules="[requiredValidator]" />
              </VCol>

              <VCol cols="12">
                <!-- 👉 confirm password -->
                <AppTextField v-model="confirmPassword" :type="isConfirmPasswordVisible ? 'text' : 'password'" :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'" label="Confirm New Password" autocomplete="on" placeholder="Confirm New Password" @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible" :rules="[requiredValidator]" />
              </VCol>
              <!-- Reset link -->
              <VCol cols="12">
                <VBtn block type="submit" :loading="loader">
                  Enter to our App
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink class="d-flex align-center justify-center" :to="{ name: 'login' }">
                  <VIcon icon="tabler-chevron-left" size="20" class="me-1 flip-in-rtl" />
                  <span>Back to login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
