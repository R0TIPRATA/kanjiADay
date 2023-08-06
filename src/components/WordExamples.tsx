
//import { getWordsWithKanji } from "../lib/UserKanjiDataActions";
import WordExample from "./WordExample";

type WordExamplesProps = {
    //kanji: string
    words: any
}

type Word = {
    variants: any,
    meanings: any
}

//const lodash = require('lodash')
const WordExamples = ({words}:WordExamplesProps) => {
//const WordExamples = async ({kanji}:WordExamplesProps) => {
    //get all wordbank words
    //const wordbankWords = await getAllWordbankWords()
    //const words = await getWordsWithKanji(kanji)
    const wordsArr = []
    if(words.length > 1){
        var limit = 0
        for(let i = 0; i <= 10; i++){
            const word:Word = words[i]
            //check if word written == any of wordbank words 
            wordsArr.push(<WordExample 
                written={word.variants[0].written} 
                pronounced={word.variants[0].pronounced}    
                meanings={word.meanings[0].glosses.join(", ")}
                favoriteInDb={wordbankWords.includes(word.variants[0].written)}     
            />)
        }
    }
    return ( 
        <div>
            <h3 className='text-xl font-semibold my-8'>Related Words</h3>
            <div className='cards flex flex-col gap-y-4 my-4'>
                {wordsArr}
            </div>
        </div>
    )
}
 
export default WordExamples;