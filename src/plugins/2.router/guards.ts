import type { RouteNamedMap, _RouterTyped } from 'unplugin-vue-router';
export const setupGuards = (router: _RouterTyped<RouteNamedMap & { [key: string]: any }>) => {
  router.beforeEach(to => {
    // console.log("🚩 Before Start ");

    const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value);
    // console.log(isLoggedIn);
    // console.log(to);
    // const isAdmin = (useCookie('userData').value?.scope.includes('ROLE_ADMIN'));

    // Check if the route is public or if it's the login route
    // if (to.name === 'login' || to.name === 'not-authorized') {
    //   return;
    // }
    if (to.meta.public)
      return

    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn)
        return '/'
      else
        return undefined
    }


    // if (to.meta.public)
    //   return

    // if (!canNavigate(to)) {

    //   return { name: 'not-authorized' }

    // }

  })

}

