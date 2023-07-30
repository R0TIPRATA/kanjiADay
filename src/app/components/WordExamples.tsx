import WordExample from "./WordExample";

const lodash = require('lodash')
const WordExamples = ({relatedWords}) => {
    //show the first 10 examples first
    const MAX = 10
    const wordsArr = []
    //console.log("related words length ", relatedWords.length)
    if(relatedWords.length > 1){
        for(let i = 0; i <= 10; i++){
            const word = relatedWords[i];
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