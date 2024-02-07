import { Button } from "@ui5/webcomponents-react";
import { useState } from "react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";

type CustomComponentProps = {
	icon?: string | undefined;
	cssStyles?: string;
};

const CustomComponent = ({ icon, cssStyles }: CustomComponentProps) => {
	const [value, setvalue] = useState(0);
	return (
		<div>
			<Button
				tooltip="Submit button"
				design="Transparent"
				icon={icon}
				className={cssStyles}
				onClick={() => setvalue((prev) => prev + 1)}>
				Clicked {value} times
			</Button>
		</div>
	);
};

export default CustomComponent;
