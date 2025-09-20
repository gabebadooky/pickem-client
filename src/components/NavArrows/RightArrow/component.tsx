import { NavArrowProps } from "../types";


const RightArrow = (props: NavArrowProps) => {
    return (
        <i
            className="fa-slab fa-regular fa-xl fa-arrow-right m-auto"
            onClick={() => props.onClick}
        ></i>
    );
}


export default RightArrow;