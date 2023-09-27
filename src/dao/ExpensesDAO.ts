import { useFirestore } from 'vuefire'
import { collection, doc, setDoc, getDocs, Firestore, PartialWithFieldValue, QueryDocumentSnapshot, addDoc, query, where, deleteDoc, DocumentData } from 'firebase/firestore'
import { converter } from '@/dao/DAOUtils'

export interface Expense
{
    type:number // enum of SINGLE, MULTIPLE
    category:string // Key ref of the corresponding Category
    amount:number
    id:string // auto-generated id.
    date:string
    owner:string // Key Ref of the User
    comment:string
    parent:string // Key ref to other expense
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
    private expenseCollectionName_:string = "expenses"
    private categoryCollectionName_:string = "categories"

    constructor()
    {
        this.db_ = useFirestore()
    }

    public getExpenses(accountKey:string)
    {
        collection(this.db_, this.expenseCollectionName_, accountKey, this.expenseCollectionName_)
        .withConverter<Expense[], DocumentData>(converter<Expense[]>())
    }

    public addExpense(accountKey:string, expense:Expense)
    {
        addDoc(collection(this.db_, this.expenseCollectionName_, accountKey, this.expenseCollectionName_)
        .withConverter<Expense, DocumentData>(converter<Expense>()), expense)
    }

    public setExpense(accountKey:string, expense:Expense)
    {
        setDoc(doc(this.db_, this.expenseCollectionName_, accountKey, expense.id).withConverter<Expense, DocumentData>(converter<Expense>()), expense)
    }
}