type KanjiDetailFieldProps = {
    kanjiDetails: any,
    entry: any
}

const KanjiDetailField = ({kanjiDetails,entry}:KanjiDetailFieldProps) => {
    return ( 
        <div className="py-4">
        <p className="text-slate-500 text-sm">{entry}</p>
        <p>{
            Array.isArray(kanjiDetails[entry]) ? kanjiDetails[entry].join(", ") : kanjiDetails[entry]
            }</p>
        </div>
     );
}
 
export default KanjiDetailField;