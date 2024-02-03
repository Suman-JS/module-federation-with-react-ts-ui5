import employeeIcon from "@ui5/webcomponents-icons/dist/employee.js";
import {
	Avatar,
	FlexBox,
	FlexBoxAlignItems,
	FlexBoxDirection,
	FlexBoxJustifyContent,
	Label,
	List,
	ListMode,
	ListPropTypes,
	ResponsivePopover,
	ResponsivePopoverDomRef,
	ShellBar,
	ShellBarItem,
	ShellBarItemPropTypes,
	StandardListItem,
} from "@ui5/webcomponents-react";
import {
	getTheme,
	setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
import DateTimePickerCard from "./components/DateTimePickerCard";
import { useEffect, useRef, useState } from "react";

function App() {
	const THEMES = [
		{ key: "sap_horizon", value: "Morning Horizon (Light)" },
		{ key: "sap_horizon_dark", value: "Evening Horizon (Dark)" },
		{ key: "sap_horizon_hcb", value: "Horizon High Contrast Black" },
		{ key: "sap_horizon_hcw", value: "Horizon High Contrast White" },
	];
	const [currentTheme, setCurrentTheme] = useState(getTheme);
	const popoverRef = useRef<ResponsivePopoverDomRef | null>(null);

	const handleThemeSwitch: ListPropTypes["onSelectionChange"] = (e) => {
		const { targetItem } = e.detail;
		const selectedTheme: string = targetItem.dataset.key!;
		setTheme(targetItem.dataset.key!);
		setCurrentTheme(targetItem.dataset.key!);
		localStorage.setItem("Theme", selectedTheme);
	};
	const handleThemeSwitchItemClick: ShellBarItemPropTypes["onClick"] = (e) => {
		popoverRef.current?.showAt(e.detail.targetRef);
	};

	useEffect(() => {
		const storedTheme: string | null = localStorage.getItem("Theme");
		if (storedTheme) {
			setCurrentTheme(storedTheme);
			setTheme(storedTheme);
		}
	}, []);

	return (
		<>
			<ShellBar
				logo={
					<img
						src="/vite.svg"
						alt={"Vite Logo"}
					/>
				}
				primaryTitle="UI5 Host"
				profile={<Avatar icon={employeeIcon} />}>
				<ShellBarItem
					icon={paletteIcon}
					text="Change Theme"
					onClick={handleThemeSwitchItemClick}
				/>
			</ShellBar>
			<FlexBox
				direction={FlexBoxDirection.Column}
				justifyContent={FlexBoxJustifyContent.Center}
				alignItems={FlexBoxAlignItems.Center}>
				<Label>Select Date-Time</Label>
				<DateTimePickerCard />
			</FlexBox>
			<ResponsivePopover
				ref={popoverRef}
				className="popover">
				<List
					onSelectionChange={handleThemeSwitch}
					headerText="Change Theme"
					mode={ListMode.SingleSelect}>
					{THEMES.map((theme) => (
						<StandardListItem
							key={theme.key}
							selected={currentTheme === theme.key}
							data-key={theme.key}>
							{theme.value}
						</StandardListItem>
					))}
				</List>
			</ResponsivePopover>
		</>
	);
}

export default App;
