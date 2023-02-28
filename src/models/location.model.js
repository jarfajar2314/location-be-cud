module.exports = (mongoose) => {
	const Location = mongoose.model(
		"locations",
		mongoose.Schema(
			{
				site: String,
				building: String,
				room: String,
				floor: String,
			},
			{ timestamps: true }
		)
	);

	return Location;
};
