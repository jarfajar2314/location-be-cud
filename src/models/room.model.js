module.exports = (mongoose) => {
	const Room = mongoose.model(
		"rooms",
		mongoose.Schema(
			{
				name: String,
				site: String,
				building: String,
				floor: String,
			},
			{ timestamps: true }
		)
	);

	return Room;
};
