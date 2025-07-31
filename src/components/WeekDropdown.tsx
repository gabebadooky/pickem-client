import { seasonWeeks, weekdays } from "../services/formatDate";

type Props = {
    weeks: number;
    selectedWeek: number;
    setSelectedWeek: Function;
}

const renderWeekOptions = (weeks: number) => {
    const now: Date = new Date();
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
        <div className="m-auto">
            <select name="week-dropdown" id="week-dropdown-input" className="ml-6 mr-6"
                value={props.selectedWeek}
                onChange={(e) => props.setSelectedWeek(Number(e.currentTarget.value))}
            >
                {renderWeekOptions(props.weeks)}
            </select>
        </div>
    );
}

export default WeekDropdown;