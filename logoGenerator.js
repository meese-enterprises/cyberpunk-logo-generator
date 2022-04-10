const backgroundColor = "transparent";
const simpleBackground = false;
const shadowOpacity = 0.6;
const xShadowOffset = 4;
const yShadowOffset = 3;
const logoContainer = document.getElementById("logo-container");

/**
 * Helper function to convert a hexadecimal color to RGBA format.
 * @link https://stackoverflow.com/a/28056903/6456163
 * @param {String} hex
 * @param {Number} opacity
 * @returns {String}
 */
function hexToRGB(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16),
	      g = parseInt(hex.slice(3, 5), 16),
	      b = parseInt(hex.slice(5, 7), 16);

	return alpha
		? `rgba(${r}, ${g}, ${b}, ${alpha})`
		: `rgb(${r}, ${g}, ${b})`;
}

/**
 * This can be customized to accomplish a wide variety of effects.
 * This example creates a gradient inverse of the direction of the
 * shadow colors.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} size
 */
const drawComplexBackground = (ctx, size) => {
	const rightColor = document.getElementById("colorTwo").value;
	const leftColor = document.getElementById("colorOne").value;
	const rightColorRGBA = hexToRGB(rightColor, shadowOpacity);
	const leftColorRGBA = hexToRGB(leftColor, shadowOpacity);

	const gradient = ctx.createLinearGradient(0, 0, size, size);
	gradient.addColorStop(0, rightColorRGBA);
	gradient.addColorStop(1, leftColorRGBA);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size, size);
};

/** Draws a centered horizontal line indicating the center of the canvas. */
const showVerticalCenter = (ctx, size) => {
	ctx.strokeStyle = "red";
	ctx.moveTo(5, size / 2);
	ctx.lineTo(size - 5, size / 2);
	ctx.stroke();
};

/**
 * Creates a preview of the logo and adds it to the DOM.
 * @param {String} fontName
 * @param {String} fontPath
 * @param {Number} yOffset
 */
const createLogoElement = async (
	fontName,
	fontPath,
	yOffset = 0,
) => {
	const font = await createFont(fontName, fontPath);
	const size = document.getElementById("previewSize").value;
	const logo = await createLogoCanvas({ fontName, size, yOffset });

	const logoDiv = document.createElement("div");
	logoDiv.className = "logoDiv";

	// TODO: Better way of centering this without overflowing
	const download = document.createElement("button");
	download.innerHTML= `<span>Download '${fontName}'</span>`;
	download.onclick = () => downloadLogo(fontName, yOffset);

	logoDiv.appendChild(logo);
	logoDiv.appendChild(download);

	logoContainer.appendChild(logoDiv);
};

/**
 * Creates a font with the specified name and path,
 * and adds the font to the document so it can be used.
 * @param {String} fontName
 * @param {String} fontPath
 * @returns {FontFace}
 */
const createFont = async (fontName, fontPath) => {
	const logoFont = new FontFace(fontName, `url(${fontPath})`);
	await logoFont.load();

	document.fonts.add(logoFont);
	return logoFont;
};

/**
 * Creates a canvas element based on the specified parameters.
 * @returns {HTMLCanvasElement}
 */
const createLogoCanvas = async ({
	fontName,
	size,
	yOffset,
	hidden,
	letterSize,
	text,
	letterColor,
	leftColor,
	rightColor,
}) => {
	if (!size) size = document.getElementById("previewSize").value || 256;
	if (!letterSize) letterSize = document.getElementById("fontSize").value || 90;
	if (!text) text = document.getElementById("logoText").value || "M";
	if (!letterColor) letterColor = document.getElementById("letterColor").value;
	if (!leftColor) leftColor = document.getElementById("colorOne").value;
	if (!rightColor) rightColor = document.getElementById("colorTwo").value;

	// Convert the right and left hex colors to RGBA
	const rightColorRGBA = hexToRGB(rightColor, shadowOpacity);
	const leftColorRGBA = hexToRGB(leftColor, shadowOpacity);

	// Create the necessary elements
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.className = hidden ? "hiddenCanvas" : "visibleCanvas";
	canvas.id = fontName;
	canvas.dataset.yOffset = yOffset;

	// Converts yOffset from a percentage to a pixel value
	const yOffsetPixels = yOffset * size / 100;

	// https://stackoverflow.com/a/39181687/6456163
	canvas.width = size;
	canvas.height = size;

	// Draw the background
	if (simpleBackground) {
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, size, size);
	} else {
		// Need the white background so the saved image isn't
		// darker than the preview.
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, size, size);
		drawComplexBackground(ctx, size);
	}

	// Uncomment to debug vertical position
	// showVerticalCenter(ctx, size);

	// Define the position at which the text will be drawn.
	// Note that this will not be perfect for every letter, as some fonts
	// have characters of varying widths and heights. Pass an offset
	// parameter to adjust for this as necessary.
	ctx.textBaseline = "middle";
	const xPos = canvas.width / 2;
	const yPos = canvas.height / 2 + yOffsetPixels;

	// Draw the text in the specified color and font
	const fontSize = letterSize / 100 * size;
	ctx.font = `${fontSize}px ${fontName}`;
	ctx.fillStyle = letterColor;
	ctx.textAlign = "center";
	ctx.fillText(text, xPos, yPos);

	// TODO: Option to change this
	// Uncomment if you want rounded blurs instead of sharp edges
	// ctx.shadowBlur = 4;

	// Draw southeast shadow
	ctx.shadowOffsetX = xShadowOffset;
	ctx.shadowOffsetY = yShadowOffset;
	ctx.shadowColor = rightColorRGBA;
	ctx.fillText(text, xPos, yPos);

	// Draw northwest shadow
	ctx.shadowOffsetX = -xShadowOffset;
	ctx.shadowOffsetY = -yShadowOffset;
	ctx.shadowColor = leftColorRGBA;
	ctx.fillText(text, xPos, yPos);

	return canvas;
};

