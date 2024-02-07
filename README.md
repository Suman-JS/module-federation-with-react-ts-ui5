# This is a template for Module Federation With React and Vite and UI5 React Components

## How to run this project

**To run this project open it with VS Code.**

**Step 1 :**

goto to the ui5-remote directory

```bash
cd ui5-remote
```

**Step 2 :**

Install all the required packages

```bash
pnpm i
```

**Step 3 :**

Build and Run the production build

```bash
pnpm build && pnpm serve
```

It should generate a url for you to check it and make sure its running. If its running, follow the next steps.

**Step 4 :**

```bash
cd ui5-host
```

**Step 5 :**

Install alll the required packages

```bash
pnpm i
```

**Step 6 :**

```bash
pnpm build && pnpm preview
```

Now it should run in a different port. If you wish to change anything goto the ui5-remote and change it accordingly and save it. After saving it. use the following command in the ui5-remote terminal.

```bash
pnpm build && pnpm serve
```

now just refresh the ui5-host and that's it. It should reflect on the host app. Thank me later:wink:

<br/>
<br/>

## How to Create a new project using **Module Federation** With React and Vite

**Step 1 :**

First create a new folder. I will name it `Mod-Fed-With-UI5`.

```bash
mkdir Mod-Fed-With-UI5
```

**Step 2 :**

Go inside the newly created folder

```bash
cd Mod-Fed-With-UI5
```

**Step 3 :**

Create a new react app using `vite`

```bash
pnpm create vite@latest
```

Now it will ask you to give a name of your application. In my case I will choose "ui5-remote". Now it will ask you to choose a freamework I'll choose "React with typescript". Then run the following commands

```bash
cd ui5-remote
pnpm install
pnpm run dev
```

After making sure the app is running as it should you can clean up the project as you like.

**Step 4 :**

Open your terminal and install `@originjs/vite-plugin-federation` this in dev dependancy package add these packages as dependancy
`@ui5/webcomponents`,`@ui5/webcomponents-base`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`, `@ui5/webcomponents-react`

```bash
pnpm add -D @originjs/vite-plugin-federation
pnpm add @ui5/webcomponents @ui5/webcomponents-base @ui5/webcomponents-fiori @ui5/webcomponents-icons @ui5/webcomponents-react
```

**Optional Step :**

I like to use `tailwindcss` as my css library. So I'll install it. If you don't use tailwind you can skip this part.

```bash
pnpm add -D tailwindcss
pnpm tailwindcss init
```

It should install `tailwindcss` as dev dependany and generate `tailwind.config.js` file the root of your project.

Open `tailwind.config.js` file and add the following. It will look into those directory and look for any tailwind class and apply the appropriate css.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{html,js}",
		"./components/**/*.{html,js}",
		"./*.html",
		"./src/**/*.html",
		"./*.js",
		"./src/**/*.html",
		"./src/**/*.js",
		"./src/**/*.jsx",
		"./src/**/*.ts",
		"./src/**/*.tsx",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
```

Now open the `index.css` which located in the `src` directory and add these inside

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now you are all set. Try to add tailwind classes in some `html` element and make sure its working.

**Step 5 :**

