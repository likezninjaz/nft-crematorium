function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return fallbackCopyTextToClipboard(text);
};
