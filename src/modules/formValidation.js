const validateForm = function (form) {
	for (let i = 0; i < form.length; i++) {
		const element = form[i];

		if (element.tagName !== "INPUT") {
			continue;
		}

		if (element.value.trim() === "") {
			alert("Please fill in blank inputs");

			return false;
		}
	}

	return true;
};

export default validateForm;
