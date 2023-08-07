import { getAllWordbankWords, removeWordbankWord, setWordbankWord } from "@/lib/WordBankActions";
import FavButton from "./FavButton";

type WordExampleProps = {
    written: string,
    pronounced: string,
    meanings: string,
    kanji: string
  //  favoriteInDb: boolean
}

const WordExample = async ({ written, pronounced, meanings, kanji}: WordExampleProps) => {
    
    const word = {
        written,
        pronounced,
        meanings
    }

    // const handleClick = async(favorite:boolean) => {
    //     //"use server";
    //     if(favorite){
    //         //setWordbankWord({ written, pronounced, meanings })
    //     }else{
    //         //removeWordbankWord(written)
    //     }
    //     return null
    // }

    const getAllWords = async() => {
        const allWordBankWords = await getAllWordbankWords()
        return allWordBankWords
    }

    const checkIfFavoritedBefore = async() => {
        const allWordBankWords = await getAllWords()
        //if word is in wordbank, then make fav button light up
        console.log('written', written)
        if(allWordBankWords.includes(written)) return true
        else return false
    }

    // const favButtonProps = {
    //     handleClick: async (favorite:boolean) => {
    //         "use server"; 
    //         if(favorite){
    //             //setWordbankWord({ written, pronounced, meanings })
    //         }else{
    //             //removeWordbankWord(written)
    //         }
    //         return null
    //     }, 
    //     favoritedBefore: false
    // }

    const hasFavoritedBefore = await checkIfFavoritedBefore()
    console.log('hasFavoritedBefore', hasFavoritedBefore)

    return (
        <div className='card flex-col mr-16 bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400'>
            <div className = 'grid-cols-2 '>
                <div className='left-side-wrapper float-left'>
                    <div className='written'>{written}</div>
                </div>
                <div className='right-side-wrapper flex flex-col float-right'>
                    <div className='button-wrapper flex flex-row-reverse items-center'>
                        <FavButton favoritedBefore={hasFavoritedBefore} word={word} kanji={kanji} />
                        {/* <FavButton /> */}
                        <span className="hidden">Added to word bank!</span>
                    </div>
                    <div className='pronounced flex flex-row-reverse'>{pronounced}</div>
                    <div className='meanings flex flex-row-reverse'>{meanings}</div>
                </div>
            </div>
        </div>
    )
}

export default WordExample;