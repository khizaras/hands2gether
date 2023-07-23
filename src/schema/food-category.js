[
	{
		name: "title",
		placeholder: "Enter Title",
		label: "Title",
		type: "text",
		required: true,
	},
	{
		name: "description",
		placeholder: "Enter Description",
		label: "Description",
		type: "textarea",
		required: true,
	},
	{
		options: [
			{
				label: "Wanted",
				value: "wanted",
			},
			{
				label: "Ready to Offer",
				value: "available",
			},
		],
		name: "type",
		placeholder: "Select Listings Type",
		label: "Listings Type",
		type: "select",
		required: true,
	},
	{
		filter: true,
		options: [
			{
				label: "Veg",
				value: "veg",
			},
			{
				label: "Non-Veg",
				value: "non-veg",
			},
			{
				label: "Both",
				value: "both",
			},
		],
		name: "foodType",
		placeholder: "Select Food Type",
		label: "Food Type",
		type: "select",
		required: true,
	},
	{
		filter: true,
		name: "quantity",
		placeholder: "Enter Quantity",
		label: "Quantity",
		type: "number",
		required: true,
	},
	{
		name: "pickupInstruction",
		placeholder: "Enter Pickup Instruction",
		label: "Pickup Instruction",
		type: "text",
		required: true,
	},
	{
		name: "contactPerson",
		placeholder: "Enter Contact Person",
		label: "Contact Person",
		type: "text",
		required: true,
	},
	{
		name: "contactNumber",
		placeholder: "Enter Contact Number",
		label: "Contact Number",
		type: "number",
		required: true,
	},
	{
		name: "contactEmail",
		placeholder: "Enter Contact Email",
		label: "Contact Email",
		type: "email",
		required: true,
	},
	{
		name: "foodImage",
		placeholder: "Upload Food Image",
		label: "Food Image",
		type: "file",
		required: true,
	},
];
