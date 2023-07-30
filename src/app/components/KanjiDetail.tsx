import KanjiDetailField from "./KanjiDetailField"

const KanjiDetail = ({kanjiData}) => {

    const kanjiDetails = {
        'Meanings:': kanjiData.meanings.join(", "),
        'Kun Readings: ': kanjiData.kun_readings.join(", "),
        'On Readings: ': kanjiData.on_readings.join(", ")
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
                <div className="text-8xl">{kanjiData.kanji}</div>
            </div>
            <div className="kanji-detail-unit">
                <KanjiDetailFields />
            </div>
        </div>
     );
}
 
export default KanjiDetail;