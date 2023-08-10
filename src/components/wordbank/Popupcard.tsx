'use client'

import { getWordbankWord } from '@/lib/WordBankActions'
import { useEffect, useState } from 'react'
import ReactFlipCard from 'reactjs-flip-card'

type PopupcardProps = {
    currentWritten: string
}
const Popupcard = ({currentWritten}:PopupcardProps) => {

    const [meaning,setMeaning] = useState([""])
    const [pronunciation, setPronunciation] = useState("")

    useEffect(()=>{
        getWordDetails()
    },[currentWritten])


    const getWordDetails = async() => {
        const wordDetails = await getWordbankWord(currentWritten)
        console.log('word details:', wordDetails)
        setMeaning(wordDetails.meanings)
        setPronunciation(wordDetails.pronounced)
    }

    const styles = {
        card: {background: 'white', color: 'black', borderRadius: 20},
    }

    const flipCardCss = 'w-800 h-600 flex items-center justify-center m-4'
    const frontBackCss = 'w-800 h-600 flex items-center justify-center shadow-xl border-2 border-slate-100'
    const test = {width: '275px', height:'400px'}


    const frontCard = 
        <div className= 'text-3xl'>
            {currentWritten}
        </div>

    //pronuncation and meaning
    const backCard = 
        <div>
            <div className='pronunciation'>
                <span className='text-slate-600'>pronunciation: </span><span className='text-sky-500 font-semibold'>{pronunciation}</span>
            </div>
            <div className='meanings'>
            <span className='text-slate-600'>meanings: </span><span className='text-sky-500 font-semibold'>{meaning}</span>
            </div>
        </div>

    return (
        <ReactFlipCard
            containerCss = {flipCardCss}
            containerStyle={test}
            frontCss= {frontBackCss}
            backCss= {frontBackCss}
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={frontCard}
            backComponent={backCard}
        />
    );

}

export default Popupcard