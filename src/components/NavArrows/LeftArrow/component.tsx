import { NavArrowProps } from "../types";


const LeftArrow = (props: NavArrowProps) => {
    return (
        <i
            className="fa-solid fa-regular fa-xl fa-arrow-left m-auto"
            onClick={props.onClick}
        ></i>
    );
}


export default LeftArrow;