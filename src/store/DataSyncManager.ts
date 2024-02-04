
import { UserDAO } from "@/dao/UserDAO";
import { onSnapshot, getDoc } from "firebase/firestore";
import { useGlobalStore, useAccountDataStore } from '@/store/globalStore'
import { AccountDAO } from "@/dao/AccountDAO";
import { Account, DBObject, Category } from "@/model/componentModel";

export class DataSyncManager
{
    private userDAO_: UserDAO
    private accountDAO_: AccountDAO
    private userSubscription_:any
    private globalStore_:any
    private dataStore_:any
    private accountsSubscription_:any
    private categoriesSubscription_:any

    constructor()
    {
        this.userDAO_ = null
        this.accountDAO_ = null
        this.userSubscription_ = null
        this.globalStore_ = null
        this.dataStore_ = null
        this.categoriesSubscription_ = null
    }

    public syncData(callback : () => void)
    {
        this.checkAndInitialize()

        // Get User data :
        this.userSubscription_ = onSnapshot( this.userDAO_.getUser(this.globalStore_.auth_userid), (snapshot) => {
            this.dataStore_.currentUser.value = snapshot.data()

            const arr:string[] = []
            snapshot.data().accounts.forEach((account) => {
                arr.push( account.key as string )
            })

            this.accountsSubscription_ = onSnapshot(this.accountDAO_.getAccounts(arr), (data) => {              
                    data.forEach((content) => {
                        const index = this.dataStore_.accountsList.findIndex((el) => el.name === content.data().name) 
                        if(index !== -1)
                        {
                            this.dataStore_.accountsList[index] = new DBObject<Account>(content.data() as Account, content.id)
                        }
                        else
                        {
                            this.dataStore_.accountsList.push( new DBObject<Account>(content.data() as Account, content.id) )
                        }
                    })

                    if(this.dataStore_.length !== 0)
                    {
                        this.dataStore_.currentAccount = this.dataStore_.accountsList[0]
                        this.syncCurrentAccount(callback)
                    }
                    else
                    {
                        // Notify listening component that the load process is over.
                        callback()
                    }
            })
        })
    }

    public syncCurrentAccount(callback : () => void)
    {
        // Load categories for current account:
        this.categoriesSubscription_ = onSnapshot(this.accountDAO_.getCategories(this.dataStore_.currentAccount.id), (data) => {
            const finalData = new Array<DBObject<Category>>()
            data.forEach((content) => {
                finalData.push( new DBObject<Category>( content.data() as Category, content.id ) )
            })

            this.dataStore_.currentCategories = finalData

            callback()
        })
    }

    public stopSync()
    {
        console.log("StopSync")
        this.userSubscription_()

        this.accountsSubscription_()
        this.accountsSubscription_ = null
    }


    private checkAndInitialize()
    {
        if(!this.userDAO_)
        {
            this.userDAO_ = new UserDAO()
        }

        if(!this.accountDAO_)
        {
            this.accountDAO_ = new AccountDAO()
        }

        if(!this.globalStore_)
        {
            this.globalStore_ = useGlobalStore()
        }

        if(!this.dataStore_)
        {
            this.dataStore_ = useAccountDataStore()
        }
    }
}

// Instance of manager
export const useDataSyncManager = new DataSyncManager()
