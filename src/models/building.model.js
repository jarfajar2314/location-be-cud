module.exports = (mongoose) => {
	const Building = mongoose.model(
		"buildings",
		mongoose.Schema(
			{
				name: String,
				site: String,
			},
			{ timestamps: true }
		)
	);

	return Building;
};
