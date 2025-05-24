type Props = {
    weeks: number;
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
            <select name="week-dropdown" id="week-dropdown-input" className="ml-8 mr-8"
                onChange={(e) => props.setWeek(Number(e.currentTarget.value))}
            >
                {renderWeekOptions(props.weeks)}
            </select>
        </span>
    )
}

export default WeekDropdown;