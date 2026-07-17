import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

// Renders full CommonMark (bold, italic, links, lists, etc.) since the
// article body is static/trusted content baked into the app — if this ever
// comes from user-submitted markdown, sanitize the output (e.g. DOMPurify)
// before using dangerouslySetInnerHTML.
export const renderArticleMarkdown = (markdown: string) => md.render(markdown);
