const clock = document.querySelector("[data-local-clock]");

if (clock) {
  const updateClock = () => {
    clock.textContent = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  };

  updateClock();
  window.setInterval(updateClock, 1000);
}
