"use client"
import { getDateLastVisited, setDateVisitedDb } from "@/lib/UserDetailsActions"
import { getAllKanjiLearnt } from "@/lib/UserKanjiDataActions"
import { updateSearchParams } from "@/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"

// type DateSelectorProps = {
//     date: string,
//     disablePrev: boolean,
//     disableNext: boolean,
//     changeDate : Function
// }

type KanjiCharacter = {
    id: string,
    kanji: string,
    dateLearnt: any 
    //not sure abt the type here
}
// date selector
// retrieve latest date
// if date change, get kanji tied to date
// pass kanji as props to home

const DateSelector = () => {
    const router = useRouter()
    const updateParams = (kanji:string) => {
        console.log('updateParams kanji ', kanji)
        const newPathName = updateSearchParams('kanji', kanji)
        router.push(newPathName)
    };

    const today = new Date(Date.now())
    const [currentIndex, setCurrentIndex] = useState(0) 
    const [dateLength, setDateLength] = useState(0)
    const [dateLastVisited, setDateLastVisited] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(today.toDateString())
    const [selectedKanji, setSelectedKanji] = useState("")
    const [kanjiList, setKanjiList] = useState<KanjiCharacter[]>([])
    const [disableNext,setDisableNext] = useState(true)
    const [disablePrev,setDisablePrev] = useState(false)

    useEffect( () => {
        getLastVisit()
    }
    ,[])

    useEffect( () => {
        if(kanjiList.length > 0){
            setSelectedKanji(kanjiList[0].kanji)
            updateParams(kanjiList[0].kanji)
        }
    }
    ,[kanjiList])

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
        fetchKanjiLearnt()
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

        console.log("current index", currentIndex)
        console.log("control", control)
        console.log("newIndex" , newIndex)
        
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
        updateParams(kanji)
    }
    
    const makeDisabled = () => {
        
    }

    return(
        <div className='date-selector flex justify-items-center items-center'>
        <button type="button" className={`mx-2 inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] 
        w-[2.375rem] rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2
         focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm  dark:focus:ring-offset-gray-800 ${ disablePrev && makeDisabled()}`}
        disabled = {disablePrev}
        onClick={ e => {
            e.preventDefault()
            changeDate('prev')
            //updateParams(selectedKanji)
            }
        }
        >
            <AiOutlineLeft />
        </button>
        <div className='text-2xl font-semibold my-8'>
            <p>{selectedDate}</p>
        </div> 
        <button type="button" className={`mx-2 inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm  dark:focus:ring-offset-gray-800 
        `}
        //${ disableNext && makeDisabled()} `}
         disabled = {disableNext}
         onClick={ e => {
                e.preventDefault()
                changeDate('next')
                //updateParams(selectedKanji)
            }
        }
        >
            <AiOutlineRight />
        </button>
    </div>  
    )
}
 
export default DateSelector;