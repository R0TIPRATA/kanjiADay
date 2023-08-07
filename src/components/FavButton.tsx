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
    //favButtonProps: any
    //handleClick : Function
   // favoriteInDb: boolean
}

//const FavButton = ({handleClick, favoriteInDb}:FavButtonProps) => {
//const FavButton = ({favButtonProps}:FavButtonProps) => {
const FavButton = ({favoritedBefore,word, kanji}:FavButtonProps) => {
    // bug: everytime press favourite > click next > click back > star not updated

    const [favorite, setFavorite] = useState(favoritedBefore)

    useEffect( () => {
            if(favorite) {
                setWordbankWord({...word})
            }else{
                removeWordbankWord(word.written)
            }
            setIcon(getIcon())    
        }
    ,[favorite])

    const checkIfFavoritedBefore = async() => {
        const allWordBankWords = await getAllWordbankWords()
        //if word is in wordbank, then make fav button light up
        //console.log('written', written)
        if(allWordBankWords.includes(word.written)) setFavorite(true)
        else  setFavorite(false)
    }


    useEffect( () => {
        checkIfFavoritedBefore()
        setFavorite(favoritedBefore)
        console.log("line 40 => ", favoritedBefore)
    }
    ,[kanji])

    const getIcon = () => {
        if (!favorite){
            return <AiOutlineStar />
        } 
        else {
            return  (
                <IconContext.Provider value={{ className: "text-yellow-500" }}>
                    <div>
                        <AiFillStar/>
                    </div>
                </IconContext.Provider>
            )
        }
    }

    const [icon, setIcon] = useState(getIcon())

  return (
    <button type="button" className="w-100 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-800 hover:bg-gray-100 transition-all text-sm dark:text-white dark:hover:bg-gray-900 dark:hover:border-gray-900 "
    onClick={async()=> 
        { 
            //\favButtonProps.handleClick(!favorite)
            setFavorite(!favorite)
        }
    }
    >
        <span className="icon text-2xl">{icon}</span>
    </button>
  )
}

export default FavButton
