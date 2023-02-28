module.exports = (mongoose) => {
	const Floor = mongoose.model(
		"floors",
		mongoose.Schema(
			{
				name: String,
				site: String,
				building: String,
			},
			{ timestamps: true }
		)
	);

	return Floor;
};
