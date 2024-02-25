import { useFirestore } from 'vuefire'
import { collection, doc, setDoc, getDocs, Firestore, PartialWithFieldValue, startAfter, addDoc, query, where, deleteDoc, DocumentData, limit } from 'firebase/firestore'
import { converter } from '@/dao/DAOUtils'

export enum ExpenseType
{
    PARENT = 0,
    CHILD
}

export interface Expense
{
    type:ExpenseType // enum of SINGLE, MULTIPLE
    category:string // Key ref of the corresponding Category
    amount:number
    id:string // auto-generated id.
    date:string
    owner:string // Key Ref of the User
    comment:string
    parent:string // Key ref to other expense
    childNumber:number
}

export class ExpenseImpl implements Expense
{
    type = ExpenseType.PARENT // enum of SINGLE, MULTIPLE
    category = "" // Key ref of the corresponding Category
    amount = 0
    id= "" // auto-generated id.
    date=""
    owner="" // Key Ref of the User
    comment=""
    parent="" // Key ref to other expense
    childNumber = 0
}

/*
    - Amount per Category
    - List of expenses
    Category \
        ExpenseRef
    Expenses \
        ExpenseRef \
            CategoryRef
            ExpenseRef
*/
export class ExpensesDAO
{
    private db_: Firestore
    private expenseCollectionName_ = "expenses"
    private categoryCollectionName_ = "categories"

    constructor()
    {
        this.db_ = useFirestore()
    }

    public getExpensesPage(accountKey:string, numberOfItemsPerPage:number, lastRef?:any)
    {
        const collectionDta = collection(this.db_, this.expenseCollectionName_, accountKey, this.expenseCollectionName_)
                                            .withConverter<Expense, DocumentData>(converter<Expense>())
        let queryDta = null
        if(lastRef)
        {
            queryDta = query(collectionDta, startAfter(lastRef), limit(numberOfItemsPerPage))
        }
        else
        {
            queryDta = query(collectionDta, limit(numberOfItemsPerPage))
        }

        return queryDta
    }

    public getExpenses(accountKey:string)
    {
        return collection(this.db_, this.expenseCollectionName_, accountKey, this.expenseCollectionName_)
        .withConverter<Expense, DocumentData>(converter<Expense>())
    }

    public addExpense(accountKey:string, rootExpense:Expense, childExpenses:Expense[])
    {
        // Add Doc
        addDoc(collection(this.db_, this.expenseCollectionName_, accountKey, this.expenseCollectionName_)
                    .withConverter<Expense, DocumentData>(converter<Expense>()), rootExpense).then((docRef) => {
                        for(const items of childExpenses)
                        {
                            items.parent = docRef.id
                            addDoc(collection(this.db_, this.expenseCollectionName_, accountKey, this.expenseCollectionName_)
                                    .withConverter<Expense, DocumentData>(converter<Expense>()), items)
                        }
                    })
    }

    public setExpense(accountKey:string, expense:Expense)
    {
        setDoc(doc(this.db_, this.expenseCollectionName_, accountKey, expense.id).withConverter<Expense, DocumentData>(converter<Expense>()), expense)
    }

    public removeExpense(accountKey:string, ids:string[])
    {
        ids.forEach((value:string) => {
            // Remove all related docs:
            deleteDoc(doc(this.db_, this.expenseCollectionName_+"/"+accountKey+"/"+this.expenseCollectionName_+"/"+value))
        })
    }
}