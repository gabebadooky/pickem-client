type Props = {
    weeks: number;
    selectedWeek: number;
    setSelectedWeek: Function;
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