const fs = require("fs");

const inputPath = process.argv[2];
const src = fs.readFileSync(inputPath, "utf8");

// Find the FAQ heading block: <h2>...FAQs</h2>
const faqHeadingMatch = src.match(/\n\s*<h2>[^<]*FAQs<\/h2>\n/);
if (!faqHeadingMatch) {
  console.error("No FAQ heading found in", inputPath);
  process.exit(1);
}

const faqStart = faqHeadingMatch.index;
const bodyPart = src.slice(0, faqStart);
const faqPart = src.slice(faqStart);

// Extract h3/p pairs from faqPart
const qaRegex = /<h3>([\s\S]*?)<\/h3>\s*<p>\s*([\s\S]*?)\s*<\/p>/g;
const faqs = [];
let m;
while ((m = qaRegex.exec(faqPart))) {
  const question = m[1].trim();
  const answer = m[2].replace(/\s+/g, " ").trim();
  faqs.push({ question, answer });
}

// Close off the body part properly
let cleanedBody = bodyPart.replace(/\n+$/, "") + "\n  </>\n);\n";

fs.writeFileSync(inputPath.replace(/\.tsx$/, ".body.tsx"), cleanedBody, "utf8");
fs.writeFileSync(
  inputPath.replace(/\.tsx$/, ".faq.json"),
  JSON.stringify(faqs, null, 2),
  "utf8"
);

console.log(`Extracted ${faqs.length} FAQs from ${inputPath}`);
