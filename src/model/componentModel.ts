
export interface Category {
    uid: string // Left empty up until registered to db
    title: string
    color: string
    max:number
    amount:number
}

export class CategoryImpl implements Category {
    uid: string // Left empty up until registered to db
    title: string
    color: string
    max:number
    amount:number

    constructor()
    {
        this.uid = ""
        this.title = ""
        this.color = ""
        this.max = 0
        this.amount = 0
    }
}

export interface ExpenseSubItem {
    amount:number
    category:string // Maps to UID of Category (not its title)
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

export interface UserLink
{
    uid:string // may be unknown up until a User says "it's me"
    name:string
}

export interface Account
{
    name:string
    users:UserLink[]
}

export class AccountImpl implements Account
{
    name:string
    users:UserLink[]// Stores User UIDs

    constructor()
    {
        this.name = ""
        this.users = new Array<UserLink>()
    }
}
