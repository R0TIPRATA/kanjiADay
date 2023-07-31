import WordExample from "./WordExample";

type WordExamplesProps = {
    words: any
}

type Word = {
    variants: any,
    meanings: any
}

const lodash = require('lodash')
const WordExamples = ({words}:WordExamplesProps) => {
    //show the first 10 examples first
    const MAX = 10
    const wordsArr = []
    //console.log("related words length ", relatedWords.length)
    if(words.length > 1){
        for(let i = 0; i <= 10; i++){
            const word:Word = words[i];
            console.log("word",JSON.stringify(word.meanings[0].glosses))
            wordsArr.push(<WordExample 
                written={word.variants[0].written} 
                pronounced={word.variants[0].pronounced}    
                meanings={word.meanings[0].glosses.join(", ")} 
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