Now in order to use Module Federation we need to configure `vite.config.ts` file. Open the `vite.config.ts` and add this.

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			//add any name you want. Idealy you should give a name that represents you app
			name: "ui5Remote",
			filename: "remoteEntry.js",
			exposes: {
				//add any components you want to share
				"./DateTimePickerCard": "./src/components/DateTimePickerCard",
			},
			//add any packages name that you want to share. I added tailwind because my Button componment depends on tailwind
			shared: ["react", "react-dom", "tailwindcss", "@ui5/webcomponents-react"],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			//you need to set target as "esnext" otherwise it might cause isuue
			target: "esnext",
		},
	},
	build: {
		//these are some buiild tweek in order to make sure tailwind and any other css to be shared
		target: "esnext",
		cssCodeSplit: false,
		minify: "esbuild",
	},
});
```

If you face any error that says `top level await` open your `tsconfig.json` file and paste this

```json
{
	"compilerOptions": {
		"target": "ES2022",
		"useDefineForClassFields": true,
		"lib": ["ES2022", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true
	},
	"include": ["src"],
	"references": [{ "path": "./tsconfig.node.json" }],
	"exclude": ["node_modules"]
}
```

**Step 5 :**

We have to configure the `package.json` file. If you're wondering why, Its because everytime you run the app vite will give you a differnt port. But we need a strict port that we will use in our host app.

```json
{
	"name": "ui5-remote",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite --port 5001 --strictPort",
		"build": "tsc && vite build",
		"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
		"preview": "vite preview --port 5001 --strictPort",
		"serve": "vite preview --port 5001 --strictPort"
	},
	"dependencies": {
		"@ui5/webcomponents": "~1.21.0",
		"@ui5/webcomponents-base": "^1.21.2",
		"@ui5/webcomponents-fiori": "~1.21.0",
		"@ui5/webcomponents-icons": "~1.21.0",
		"@ui5/webcomponents-react": "~1.24.0",
		"react": "^18.2.0",
		"react-dom": "^18.2.0"
	},
	"devDependencies": {
		"@originjs/vite-plugin-federation": "^1.3.4",
		"@types/react": "^18.0.28",
		"@types/react-dom": "^18.0.11",
		"@typescript-eslint/eslint-plugin": "^6.0.0",
		"@typescript-eslint/parser": "^6.0.0",
		"@vitejs/plugin-react": "^4.2.0",
		"autoprefixer": "^10.4.17",
		"eslint": "^8.38.0",
		"eslint-plugin-react-hooks": "^4.6.0",
		"eslint-plugin-react-refresh": "^0.4.0",
		"postcss": "^8.4.33",
		"tailwindcss": "^3.4.1",
		"typescript": "^5.0.2",
		"vite": "^5.0.0"
	}
}
```

As you can see I have modified the scripts. I have added `--port 5001 --strictPort` next to default script. Its tells the vite to run the app on port 5001 and if you can't give me that port, do not give me any.

**Step 6 :**

Now Create any component and use it your project and make sure its working. If its working you can share it to host applications.

For example,
Lets say I have a component callled `DateTimePickerCard.tsx` inside my `src/components` folder and its working just as I like.

This is my `DateTimePickerCard.tsx` file.

```typescript
import { DateTimePicker } from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";

const DateTimePickerCard = () => {
	return (
		<div>
			<DateTimePicker primaryCalendarType="Gregorian" />
		</div>
	);
};

export default DateTimePickerCard;
```

I want to share this component to my host applicion. To do that we need to add this `Button.tsx` component to the `vite.config.ts` file.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "ui5Remote",
			filename: "remoteEntry.js",
			exposes: {
				//I have added the DateTimePickerCard component here to expose for my host applications. Feel free to add other components if you want share other components as well
				"./DateTimePickerCard": "./src/components/DateTimePickerCard",
			},
			shared: ["react", "react-dom", "tailwindcss", "@ui5/webcomponents-react"],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	},
	build: {
		target: "esnext",
		cssCodeSplit: false,
		minify: "esbuild",
	},
});
```

Its all done for the remote applicaton. Now you can share as many components as you like. Just follow the step 6 and add them on your `vite.config.ts` file inside `expose` section.

**NOTE : Make sure to build and serve/preview. Otherwise it won't work. After making any changes to the remote appliction always make sure to build and serve the appliction in order it to work. Use the follwing command to build and serve**

```bash
pnpm build && pnpm serve
```

**We are all set for the remote app😮‍💨. Now let's see how to configure the host app to work**

**Step 7 :**

Create a new react appliction following **Step 3**

**Step 8 :**

Follow **Step 4**

**Optional Step :**

