import { JSX, useState } from "react";
import { instantiateModalSlides } from "./ModalSlides";
import { SelectionModalProps } from "./types";
import { LeftArrow } from "../NavArrows/LeftArrow";
import RightArrow from "../NavArrows/RightArrow/component";


const SelectionModal = (props: SelectionModalProps) => {
    const [modalIndex, setModalIndex] = useState<number>(0);
    
    const componentID: string = `${props.pick.userID}-${props.pick.gameID}`;
    const modalSlides: JSX.Element[] = instantiateModalSlides(props);


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
                className="bg-[#FFFFFF] p-3 relative rounded-xl text-black text-center w-[90%]"
                id={`${componentID}-portal-div`}
                key={`${componentID}-portal-div`}
            >
                
                <div className="text-end w-full">
                    <i
                        className="fa-solid fa-2xl fa-rectangle-xmark"
                        id={`${componentID}-close-portal-icon`}
                        key={`${componentID}-close-portal-icon`}
                        onClick={handleIconClickEvent}
                    >
                    </i>
                </div>

                <div
                    className="flex justify-center m-auto mt-5 w-full"
                    id={`${componentID}-close-portal-content`}
                    key={`${componentID}-close-portal-content`}
                >

                    <div
                        className="l-0 my-auto mx-2 py-5 w-[10%]"
                        id={`${componentID}-portal-left-arrow`}
                        key={`${componentID}-portal-left-arrow`}
                        style={modalIndex > 0 ? { backgroundColor: "#ADACAC" } :  { left: 0 }}
                        onClick={() => handleLeftArrowClickEvent()}
                    >
                        { 
                            modalIndex > 0 &&
                            <LeftArrow onClick={() => handleLeftArrowClickEvent()} />
                        }
                    </div>

                    <div
                        className="w-[80%]"
                        id={`${componentID}-portal-slide-container`}
                        key={`${componentID}-portal-slide-container`}
                    >
                        {instantiateModalSlides(props)[modalIndex]}
                    </div>

                    <div
                        className="my-auto mx-2 py-5 r-0 w-[10%]"
                        id={`${componentID}-portal-right-arrow`}
                        key={`${componentID}-portal-right-arrow`}
                        style={modalIndex < (modalSlides.length - 1) ? { backgroundColor: "#ADACAC" } :  { right: 0 }}
                        onClick={() => handleRightArrowClickEvent()}
                    >
                        {
                            modalIndex < modalSlides.length - 1 && 
                            <RightArrow onClick={() => handleRightArrowClickEvent()} />
                        }
                    </div>

                </div>      

            </div>

        </div>
    );    
}


export default SelectionModal;