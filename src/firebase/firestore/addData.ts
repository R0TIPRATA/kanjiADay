import firebase_app from "../config";
import { getFirestore ,doc, setDoc } from "firebase/firestore";


const db = getFirestore(firebase_app)
export default async function addData(collection:any, id:any , data:any ){
    let result = null;
    let error = null;

    try {
        // console.log("collection", collection)
        // console.log("id", id),
        // console.log("data", data)
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
        console.log("result", result)
    } catch (e) {
        error = e;
        console.log("error", e)
    }
    return { result, error };
}