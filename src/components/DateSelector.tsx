import { ChevronLeft, ChevronRight } from "@material-ui/icons";

type DateSelectorProps = {
    date: string,
    disablePrev: boolean,
    disableNext: boolean,
    changeDate : Function
}

//onclickingLeft, fetch array that was in previous date

const DateSelector = ({date, disablePrev, disableNext, changeDate}:DateSelectorProps) => {
    //const today = new Date(Date.now());

    const makeDisabled = () => {
        return "cursor-not-allowed"
    }
    return ( 
        <div className='date-selector flex justify-items-center items-center'>
            <button type="button" className={`mx-2 inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm  dark:focus:ring-offset-gray-800 ${ disablePrev && makeDisabled()} `}
            disabled = {disablePrev}
            onClick={ e => {
                e.preventDefault()
                changeDate('prev')}
                }
            >
                <ChevronLeft />
            </button>
            <div className='text-2xl font-semibold my-8'>
                <p>{date}</p>
            </div> 
            <button type="button" className={`mx-2 inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm  dark:focus:ring-offset-gray-800 ${ disableNext && makeDisabled()} `}
             disabled = {disableNext}
             onClick={ e => {
                e.preventDefault()
                changeDate('next')}
                }
            >
                 <ChevronRight/> 
            </button>
        </div>  
    )  
}
 
export default DateSelector;