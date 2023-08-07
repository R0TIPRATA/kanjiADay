import { removeWordbankWord, setWordbankWord } from "@/lib/WordBankActions";
import FavButton from "./FavButton";

type WordExampleProps = {
    written: string,
    pronounced: string,
    meanings: string,
  //  favoriteInDb: boolean
}

const WordExample = ({ written, pronounced, meanings}: WordExampleProps) => {
    
    const handleClick = (favorite:boolean) => {
        if(favorite){
            setWordbankWord({ written, pronounced, meanings })
        }else{
            removeWordbankWord(written)
        }
    }

    //on loading words, should check if the words are in wordbank

    //if so, they should be starred already
    const checkIfFavoritedBefore = () => {
        //check if in array 
    }


    return (
        <div className='card flex-col mr-16 bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400'>
            <div className = 'grid-cols-2 '>
                <div className='left-side-wrapper float-left'>
                    <div className='written'>{written}</div>
                </div>
                <div className='right-side-wrapper flex flex-col float-right'>
                    <div className='button-wrapper flex flex-row-reverse items-center'>
                        {/* <FavButton handleClick={handleClick} /> */}
                        <FavButton />
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