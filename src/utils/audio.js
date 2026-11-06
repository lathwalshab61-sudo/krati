// Web Audio API Synthesizer for ambient music box & sound effects
// 100% self-contained, no external copyright dependencies needed

class SoundController {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.noteIndex = 0;
    this.isMuted = false;
    this.sfxEnabled = true;
    this.bgAudio = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Set custom audio file if provided
  setCustomAudio(url) {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.bgAudio = new Audio(url);
    this.bgAudio.loop = true;
  }

  playNote(frequency, duration, type = 'sine', gainVal = 0.15) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Music box chime harmonics
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext might be blocked until user gesture
    }
  }

  // Play gentle music box melody
  startMusic() {
    if (this.isPlayingMusic) return;
    this.initContext();
    this.isPlayingMusic = true;

    // Check if custom audio file is available and playable
    if (this.bgAudio) {
      this.bgAudio.play().catch(() => {
        this.runProceduralMusic();
      });
    } else {
      this.runProceduralMusic();
    }
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  runProceduralMusic() {
    if (!this.isPlayingMusic) return;

    // Sweet nostalgic music box notes (Happy Birthday in C major / pentatonic harmony)
    const melody = [
      { f: 261.63, d: 0.35, pause: 400 }, // Hap-
      { f: 261.63, d: 0.35, pause: 400 }, // py
      { f: 293.66, d: 0.7, pause: 700 },  // birth-
      { f: 261.63, d: 0.7, pause: 700 },  // day
      { f: 349.23, d: 0.7, pause: 700 },  // to
      { f: 329.63, d: 1.2, pause: 1200 }, // you

      { f: 261.63, d: 0.35, pause: 400 }, // Hap-
      { f: 261.63, d: 0.35, pause: 400 }, // py
      { f: 293.66, d: 0.7, pause: 700 },  // birth-
      { f: 261.63, d: 0.7, pause: 700 },  // day
      { f: 392.00, d: 0.7, pause: 700 },  // to
      { f: 349.23, d: 1.2, pause: 1200 }, // you

      { f: 261.63, d: 0.35, pause: 400 }, // Hap-
      { f: 261.63, d: 0.35, pause: 400 }, // py
      { f: 523.25, d: 0.7, pause: 700 },  // birth-
      { f: 440.00, d: 0.7, pause: 700 },  // day
      { f: 349.23, d: 0.7, pause: 700 },  // dear
      { f: 329.63, d: 0.7, pause: 700 },  // spe-
      { f: 293.66, d: 1.0, pause: 1000 }, // cial

      { f: 466.16, d: 0.35, pause: 400 }, // Hap-
      { f: 466.16, d: 0.35, pause: 400 }, // py
      { f: 440.00, d: 0.7, pause: 700 },  // birth-
      { f: 349.23, d: 0.7, pause: 700 },  // day
      { f: 392.00, d: 0.7, pause: 700 },  // to
      { f: 349.23, d: 1.5, pause: 1800 }, // you!
    ];

    const currentNote = melody[this.noteIndex % melody.length];
    
    // Play main chime
    this.playNote(currentNote.f, currentNote.d * 1.5, 'sine', 0.12);
    // Play light sparkling octave harmonic for music box feel
    this.playNote(currentNote.f * 2, currentNote.d * 0.8, 'triangle', 0.04);

    this.noteIndex = (this.noteIndex + 1) % melody.length;

    this.musicTimer = setTimeout(() => {
      this.runProceduralMusic();
    }, currentNote.pause);
  }

  // --- Sound Effects ---

  playPop() {
    if (!this.sfxEnabled) return;
    this.initContext();
    this.playNote(587.33, 0.12, 'sine', 0.15); // D5
  }

  playKeypad(num) {
    if (!this.sfxEnabled) return;
    this.initContext();
    const freqs = [330, 370, 392, 440, 493, 523, 587, 659, 698, 784];
    const f = freqs[num % freqs.length] || 440;
    this.playNote(f, 0.15, 'triangle', 0.12);
  }

  playCurtainOpen() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    } catch {}
  }

  playUnlockSuccess() {
    if (!this.sfxEnabled) return;
    this.initContext();
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.4, 'sine', 0.14);
      }, idx * 100);
    });
  }

  playError() {
    if (!this.sfxEnabled) return;
    this.initContext();
    this.playNote(220, 0.25, 'sawtooth', 0.08);
    setTimeout(() => {
      this.playNote(196, 0.35, 'sawtooth', 0.08);
    }, 150);
  }

  playGiftOpen() {
    if (!this.sfxEnabled) return;
    this.initContext();
    const sparkles = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    sparkles.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.3, 'sine', 0.15);
        this.playNote(freq * 1.5, 0.2, 'triangle', 0.05);
      }, idx * 80);
    });
  }

  playCorkPop() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
    setTimeout(() => this.playGiftOpen(), 100);
  }

  playScratch() {
    if (!this.sfxEnabled) return;
    this.initContext();
    // High soft white noise-like click for scratching
    this.playNote(1200 + Math.random() * 400, 0.03, 'sine', 0.05);
  }

  playCandleBlow() {
    if (!this.sfxEnabled) return;
    this.initContext();
    this.playCurtainOpen();
    setTimeout(() => {
      this.playUnlockSuccess();
    }, 400);
  }
}

export const soundManager = new SoundController();
