// Retro Synth Sound Effects using Web Audio API

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

const initAudio = () => {
  if (typeof window === "undefined") return;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
};

export const toggleSound = (enabled?: boolean): boolean => {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  if (soundEnabled) {
    initAudio();
  }
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;

export const playSound = (type: "hover" | "click" | "levelUp" | "select") => {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "hover") {
      // Short, soft synth blip
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "click") {
      // Crisp click/select sound
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "select") {
      // Positive feedback tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "levelUp") {
      // Ascending major arpeggio (C major: C -> E -> G -> C)
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      osc.type = "sawtooth";
      
      gain.gain.setValueAtTime(0.04, now);
      
      notes.forEach((freq, idx) => {
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      });
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.setValueAtTime(0.04, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      // Add a tiny delay and feedback through secondary oscillator
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "sine";
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      
      notes.forEach((freq, idx) => {
        osc2.frequency.setValueAtTime(freq * 1.5, now + 0.04 + idx * 0.08);
      });
      
      gain2.gain.setValueAtTime(0.03, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      osc.start(now);
      osc.stop(now + 0.5);
      
      osc2.start(now);
      osc2.stop(now + 0.5);
    }
  } catch (err) {
    console.warn("Web Audio API not supported or blocked: ", err);
  }
};
