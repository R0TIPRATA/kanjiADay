"use client"
import { removeWordbankWord } from "@/lib/WordBankActions"
import FavButton from "../home/FavButton"
import { MouseEvent, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { updateSearchParams } from "@/utils"
import RemovePopup from "./RemovePopup"

type WordbankWordProps = {
  word: any,
  clickHandlers: any
//  favoriteInDb: boolean
}

const WordbankWord = ({word,clickHandlers}:WordbankWordProps) => {
  const [checked,setChecked] = useState(false)
  const [showPopup,setShowPopup] = useState(false)

  const showRemovePopup = () => {
    setShowPopup(true)
  }

  const removeFromWordbank = () => {
    removeWordbankWord(word.written)
  }


  const removePopup = () => {
    setShowPopup(false)
  }

  const updateDeck = () => {
    if(!checked){
      console.log(word.written + 'was checked!')
      clickHandlers.storeWordInDeck(word.written)
    }
    else{
      console.log(word.written + 'was unchecked!')
      clickHandlers.removeWordFromDeck(word.written)
    }
  } 

  return (
    <>
    <div className = "flex my-4 mx-48 align-middle">
      <div className = 'card basis-10/12 m-4 grid-cols-2 bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400'>
          <div className='left-side-wrapper float-left'>
              <div className='written'>{word.written}</div>
          </div>
          <div className='right-side-wrapper flex flex-col'>
              <div className='pronounced flex flex-row-reverse'>{word.pronounced}</div>
              <div className='meanings flex flex-row-reverse'>{word.meanings}</div>
              <div className='button-wrapper flex flex-row-reverse items-center'>
                  <button type="button"
                  className={`py-1 px-1 mt-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:text-white dark:hover:bg-gray-900 dark:hover:border-gray-900 dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800`}
                  onClick={()=>showRemovePopup()}>Remove</button>
                  <span className="hidden">Added to word bank!</span>
              </div> 
          </div>
      </div>
      <div className="flex checkbox-grp m-4">
        <input type="checkbox" value="" 
        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
        id="hs-default-checkbox" 
        onClick={(e) => {
            setChecked(!checked)
            updateDeck()
          }
        } 
        />
        <label htmlFor="hs-default-checkbox"className="text-sm text-gray-500 ml-3 dark:text-gray-400"></label> 
      </div>
    </div>
    <RemovePopup showPopup={showPopup} removePopup={removePopup} removeFromWordbank={removeFromWordbank } updateCheckRemoved={clickHandlers.updateCheckRemoved}/>
    </>
  )
}

export default WordbankWord