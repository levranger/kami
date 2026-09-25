const fs = require("fs");

const [, , inputPath, outputPath, oldName, newName] = process.argv;

let src = fs.readFileSync(inputPath, "utf8");

// Drop the Meta export block entirely.
src = src.replace(/export const \w+Meta = \{[\s\S]*?\};\n\n/, "");

// Rename the body export.
src = src.replace(new RegExp(`export const ${oldName}\\b`, "g"), `export const ${newName}`);

fs.writeFileSync(outputPath, src, "utf8");
console.log(`Wrote ${outputPath}`);
