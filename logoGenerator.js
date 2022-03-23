const text = "M";
const logoSize = 256;
const fontSize = 200;
const backgroundColor = "transparent";
const simpleBackground = false;
const logoColor = "#000000";
const shadowOpacity = 0.6;
const rightColor = `rgba(0, 184, 255, ${shadowOpacity})`;
const leftColor = `rgba(214, 0, 255, ${shadowOpacity})`;
const xShadowOffset = 4;
const yShadowOffset = 3;

// This can be customized to accomplish a wide variety of effects.
// This example creates a gradient inverse of the direction of the
// shadow colors.
const drawComplexBackground = (ctx) => {
	const gradient = ctx.createLinearGradient(0, 0, logoSize, logoSize);
	gradient.addColorStop(0, rightColor);
	gradient.addColorStop(1, leftColor);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, logoSize, logoSize);
};

/** Draws a centered horizontal line indicating the center of the canvas */
const showVerticalCenter = (ctx) => {
	ctx.strokeStyle = "red";
	ctx.moveTo(5, logoSize / 2);
	ctx.lineTo(logoSize - 5, logoSize / 2);
	ctx.stroke();
}

// https://stackoverflow.com/a/36248266/6456163
const renderLogoInFont = (fontName, fontPath, yOffset = 0) => {
	const logoFont = new FontFace(fontName, `url(${fontPath})`);
	logoFont.load().then((font) => {
		document.fonts.add(font);

		// Create the necessary elements
		const logoDiv = document.createElement("div");
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		// https://stackoverflow.com/a/39181687/6456163
		canvas.width = logoSize;
		canvas.height = logoSize;

		// Draw the background
		if (simpleBackground) {
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, logoSize, logoSize);
		} else {
			// Need the white background so the saved image isn't
			// darker than the preview.
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, logoSize, logoSize);
			drawComplexBackground(ctx);
		}

		// Uncomment to debug vertical position
		// showVerticalCenter(ctx);

		// Define the position at which the text will be drawn.
		// Note that this will not be perfect for every letter, as some fonts
		// have characters of varying widths and heights. Pass an offset
		// parameter to adjust for this as necessary.
		ctx.textBaseline = "middle";
		const xPos = canvas.width / 2;
		const yPos = canvas.height / 2 + yOffset;

		// Draw the text in the specified color and font
		ctx.font = `${fontSize}px ${fontName}`;
		ctx.fillStyle = logoColor;
		ctx.textAlign = "center";
		ctx.fillText(text, xPos, yPos);

		// Uncomment if you want rounded blurs instead of sharp edges
		// ctx.shadowBlur = 4;

		// Draw southeast shadow
		ctx.shadowOffsetX = xShadowOffset;
		ctx.shadowOffsetY = yShadowOffset;
		ctx.shadowColor = rightColor;
		ctx.fillText(text, xPos, yPos);

		// Draw northwest shadow
		ctx.shadowOffsetX = -xShadowOffset;
		ctx.shadowOffsetY = -yShadowOffset;
		ctx.shadowColor = leftColor;
		ctx.fillText(text, xPos, yPos);

		// Display the font name in text so the user can see what font is being used
		const displayedLogoName = document.createElement("p");
		displayedLogoName.innerText = fontName;

		// Add the canvas to the page
		logoDiv.appendChild(canvas);
		logoDiv.appendChild(displayedLogoName);
		document.body.appendChild(logoDiv);
	});
}

const fontsToRender = [
	[ "Adoria", "./fonts/Adoria.ttf", 15 ],
	[ "Avalon", "./fonts/Avalon.woff2" ],
	[ "Beach Boy", "./fonts/BeachBoy.otf" ],
	[ "Bios Bold", "./fonts/Bios-Bold.otf", -5 ],
	[ "Bios Regular", "./fonts/Bios-Regular.otf" ],

	[ "Broken Console Bold Shadow", "./fonts/Broken-Console-Bold-Shadow.ttf", 10 ],
	[ "Broken Console Bold", "./fonts/Broken-Console-Bold.ttf", 30 ],
	[ "Broken Console", "./fonts/Broken-Console.ttf", 30 ],
	[ "Claudilla", "./fonts/Claudilla.ttf", 10 ],
	[ "Dirtchunk", "./fonts/Dirtchunk.otf", 15 ],

	[ "Enigmatica", "./fonts/Enigmatica.otf", 30 ],
	[ "Flare", "./fonts/Flare.ttf", 25 ],
	[ "Gluon", "./fonts/Gluon.ttf", -30 ],
	[ "Hermes", "./fonts/Hermes.otf", -25 ],
	[ "Hotliner Second", "./fonts/Hotliner-Second.otf" ],

	[ "Hotliner Third", "./fonts/Hotliner-Third.otf" ],
	[ "Hotliner", "./fonts/Hotliner.otf" ],
	[ "HotRush Sans", "./fonts/HotRush-Sans.ttf", 20 ],
	[ "HotRush Sans Italic", "./fonts/HotRush-SansItalic.ttf", 20 ],
	[ "HotRush Sans Striped", "./fonts/HotRush-SansStriped.ttf", 20 ],

	[ "HotRush Sans Striped Italic", "./fonts/HotRush-SansStripedItalic.ttf", 20 ],
	[ "HotRush Script", "./fonts/HotRush-Script.otf", 10 ],
	[ "Hyperbole", "./fonts/Hyperbole.ttf", -10 ],
	[ "Kogapunk", "./fonts/Kogapunk.otf", 35 ],
	[ "Lagoon Beach Italic", "./fonts/LagoonBeach-Italic.otf" ],

	[ "Lagoon Beach", "./fonts/LagoonBeach.otf", 15 ],
	[ "Mokoto Glitch", "./fonts/Mokoto-Glitch.ttf", 30 ],
	[ "Mokoto Mark", "./fonts/Mokoto-Mark.ttf", 30 ],
	[ "Mokoto Outline", "./fonts/Mokoto-Outline.otf", 30 ],
	[ "Oxta", "./fonts/Oxta.otf", 15 ],

	[ "Raskhal", "./fonts/Raskhal.otf" ],
	[ "Researcher Thin", "./fonts/Researcher-Thin.ttf" ],
	[ "Researcher", "./fonts/Researcher.ttf", 10 ],
	[ "Starlit Drive", "./fonts/StarlitDrive.ttf", 15 ],
	[ "Tigerious", "./fonts/Tigerious.otf", 10 ],

	[ "Vandals", "./fonts/Vandals.ttf" ],
	[ "ZORFICH", "./fonts/ZORFICH.otf", 15 ],
];

fontsToRender.forEach((params) => renderLogoInFont(...params));