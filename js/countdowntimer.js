const countDown = () => {
  const now = new Date();
  let tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  // Find the distance between now and the count down date
  const distance = tomorrow.getTime() - now.getTime();

  // Time calculations hours, minutes and seconds
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector("#nextwordTimer").innerHTML = `${("0" + hours).slice(
    -2
  )}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(countDown);
  }
};

export { countDown };
