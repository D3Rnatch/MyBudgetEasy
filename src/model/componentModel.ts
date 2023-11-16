
export interface Category {
    title: string
    color: string
    max:number
    amount:number
}

export interface ExpenseSubItem {
    amount:number
    category:string
}

export interface ExpenseItem {
    date:string
    totalAmount:number
    amounts: ExpenseSubItem[]
    description:string
    id:number
    user:string
}

export class ExpenseItemImpl implements ExpenseItem 
{
    date: string
    totalAmount: number
    amounts: ExpenseSubItem[]
    description: string
    id: number
    user: string

    constructor()
    {
        this.amounts = new Array<ExpenseSubItem>()
        this.totalAmount = 0
        this.description = ""
        this.date = ""
        this.user = ""
        this.id = -1
    }
}

// Item returned by expense list selection
export interface ExpenseItemSelection
{
    index: number
    data: ExpenseItem
}

export class ExpenseItemSelectionImpl implements ExpenseItemSelection
{
    index: number
    data: ExpenseItem

    constructor()
    {
        this.index = -1
        this.data = (new ExpenseItemImpl)
    }
}