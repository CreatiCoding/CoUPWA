//웹툰정보
module.exports = function ToonInfo(
	toon_info_idx,
	toon_info_name,
	toon_info_author,
	toon_info_star,
	toon_info_update,
	toon_info_update_at
) {
	this.toon_info_idx = toon_info_idx;
	this.toon_info_name = toon_info_name;
	this.toon_info_author = toon_info_author;
	this.toon_info_star = toon_info_star;
	this.toon_info_update = toon_info_update;
	this.toon_info_update_at = toon_info_update_at;
};
