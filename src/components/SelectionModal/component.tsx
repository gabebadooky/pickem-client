import { useState } from "react";
import { ModalSlides } from "./ModalSlides";
import { SelectionModalProps } from "./types";


const SelectionModal = (props: SelectionModalProps) => {
    if (!props.isModalOpen) {
        return null;
    };

    const [modalIndex, setModalIndex] = useState<number>(0);
    const componentID: string = `${props.pick.userID}-${props.pick.gameID}`;

    const handleIconClickEvent = (): void => {
        props.setIsModalOpen(false);
    }

    const handleLeftArrowClickEvent = (): void => {
        setModalIndex(modalIndex - 1);
    }

    const handleRightArrowClickEvent = (): void => {
        setModalIndex(modalIndex + 1);
    }
    
    
    return (
        
        <div 
            className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000"
            id={`${componentID}-portal-container`}
            key={`${componentID}-portal-container`}
        >

            <div 
                className="bg-[#FFFFFF] p-5 relative rounded-xl text-black text-center w-full"
                id={`${componentID}-portal-div`}
                key={`${componentID}-portal-div`}
            >
                
                <i
                    className="fa-solid fa-2xl fa-rectangle-xmark absolute top-3 right-3"
                    id={`${componentID}-close-portal-icon`}
                    key={`${componentID}-close-portal-icon`}
                    onClick={handleIconClickEvent}
                >
                </i>

                <div
                    className="flex justify-center m-auto mt-5 w-full"
                    id={`${componentID}-close-portal-content`}
                    key={`${componentID}-close-portal-content`}
                >

                    <div
                        className="l-0 my-auto py-5 w-[10%]"
                        id={`${componentID}-portal-left-arrow`}
                        key={`${componentID}-portal-left-arrow`}
                    >
                        { 
                            modalIndex > 0 && 
                            <i
                                className="fa-solid fa-caret-left"
                                onClick={handleLeftArrowClickEvent}
                            ></i>
                        }
                    </div>

                    <div
                        className="w-[80%]"
                        id={`${componentID}-portal-slide-container`}
                        key={`${componentID}-portal-slide-container`}
                    >
                        {ModalSlides(props)[modalIndex]}
                    </div>

                    <div
                        className="my-auto py-5 r-0 w-[10%]"
                        id={`${componentID}-portal-right-arrow`}
                        key={`${componentID}-portal-right-arrow`}
                    >
                        {
                            modalIndex < ModalSlides.length - 1 && 
                            <i 
                                className="fa-solid fa-caret-right"
                                onClick={handleRightArrowClickEvent}
                            ></i>
                        }
                    </div>

                </div>      

            </div>

        </div>
    );    
}


export default SelectionModal;