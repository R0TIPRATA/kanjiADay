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
        const docRef = doc(collectionRef,written)
        await setDoc(docRef, {
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
        const obj = {
            written: doc.data().written,
            pronounced: doc.data().pronounced,
            meanings: doc.data().meanings
        }
        data.push(obj)
    })
    return data
} 

export async function clearWordbank() {
    const collectionRef = collection(db,'users', 'user1', 'wordbank')
    const snapshot = await getDocs(collectionRef)
    snapshot.forEach( doc => {
        deleteDoc(doc.ref)
    })
    console.log("complete clearing wordbank!")
}

export async function getWordbankWord(written:string) {
    const collectionRef = collection(db,'users', 'user1', 'wordbank')
    const docRef = doc(collectionRef,written)
    type ResultsType = {
            meanings: string[],
            pronounced: string
    }
    let result = {
        meanings: [""],
        pronounced: ''
    };
    try{ 
        const snapshot = await getDoc(docRef)
        result = snapshot.data() as ResultsType
    }catch(e){
        console.log(e)
    }
    return result
}