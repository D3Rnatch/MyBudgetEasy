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
    color = ""
    title = ""
    timestamp:any = null
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
    name = ""
    users:UserLink[] = [] // Stores User UIDs
    timestamp: any = null
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
    accounts = []
    timestamp: any = null
}
