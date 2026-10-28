"use strict";

const STORAGE_KEY = "electronic-muyu:v1";
const MAX_COUNT = Number.MAX_SAFE_INTEGER;

function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createDefaultState(date = new Date()) {
  return {
    version: 1,
    date: getLocalDate(date),
    today: 0,
    total: 0,
    soundEnabled: true,
    vibrationEnabled: true,
  };
}

function isCount(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function sanitizeState(value, date = new Date()) {
  const fallback = createDefaultState(date);
  if (
    !value
    || value.version !== 1
    || typeof value.date !== "string"
    || !isCount(value.today)
    || !isCount(value.total)
    || typeof value.soundEnabled !== "boolean"
    || typeof value.vibrationEnabled !== "boolean"
  ) {
    return fallback;
  }

  if (value.date !== fallback.date) {
    return { ...value, date: fallback.date, today: 0 };
  }

  return { ...value };
}

function strike(state, date = new Date()) {
  const current = sanitizeState(state, date);
  return {
    ...current,
    today: Math.min(MAX_COUNT, current.today + 1),
    total: Math.min(MAX_COUNT, current.total + 1),
  };
}

function setPreference(state, key, enabled) {
  if (key !== "soundEnabled" && key !== "vibrationEnabled") {
    throw new RangeError("未知偏好");
  }

  return { ...state, [key]: Boolean(enabled) };
}

function resetCounts(state, date = new Date()) {
  return {
    ...sanitizeState(state, date),
    date: getLocalDate(date),
    today: 0,
    total: 0,
  };
}

function loadState(storage, date = new Date()) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw === null
      ? createDefaultState(date)
      : sanitizeState(JSON.parse(raw), date);
  } catch {
    return createDefaultState(date);
  }
}

function saveState(storage, state) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

function playWoodSound(browserWindow) {
  try {
    const AudioContext = browserWindow.AudioContext || browserWindow.webkitAudioContext;
    if (!AudioContext) return;

    const context = playWoodSound.context || new AudioContext();
    playWoodSound.context = context;
    if (context.state === "suspended") context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(228, start);
    oscillator.frequency.exponentialRampToValueAtTime(108, start + 0.095);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.42, start + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.16);
  } catch {
    // Sound is optional; counting must keep working when Web Audio is blocked.
  }
}

function supportsVibration(browserWindow) {
  return typeof browserWindow?.navigator?.vibrate === "function";
}

function triggerVibration(browserWindow) {
  try {
    if (!supportsVibration(browserWindow)) return false;
    return browserWindow.navigator.vibrate(18);
  } catch {
    // Vibration is optional and unsupported on many desktop browsers.
    return false;
  }
}

function getStorage(browserWindow) {
  try {
    return browserWindow.localStorage;
  } catch {
    return {
      getItem() { return null; },
      setItem() {},
    };
  }
}

function bootstrapMuyu(documentObject, browserWindow) {
  const elements = {
    button: documentObject.querySelector("[data-muyu]"),
    today: documentObject.querySelector("[data-today]"),
    total: documentObject.querySelector("[data-total]"),
    sound: documentObject.querySelector("[data-sound]"),
    vibration: documentObject.querySelector("[data-vibration]"),
    reset: documentObject.querySelector("[data-reset]"),
    dialog: documentObject.querySelector("[data-reset-dialog]"),
    confirmReset: documentObject.querySelector("[data-confirm-reset]"),
    floatLayer: documentObject.querySelector("[data-float-layer]"),
    status: documentObject.querySelector("[data-status]"),
  };

  if (Object.values(elements).some((element) => !element)) return;

  const storage = getStorage(browserWindow);
  const reducedMotion = browserWindow.matchMedia("(prefers-reduced-motion: reduce)");
  const vibrationSupported = supportsVibration(browserWindow);
  let state = loadState(storage);
  let announceTimer;

  function render() {
    elements.today.textContent = state.today.toLocaleString("zh-CN");
    elements.total.textContent = state.total.toLocaleString("zh-CN");

    elements.sound.setAttribute("aria-pressed", String(state.soundEnabled));
    elements.sound.querySelector(".toggle-state").textContent = state.soundEnabled ? "开" : "关";

    elements.vibration.disabled = !vibrationSupported;
    elements.vibration.setAttribute("aria-pressed", String(vibrationSupported && state.vibrationEnabled));
    elements.vibration.querySelector(".toggle-state").textContent = vibrationSupported
      ? (state.vibrationEnabled ? "开" : "关")
      : "不支持";
    elements.vibration.title = vibrationSupported ? "" : "当前浏览器不支持网页震动";
  }

  function persist() {
    saveState(storage, state);
  }

  function announceSoon(message) {
    browserWindow.clearTimeout(announceTimer);
    announceTimer = browserWindow.setTimeout(() => {
      elements.status.textContent = message;
    }, 160);
  }

  function animateStrike() {
    elements.button.classList.remove("is-struck");
    void elements.button.offsetWidth;
    elements.button.classList.add("is-struck");

    if (reducedMotion.matches) return;
    const float = documentObject.createElement("span");
    float.className = "merit-float";
    float.textContent = "功德 +1";
    if (elements.floatLayer.childElementCount >= 6) {
      elements.floatLayer.firstElementChild.remove();
    }
    elements.floatLayer.append(float);
    float.addEventListener("animationend", () => float.remove(), { once: true });
  }

  elements.button.addEventListener("click", () => {
    state = strike(state);
    render();
    persist();
    animateStrike();
    announceSoon(`今日功德 ${state.today}，累计功德 ${state.total}`);

    if (state.soundEnabled) playWoodSound(browserWindow);
    if (state.vibrationEnabled) triggerVibration(browserWindow);
  });

  elements.sound.addEventListener("click", () => {
    state = setPreference(state, "soundEnabled", !state.soundEnabled);
    render();
    persist();
    announceSoon(`声音已${state.soundEnabled ? "开启" : "关闭"}`);
  });

  elements.vibration.addEventListener("click", () => {
    if (!vibrationSupported) return;
    state = setPreference(state, "vibrationEnabled", !state.vibrationEnabled);
    render();
    persist();
    if (state.vibrationEnabled) triggerVibration(browserWindow);
    announceSoon(`震动已${state.vibrationEnabled ? "开启" : "关闭"}`);
  });

  elements.reset.addEventListener("click", () => {
    if (typeof elements.dialog.showModal === "function") {
      elements.dialog.showModal();
    } else {
      elements.dialog.setAttribute("open", "");
    }
  });

  elements.dialog.addEventListener("click", (event) => {
    if (event.target === elements.dialog) elements.dialog.close("cancel");
  });

  elements.dialog.addEventListener("close", () => {
    elements.reset.focus();
  });

  elements.confirmReset.addEventListener("click", () => {
    state = resetCounts(state);
    render();
    persist();
    announceSoon("今日和累计功德已重置");
  });

  render();
  persist();
}

const muyuApi = {
  STORAGE_KEY,
  createDefaultState,
  getLocalDate,
  loadState,
  resetCounts,
  sanitizeState,
  saveState,
  setPreference,
  strike,
  supportsVibration,
  bootstrapMuyu,
  playWoodSound,
  triggerVibration,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = muyuApi;
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => bootstrapMuyu(document, window),
      { once: true },
    );
  } else {
    bootstrapMuyu(document, window);
  }
}
