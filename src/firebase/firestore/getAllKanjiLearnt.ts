import firebase_app from "../config";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getAllKanjiLearnt() {
    let data: any[] = [];
    let error = "";
    try{
        const snapshot = await getDocs(collection(db,'users', '6WGOBDKRassqgYfFDolB', 'learnedKanji'))
        snapshot.forEach( doc => {
            const kanjiLearnt = {
                id: doc.id,
                kanjiCharacter : doc.data()['kanjiLearnt'],
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