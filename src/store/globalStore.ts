import { defineStore } from "pinia"
import { Account, AccountImpl, User, UserImpl, Category } from './accountModel'

export const GLOBAL_NAME="global"

// define your typings for the store state
export interface State {
    auth_userid: string,
    authenticated: boolean
}

export interface AccountData {
    tmpAccount: Account
    tmpCategories: Category[]
    currentUser: User
}

export const useGlobalStore = defineStore('global', {
    state: () : State => {
        return {
            auth_userid: "",
            authenticated: false,
        }
    },
    persist: false
})


export const useAccountDataStore = defineStore('accountData', {
    state: () : AccountData => {
        return {
            tmpAccount: new AccountImpl,
            currentUser: new UserImpl,
            tmpCategories: []
        }
    }
})