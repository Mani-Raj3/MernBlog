export const stripHtml = (html) => {
  if (!html) return "";

  const div = document.createElement("div");
  div.innerHTML = html;

  return (div.textContent || div.innerText || "").trim();
};

export const limitWords = (text, wordLimit = 100) => {
  if (!text) return "";

  const words = text.trim().split(/\s+/);

  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text.trim();
};

export const stripHtmlAndLimit = (html, wordLimit = 100) => {
  if (!html) return "";

  const div = document.createElement("div");
  div.innerHTML = html;

  const text = (div.textContent || div.innerText || "").trim();

  const words = text.split(/\s+/);

  if (words.length <= wordLimit) {
    return text;
  }

  return words.slice(0, wordLimit).join(" ") + "...";
};