import { PartialWithFieldValue, QueryDocumentSnapshot } from "firebase/firestore";

// Meant to be kept internally.
export const converter = <T>() => ({
    toFirestore: (data: PartialWithFieldValue<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});
