export interface DBItem
{
    timestamp:any
}
 
export interface Category extends DBItem
{
    color:string
    title:string
}

export class CategoryImpl implements Category
{
    color:string
    title:string
    timestamp:any

    constructor()
    {
        this.color = ""
        this.title = ""
        this.timestamp = null
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
    key:string
    mode:OwnershipMode
}

export interface User extends DBItem
{
    accounts:AccountLink[]
}


export class UserImpl implements User
{
    accounts:AccountLink[]
    timestamp:any

    constructor()
    {
        this.accounts = new Array<AccountLink>()
        this.timestamp = null
    }
}
