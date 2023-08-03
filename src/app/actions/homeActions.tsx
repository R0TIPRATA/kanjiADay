import getAllKanjiLearnt from "@/firebase/firestore/getAllKanjiLearnt";


export const fetchKanjiDetails = async(selectedKanji:string) => {
    const response = await fetch(`https:kanjiapi.dev/v1/kanji/${selectedKanji}`)
    const data = await response.json()
    //setKanjiDetails(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
}

export const fetchWords = async(selectedKanji:string) => {
    const response = await fetch(`https://kanjiapi.dev/v1/words/${selectedKanji}`)
    const data = await response.json()
    //setRelatedWords(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return {data}
}

export const fetchKanjiLearnt = async() => {
    const {data,error} = await getAllKanjiLearnt()
   // setKanjiList(result);
    if (error) {
        throw new Error(`HTTP error! status: ${error}`)
    }
    return {data}
  //  setDateLength(result.length)
}