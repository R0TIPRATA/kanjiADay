const DateSelector = () => {
    const today = new Date(Date.now());
    return ( 
    <div className='text-2xl font-semibold my-8'>
        <p>{today.toDateString()}</p>
    </div> );
}
 
export default DateSelector;