import KanjiDetailField from "./KanjiDetailField"

type KanjiDetailProps = {
    kanji: string,
    meanings: string,
    kunReadings: string,
    onReadings: string
}

const KanjiDetail = ({kanji,meanings, kunReadings, onReadings}:KanjiDetailProps) => {

    const kanjiDetails = {
        'Meanings:': meanings,
        'Kun Readings: ': kunReadings,
        'On Readings: ': onReadings
    }

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