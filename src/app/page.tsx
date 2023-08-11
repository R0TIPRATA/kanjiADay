
//test add data
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import KanjiDetail from "../components/home/KanjiDetail";
import WordExamples from "../components/home/WordExamples";
import DateSelector from "../components/home/DateSelector";
import {getAllKanjiLearnt, getRandomKanjiFromRemainingList }from "../lib/UserKanjiDataActions";
import { clearWordbank, getAllWordbankWords } from "../lib/WordBankActions";
//import { getAllKanjiLearntSorted } from "./lib/getUserKanjiData";
import {getDateLastVisited, setDateVisitedDb} from "../lib/UserDetailsActions";
import { setDate } from "date-fns";
//import { isEqual } from "date-fns";
import addAllKanji from "@/firebase/firestore/addAllKanji";
// const lodash = require('lodash');


// export interface HomeProps {
//   kanjiParam: string;
// }

//export default function Home({ params }: { params: { kanji?: string } }) {

export default function Home({ searchParams }: { searchParams: { kanji?: string } }) {   
  //clearWordbank();
  addAllKanji()
  console.log("kanjiParam", searchParams)
  return (
    <>
     <div className="grid grid-cols-8">
      <div className="side-panel col-span-3 flex flex-col align-center m-8 border-r-2 border-slate-300">
         <DateSelector/>
          <KanjiDetail 
            kanji={searchParams.kanji} />
      </div>
      <div className="main-panel m-8 col-span-5">
        <WordExamples kanji={searchParams.kanji}/>
        {/* <WordExamples words={relatedWords}/> */}
      </div>
     </div>  
    </>
  )
}