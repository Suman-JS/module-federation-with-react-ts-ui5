import employeeIcon from "@ui5/webcomponents-icons/dist/employee.js";
import accc from "@ui5/webcomponents-icons/dist/accessibility.js";
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
import { lazy, useRef, useState, Suspense, useEffect } from "react";
import {
	getTheme,
	setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
import sideItems from "./lib/data";
import ErrorBoundary from "./components/ErrorBoundary";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";

const THEMES = [
	{ key: "sap_horizon", value: "Morning Horizon (Light)" },
	{ key: "sap_horizon_dark", value: "Evening Horizon (Dark)" },
	{ key: "sap_horizon_hcb", value: "Horizon High Contrast Black" },
	{ key: "sap_horizon_hcw", value: "Horizon High Contrast White" },
];

const DateTimePickerCard = lazy(() => import("ui5Remote/DateTimePickerCard"));
const CustomComponent = lazy(() => import("ui5Remote/CustomComponent"));
const CustomSideNav = lazy(() => import("ui5Remote/SideNavbar"));

function App() {
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
				<Label>Select Date-time</Label>
				<ErrorBoundary
					fallback={
						<div className="text-red-600 text-xl font-semibold">
							Failed to load Date Time Picker
						</div>
					}>
					<Suspense fallback={<div>Loading...</div>}>
						<DateTimePickerCard />
					</Suspense>
				</ErrorBoundary>

				<ErrorBoundary
					fallback={
						<div className="text-red-600 text-xl font-semibold">
							Failded to load Button
						</div>
					}>
					<Suspense fallback={<div>Loading...</div>}>
						<CustomComponent
							icon={accc}
							cssStyles={
								"text-black bg-blue-600 active:outline-none active:border-none p-2 rounded-md mt-4 hover:bg-blue-400 scale-100 hover:outline-none hover:border-none border-none hover:text-white scale-105 transition-all duration-300 ease-in-out"
							}
						/>
					</Suspense>
				</ErrorBoundary>
				<ErrorBoundary
					fallback={
						<div className="text-red-600 text-xl font-semibold">
							Failed to load Side Navigation Bar
						</div>
					}>
					<Suspense fallback={<div>Loading...</div>}>
						<CustomSideNav items={sideItems} />
					</Suspense>
				</ErrorBoundary>
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
