type Props = {
    weeks: number;
    selectedWeek: number;
    setWeek: Function;
}

const renderWeekOptions = (weeks: number) => {
    let optionElements = [];
    for (let i = 0; i < weeks; i++) {
        optionElements.push(<option key={i} value={i}>Week {i}</option>);
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