
import { getWordsWithKanji } from "@/lib/UserKanjiDataActions";
import WordExample from "./WordExample";

type WordExamplesProps = {
    kanji: string | undefined
}

type Word = {
    variants: any,
    meanings: any
}

//const lodash = require('lodash')
//const WordExamples = ({words}:WordExamplesProps) => {
const WordExamples = async ({kanji}:WordExamplesProps) => {
    //get all wordbank words
    //const wordbankWords = await getAllWordbankWords()
    const wordsArr = []
    if(typeof kanji !== 'undefined' ){
        const words = await getWordsWithKanji(kanji)
        if(words.length > 1){
            for(let i = 0; i <= 10; i++){
                const word:Word = words[i]
                //check if word written == any of wordbank words 
                wordsArr.push(<WordExample 
                    written={word.variants[0].written} 
                    pronounced={word.variants[0].pronounced}    
                    meanings={word.meanings[0].glosses.join(", ")}
                    kanji={kanji}
                   // favoriteInDb={false}
                />)
            }
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