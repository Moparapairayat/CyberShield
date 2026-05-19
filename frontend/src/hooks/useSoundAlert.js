const ALARM_DURATION_MS = 20_000;
const ALARM_SOURCE = "/sounds/mixkit-classic-alarm-995.wav";

let activeAlarm = null;

export function playAlertTone(enabled = true) {
  if (!enabled) return;

  try {
    stopAlertTone();

    const audio = new Audio(ALARM_SOURCE);
    audio.loop = true;
    audio.volume = 0.92;
    audio.currentTime = 0;

    const timeoutId = window.setTimeout(() => {
      stopAlertTone();
    }, ALARM_DURATION_MS);

    activeAlarm = {
      audio,
      timeoutId
    };

    const playPromise = audio.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {
        stopAlertTone();
      });
    }
  } catch (error) {
    stopAlertTone();
  }
}

export function stopAlertTone() {
  if (!activeAlarm) return;

  const alarmToStop = activeAlarm;
  activeAlarm = null;
  window.clearTimeout(alarmToStop.timeoutId);

  alarmToStop.audio.pause();
  alarmToStop.audio.currentTime = 0;
}
