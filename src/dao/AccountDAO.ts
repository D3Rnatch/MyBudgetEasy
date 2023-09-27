import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, setDoc, getDocs, Firestore, PartialWithFieldValue, QueryDocumentSnapshot, addDoc, query, where, deleteDoc, getDoc, serverTimestamp, DocumentData } from 'firebase/firestore'
import { converter } from '@/dao/DAOUtils'

export interface DBItem
{
    timestamp:any
}

export interface Category extends DBItem
{
    color:string
    title:string
}

export interface Account extends DBItem
{
    name:string
    users:string[]
}

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
    private accountCollectionName_:string = "accounts"
    private categoryCollectionName_:string = "categories"

    constructor()
    {
        this.db_ = useFirestore()
    }

    /**
     * Fetches the account by searching for the matching Document ID
     * @param accountKey Document ID value in accounts
     * @returns the corresponding doc reference if any found.
     */
    public getAccount(accountKey: string)
    {
        return doc(this.db_, this.buildPaths(PathTypes.Account, ""), accountKey)
                        .withConverter<Account, DocumentData>(converter<Account>())
    }

    /**
    * Adds or Updates an account to the server and returns the id of the Account.
    * Adds the server timestamp to the object creation.
    * @param account A complete Account Object
    * @return Account key value
    */
    public addAccount(account:Account):string
    {
        account.timestamp = serverTimestamp()
        const localDocRef = doc(collection(this.db_, this.buildPaths(PathTypes.Account, "")).withConverter<Account, DocumentData>(converter<Account>()))
        setDoc(localDocRef, account)
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
            let cat = categories[i]
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
                                .withConverter<Category[], DocumentData>(converter<Category[]>())
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
