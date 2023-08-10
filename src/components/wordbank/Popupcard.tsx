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
        card: {background: 'blue', color: 'white', borderRadius: 20
     },
    }

    const flipCardCss = 'w-800 h-600 flex items-center justify-center'
    const test = {width: '275px', height:'400px'}


    const frontCard = 
        <div className= 'text-3xl'>
            {currentWritten}
        </div>

    //pronuncation and meaning
    const backCard = 
        <div>
            <div className='pronunciation'>
                pronunciation: {pronunciation}
            </div>
            <div className='meanings'>
                meanings:  {meaning}
            </div>
        </div>

    return (
        <ReactFlipCard
            containerCss = {flipCardCss}
            containerStyle={test}
            frontCss= {flipCardCss}
            backCss= {flipCardCss}
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={frontCard}
            backComponent={backCard}
        />
    );

}

export default Popupcard