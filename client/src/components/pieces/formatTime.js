
function FormatTime(timeString) {
  const date = new Date(`2023-05-01T${timeString}`);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}
export default FormatTime