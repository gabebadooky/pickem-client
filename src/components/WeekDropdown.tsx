import { seasonWeeks, weekdays } from "../services/formatDate";

type Props = {
    weeks: number;
    selectedWeek: number;
    setSelectedWeek: Function;
}

const renderWeekOptions = (weeks: number) => {
    let optionElements = [];

    for (let i = 0; i < weeks; i++) {
        const currentWeek = seasonWeeks[i];
        const formattedStartDateString: string = `${weekdays[currentWeek.start.getUTCDay()]} ${currentWeek.start.getUTCMonth() + 1}/${currentWeek.start.getUTCDate()}`;
        const formattedEndDateString: string = `${weekdays[currentWeek.end.getUTCDay()]} ${currentWeek.end.getUTCMonth() + 1}/${currentWeek.end.getUTCDate()}`;
        
        optionElements.push(<option key={i} value={i}>{formattedStartDateString}-{formattedEndDateString}</option>);
    }

    return optionElements;
}


const WeekDropdown = (props: Props) => {
    return (
        <select name="week-dropdown" id="week-dropdown-input" className="appearance-none mx-auto text-center text-xl"
            value={props.selectedWeek}
            onChange={(e) => props.setSelectedWeek(Number(e.currentTarget.value))}
        >
            {renderWeekOptions(props.weeks)}
        </select>
    );
}

export default WeekDropdown;