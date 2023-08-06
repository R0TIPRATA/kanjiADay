"use client"
//test add data
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import KanjiDetail from "../components/KanjiDetail";
import WordExamples from "../components/WordExamples";
import DateSelector from "../components/DateSelector";
import {getAllKanjiLearnt, getRandomKanjiFromRemainingList }from "../lib/UserKanjiDataActions";
import { getAllWordbankWords } from "../lib/WordBankActions";
//import { getAllKanjiLearntSorted } from "./lib/getUserKanjiData";
import {getDateLastVisited, setDateVisitedDb} from "../lib/UserDetailsActions";
import { setDate } from "date-fns";
//import { isEqual } from "date-fns";
import addAllKanji from "@/firebase/firestore/addAllKanji";

export default function Home() {

  const user = useAuthContext()
  const router = useRouter()
  
  const [kanjiDetails, setKanjiDetails] = useState({
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
  
  //set selected date by default to be today's date
interface KanjiCharacter {
  id: string,
  kanji: string,
  dateLearnt: any //not sure abt the type here
}

  const today = new Date(Date.now());
  //testing
  // const today = new Date("2023-11-01 00:00:00")

  const [selectedDate, setSelectedDate] = useState(today.toDateString())
  const [selectedKanji, setSelectedKanji] = useState("")
  const [kanjiList, setKanjiList] = useState<KanjiCharacter[]>([])
  const [triggerKanjiReload, setTriggerKanjiReload] = useState(false)
  
  //For date selector:
  const [currentIndex, setCurrentIndex] = useState(0) //assume array arranged from most recent -> oldest
  const [dateLength, setDateLength] = useState(0)
  const [disablePrev, setDisablePrev] = useState(false)
  const [disableNext, setDisableNext] = useState(true)
  const [dateLastVisited, setDateLastVisited] = useState(new Date())
  
  //first effect get random character
  useEffect(() => {
    //if user is not logged in, lead to login page
    if (user == null) router.push("/login")
    console.log("user",user)
    
    //preline is a component library
    require('preline')

    //Check if first visit of the day. How? 
    fetchKanjiLearnt()

    getLastVisit()

  }, [])

  // useEffect( () => {
  //   getLastVisit()
  // }, [kanjiList])

  useEffect( () => {
    if(kanjiList && kanjiList.length > 0){
      console.log("1. today's date: ", today.toDateString())
      console.log("2. date last visited: ", dateLastVisited.toDateString())
      //if(isEqual(dateLastVisited,today)){
      if(dateLastVisited.toDateString() === today.toDateString()){ //if date last visited same as date today
        console.log("date last visited was today!")
        console.log(kanjiList[0].kanji)
        setSelectedKanji(kanjiList[0].kanji)
        setTriggerKanjiReload(!triggerKanjiReload)
      }else{
        console.log("date last visited was not today!")
        console.log("date last visited was: " + dateLastVisited.toDateString())
        setSelectedDate(today.toDateString())
        generateNewKanji()
        fetchKanjiLearnt()
        //setDateLastVisited(today)
        //TO DO: MONDAY
        //CHANGE TO BECOME SERVER COMPONENT
      }
    }  
  }, [dateLastVisited])

  //second effect to fetch words and details
  useEffect( () => {
    //fetch kanji details
    if(selectedKanji && selectedKanji.length > 0 ){
      fetchKanjiDetails(selectedKanji)
      fetchWords(selectedKanji)
    }
  }, [selectedKanji])

  const getLastVisit = async() => {
    const {data, error} = await getDateLastVisited()
    if (error) {
      return console.log(error)
    }
    console.log("data.toDateString => ", data.toDateString());
    console.log("today.toDateString => ", today.toDateString());
    console.log("Result => ", data.toDateString() === today.toDateString())
    if(data.toDateString() === today.toDateString()){ 
      setDateLastVisited(today)
    }else{
      setDateVisitedDb(today)
      setDateLastVisited(data)
    }
  }

  const generateNewKanji = async() =>{
    const {data,error} = await getRandomKanjiFromRemainingList()
    setSelectedKanji(data)
    //setTriggerKanjiReload(!triggerKanjiReload)
    fetchKanjiLearnt()
    if (error) {
      return console.log(error)
    }
    console.log('new kanji generated => ' + data)
  }

  const fetchKanjiDetails = async(selectedKanji:string) => {
    const response = await fetch(`https:kanjiapi.dev/v1/kanji/${selectedKanji}`)
    const data = await response.json()
    setKanjiDetails(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }

  const fetchWords = async(selectedKanji:string) => {
    const response = await fetch(`https://kanjiapi.dev/v1/words/${selectedKanji}`)
    const data = await response.json()
    console.log(`run fetch words for => ${selectedKanji}`, data.length)
    setRelatedWords(data)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
  
    }
  }

  const fetchKanjiLearnt = async() => {
    const {data,error} = await getAllKanjiLearnt()
    setKanjiList(data);
    if (error) {
      return console.log(error)
    }
    console.log('kanji learnt => ' + JSON.stringify(data))
    setDateLength(data.length)
  }

  const changeDate = (control: string) => {
    let newIndex = 0;
    //selector controls
    if(control === 'prev') newIndex = currentIndex + 1
    else newIndex = currentIndex - 1
    //disabling buttons 
    if(newIndex === 0) setDisableNext(true)
    else if (newIndex === dateLength - 1 ) setDisablePrev(true)
    else { 
      setDisableNext(false)
      setDisablePrev(false)
    }  
    //setting new date
    setCurrentIndex(newIndex)
    const date = kanjiList[newIndex].dateLearnt.toDate().toDateString()
    const kanji = kanjiList[newIndex].kanji
    console.log("test k: ", kanji)
    setSelectedDate(date)
    setSelectedKanji(kanji)
    //fetchWords(kanji)
    //fetchKanjiDetails(kanji)
  }

  
  return (
    <>
     <div className="grid grid-cols-8">
      <div className="side-panel col-span-3 flex flex-col align-center m-8 border-r-2 border-slate-300">
         <DateSelector date={selectedDate} disablePrev={disablePrev} disableNext={disableNext} changeDate={changeDate}/>
          <KanjiDetail 
            kanji = {kanjiDetails.kanji}
            meanings = {kanjiDetails.meanings.join(", ")}
            kunReadings = {kanjiDetails.kun_readings.join(", ")}
            onReadings = {kanjiDetails.on_readings.join(", ")}
          />
      </div>
      <div className="main-panel m-8 col-span-5">
        {/* <WordExamples kanji={selectedKanji}/> */}
        <WordExamples words={relatedWords}/>
      </div>
     </div>  
    </>

/*     {allPostsData.map( ({ id, kanjiCharacter, dateLearnt} : any ) => (
      <li>
        <p>id: {id} </p>
        <p>kanji: {kanjiCharacter} </p>
        <p>date learnt: {dateLearnt}</p>
      </li>
    ))}  */
  )
}

// type PostsData = {
//   id: string,
//   kanjiCharacter: string,
//   dateLearnt: any 
// }