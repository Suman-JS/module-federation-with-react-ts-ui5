const sideItems = [
	{
		text: "Something",
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
			{
				icon: "subicon3",
				text: "Subitem 3 for Home",
				path: "/subitem3",
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

export default sideItems;
