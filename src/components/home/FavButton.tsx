"use client"
import { getAllWordbankWords, removeWordbankWord, setWordbankWord } from "@/lib/WordBankActions";
import { useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
//import useSWR from "swr";


type FavButtonProps = {
    favoritedBefore: boolean,
    word: any,
    kanji: string
}

//star not showing correct display
//seems like after updating, its not getting new favorited before value
const FavButton = ({favoritedBefore, word, kanji}:FavButtonProps) => { //ignore favorited before?
    const inactiveStar = <AiOutlineStar />
    const activeStar = 
        <IconContext.Provider value={{ className: "text-yellow-500" }}>
            <div>
                <AiFillStar/>
            </div>
        </IconContext.Provider>

    // on load, check if favorited before, if favorited before set favorite as true
    const [favorite, setFavorite] = useState(favoritedBefore) //fav state
    const [icon, setIcon] = useState(inactiveStar)
    //const [favoritedWhileInSession, setFavoritedWhileInSession] = useState(false)
    
    console.log('favorited before: ', favoritedBefore)
    console.log('fav button is loaded')
    console.log('favorite', favorite)
    const initializeFavState = async() => {
        const hasFavoritedBefore = await checkIfFavoritedBefore()
        if(favoritedBefore || hasFavoritedBefore ){
            setFavorite(true)
            setIcon(activeStar)
        }else{
            setFavorite(false)
            setIcon(inactiveStar)
        }
    }

    useEffect( () => {
            initializeFavState()
        }
    ,[kanji])

    useEffect( () => {
        //every time change kanji 

    }
    ,[kanji])

    useEffect( () => {
            if(favorite) {
                setWordbankWord({...word})
                setIcon(activeStar)
            }else{
                removeWordbankWord(word.written)
                setIcon(inactiveStar)
            }    
        }
    ,[favorite])

    const checkIfFavoritedBefore = async() => {
        const allWordBankWords = await getAllWordbankWords()
        //if word is in wordbank, then make fav button light up
        if (allWordBankWords.some(obj => obj.written === word.written)) return true
        else return false
    }

  return (
    <button type="button" className="w-100 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-800 hover:bg-gray-100 transition-all text-sm dark:text-white dark:hover:bg-gray-900 dark:hover:border-gray-900 "
    onClick={async()=> 
        { 
            setFavorite(!favorite)
        }
    }
    >
        <span className="icon text-2xl">{icon}</span>
    </button>
  )
}

export default FavButton
