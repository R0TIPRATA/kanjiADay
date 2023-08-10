'use client'
import DeckFooter from '@/components/wordbank/DeckFooter'
import DeckPopup from '@/components/wordbank/DeckPopup'
import WordbankWords from '@/components/wordbank/WordbankWords'
import { useEffect, useState } from 'react'
//const lodash = require('lodash');


const Wordbank = () => {

  //get words from wordbankwords

  const [wordsDeck,setWordsDeck] = useState<string[]>([])
  const [showPopup, setShowPopup] = useState(false)

  const getDeck = (writtenArr : string[]) => {
    setWordsDeck(writtenArr)
  }

  //open deck popup
  const createDeck = () => {
    setShowPopup(true)
  }

  //close remove item popup
  const removePopup = () => {
    setShowPopup(false)
  }

  return (

    <div className='flex flex-col'>
      <h2 className='ml-52 mt-16 font-semibold text-2xl'>Wordbank</h2>
      <div className='search-filter-components'>
      </div>
      <div className='words flex-col'>
        <WordbankWords getDeck={getDeck} />
      </div>
        <DeckFooter deck={wordsDeck} createDeck={createDeck}/>
      <DeckPopup wordsDeck={wordsDeck} showPopup={showPopup} removePopup={removePopup}/>
    </div>
  )
}

export default Wordbank