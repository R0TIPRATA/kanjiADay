const KanjiDetailField = ({kanjiDetails,entry}) => {
    return ( 
        <div className="py-4">
        <p className="text-slate-500 text-sm">{entry}</p>
        <p>{kanjiDetails[entry]}</p>
        </div>
     );
}
 
export default KanjiDetailField;