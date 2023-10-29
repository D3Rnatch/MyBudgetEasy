import { PartialWithFieldValue, QueryDocumentSnapshot } from "firebase/firestore";
import { useFirebaseAuth } from "vuefire";

// Meant to be kept internally.
export const converter = <T>() => ({
    toFirestore: (data: PartialWithFieldValue<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const tsConverter = <T>() => ({
    from: (data: T) => {
        return Object.assign({}, data)
    },

    to: (source:Partial<T>) => {
        let data:T
        Object.keys(data).map((key: string) => {
            data[key] = source[key.slice(1)];
        });
        return data
    }
})

export const isLoggedIn = () => {
    const auth = useFirebaseAuth() // only exists on client side
    return auth.currentUser;
}