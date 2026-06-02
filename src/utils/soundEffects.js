class SoundEffects {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.volume = 0.45;
    this.enabled = true;
    this.lastPlayed = {};
    this.cooldown = 80;
    this.storageKey = "portfolio_sound_settings";

    this.init();
  }

  init() {
    this.loadSettings();

    this.loadSound("notification", "/assets/sounds/notification.mp3");
    this.loadSound("success", "/assets/sounds/notification.mp3");
    this.loadSound("error", "/assets/sounds/notification.mp3");
    this.loadSound("magic", "/assets/sounds/magic.mp3");
    this.loadSound("click", "/assets/sounds/click.mp3");
    this.loadSound("hover", "/assets/sounds/click.mp3");
    this.loadSound("open", "/assets/sounds/magic.mp3");
    this.loadSound("close", "/assets/sounds/click.mp3");

    this.unlockAudioOnFirstInteraction();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (!saved) return;

      const settings = JSON.parse(saved);

      this.isMuted = Boolean(settings.isMuted);
      this.volume =
        typeof settings.volume === "number"
          ? Math.max(0, Math.min(1, settings.volume))
          : this.volume;
    } catch {
      // Ignore broken localStorage data
    }
  }

  saveSettings() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          isMuted: this.isMuted,
          volume: this.volume,
        })
      );
    } catch {
      // Ignore private mode / storage errors
    }
  }

  loadSound(name, path) {
    if (typeof Audio === "undefined") return;

    try {
      const audio = new Audio(path);
      audio.volume = this.volume;
      audio.preload = "auto";

      this.sounds[name] = audio;
    } catch (error) {
      console.warn(`Failed to load sound: ${name}`, error);
    }
  }

  unlockAudioOnFirstInteraction() {
    if (typeof window === "undefined") return;

    const unlock = () => {
      Object.values(this.sounds).forEach((sound) => {
        if (!sound) return;

        try {
          sound.muted = true;
          const promise = sound.play();

          if (promise && typeof promise.then === "function") {
            promise
              .then(() => {
                sound.pause();
                sound.currentTime = 0;
                sound.muted = false;
              })
              .catch(() => {
                sound.muted = false;
              });
          } else {
            sound.pause();
            sound.currentTime = 0;
            sound.muted = false;
          }
        } catch {
          sound.muted = false;
        }
      });

      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
  }

  canPlay(soundName) {
    if (!this.enabled || this.isMuted) return false;

    const now = Date.now();
    const last = this.lastPlayed[soundName] || 0;

    if (now - last < this.cooldown) return false;

    this.lastPlayed[soundName] = now;
    return true;
  }

  play(soundName, options = {}) {
    if (!this.canPlay(soundName)) return;

    const sound = this.sounds[soundName];

    if (!sound) return;

    const volume =
      typeof options.volume === "number"
        ? Math.max(0, Math.min(1, options.volume))
        : this.volume;

    const playbackRate =
      typeof options.playbackRate === "number"
        ? Math.max(0.5, Math.min(2, options.playbackRate))
        : 1;

    try {
      const clone = sound.cloneNode(true);
      clone.volume = volume;
      clone.playbackRate = playbackRate;
      clone.currentTime = 0;

      clone.play().catch(() => {
        // Browser may block sound before user interaction
      });

      clone.addEventListener("ended", () => {
        clone.remove();
      });
    } catch (error) {
      console.warn(`Failed to play sound: ${soundName}`, error);
    }
  }

  playRandom(soundNames = [], options = {}) {
    if (!Array.isArray(soundNames) || soundNames.length === 0) return;

    const randomSound =
      soundNames[Math.floor(Math.random() * soundNames.length)];

    this.play(randomSound, options);
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));

    Object.values(this.sounds).forEach((sound) => {
      if (sound) sound.volume = this.volume;
    });

    this.saveSettings();
  }

  increaseVolume(step = 0.1) {
    this.setVolume(this.volume + step);
    return this.volume;
  }

  decreaseVolume(step = 0.1) {
    this.setVolume(this.volume - step);
    return this.volume;
  }

  mute() {
    this.isMuted = true;
    this.saveSettings();
  }

  unmute() {
    this.isMuted = false;
    this.saveSettings();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.saveSettings();

    return this.isMuted;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  setCooldown(ms = 80) {
    this.cooldown = Math.max(0, ms);
  }

  stop(soundName) {
    const sound = this.sounds[soundName];

    if (!sound) return;

    try {
      sound.pause();
      sound.currentTime = 0;
    } catch {
      // Ignore stop errors
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach((sound) => {
      if (!sound) return;

      try {
        sound.pause();
        sound.currentTime = 0;
      } catch {
        // Ignore stop errors
      }
    });
  }

  playNotification() {
    this.play("notification");
  }

  playSuccess() {
    this.play("success", {
      playbackRate: 1.08,
    });
  }

  playError() {
    this.play("error", {
      playbackRate: 0.82,
      volume: this.volume * 0.9,
    });
  }

  playMagic() {
    this.play("magic", {
      playbackRate: 1,
    });
  }

  playClick() {
    this.play("click", {
      volume: this.volume * 0.75,
      playbackRate: 1.15,
    });
  }

  playHover() {
    this.play("hover", {
      volume: this.volume * 0.45,
      playbackRate: 1.35,
    });
  }

  playOpen() {
    this.play("open", {
      volume: this.volume * 0.9,
      playbackRate: 1.05,
    });
  }

  playClose() {
    this.play("close", {
      volume: this.volume * 0.65,
      playbackRate: 0.95,
    });
  }
}

const soundEffects = new SoundEffects();

export default soundEffects;