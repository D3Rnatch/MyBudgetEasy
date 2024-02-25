
import { UserDAO } from "@/dao/UserDAO";
import { onSnapshot, getDoc } from "firebase/firestore";
import { useGlobalStore, useAccountDataStore } from '@/store/globalStore'
import { AccountDAO } from "@/dao/AccountDAO";
import { ExpensesDAO, ExpenseImpl, Expense, ExpenseType } from '@/dao/ExpensesDAO'
import { Account, DBObject, Category, ExpenseItem, ExpenseItemImpl, ExpenseSubItem } from "@/model/componentModel";

export class DataSyncManager
{
    private userDAO_: UserDAO
    private accountDAO_: AccountDAO
    private expenseDAO_: ExpensesDAO
    private userSubscription_:any
    private globalStore_:any
    private dataStore_:any
    private accountsSubscription_:any
    private categoriesSubscription_:any
    private expensesSubscription_:any

    constructor()
    {
        this.userDAO_ = null
        this.accountDAO_ = null
        this.userSubscription_ = null
        this.globalStore_ = null
        this.dataStore_ = null
        this.categoriesSubscription_ = null
        this.expensesSubscription_ = null
        this.expenseDAO_ = null
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
            const categoryMap = new Map<string, Category>()
            data.forEach((content) => {
                finalData.push( new DBObject<Category>( content.data() as Category, content.id ) )
                categoryMap.set(content.id, content.data() as Category)
            })

            this.dataStore_.currentCategories = finalData
            this.dataStore_.categoriesDetails = categoryMap

            callback()
        })

        this.expensesSubscription_ = onSnapshot(this.expenseDAO_.getExpenses(this.dataStore_.currentAccount.id), (snapshot) => {

            // Finalized model:
            const rootElems = new Array<ExpenseItem>()
            const childrenElem = new Map<string, {total:number, data:Array<ExpenseSubItem>}>()

            // Items are linked by the reference of the parent using its ID.
            // Database may not be ordered, so we list all parent items and children in separate lists.
            // Then once all have been categorized, for each root item we associate the list of identified children.
            snapshot.docs.forEach( (data, index) => {
                const content = data.data() as Expense                
                if(content.type === ExpenseType.PARENT)
                {
                    const item:ExpenseItemImpl = new ExpenseItemImpl()
                    item.date = content.date
                    item.description = content.comment
                    item.user = content.owner
                    item.id = data.id.toString()

                    if(!content.childNumber)
                    {
                        const subItem = {amount:content.amount, category: content.category} as ExpenseSubItem
                        item.addAmount(subItem)
                    }

                    rootElems.push(item)
                }
                else
                {
                    if(!childrenElem.has(content.parent))
                    {
                        childrenElem.set(content.parent, {total: 0, data:new Array<ExpenseSubItem>})
                    }

                    const itm = childrenElem.get(content.parent)
                    itm.total += content.amount
                    itm.data.push({ amount:content.amount, category: content.category } as ExpenseSubItem)
                }
            })

            rootElems.forEach((root:ExpenseItemImpl) => {

                if(childrenElem.has(root.id))
                {
                    const itm = childrenElem.get(root.id)
                    root.add(itm.total, itm.data)
                }
            })

            // Update the store with the final amounts:
            this.dataStore_.accountExpenses = rootElems
        })
    }

    public stopSync()
    {
        console.log("StopSync")
        this.userSubscription_()

        this.accountsSubscription_()
        this.accountsSubscription_ = null
    }


    public addExpenseToCurrentAccount(expense:ExpenseItem)
    {
        // TODO: Use the Account UID instead of NAME.

        console.log("addExpenseToCurrentAccount " + expense.amounts.length + " account " + " date " + expense.date)
        this.checkAndInitialize()

        // Determine if there is a parent and several children ?
        if(expense.amounts.length > 1)
        {
            // Create Parent element:
            const rootExpense = { type:ExpenseType.PARENT
                                , category:""
                                , amount:0
                                , id:"" 
                                , date:expense.date
                                , owner:expense.user
                                , comment:expense.description
                                , parent:""
                                , childNumber:expense.amounts.length
                            }

            // Construct Child items
            const items:Expense[] = new Array<Expense>()
            
            for(const item of expense.amounts)
            {
                items.push({
                    type:ExpenseType.CHILD
                    , category:item.category
                    , amount:item.amount
                    , id:"" 
                    , date:""
                    , owner:""
                    , comment:""
                    , parent:""
                    , childNumber:0
                })
            }
            this.expenseDAO_.addExpense(this.dataStore_.currentAccount.id, rootExpense, items)
        }
        else
        {
            const rootExpense = { type:ExpenseType.PARENT
                , category:expense.amounts[0].category
                , amount:expense.amounts[0].amount
                , id:"" 
                , date:expense.date
                , owner:expense.user
                , comment:expense.description
                , parent:""
                , childNumber:0
            }

            this.expenseDAO_.addExpense(this.dataStore_.currentAccount.id, rootExpense, new Array<Expense>())
        }
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

        if(!this.expenseDAO_)
        {
            this.expenseDAO_ = new ExpensesDAO()
        }
    }
}

// Instance of manager
export const useDataSyncManager = new DataSyncManager()
