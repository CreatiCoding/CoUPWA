//웹툰 내용
module.exports = function Image(
	image_idx,
	image_type,
	image_create_at,
	options
) {
	this.image_idx = image_idx;
	this.image_type = image_type;
	this.image_create_at = image_create_at;
	this.image_delete_at = undefined;
	this.options = options;
};
