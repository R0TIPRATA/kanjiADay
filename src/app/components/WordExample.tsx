type WordExamplesProps = {
    written: string,
    pronounced: string,
    meanings: string
}


const WordExample = ({written,pronounced,meanings}:WordExamplesProps) => {
    return ( 
        <div className='card grid-cols-2 mr-16 bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] dark:text-gray-400'>
        <div className='left-side-wrapper float-left'>
            <div className='written'>{written}</div>
        </div>
        <div className='right-side-wrapper flex flex-col float-right'>
            <div className='pronounced flex flex-row-reverse'>{pronounced}</div>
            <div className='meanings flex flex-row-reverse'>{meanings}</div>
        </div>
    </div> 
     )
}
 
export default WordExample;