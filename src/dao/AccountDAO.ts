import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, setDoc, getDocs, Firestore, addDoc, query, where, deleteDoc, getDoc, serverTimestamp, DocumentData, documentId } from 'firebase/firestore'
import { converter, tsConverter } from '@/dao/DAOUtils'

import { Account, Category } from '@/model/componentModel'


enum PathTypes {
    Categories,
    Account
}

/**
*   Data Access Object meant to handle all associated features of an Account:
*     - Users management
*     - Account's name
*     - Expense Categories.
*   Getters are to be used with vuefire wrappers useDocument, useCollection, etc.
*   Note: all returned data are promises, therefore the use a deconstructed returns is recommended:
*   ex. const {
*           data: categories, // Stores the data
*           pending:categoryPending // Track status of promise
*       } = useCollection(dao.getCategories(accountName))
*/
export class AccountDAO
{
    private db_: Firestore
    private accountCollectionName_ = "accounts"
    private categoryCollectionName_ = "categories"

    constructor()
    {
        this.db_ = useFirestore()
    }

    /**
     * Fetches the account by searching for the matching Document ID
     * @param accountKey Document ID value in accounts
     * @returns the corresponding doc reference if any found.
     * NOT WORKING.
     */
    public getAccount(accountKey: string)
    {
        return doc(this.db_, this.buildPaths(PathTypes.Account, "") + "/" + accountKey)
                        .withConverter<Account, DocumentData>(converter<Account>())
    }

    /**
     * Fetches the accounts by searching for the matching Document ID provided as input argument.
     * This method limits the fetch to 10 elements due to the use of "in" parameter in query.
     * @param accountList Document ID value in accounts as string array.
     * @returns the created query reference object.
     */
    public getAccounts(accountList:string[])
    {
        return query(collection(this.db_, this.buildPaths(PathTypes.Account, "")).withConverter<Account, DocumentData>(converter<Account>()), where('__name__', 'in', accountList))
    }

    /**
    * Adds or Updates an account to the server and returns the id of the Account.
    * Adds the server timestamp to the object creation.
    * @param account A complete Account Object
    * @return Account key value
    */
    public addAccount(accountCls:Account):string
    {
        const data = tsConverter<Account>().from(accountCls)        

        const localDocRef = doc(collection(this.db_, this.buildPaths(PathTypes.Account, ""))
                                .withConverter<Account, DocumentData>(converter<Account>()))
        setDoc(localDocRef, data)
        return localDocRef.id
    }

    /**
    * Adds the list of categories to the associated existing account.
    * @param accountId Account key value
    * @param categories List of available categories
    */
    public setCategories(accountId:string, categories:Category[])
    {
        for(let i=0; i< categories.length; ++i)
        {
            const cat = tsConverter<Category>().from(categories[i])
            cat.timestamp = serverTimestamp()
            addDoc(collection(this.db_, this.buildPaths(PathTypes.Categories, accountId))
                                .withConverter<Category, DocumentData>(converter<Category>()), cat)
        }
    }

    /**
     * Fetches the list of categories associated to the provided accountKey value
     * @param accountKey the document ID of the corresponding account
     * @returns the collection reference to the matching categories if any found.
     */
    public getCategories(accountKey: string)
    {
        return collection(this.db_, this.buildPaths(PathTypes.Categories, accountKey))
                                .withConverter<Category, DocumentData>(converter<Category>())
    }

    /**
     * Removes the selected Category
     * @param id AccountKey value corresponding to the categories collection
     * @param title Find by title
     */
    public async removeCategory(id:string, title:string)
    {
        const col = collection(this.db_, this.buildPaths(PathTypes.Categories, id))

        const q = query(col, where("title", "==", title));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
        });
    }

    /**
     * Constructs the string path in order to access the document in database
     * @param type Type of path (account or categories)
     * @param accountId AccountID only used for categories
     * @returns the constructed path
     */
    private buildPaths(type:PathTypes, accountId:string) : string
    {
        let ret:string
        switch(type)
        {
            case PathTypes.Categories:
                ret= (this.categoryCollectionName_ +"/"+ accountId +"/"+ this.categoryCollectionName_)
                break;
            case PathTypes.Account:
                ret= (this.accountCollectionName_)
                break;
            default:
                ret=""
                break;
        }

        return ret
    }

}
