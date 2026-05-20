const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const inputPath = process.argv[2];
const rawExportName = process.argv[3] || "articleBody";

if (!inputPath) {
  console.error("Usage: node scripts/docx-to-tsx.js input.docx exportName");
  process.exit(1);
}

const SITE_URL = "https://kamiaesthetics.com";

const exportName = rawExportName
  .replace(/\.tsx$/, "")
  .replace(/[^a-zA-Z0-9_$]/g, "");

const outputPath = path.join(process.cwd(), `${exportName}.tsx`);

function escapeJsxText(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;");
}

function normalizeHref(href) {
  if (!href) return href;

  if (href.startsWith(SITE_URL)) {
    const relative = href.replace(SITE_URL, "");
    return relative || "/";
  }

  return href;
}

function isInternalLink(href) {
  return href === "/" || href.startsWith("/");
}

function cleanInlineHtml(html) {
  return html
    // Remove Google Docs / Word invisible anchors
    .replace(/<a id="[^"]*"><\/a>/g, "")

    // Remove strong inside headings or normal text if needed
    .replace(/<strong>(.*?)<\/strong>/g, "$1")

    // Clean empty spaces
    .replace(/\s+/g, " ")
    .trim();
}

function convertLinks(html) {
  return html.replace(
    /<a href="([^"]+)"(?: target="[^"]*")?(?: rel="[^"]*")?>([\s\S]*?)<\/a>/g,
    (_, rawHref, rawText) => {
      const href = normalizeHref(rawHref.trim());
      const text = cleanInlineHtml(rawText.trim());

      if (isInternalLink(href)) {
        return `<Link href="${href}" className="text-gold hover:text-gold-dark transition-colors">${text}</Link>`;
      }

      return `<a href="${href}" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">${text}</a>`;
    }
  );
}

function cleanContent(html) {
  return convertLinks(cleanInlineHtml(html));
}

function extractInner(block, tag) {
  return block
    .replace(new RegExp(`^<${tag}>`, "i"), "")
    .replace(new RegExp(`</${tag}>$`, "i"), "")
    .trim();
}

function isMetaParagraph(content) {
  const normalized = content.toLowerCase();
  return (
    normalized.startsWith("meta title:") ||
    normalized.startsWith("meta description:")
  );
}

async function main() {
  const result = await mammoth.convertToHtml(
    { path: inputPath },
    {
      styleMap: [
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
      ],
    }
  );

  let html = result.value;

  html = html
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/\n+/g, "\n");

  const blocks = html
    .split(/(?=<h1>|<h2>|<h3>|<p>|<ul>|<ol>)/g)
    .map((block) => block.trim())
    .filter(Boolean);

  const jsxBlocks = [];
  let metaTitle = "";
  let metaDescription = "";

  for (const block of blocks) {
    if (block.startsWith("<h1>")) {
      // Usually skip h1 because blog title should come from page metadata.
      continue;
    }

    if (block.startsWith("<h2>")) {
      const content = cleanContent(extractInner(block, "h2"));
      if (content) jsxBlocks.push(`    <h2>${content}</h2>`);
      continue;
    }

    if (block.startsWith("<h3>")) {
      const content = cleanContent(extractInner(block, "h3"));
      if (content) jsxBlocks.push(`    <h3>${content}</h3>`);
      continue;
    }

    if (block.startsWith("<p>")) {
      let content = cleanContent(extractInner(block, "p"));

      content = content
        .replace(/^Meta Title:\s*/i, "Meta Title: ")
        .replace(/^Meta Description:\s*/i, "Meta Description: ");

      if (!content) continue;

      if (content.toLowerCase().startsWith("meta title:")) {
        metaTitle = content.replace(/^Meta Title:\s*/i, "").trim();
        continue;
      }

      if (content.toLowerCase().startsWith("meta description:")) {
        metaDescription = content.replace(/^Meta Description:\s*/i, "").trim();
        continue;
      }

      jsxBlocks.push(`    <p>\n      ${content}\n    </p>`);
      continue;
    }

    if (block.startsWith("<ul>") || block.startsWith("<ol>")) {
      const convertedList = cleanContent(block)
        .replace(/<li>/g, "<li>")
        .replace(/<\/li>/g, "</li>");

      jsxBlocks.push(`    ${convertedList}`);
      continue;
    }
  }

  const usesLink = jsxBlocks.some((block) => block.includes("<Link "));

  const output = `${usesLink ? `import Link from "next/link";\n\n` : ""}export const ${exportName}Meta = {
  title: "${metaTitle || ""}",
  description: "${metaDescription || ""}",
};

export const ${exportName} = (
  <>
${jsxBlocks.join("\n\n")}
  </>
);
`;

  fs.writeFileSync(outputPath, output, "utf8");

  console.log(`Generated: ${outputPath}`);

  if (result.messages.length) {
    console.warn("Mammoth warnings:");
    console.warn(result.messages);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});