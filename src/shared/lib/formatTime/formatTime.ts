export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let result = '';
  if (hours > 0) {
    result += hours === 1 ? '1 ч' : `${hours} ч`;
  }
  if (remainingMinutes > 0) {
    if (result !== '') {
      result += ' ';
    }
    result += remainingMinutes === 1 ? '1 мин' : `${remainingMinutes} мин`;
  }

  return result;
}