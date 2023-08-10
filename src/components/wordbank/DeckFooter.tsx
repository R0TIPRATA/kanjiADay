"use client"
import { useEffect, useState } from "react"

type DeckFooterProps = {
  //showFooter: string | undefined,
  deck : string[],
  createDeck: Function
}


const DeckFooter = ({deck, createDeck}: DeckFooterProps) => {

  const [visibilityClass, setVisibilityClass] = useState('hidden')

  useEffect( () => {
  if(deck.length > 0 ) setVisibilityClass('')
  else setVisibilityClass('hidden')
  },[deck])



  return (
    <footer className={`${visibilityClass} bg-sky-300 align-middle sticky bottom-0`}>
        <div className="my-4 mx-8 pt-3 float-left">
            <span>{deck.length} words selected</span>
        </div>
        <div className="my-4 mx-8 float-right">
            <button type="button" 
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            onClick = { () => createDeck()}
            >
                Create Deck
            </button>
        </div>
    </footer>
  )
}

export default DeckFooter