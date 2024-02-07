export function truncateText(text) {
  let maxChars = 20;

  if (!text || text.length <= 0) {
    return text;
  }

  if (window.screen.width > 1440) {
    maxChars = 30;
  } else if (window.screen.width < 375) {
    maxChars = 10;
  }

  if (text.length > maxChars) {
    text = text.slice(0, maxChars) + '...';
  }

  return capitalizeFirstLetter(text);
}

export function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
