export const stripHtml = (html = "") => {
  return html.replace(/<[^>]*>/g, "");
};