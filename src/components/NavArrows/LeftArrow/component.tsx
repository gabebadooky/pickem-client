import { NavArrowProps } from "../types";


const LeftArrow = (props: NavArrowProps) => {
    return (
        <i
            className="fa-slab fa-regular fa-xl fa-arrow-left m-auto"
            onClick={() => props.onClick}
        ></i>
    );
}


export default LeftArrow;