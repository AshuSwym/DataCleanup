function formatNumber(num) {
	if (num >= 1_000_000_000) {
		return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B"; // Billions
	} else if (num >= 1_000_000) {
		return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M"; // Millions
	} else if (num >= 1_000) {
		return (num / 1_000).toFixed(2).replace(/\.00$/, "") + "K"; // Thousands
	} else {
		return num.toFixed(2).replace(/\.00$/, ""); // Less than 1,000
	}
}

module.exports = {formatNumber};