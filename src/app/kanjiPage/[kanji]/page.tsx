'use client'
import DateSelector from "@/components/DateSelector";
import KanjiDetail from "@/components/KanjiDetail";
import WordExamples from "@/components/WordExamples";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useState } from "react";

// export async function getStaticPaths() { //all possible parhs
//     const paths = getAllKanjiLearnt();
//     return {
//       paths,
//       fallback: false,
//     };
// }

type kanjiDetails = {
    kanji: string,
    grade: string,
    stroke_count: number,
    meanings: string[],
    kun_readings: string[],
    on_readings: string[],
    name_readings: string[],
    jlpt: string,
    unicode: string,
    heisig_en: string

}

//export const getStaticProps: GetStaticProps = async({ params }:any) => { //all data
// export const getStaticProps = async ({params}:any) => {
//     const kanjiDetailsData = getKanjiDetails(params.id);
//     return {
//       props: {
//         kanjiDetailsData,
//       },
//     };
// }

// export const getStaticProps: GetStaticProps<{
//     kanjiDetailsData : kanjiDetails
//   }> = async ({params}:any) => {
//     const res = await fetch(`https:kanjiapi.dev/v1/kanji/${params.kanjiCharacter}`)
//     const kanjiDetailsData = await res.json()
//     return { props: { kanjiDetailsData  } }
//   }

// const KanjiPage = ({params}:any) => {
//     // const res = await fetch(`https:kanjiapi.dev/v1/kanji/${params.kanji}`)
//     // const kanjiDetailsData = await res.json()


//     return ( 
//         <KanjiDetail kanji = {kanjiDetails.kanji}
//         meanings = {kanjiDetails.meanings.join(", ")}
//         kunReadings = {kanjiDetails.kun_readings.join(", ")}
//         onReadings = {kanjiDetails.on_readings.join(", ")}
//         />
//     );
// }

type Params = {
    params: {
        kanji: string
        //date: any
    }
}


export default async function KanjiPage ({ params: {kanji}}: Params) { //maybe change to date instead? 
//export default async function KanjiPage ({ params: {date}}: Params) { 
    //const today = new Date(Date.now())
    const decodedKanji = decodeURI(kanji)
    // const dateTimestamp = Date.parse(date + '00:00:00 GMT')
    // const [selectedDate, setSelectedDate] = useState(dateTimestamp)

    return ( 
        <>
        <div className="grid grid-cols-8">
        <div className="side-panel col-span-3 flex flex-col align-center m-8 border-r-2 border-slate-300">
          {/* <DateSelector date={selectedDate} disablePrev={disablePrev} disableNext={disableNext} changeDate={changeDate}/> */}
          {/* <KanjiDetail 
             kanji = {decodedKanji}
           /> */}
       </div>
       <div className="main-panel m-8 col-span-5">
           {/* <WordExamples kanji={decodedKanji} /> */}
       </div>
      </div>  
     </>
    );
}

