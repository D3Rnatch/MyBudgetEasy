import { defineStore } from "pinia"
import { Account, AccountImpl, User, UserImpl, Category, DBObject, ExpenseItem } from '@/model/componentModel'
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
    currentAccount: DBObject<Account>
    currentCategories: DBObject<Category>[]
    categoriesDetails: Map<string, Category>
    accountsList: DBObject<Account>[]
    accountExpenses:DBObject<ExpenseItem>[]
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
    persist: true
})


export const useAccountDataStore = defineStore('accountData', {
    state: () : AccountData => {
        return {
            tmpAccount: new AccountImpl,
            tmpCategories: [],
            currentUser: ref<User>(new UserImpl),
            currentAccount: new DBObject<Account>(new AccountImpl as Account, ""),
            currentCategories: new Array<DBObject<Category>>(),
            categoriesDetails: new Map<string, Category>(),
            accountsList: new Array<DBObject<Account>>(),
            accountExpenses: new Array<DBObject<ExpenseItem>>(),
            loadingUserData:false,
            loadingAccountData:false,
            loadingCategories:false
        }
    }
})