/**
 * Downloads the specified logo as a PNG image.
 * @param {String} fontName
 */
const downloadLogo = async (fontName, yOffset) => {
	const downloadSize = document.getElementById("downloadSize").value;
	const fullSizeLogo = await createLogoCanvas({
		fontName,
		size: downloadSize,
		yOffset,
		hidden: true
	});

	const text = document.getElementById("logoText").value || "M";
	const link = document.createElement("a");
	link.download = `${fontName}_${text}_logo.png`;
	link.href = fullSizeLogo.toDataURL("image/png");
	link.click();
};

// You can change the % offset of each font as necessary to achieve your
// desired look for your character(s) of choice.
const fontsToRender = [
	[ "Adoria", "./fonts/Adoria.ttf", 10 ],
	[ "Avalon", "./fonts/Avalon.woff2" ],
	[ "Beach Boy", "./fonts/BeachBoy.otf" ],
	[ "Bios Bold", "./fonts/Bios-Bold.otf" ],
	[ "Bios Regular", "./fonts/Bios-Regular.otf" ],

	[ "Broken Console Bold", "./fonts/Broken-Console-Bold.ttf", 15 ],
	[ "Broken Console", "./fonts/Broken-Console.ttf", 15 ],
	[ "Claudilla", "./fonts/Claudilla.ttf", 5 ],
	[ "Dirtchunk", "./fonts/Dirtchunk.otf", 7.5 ],
	[ "Enigmatica", "./fonts/Enigmatica.otf", 10 ],

	[ "Flare", "./fonts/Flare.ttf", 10 ],
	[ "Gluon", "./fonts/Gluon.ttf", -15 ],
	[ "Hermes", "./fonts/Hermes.otf", -15 ],
	[ "Hotliner Second", "./fonts/Hotliner-Second.otf" ],
	[ "Hotliner Third", "./fonts/Hotliner-Third.otf" ],

	[ "Hotliner", "./fonts/Hotliner.otf" ],
	[ "HotRush Sans", "./fonts/HotRush-Sans.ttf", 10 ],
	[ "HotRush Sans Italic", "./fonts/HotRush-SansItalic.ttf", 10 ],
	[ "HotRush Sans Striped", "./fonts/HotRush-SansStriped.ttf", 10 ],
	[ "HotRush Sans Striped Italic", "./fonts/HotRush-SansStripedItalic.ttf", 10 ],

	[ "HotRush Script", "./fonts/HotRush-Script.otf" ],
	[ "Hyperbole", "./fonts/Hyperbole.ttf", -5 ],
	[ "Kogapunk", "./fonts/Kogapunk.otf", 15 ],
	[ "Lagoon Beach Italic", "./fonts/LagoonBeach-Italic.otf", 5 ],
	[ "Lagoon Beach", "./fonts/LagoonBeach.otf", 5 ],

	[ "Mokoto Glitch", "./fonts/Mokoto-Glitch.ttf", 15 ],
	[ "Mokoto Mark", "./fonts/Mokoto-Mark.ttf", 15 ],
	[ "Mokoto Outline", "./fonts/Mokoto-Outline.otf", 15 ],
	[ "Oxta", "./fonts/Oxta.otf", 5 ],
	[ "Raskhal", "./fonts/Raskhal.otf" ],

	[ "Researcher Thin", "./fonts/Researcher-Thin.ttf", 5 ],
	[ "Researcher", "./fonts/Researcher.ttf", 5 ],
	[ "Starlit Drive", "./fonts/StarlitDrive.ttf" ],
	[ "Tigerious", "./fonts/Tigerious.otf" ],
	[ "Vandals", "./fonts/Vandals.ttf" ],

	[ "ZORFICH", "./fonts/ZORFICH.otf", 5 ],
];

fontsToRender.forEach((params) => createLogoElement(...params));
