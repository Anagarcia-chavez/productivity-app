export function getBackground(pageKey) {
  return localStorage.getItem(`bg_${pageKey}`) || null;
}

export function setBackground(pageKey, dataUrl) {
  localStorage.setItem(`bg_${pageKey}`, dataUrl);
}