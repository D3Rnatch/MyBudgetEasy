// vuex.d.ts
import { Store } from 'vuex'

declare module '@vue/runtime-core' {

    export interface State {
        auth_userid: string,
        authenticated: boolean
      }      

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}