If you want to use `tailwindcss` follow the previous **Optional Step** where i Showed how to configure `tailwind`.
If you don't want to use `tailwind` you can skip this part.

**Step 9 :**

We need to modify the `vite.config.ts` on the ui5-host as well. Just open your `vite.config.ts` that located on the root of your applicaton and add the follwing

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "ui5Host",
			remotes: {
				//This is where we will add the remote app (the app shareing the components).
				ui5Remote: "http://localhost:5001/assets/remoteEntry.js",
			},
			shared: ["react", "react-dom", "tailwindcss", "@ui5/webcomponents-react"],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	},
	build: {
		target: "esnext",
		cssCodeSplit: false,
		minify: "esbuild",
	},
});
```

**Note:**
Take a look at this section.

```typescript
remotes: {
        ui5Remote: "http://localhost:5001/assets/remoteEntry.js",
			},
```

In the remote section I have named the key as 'ui5Remote'. You can name it anything but it is recomended to give a name that actualy represent your remote app.

Take a look at the url. Remember we made sure that in the ui5-remote vite always gives us port 5001, Beacuse we need to specify the port where the remote app running.

**Step 10 :**

If you're using `typescript` like me. you need to follow an additional step. Otherwise you will face a typescript error. Let's see what we need to do in order to avoid that.

Add a file in your host app root and name it like this `ui5Remote.d.ts`. I have named it ui5Remote. As you can see in previous step my remote key was `ui5Remote`. If your remote key is 'someThing' name the file as `someThing.d.ts`

Now open the file and add this.

```typescript
declare module "ui5Remote/*";
```

Again, my remote key was ui5Remote, that's why it says "ui5Remote/\*" if your key name was 'someThing' replace the 'ui5Remote' with the 'someThing'

Now open `tsconfig.json` and add this line.

```json
"include": ["src", "ui5Remote.d.ts"],
```

This step is required. Otherwise you will get type error.

**Step 11 :**

All the configuration are done. Now you can consume the components that you shared from the ui5-remote. Let's see how to consume it.

```typescript
import "./App.css";
import { lazy } from "react";

const DateTimePickerCard = lazy(() => import("ui5Remote/DateTimePickerCard"));

function App() {
	return (
		<>
			<div>
				<DateTimePickerCard />
			</div>
		</>
	);
}

export default App;
```

In this example I'm `lazy`. You can use `dynamic` instead. Remember the remote key we used? My key name was `ui5Remote` that's I'm importing like this

```typescript
const DateTimePickerCard = lazy(() => import("ui5Remote/DateTimePickerCard"));
```

If your key name is 'someThing' just replace the 'ui5Remote' with 'someThing'.

**Pro tip :**
Its always a good idea to wrap those conponent, which you are consuming from `remote` with `Suspense` and `ErrorBoundary`. If you don't if any error occers your whole host application crash, Which is not a good user experience. You can also wrap your entire app in `ErrorBoundary`.

Let's see how we can use `ErrorBoundary` and `Suspense` in our app.

First create a react component and name it `ErrorBoundary`. In my case I'll name it `ErrorBoundary.tsx`. Now add this in the following in this component.

```typescript
import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
	fallback: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
```

Now let's use this `ErrorBoundary` and `Suspense`.

```typescript
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
```

as you can see in this example we are wraping every component with `ErrorBoundary` and `Suspense`. It will ensure that users will be notified if there any error or delay.

```typescript
				<ErrorBoundary
					fallback={
						<div className="text-red-600 text-xl font-semibold">
							Some error occered
						</div>
					}>
                    <Suspense fallback={"Loading.."}>
                        <YourComponent/>
                <ErrorBoundary>
