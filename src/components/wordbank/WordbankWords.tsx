//import words from database
'use client'
import { getAllWordbankWords } from "@/lib/WordBankActions"
import WordbankWord from "./WordbankWord"
import { JSX, useEffect, useState } from "react"

//count how many words has been selected
//if any selected, show footer
//if none selected, do not show footer

type WordbankWordsProps = {
  getDeck : Function,
}

const WordbankWords =  ({getDeck} : WordbankWordsProps) => {
  const [wordsInDb, setWordsInDb] = useState<any[]>([])
  const [wordsInDeck,setWordsInDeck] = useState<any[]>([])
  const [checkRemoved, setCheckRemoved] = useState(false)

  //sets removed
  const updateCheckRemoved = (condition:boolean) => {
    setCheckRemoved(condition)
  }

  useEffect(()=> {
    getWordsInDb()
  },[])

  //if there is removed item call getWordsInDb again
  useEffect(()=> {
    if(checkRemoved) getWordsInDb()
  },[checkRemoved])

  useEffect(()=> {
    getDeck(wordsInDeck)
  },[wordsInDeck])

  const clickHandlersWordBankWord = {
    storeWordInDeck: (written:string) => {
      setWordsInDeck([...wordsInDeck , written ])
    },
    removeWordFromDeck: (written:string) => {
      setWordsInDeck(wordsInDeck.filter(i => written !== i))
    },
    updateCheckRemoved: updateCheckRemoved
  }

  const getWordsInDb = async() => {
    const words = await getAllWordbankWords()
    setWordsInDb(words)
    setCheckRemoved(false)
  }

  const displayWords = () => {
    console.log("display words")
    const wordsToDiplay: JSX.Element[] = []
    wordsInDb.map( (word:any) => {
      wordsToDiplay.push(<WordbankWord word={word} clickHandlers={clickHandlersWordBankWord}/>)
    })
    return wordsToDiplay
  }
  
  return (
    <>
      {displayWords()}
    </>  
  )
}

export default WordbankWords