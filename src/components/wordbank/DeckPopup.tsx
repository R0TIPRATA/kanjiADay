import { Dialog, Transition } from '@headlessui/react'
import { Fragment, use, useEffect, useState } from 'react'
import Popupcard from './Popupcard'

type PopupProps = {
    wordsDeck: string []
    showPopup: boolean,
    removePopup: Function
}

//click create deck and popup comes out

const DeckPopup = ({wordsDeck, showPopup, removePopup}:PopupProps) => {
    const [isOpen, setIsOpen] = useState(false)
    //for iterating prev next
    const [currentIndex, setCurrentIndex] = useState(0)
    const deckLength = wordsDeck.length
    const [disableNext,setDisableNext] = useState(false)
    const [disablePrev,setDisablePrev] = useState(true)
    const [currentWritten, setCurrentWritten] = useState("")

    useEffect( () => { 
        showPopup ? setIsOpen(true) : setIsOpen(false)
        setCurrentIndex(0)
        setCurrentWritten(wordsDeck[0])
    }, [showPopup])

    console.log("words deck", wordsDeck)
    console.log("words deck [0] ", wordsDeck[0])
    console.log("currentWritten ", currentWritten)
    console.log('current index:', currentIndex)

    const closeModal = () => {
        setIsOpen(false)
        removePopup()
    }

    const changeCard = (control: string) => {
        let newIndex = 0;
        //console.log("current written: ", currentWritten)
        //selector controls

        if(control === 'prev' && currentIndex > 0) newIndex = currentIndex - 1 //0 - 1
        else newIndex = currentIndex + 1
        
        // console.log("control", control)
        // console.log("prev index", currentIndex)
        // console.log("new index: ", newIndex)
        // console.log("deck length: ", deckLength)
        // console.log("disable next => ", disableNext)
        // console.log("disable prev => ", disablePrev)

        if(newIndex === 0){
            setDisablePrev(true)
            if(deckLength===1) setDisableNext(true)
            else setDisableNext(false)
        }
        else if (newIndex === deckLength - 1 ) {
            setDisableNext(true)
            setDisablePrev(false)
        }
        else { 
          setDisableNext(false)
          setDisablePrev(false)
        }  

        setCurrentIndex(newIndex)
        setCurrentWritten(wordsDeck[newIndex])
    }

    //if array of words > 0, open modal
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="shrink-0 rounded-2xl bg-white p-6 text-middle align-middle shadow-xl transition-all"  style={{width:'800px', height: '600px'}}>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Word Deck
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="instruction text-sm text-gray-500">
                                            Guess the pronunciation and meaning of each word in the deck.
                                        </p>
                                    </div>

                                    <div className="mt-2 flex align-middle justify-center">
                                        <Popupcard currentWritten={currentWritten} />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="justify-center rounded-md border border-transparent bg-blue-100 w-100px px-4 py-2 mr-8 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => changeCard('prev')}
                                            disabled = {disablePrev}
                                        >
                                            Previous word
                                            
                                        </button>
                                        <button
                                            type="button"
                                            className="justify-center rounded-md border border-transparent bg-blue-100 w-100px px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => changeCard('next')}
                                            disabled = {disableNext}
                                        >
                                            Next word
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default DeckPopup