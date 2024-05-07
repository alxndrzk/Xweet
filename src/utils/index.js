function postedAt(date) {
  const currentTime = new Date();
  const postedTime = new Date(date);
  const timeDifference = currentTime - postedTime;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (daysDifference > 0) {
    return `${daysDifference} days ago`;
  }
  if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`;
  }
  if (minutesDifference > 0) {
    return `${minutesDifference} minutes ago`;
  }
  if (secondsDifference > 0) {
    return `${secondsDifference} seconds ago`;
  }
  return 'just now';
}

export { postedAt };
