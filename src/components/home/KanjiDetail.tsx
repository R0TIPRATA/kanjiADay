import { getKanjiDetails } from "@/lib/UserKanjiDataActions"
import KanjiDetailField from "./KanjiDetailField"

type KanjiDetailProps = {
    kanji: string | undefined
    // meanings: string,
    // kunReadings: string,
    // onReadings: string
}

//const KanjiDetail = ({kanji,meanings, kunReadings, onReadings}:KanjiDetailProps) => {
 const KanjiDetail = async ({kanji}:KanjiDetailProps) => {
    //call API to get kanjidetails
    let kanjiDetails = [
        {
            kanji: '',
            meanings: '',
            kunReadinds: '',
            onReadings: ''
        }
    ]
    console.log("kanji test", kanji)
    typeof kanji !== 'undefined' ? kanjiDetails = await getKanjiDetails(decodeURI(kanji)) : kanjiDetails = []
    // const kanjiDetails = {
    //     'Meanings:': meanings,
    //     'Kun Readings: ': kunReadings,
    //     'On Readings: ': onReadings
    // }

    const KanjiDetailFields = () => {
        return Object.keys(kanjiDetails).map((entry, index)=> {
            return (
                <KanjiDetailField kanjiDetails={kanjiDetails} entry={entry}/>
            )
        })
    }

    return ( 
        <div>
            <div className="kanji-display w-[100px] border-solid border-2 black">
                <div className="text-8xl">{kanji}</div>
            </div>
            <div className="kanji-detail-unit">
                <KanjiDetailFields />
            </div>
        </div>
     );
}
 
export default KanjiDetail;