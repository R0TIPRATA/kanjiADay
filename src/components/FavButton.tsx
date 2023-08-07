"use client"
import { useState } from "react"
import { IconContext } from "react-icons";
import { AiOutlineStar, AiFillStar } from "react-icons/ai"

type FavButtonProps = {
    handleClick : Function,
   // favoriteInDb: boolean
}

//const FavButton = ({handleClick, favoriteInDb}:FavButtonProps) => {
//const FavButton = ({handleClick}:FavButtonProps) => {
    const FavButton = () => {    
    const [favorite, setFavorite] = useState(false)//(favoriteInDb)

    const getIcon = () => {
        if (!favorite){
            return <AiOutlineStar />
        } 
        else {
            return  <IconContext.Provider value={{ className: "text-yellow-500" }}>
                <div>
                    <AiFillStar/>
                </div>
            </IconContext.Provider>
        }
    }

  return (
    <button type="button" className="w-100 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-800 hover:bg-gray-100 transition-all text-sm dark:text-white dark:hover:bg-gray-900 dark:hover:border-gray-900 "
    onClick={()=> 
        { 
            //handleClick(!favorite)
            setFavorite(!favorite)
        }
    }
    >
        <span className="icon text-2xl">{getIcon()}</span>
    </button>
  )
}

export default FavButton