import { defineStore } from "pinia"
import { Account, AccountImpl, User, UserImpl, Category } from '@/model/componentModel'
import { ref } from 'vue'

export const GLOBAL_NAME="global"

// define your typings for the store state
export interface State {
    auth_userid: string,
    authenticated: boolean
}

export interface AccountData {
    tmpAccount: Account
    tmpCategories: Category[]
    currentUser: any
    currentAccount: Account
    currentCategories: Category[]
    accountsList: any
    loadingUserData:boolean
    loadingAccountData:boolean
    loadingCategories:boolean
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
            tmpCategories: [],
            currentUser: ref<User>(new UserImpl),
            currentAccount: null,
            currentCategories: null,
            accountsList: ref<Account[]>(new Array<Account>()),
            loadingUserData:false,
            loadingAccountData:false,
            loadingCategories:false
        }
    }
})