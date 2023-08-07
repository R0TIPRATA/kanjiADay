import firebase_app from "../firebase/config";
import { getFirestore, collection, doc, getDocs, getCountFromServer, query, where, orderBy, deleteDoc, setDoc, limit } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function getAllKanjiLearnt() {
    let data: any[] = [];
    let error = "";
    try{
        const collectionRef = collection(db,'users', 'user1', 'learnedKanji')
        //const snapshot = await getDocs(collectionRef)
        const q = query(collectionRef, orderBy("dateLearnt", "desc"))//, limit(3));
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach( doc => {
            const kanjiLearnt = {
                id: doc.id,
                kanji : doc.data()['kanjiLearnt'],
                dateLearnt : doc.data()['dateLearnt']
            }
            data.push(kanjiLearnt)
        }
        )
    }catch (e:any) {
        error = e
    }
    return { data, error };
}

export async function getKanjiDetails(kanji:string) {
    console.log("kanji in get kanji details: ", kanji )
    const response = await fetch(`https:kanjiapi.dev/v1/kanji/${kanji}`)
    const data = response.json()
    //setKanjiDetails(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return data
}    

export async function getWordsWithKanji(kanji:string) {
    console.log("kanji value: ", kanji)
    const response = await fetch(`https://kanjiapi.dev/v1/words/${kanji}`)
    const data = response.json()
    //setKanjiDetails(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return data
}    

export async function getRandomKanjiFromRemainingList(){
    let data: string = "";
    let error = "";
    console.log("line 49")
   try{
       const collectionRef = collection(db,'users', 'user1', 'remainingKanji')
       const snapshot = await getCountFromServer(collectionRef)
       const count = snapshot.data().count
       const randIndex = Math.floor(Math.random() * count);
    //    console.log("rand index", randIndex)
    //    const q = query(collectionRef, where("id","==",randIndex))
    //    console.log("test q",q)
    //    const querySnapshot =  await getDocs(q);
    //    console.log('querySnapshot length', querySnapshot.size)
    //    querySnapshot.forEach((doc) => {
    //      // doc.data() is never undefined for query doc snapshots
    //      console.log(doc.id, " => ", doc.data().kanjiCharacter);
    //      data = doc.data().kanjiCharacter
    //      saveDoc = doc
    //    });

       const q1 = query(collectionRef, where("id", ">=", randIndex), limit(1))
       const ss = await getDocs(q1)
       //let data;
       let docRefId;
       if(ss.size > 0) {
            console.log("doc 1 " , ss.docs[0].data())
            const doc = ss.docs[0]
            data = doc.data().kanjiCharacter
            docRefId = doc.id
        }else{
            console.log("doc 2 " , ss.docs[0].data())
            const q2 = query(collectionRef, where("id", "<", randIndex), limit(1))
            const ss2 = await getDocs(q2)
            const doc = ss2.docs[0]
            data = doc.data().kanjiCharacter
            docRefId = doc.id
        }    
        console.log("data key ", docRefId)
        await deleteDoc(doc(db, 'users', 'user1', 'remainingKanji', docRefId))
        await setDoc(doc(db, 'users', 'user1', 'learnedKanji', docRefId), {
            id: docRefId,
            kanjiLearnt: data,
            dateLearnt: new Date(Date.now())
        });

        console.log( "data for get rand kanji => ", data)
   }catch (e:any) {
       error = e
   }
   return { data, error };
}

//
// export async function getAllKanjiLearntSorted(){ //currently doesnt sort yet
//     let data: any[] = [];
//     let error = "";
//     try{
//         const snapshot = await getDocs(collection(db,'users', 'user1', 'learnedKanji'))
//         snapshot.forEach( doc => {
//             const kanjiLearnt = {
//                 id: doc.id,
//                 kanjiCharacter : doc.data()['kanjiLearnt'],
//                 dateLearnt : doc.data()['dateLearnt']
//             }
//             data.push(kanjiLearnt)
//         }
//         )
//     }catch (e:any) {
//         error = e
//     }
//     return { data, error };
// }
//