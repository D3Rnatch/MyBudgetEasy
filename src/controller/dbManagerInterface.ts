// Model imports
import { Account, UserImpl, User, Category, OwnershipMode, AccountImpl } from '@/model/componentModel'

// store imports
import { useAccountDataStore, useGlobalStore } from '@/store/globalStore'

// DAO imports
import { UserDAO } from '@/dao/UserDAO'
import { AccountDAO } from '@/dao/AccountDAO'
import { useDocument } from 'vuefire'

import { watch } from 'vue'
import { DocumentSnapshot } from 'firebase/firestore'

export abstract class dbManagerInterface
{
    public abstract addAccount(account:Account, categories:Category[]) : boolean;

    public abstract addUser(userUID:string, userName:string, email:string) : string;

    public abstract synchronizeUserData(userUID:string);


    public static getInstance() : dbManagerInterface {
        dbManagerInterface.instance_ = new dbManagerInterfaceImpl
        return dbManagerInterface.instance_
    }

    protected static instance_:dbManagerInterface
}

/** Private section - not meant to be accessible from the outside */
// TODO: Add a state Machine inside of this file => Will definitely allow to ensure all inputs are gathered in the correct order.
class dbManagerInterfaceImpl implements dbManagerInterface
{ 
    private userDAO_: UserDAO
    private accountDAO_: AccountDAO

    constructor()
    {
        this.userDAO_ = new UserDAO
        this.accountDAO_ = new AccountDAO
    }

    addAccount(account:Account, categories:Category[]) : boolean
    {
        const store = useGlobalStore()
        const dataStore = useAccountDataStore()

        const uid = store.auth_userid

        // Add the account to the accounts list.
        const accountuid = this.accountDAO_.addAccount(account)

        // Add categories associated to the account using account uid.
        this.accountDAO_.setCategories(accountuid, categories)

        // Use the uid of the newly created account to link user with account.
        const userData:User = structuredClone(dataStore.currentUser.value)
        userData.accounts.push({ key: accountuid, mode: OwnershipMode.Maintainer})
        
        this.userDAO_.addUser(uid, userData)

        return true
    }

    addUser(userUID:string, userName:string, email:string) : string
    {
        const usr = new UserImpl as User;
        usr.name = userName;
        usr.email = email;

        return this.userDAO_.addUser(userUID, usr);    
    }

    synchronizeUserData(userUID:string)
    {
        console.log(" Loading " + userUID)
    }

}

