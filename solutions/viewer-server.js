const path = require("path");
const { position, find, write } = require("promise-path");
const fromHere = position(__dirname);
const report = (...messages) =>
	console.log(
		`[${require(fromHere("../package.json")).logName} / ${__filename
			.split(path.sep)
			.pop()
			.split(".js")
			.shift()}]`,
		...messages
	);

const currentPath = fromHere("/");
const currentFolder = currentPath.split("/").reverse()[2];
const currentYear = currentFolder.slice(-4);
const packageData = require("../package.json");

async function generateIndexHTML() {
	const title = packageData.logName;
	const solutions = await find(fromHere("/*"));
	const links = solutions
		.filter((n) => n.indexOf("day") > -1)
		.sort((a, b) => {
			const numA = /\/day(\d*)$/.exec(a)[1];
			const numB = /\/day(\d*)$/.exec(b)[1];
			return numA - numB;
		})
		.map((solution) => {
			const folder = solution.substr(fromHere("../").length);
			return `      <li><a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/${folder}/viewer.html">${
				folder.split("/")[1]
			}</a></li>`;
		});

	const html = `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <style> 
		html, body { font-family: verdana; }
		hr {border: 1px dashed black;}
		a {text-decoration: none; color: black;}
		a:visited {color: black;}	
		a.days {text-transform: capitalize; color:darkolivegreen}
		a.days:visited {color: darkolivegreen;}	
		a:hover {text-decoration: underline;}
		i {font-size: x-small;}
	</style>
  </head>
  <body>
    <h1>${title}</h1>
	<p>By <a href="https://github.com/sergiorgiraldo/">sergiorgiraldo</a></p>
	<hr />
    <ul>
${links.join("\n")}
    </ul>
	<hr />
		<h2>Libs</h2>
		<ul>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers.js">
					Helpers
				</a>
			</li>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers/arrays.js">
					Arrays
				</a>
			</li>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers/dates.js">
					Dates
				</a>
			</li>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers/math.js">
					Math
				</a>
			</li>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers/objects.js">
					Objects
				</a>
			</li>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers/processes.js">
					Processes
				</a>
			</li>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers/strings.js">
					Strings
				</a>
			</li>
			<li>
				<a class="days" href="https://sergiorgiraldo.github.io/AdventOfCode${currentYear}/solutions/lib/helpers/structures.js">
					Structures
				</a>
			</li>
		</ul>		
	<hr />
	<i>Generated on ${new Date().toUTCString()}</i>
  </body>
</html>
  `;

	report("Updated hard coded index:", fromHere("index.html"));
	await write(fromHere("index.html"), html, "utf8");

	return html;
}

generateIndexHTML();