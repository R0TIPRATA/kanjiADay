import firebase_app from "../firebase/config";
import { getFirestore, collection, doc, getDoc, getDocs, getCountFromServer, query, where, orderBy, deleteDoc, setDoc, limit } from "firebase/firestore";

const db = getFirestore(firebase_app)

type WordExampleProps = {
    written: string,
    pronounced: string,
    meanings: string
}

export async function setWordbankWord({written, pronounced, meanings}:WordExampleProps) {
    try{
        const collectionRef = collection(db, 'users', 'user1', 'wordbank')
        const docRef = doc(collectionRef)
        await setDoc(docRef, {
            id: docRef.id,
            written,
            pronounced,
            meanings
        });   
    }catch(e){
        console.log("error: ", e)
    }    
    console.log("favorited!")
} 

export async function removeWordbankWord(written:string) {
    try{
        const collectionRef = collection(db,'users', 'user1', 'wordbank')
        const q = query(collectionRef, where("written", "==", written), limit(1))
        const ss = await getDocs(q)
        if(ss.size > 0){
            const docToDel = ss.docs[0]
            await deleteDoc(doc(db, 'users', 'user1', 'wordbank', docToDel.id))
        }
    }catch(e){
        console.log("error: ", e)
    }    
    console.log("unfavorited!")
} 

export async function getAllWordbankWords() {
    const collectionRef = collection(db,'users', 'user1', 'wordbank')
    const snapshot = await getDocs(collectionRef)
    const data: any[] = []
    snapshot.forEach( doc => {
        data.push(doc.data().written)
    })
    return data
} 