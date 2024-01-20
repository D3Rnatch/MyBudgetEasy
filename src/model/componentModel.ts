
export interface DBItem {
    timestamp: any
}

export interface Category extends DBItem {
    uid: string // Left empty up until registered to db
    title: string
    color: string
    max:number
    amount:number
    timestamp:any
}

export class CategoryImpl implements Category {
    uid: string // Left empty up until registered to db
    title: string
    color: string
    max:number
    amount:number
    timestamp:any

    constructor()
    {
        this.uid = ""
        this.title = ""
        this.color = ""
        this.max = 0
        this.amount = 0
        this.timestamp = null
    }
}

export interface ExpenseSubItem {
    amount:number
    category:string // Maps to UID of Category (not its title)
}

export interface ExpenseItem extends DBItem {
    date:string
    totalAmount:number
    amounts: ExpenseSubItem[]
    description:string
    id:number
    user:string
    timestamp:any
}

export class ExpenseItemImpl implements ExpenseItem 
{
    date: string
    totalAmount: number
    amounts: ExpenseSubItem[]
    description: string
    id: number
    user: string
    timestamp:any

    constructor()
    {
        this.amounts = new Array<ExpenseSubItem>()
        this.totalAmount = 0
        this.description = ""
        this.date = ""
        this.user = ""
        this.id = -1
        this.timestamp = null
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

export interface Account extends DBItem
{
    name:string
    users:UserLink[]
    timestamp:any
}

export class AccountImpl implements Account
{
    name:string
    users:UserLink[]// Stores User UIDs
    timestamp:any

    constructor()
    {
        this.name = ""
        this.users = new Array<UserLink>()
        this.timestamp = null
    }
}

export enum OwnershipMode {
    Owner,
    Maintainer
}

export interface AccountLink {
    key:string // uid
    mode:OwnershipMode // ownership which enables some features such as "remove account"
}

export interface User extends DBItem
{
    accounts:AccountLink[]
    name:string
    timestamp:any
}

export class UserImpl implements User
{
    accounts:AccountLink[]
    name:string
    timestamp:any

    constructor()
    {
        this.accounts = new Array<AccountLink>()
        this.name = ""
        this.timestamp = null
    }
}
