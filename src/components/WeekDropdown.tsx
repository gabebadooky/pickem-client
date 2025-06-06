type Props = {
    weeks: number;
    selectedWeek: number;
    setWeek: Function;
}

const renderWeekOptions = (weeks: number) => {
    let optionElements = [];
    for (let i = 0; i < weeks; i++) {
        const weekNum: number = i + 1;
        optionElements.push(<option key={weekNum} value={weekNum}>Week {weekNum}</option>);
    }
    return optionElements;
}


const WeekDropdown = (props: Props) => {
    return (
        <span>
            <select name="week-dropdown" id="week-dropdown-input" className="ml-6 mr-6"
                value={props.selectedWeek}
                onChange={(e) => props.setWeek(Number(e.currentTarget.value))}
            >
                {renderWeekOptions(props.weeks)}
            </select>
        </span>
    )
}

export default WeekDropdown;