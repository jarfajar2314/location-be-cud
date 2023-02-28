module.exports = (mongoose) => {
	const Site = mongoose.model(
		"sites",
		mongoose.Schema(
			{
				name: String,
			},
			{ timestamps: true }
		)
	);

	return Site;
};
