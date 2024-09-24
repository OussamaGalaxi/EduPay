import { canNavigate } from '@/@layouts/plugins/casl';
import type { RouteNamedMap, _RouterTyped } from 'unplugin-vue-router';
export const setupGuards = (router: _RouterTyped<RouteNamedMap & { [key: string]: any }>) => {
  router.beforeEach(to => {
    console.log(" 🚨 GUARD 🚨");
    /*
        * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
        * Examples of public routes are, 404, under maintenance, etc.
        */
    if (to.meta.unauthenticatedOnly)
      return

    /**
     * Check if user is logged in by checking if token & user data exists in local storage
     * Feel free to update this logic to suit your needs
     */
    const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value)

    /*
      If user is logged in and is trying to access login like page, redirect to home
      else allow visiting the page
      (WARN: Don't allow executing further by return statement because next code will check for permissions)
     */
    // if (to.meta.unauthenticatedOnly) {
    //   if (isLoggedIn)
    //     return '/'
    //   else
    //     return undefined
    // }

    if (!canNavigate(to)) {
      /* eslint-disable indent */
      return { name: 'not-authorized' }
    }

  })

}
