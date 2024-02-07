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
