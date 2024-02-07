import employeeIcon from "@ui5/webcomponents-icons/dist/employee.js";
import {
	Avatar,
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
import CustomComponent from "./components/CustomComponent";
import SideNavbar from "./components/SideNavbar";
import routes from "./lib/data";

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
				primaryTitle="UI5 Remote"
				profile={<Avatar icon={employeeIcon} />}>
				<ShellBarItem
					icon={paletteIcon}
					text="Change Theme"
					onClick={handleThemeSwitchItemClick}
				/>
			</ShellBar>
			<div className="flex bg-gray-300 mt-1 ml-1 mr-1 rounded-xl p-3 gap-x-2">
				<div>
					<SideNavbar items={routes} />
				</div>

				<div className="flex flex-col flex-grow w-[90dvw] bg-red-400 rounded-lg p-2">
					<p className="text-center text-2xl text-black font-bold mt-4">
						Welcome to UI5 Remote
					</p>
					<div className="flex gap-x-3 text-center justify-center items-center mt-5">
						<Label className="text-black font-semibold text-lg">
							Select Date-Time
						</Label>
						<DateTimePickerCard />
					</div>

					<div className="flex justify-center">
						<CustomComponent
							icon={employeeIcon}
							cssStyles={
								"text-black bg-gray-200 active:outline-none focus:!outline-none active:border-none p-2 rounded-md mt-4 hover:bg-gray-600 scale-100 hover:outline-none hover:border-none border-none hover:text-white scale-105 transition-all duration-300 ease-in-out"
							}
						/>
					</div>
				</div>
			</div>

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
