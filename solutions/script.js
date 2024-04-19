// Get the current file name
function getCurrentDay() {
	const currentUrl = window.location.href;
	const currentDay = currentUrl.split("/")[currentUrl.split("/").length - 2];
	return currentDay.replace("day", "");
}

// Navigate to the previous or next day
function navigateTo(direction) {
	const currentDay = parseInt(getCurrentDay());
	let newDay;
    
	if (direction === "prev") {
        newDay = currentDay - 1;
	} else {
        newDay = currentDay + 1;
	}

	if (newDay >= 1 && newDay <= 25) {
		let newUrl = window.location.href.replace(/day\d+/, `day${newDay}`);

		window.location.href = newUrl;
	} else {
		alert(
			`You are already at the ${
				direction === "prev" ? "first" : "last"
			} day.`
		);
	}
}
