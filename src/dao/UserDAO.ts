import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, setDoc, getDocs, Firestore, PartialWithFieldValue, QueryDocumentSnapshot, addDoc, query, where, deleteDoc, getDoc, serverTimestamp, DocumentData } from 'firebase/firestore'
import { converter, tsConverter } from '@/dao/DAOUtils'
import { User } from '@/model/componentModel'

/**
 * User:
 *  List of Accounts
 *  Mode (Owner, Invited)
 */
export class UserDAO
{
    private db_: Firestore
    private userCollectionName_ = "users"
    private accountRefName_ = "accounts"

    constructor()
    {
        this.db_ = useFirestore()
    }

    public getUser(userUID: string)
    {
        return doc(this.db_, this.userCollectionName_+"/"+userUID)
                        .withConverter<User, DocumentData>(converter<User>())
    }

    public addUser(userUID:string, userCls:User):string
    {
        const user = tsConverter<User>().from(userCls)
        user.timestamp = serverTimestamp()
        const localDocRef = doc(this.db_, this.userCollectionName_, userUID).withConverter<User, DocumentData>(converter<User>())
        setDoc(localDocRef, user)
        return localDocRef.id
    }
}
