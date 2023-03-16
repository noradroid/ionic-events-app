export const truncateWithEllipse = (
  text: string | null | undefined,
  length: number
): string => {
  if (!text) {
    return 'null';
  }
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
};
