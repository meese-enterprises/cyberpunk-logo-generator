const updatePreviewSize = (size) => {
	// TODO: Fix this to work how I want it to
	const logoDivs = document.querySelectorAll(".logoDiv");
	console.log("logoDivs", logoDivs);
	logoDivs.forEach((logoDiv) => {
		console.log("logoDiv", logoDiv);
		logoDiv.maxWidth = size + "px";
	});

	const visibleCanvases = document.querySelectorAll(".visibleCanvas");
	visibleCanvases.forEach(async (canvas) => {
		const logo = await createLogoCanvas({
			fontName: canvas.id,
			yOffset: canvas.dataset.yOffset,
			size
		});
		canvas.replaceWith(logo);
	});
};

const updateDownloadSize = (size) => {
	const hiddenCanvases = document.querySelectorAll(".hiddenCanvas");
	hiddenCanvases.forEach((canvas) => {
		canvas.width = size + "px";
		canvas.height = size + "px";
	});
};

const updateFontSize = (size) => {
	const allCanvases = document.querySelectorAll("canvas");
	allCanvases.forEach(async (canvas) => {
		const logo = await createLogoCanvas({
			fontName: canvas.id,
			yOffset: canvas.dataset.yOffset,
			letterSize: size
		});
		canvas.replaceWith(logo);
	});
};

const updateLogoText = (text) => {
	const allCanvases = document.querySelectorAll("canvas");
	allCanvases.forEach(async (canvas) => {
		const logo = await createLogoCanvas({
			fontName: canvas.id,
			yOffset: canvas.dataset.yOffset,
			text
		});
		canvas.replaceWith(logo);
	});
};

const updateLetterColor = (color) => {
	const allCanvases = document.querySelectorAll("canvas");
	allCanvases.forEach(async (canvas) => {
		const logo = await createLogoCanvas({
			fontName: canvas.id,
			yOffset: canvas.dataset.yOffset,
			letterColor: color
		});
		canvas.replaceWith(logo);
	});
};

const updateColorOne = (color) => {
	const allCanvases = document.querySelectorAll("canvas");
	allCanvases.forEach(async (canvas) => {
		const logo = await createLogoCanvas({
			fontName: canvas.id,
			yOffset: canvas.dataset.yOffset,
			leftColor: color
		});
		canvas.replaceWith(logo);
	});
};

const updateColorTwo = (color) => {
	const allCanvases = document.querySelectorAll("canvas");
	allCanvases.forEach(async (canvas) => {
		const logo = await createLogoCanvas({
			fontName: canvas.id,
			yOffset: canvas.dataset.yOffset,
			rightColor: color
		});
		canvas.replaceWith(logo);
	});
};
