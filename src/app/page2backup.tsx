import { useRouter } from "next/navigation";
import KanjiDetail from "../components/KanjiDetail";
import WordExamples from "../components/WordExamples";
import DateSelector from "../components/DateSelector";
import {getAllKanjiLearnt, getRandomKanjiFromRemainingList }from "../lib/UserKanjiDataActions";
import {getDateLastVisited, setDateVisitedDb} from "../lib/UserDetailsActions";
export default function Home() {
  const {data,error} = await getAllKanjiLearnt()
  const selectedKanji = data[0];
  return (
    <>
     <div className="grid grid-cols-8">
      <div className="side-panel col-span-3 flex flex-col align-center m-8 border-r-2 border-slate-300">
         <DateSelector />
          <KanjiDetail kanji={selectedKanji}/>
      </div>
      <div className="main-panel m-8 col-span-5">
        <WordExamples kanji={selectedKanji}/> 
      </div>
     </div>  
    </>
}