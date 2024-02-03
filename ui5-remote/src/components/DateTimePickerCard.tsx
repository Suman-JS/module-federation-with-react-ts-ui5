import { DateTimePicker } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";

const DateTimePickerCard = () => {
	return (
		<div>
			<DateTimePicker
				primaryCalendarType="Gregorian"
				
			/>
		</div>
	);
};

export default DateTimePickerCard;
