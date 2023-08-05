import firebase_app from "../../firebase/config";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

export async function getAllKanjiLearnt() {
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

export async function getKanjiDetails(kanji:string) {
    const response = await fetch(`https:kanjiapi.dev/v1/kanji/${kanji}`)
    const data = response.json()
    //setKanjiDetails(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return data
}    

export async function getWordsWithKanji(kanji:string) {
    const response = await fetch(`https://kanjiapi.dev/v1/words/${kanji}`)
    const data = response.json()
    //setKanjiDetails(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return data
}    

export async function getAllKanjiLearntSorted(){ //currently doesnt sort yet
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