import { Rule } from '@/plugins/casl/ability';
import axios from 'axios';
import { ChangePWDTO, DtoNewStudent } from './../@core/types';

interface Credentials {
  email: string,
  password: string
}

interface EduPayUser {
  departmentName: string,
  firstName: string,
  lastName: string,
  role: string,
  email: string
}




export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<EduPayUser | null>(null)
  const userAbilityRules = ref<Rule[]>()
  const loading = ref(false)
  const error = ref('')
  const accessToken = ref<string | null>(null)

  // watch(accessToken, (newToken) => {
  //   useCookie('accessToken').value = newToken;
  // });

  // watch(currentUser, (newUser: EduPayUser) => {
  //   useCookie('userData').value = JSON.stringify(newUser);
  // });

  //👉 - Get All Student 
  async function login(credentials: Credentials) {
    loading.value = true;
    let response;
    try {
      response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login?username=${credentials.email}&password=${credentials.password}`)

      //👉 - Set TokenAccess
      setToken(response.data.access_token)

      //👉 - Set CurrentUser
      const { access_token, ...userData } = response.data;
      setCurrentUser(userData);

      //👉 - Set UserAbilityRules
      (userData.roles.includes('ROLE_ADMIN')) ? setUserAbilityRules([
        { action: "manage", subject: "all" },
        { action: "manage", subject: "ADMIN" },
        { action: "manage", subject: "STUDENT" },
      ]) : setUserAbilityRules([
        { action: "manage", subject: "STUDENT" },
      ]);

      loading.value = false;

      return response.data

    } catch (err) {
      if (axios.isAxiosError(err)) {
        //👉 -  Handle AxiosError and display backend error message
        console.error('AxiosError: ', err.response?.data || 'An error occurred.');
        error.value = err.response?.data
      } else {
        //❗ -  Handle non-Axios errors
        console.error('Error: ', err.message);
      }
    }
  }

  //👉 - Get All Student 
  async function getCurrentUser() {
    try {
      loading.value = true
      const { data, isFetching, error: isError } = await useApi('/auth/profile')
      setCurrentUser(data.value)
      loading.value = isFetching.value
      error.value = isError.value
      return currentUser.value?.credentials?.claims

    } catch (err) {
      console.log(err);
    }
  }



  //👉 - Register new Student
  async function register(payload: DtoNewStudent) {
    return await useApi('/user/register').post(payload)
  }


  //👉 - Get All Student 
  async function logout() {
    try {
      return await useApi('/auth/logout').post()
    } catch (err) {
      error.value = err?.message;
    }
  }

  //👉 - Reset the password to the default value (123456) 
  async function resetPasswordToDefault(email: string) {
    return await useApi(`/user/${email}/reset-pw`).put();
  }

  //👉 - Change user password
  async function changePassword(changePWDTO: ChangePWDTO) {
    return await useApi(`/user/change-pw`).put(changePWDTO);
  }


  function setCurrentUser(currUser) {
    if (currUser) {
      const { roles, ...userWithoutRoles } = currUser;
      console.log(isAdmin(roles));

      userWithoutRoles.role = isAdmin(roles);
      currentUser.value = userWithoutRoles;
      console.table(currentUser.value)
      useCookie('userData').value = JSON.stringify(currentUser.value);
    } else {
      console.info("currUser is null, cannot set user role.");
      currentUser.value = null;
      useCookie('userData').value = null;
    }
  }

  function setToken(token: string | null) {
    accessToken.value = token
    useCookie('accessToken').value = accessToken.value;
  }

  function setUserAbilityRules(newUserAbilityRules) {
    userAbilityRules.value = newUserAbilityRules
    useCookie('userAbilityRules').value = userAbilityRules.value ? JSON.stringify(userAbilityRules.value) : null;

    // if (currentUser.value?.role === 'ADMIN') {
    //   userAbilityRules.value = [
    //     { action: "manage", subject: "all" },
    //     { action: "manage", subject: "ADMIN" },
    //     { action: "manage", subject: "STUDENT" },
    //   ];
    // }
    // else {
    //   userAbilityRules.value = [{ action: "manage", subject: "STUDENT" }];
    // }
  }

  function getUserData() {
    return currentUser.value
  }

  function getToken() {
    return accessToken.value
  }

  //👉 - Approve Registration
  async function approveRegistration(email: string) {
    return await useApi('/user/approve?email=' + email).post()
  }

  //👉 - Decline Registration
  async function declineRegistration(email: string) {
    return await useApi('/user/decline?email=' + email).post()
  }

  //👉 - Ban Registration
  async function banRegistration(email: string) {
    return await useApi('/user/ban?email=' + email).post()
  }

  //👉 - Toggle Account Status
  async function toogleAccountStatus(email: string) {
    return await useApi('/toggle-account-status?email=' + email).put()
  }

  return {
    currentUser, loading, error, accessToken, userAbilityRules, register, setUserAbilityRules, setCurrentUser, setToken, login, logout, getUserData, getToken, getCurrentUser, resetPasswordToDefault, changePassword, approveRegistration, declineRegistration, banRegistration, toogleAccountStatus
  }
})
