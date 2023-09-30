import { defineStore } from "pinia"

export const GLOBAL_NAME="global"

// define your typings for the store state
export interface State {
    auth_userid: string,
    authenticated: boolean
  }

export const useGlobalStore = defineStore('global', {
    state: () : State => {
        return {
            auth_userid: "",
            authenticated: false,
        }
    },
    persist: true
})