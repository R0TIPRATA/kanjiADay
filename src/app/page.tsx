'use client'
import dynamic from "next/dynamic";
import Image from 'next/image'
import { useState, useEffect } from 'react';
import KanjiDetail from "./components/KanjiDetail";
import WordExamples from "./components/WordExamples";
import DateSelector from "./components/DateSelector";

const Navbar = dynamic(() => import("./components/Navbar"), {
  ssr: false,
});


export default function Home() {
  useEffect( () => {
    require('preline')
  }, [])
  
  const [kanji, setKanji] = useState({
    kanji: '',
    grade: '',
    stroke_count: '',
    meanings: [],
    kun_readings: [],
    on_readings: [],
    name_readings: [],
    jlpt: '',
    unicode: '',
    heisig_en: ''
  })


  const [relatedWords, setRelatedWords] = useState([
    {
      variants: [
        {
          written: '',
          pronounced: '',
          priorities: ''
        }
      ],
      meanings: [
        {
          glosses: []
        }
      ]
    }
  ])
  
  useEffect(() => {
    fetch('https:kanjiapi.dev/v1/kanji/大')
      .then((response) => response.json())
      .then((data) => {
       // console.log("1",data)
        setKanji(data)
      })
      .catch((err) => {
        console.log(err.message)
      });
  
      fetch('https://kanjiapi.dev/v1/words/大')
      .then((response) => response.json())
      .then((data) => {
        //console.log("2",data)
        setRelatedWords(data)
      })
      .catch((err) => {
        console.log(err.message)
      });
  
  }, []);

  return (
    <>
      <Navbar />
     <div className="grid grid-cols-8">
      <div className="side-panel col-span-3 flex flex-col align-center m-8 border-r-2 border-slate-300">
         <DateSelector />
         <KanjiDetail kanjiData={kanji}/>
      </div>
      <div className="main-panel m-8 col-span-5">
         <WordExamples relatedWords={relatedWords} />
      </div>
     </div>  
    </>
  )
}
