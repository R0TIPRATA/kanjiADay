import firebase_app from "../firebase/config";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function getDateLastVisited() {
    let data = new Date()
    let error = ""
    try{
        const snapshot = await getDoc(doc(db,'users', 'user1'))
        const timeStampValue = snapshot.data()?.lastVisited
        data = timeStampValue.toDate()
        console.log('time visited',data)
    }catch (e:any) {
        error = e
    }
    return {data,error}
}    

export async function setDateVisitedDb(lastVisitedDate:Date) {
    let error = ""
    try{
        await setDoc(doc(db, 'users', 'user1'), { lastVisited: lastVisitedDate }, {merge: true})
    }catch (e:any) {
        error = e
        console.log("error", e);
    }
    console.log("setting new date in db")
    //return {data,error}
}    


// export async function getAllKanjiLearnt() {
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