```

in this you can using `fallback` in both `ErrorBoundary` and `Suspense`. If any error occers `ErrorBoundary`'s `fallback` will be displayed, similarly if there is any delay to load the component `Suspense`'s fallback will be displayed.

**Step 12 :**

Now all you need to do is build and run the application on preview.

```bash
pnpm build && pnpm preview
```

Now go to the provided url and see the Module federation on action:wink:

**Importent Note :**
Make sure that you build and serve your remote app before you consume it on your host app. After consuming the shared component on the host. you need to build the host application and preview it. Now if you want to make any changes on the remote app all you need to do is build and serve only the remote app you don't have to build and preview the host app. Just refresh the host app and you will see the changes.

### Let's add UI5 Theme Support 🎨🎨

This part is same for the both host and remote. That's why I'm adding this separetly.

**Step 1 :**
We have to add this on the `App.tsx` component. Open your App.tsx component and paste import these two

```typescript
import {
	getTheme,
	setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";
```

**Step 2 :**
We have to create a array of themes. These themes provided by UI5 library

```typescript
const THEMES = [
	{ key: "sap_horizon", value: "Morning Horizon (Light)" },
	{ key: "sap_horizon_dark", value: "Evening Horizon (Dark)" },
	{ key: "sap_horizon_hcb", value: "Horizon High Contrast Black" },
	{ key: "sap_horizon_hcw", value: "Horizon High Contrast White" },
];
```

**Step 3 :**
We will need this `state` and `ref` for the `popover` which willl let us choose themes.
These functions will actualy handle theme switching. As you can see I'm also storing the selectecd theme to `localStorage` for persistence

```typescript
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
```

I will also use the `useEffect` to fetch the `storedTheme` from `localStorage`

```typescript
useEffect(() => {
	const storedTheme: string | null = localStorage.getItem("Theme");
	if (storedTheme) {
		setCurrentTheme(storedTheme);
		setTheme(storedTheme);
	}
}, []);
```

**Step 4 :**
We need to add the Theme switcher button on the shellBar

```typescript
<ShellBarItem
	icon={paletteIcon}
	text="Change Theme"
	onClick={handleThemeSwitchItemClick}
/>
```

and finally we will add the `popover`

```typescript
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
```

we need one last thing. We have to add some style for the `popover`. Open your `index.css` file and paste thses lines of `css`

```css
.popover {
}
.popover::part(content) {
	padding: 0;
}
```

That's It.

Your final `App.tsx` should look like this :

```typescript
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
import { lazy, useRef, useState, Suspense, useEffect } from "react";
import {
	getTheme,
	setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import paletteIcon from "@ui5/webcomponents-icons/dist/palette.js";

const THEMES = [
	{ key: "sap_horizon", value: "Morning Horizon (Light)" },
	{ key: "sap_horizon_dark", value: "Evening Horizon (Dark)" },
	{ key: "sap_horizon_hcb", value: "Horizon High Contrast Black" },
	{ key: "sap_horizon_hcw", value: "Horizon High Contrast White" },
];

const DateTimePickerCard = lazy(() => import("ui5Remote/DateTimePickerCard"));

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
				<Suspense fallback={<div>Loading...</div>}>
					<DateTimePickerCard />
				</Suspense>
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
```

**NOTE :**<p style="color:red">Theme setup will be same in both remote and host.</p>

## Now let's see how we can share a component from `remote` and modify in `host` as per our requirement and consume it.

<h3 style="text-decoration:underline">Let's take a look at the remote</h3>

**Step 1 :**
Let's create a Side Navigation Bar on the remote. I'll name it `SideNavbar.tsx`.

For this navigation we'll use `react-router-dom` v6. Let's install it.

```bash
pnpm add react-router-dom
```

Now open the `SideNavbar.tsx` and add the following

```typescript
import { useNavigate } from "react-router-dom";
import {
	SideNavigation,
	SideNavigationItem,
	SideNavigationSubItem,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";

type SubItemProps = {
	icon: string;
	text: string;
	path: string;
};

type ItemProps = {
	text: string;
	icon: string;
	path: string;
	subItems?: SubItemProps[];
};

type SideNavbarProps = {
	items: ItemProps[];
};

const SideNavbar = ({ items }: SideNavbarProps) => {
	const navigate = useNavigate();

	const handleNavigation = (location: string) => {
		navigate(location);
	};

	return (
		<aside className="rounded-lg">
			<SideNavigation className="h-[88dvh] rounded-lg">
				{items.map((item, index) => (
					<SideNavigationItem
						key={index}
						icon={item.icon}
						text={item.text}
						selected={index === 0}
						onClick={() => handleNavigation(item.path)}>
						{item.subItems &&
							item.subItems.map((subItem, subIndex) => (
								<SideNavigationSubItem
									key={subIndex}
									icon={subItem.icon}
									text={subItem.text}
									onClick={(e) => {
										e.stopPropagation();
										handleNavigation(item.path + subItem.path);
									}}
								/>
							))}
					</SideNavigationItem>
				))}
			</SideNavigation>
		</aside>
	);
};

export default SideNavbar;
```

As you can see in the above code block I'm using `useNavigate` hook from `react-router-dom` to navigate. I'm trying to make this as dynamic as possible.

**Step 2 :**
Let's consume this `SideNavbar`. I'll render this component on `App.tsx`.

```typescript
import routes from "./lib/data";

function App() {
	return (
		<>
			<div>
				<SideNavbar items={routes} />
			</div>
		</>
	);
}
export default App;
```

As you can see I'm renering this component and passing a prop as it was expecting.

**Step 3 :**
Let's take a look at the props I'm passing to this `SideNavbar` component.

```typescript
const routes = [
	{
		text: "Home",
		icon: "home",
		path: "/home",
		subItems: [
			{
				icon: "subicon1",
				text: "Subitem 1 for Home",
				path: "/subitem1",
			},
			{
				icon: "subicon2",
				text: "Subitem 2 for Home",
				path: "/subitem2",
			},
		],
	},
	{
		text: "People",
		icon: "group",
		path: "/people",
		subItems: [
			{
				icon: "subicon",
				text: "Subitem for People",
				path: "/SubitemPeople",
			},
		],
	},
	{
		text: "Location",
		icon: "locate-me",
		path: "/location",
	},
];

export default routes;
```

**Step 4 :**
Now let's expose this `SideNavbar` component

```typescript
			exposes: {
				"./SideNavbar": "./src/components/SideNavbar",
			},
```

<h3 style="text-decoration:underline">Let's take a look at the host</h3>

**Step 5 :**
After the necessary configuration, let's consume the `SideNavbar` on the host.

```typescript
import { lazy } from "react";

import sideItems from "./lib/data";
import ErrorBoundary from "./components/ErrorBoundary";

const CustomSideNav = lazy(() => import("ui5Remote/SideNavbar"));

function App() {
	return (
		<>
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
		</>
	);
}
```

**Step 6 :**
To modify the `SideNavbar` as per our requirement all we have to do is modify the props. Let's see how do we modify it.

```typescript
const sideItems = [
	{
		text: "Something",
		icon: "Something",
		path: "/something",
		subItems: [
			{
				icon: "subicon1",
				text: "Subitem 1 for Something",
				path: "/subitem1",
			},
			{
				icon: "subicon2",
				text: "Subitem 2 for Something",
				path: "/subitem2",
			},
			{
				icon: "subicon3",
				text: "Subitem 3 for Something",
				path: "/subitem3",
			},
		],
	},
	{
		text: "Something Else",
		icon: "somethingelse",
		path: "/somethingelse",
		subItems: [
			{
				icon: "subicon",
				text: "Subitem for Something Else",
				path: "/subitemforSomethingelse",
			},
		],
	},
	{
		text: "Other Things",
		icon: "otherthing",
		path: "/otherthing",
	},
];

export default sideItems;
```

**NOTE : To make this component work you need to wrap you `host` as well as `remote` app in `BrowserRouter` that comes from `react-router-dom` and also add `react-router-dom` in shared in the `vite.config.ts`.**

### Enjoy the Module Federation with UI5

If you find this helpfull you can give me a :star: star.
