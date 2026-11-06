import React, { useState, useEffect, useRef } from 'react';
import { BirthdayCakeIllustration } from './Illustrations';
import { soundManager } from '../utils/audio';
import { Sparkles, Heart, RotateCcw, PartyPopper, Mic, MicOff, Wind, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BirthdayCake = ({ onReplay, config }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micState, setMicState] = useState('idle'); // 'idle' | 'listening' | 'denied' | 'unsupported'
  const [blowProgress, setBlowProgress] = useState(0); // 0.0 to 1.0 (smooth candle extinguishing)
  const [blowFeedback, setBlowFeedback] = useState('ready'); // 'ready' | 'blowing' | 'voice_rejected' | 'ambient'
  const [sensitivity, setSensitivity] = useState('normal'); // 'normal' | 'high'

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const blowProgressRef = useRef(0);
  const noiseFloorRef = useRef(15);
  const isBlowingRef = useRef(false);

  const cakeConfig = config?.cakeSection || {};

  // Clean up all mic streams and audio context
  const cleanupMic = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cleanupMic();
    };
  }, []);

  const triggerCandleBlowSuccess = () => {
    cleanupMic();
    setMicState('idle');
    setBlowProgress(1.0);
    blowProgressRef.current = 1.0;
    soundManager.playCandleBlow();
    setCandlesBlown(true);

    try {
      // Massive celebratory confetti cannon!
      const end = Date.now() + 3.2 * 1000;
      const colors = ['#E6384F', '#FF85A1', '#FFD166', '#A78BC8', '#6BCB77', '#4D96FF'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}
  };

  const handleManualBlow = () => {
    if (candlesBlown) return;
    triggerCandleBlowSuccess();
  };

  // Start listening to the microphone with noise rejection
  const startMicListening = async () => {
    if (candlesBlown) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicState('unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        }
      });

      streamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      // Ensure AudioContext is resumed (critical for modern Chrome/Edge/Safari)
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.2;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setMicState('listening');
      blowProgressRef.current = 0;
      setBlowProgress(0);

      const bufferLength = analyser.frequencyBinCount;
      const frequencyData = new Uint8Array(bufferLength);
      const timeDomainData = new Uint8Array(bufferLength);

      let calibrationFrames = 15;
      let noiseAccum = 0;

      const processAudio = () => {
        if (!analyserRef.current || candlesBlown) return;

        analyser.getByteFrequencyData(frequencyData);
        analyser.getByteTimeDomainData(timeDomainData);

        // 1. Ultra-low sub-bass bins 1..6 (~40Hz - 260Hz): Breath wind turbulence
        let subBassSum = 0;
        for (let i = 1; i <= 6; i++) {
          subBassSum += frequencyData[i];
        }
        const subBassAvg = subBassSum / 6;

        // 2. Speech/voice formants bins 12..48 (~500Hz - 2100Hz): Talking, singing, chatter
        let speechSum = 0;
        for (let i = 12; i <= 48; i++) {
          speechSum += frequencyData[i];
        }
        const speechAvg = speechSum / 37;

        // 3. High-frequency ambient hiss bins 50..100 (~2200Hz - 4500Hz)
        let highSum = 0;
        for (let i = 50; i <= 100; i++) {
          highSum += frequencyData[i];
        }
        const highAvg = highSum / 51;

        // Calibration phase
        if (calibrationFrames > 0) {
          noiseAccum += subBassAvg;
          calibrationFrames--;
          if (calibrationFrames === 0) {
            noiseFloorRef.current = Math.max(10, noiseAccum / 15);
          }
          animFrameRef.current = requestAnimationFrame(processAudio);
          return;
        }

        // Slowly update ambient noise baseline
        noiseFloorRef.current = noiseFloorRef.current * 0.98 + subBassAvg * 0.02;

        // Detection thresholds based on sensitivity
        const minSubBass = sensitivity === 'high' ? 24 : 36;
        const subBassAboveFloor = subBassAvg - noiseFloorRef.current;
        const turbulenceRatio = (subBassAvg + 2) / (speechAvg + highAvg * 0.5 + 4);

        let isBlowing = false;

        // If someone is speaking or singing loudly, speech formants dominate -> reject speech!
        if (speechAvg > 45 && turbulenceRatio < 1.7) {
          setBlowFeedback('voice_rejected');
          isBlowing = false;
        } else if (subBassAvg > minSubBass && (subBassAboveFloor > 12 || subBassAvg > 40) && turbulenceRatio > 1.4) {
          // Wind turbulence directly on microphone diaphragm detected!
          isBlowing = true;
          setBlowFeedback('blowing');
        } else {
          setBlowFeedback('ambient');
          isBlowing = false;
        }

        isBlowingRef.current = isBlowing;

        // Slowly slowly extinguish candles as blowing continues:
        if (isBlowing) {
          // Progress speed: ~1.2 seconds of sustained blowing
          const step = sensitivity === 'high' ? 0.028 : 0.022;
          blowProgressRef.current = Math.min(1.0, blowProgressRef.current + step);
        } else {
          // If they stop blowing, the flame slowly recovers back to full!
          blowProgressRef.current = Math.max(0.0, blowProgressRef.current - 0.014);
        }

        setBlowProgress(blowProgressRef.current);

        // When flame is 100% extinguished, trigger celebration!
        if (blowProgressRef.current >= 1.0) {
          triggerCandleBlowSuccess();
          return;
        }

        animFrameRef.current = requestAnimationFrame(processAudio);
      };

      animFrameRef.current = requestAnimationFrame(processAudio);
    } catch (err) {
      console.warn('Microphone error:', err);
      setMicState('denied');
    }
  };

  const handleReplayClick = () => {
    soundManager.playPop();
    setCandlesBlown(false);
    setMicState('idle');
    setBlowProgress(0);
    blowProgressRef.current = 0;
    setBlowFeedback('ready');
    if (onReplay) onReplay();
  };

  return (
    <div className="bg-pink-stripes" style={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '36px 16px',
      position: 'relative'
    }}>
      <div className="paper-card" style={{
        maxWidth: '640px',
        width: '100%',
        padding: '40px 28px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.96)',
        border: '3px solid #F8DCE4',
        boxShadow: '0 25px 60px rgba(230, 56, 79, 0.15)',
        position: 'relative',
        borderRadius: '24px'
      }}>
        {/* Washi Tape */}
        <div className="washi-tape-top" />

        {/* Top Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FFF0F3',
          color: '#E6384F',
          padding: '6px 18px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 800,
          marginBottom: '12px',
          border: '1px solid #FCE5EC'
        }}>
          <PartyPopper size={16} />
          <span>FINAL CHAPTER : THE MAGIC WISH</span>
          <PartyPopper size={16} />
        </div>

        {/* Heading: MAKE A WISH */}
        <h1 className="font-handwritten" style={{
          fontSize: 'clamp(2.6rem, 7vw, 3.8rem)',
          color: '#E6384F',
          lineHeight: 1.1,
          margin: '0 0 8px 0',
          fontWeight: 700,
          letterSpacing: '1px',
          textShadow: '0 2px 6px rgba(230, 56, 79, 0.2)'
        }}>
          {cakeConfig?.heading || "MAKE A WISH"}
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: '#39283D',
          fontWeight: 700,
          marginBottom: '18px'
        }}>
          {cakeConfig?.subtitle || "Close your eyes, make a wish, and let the magic begin! 🎂✨"}
        </p>

        {/* Interactive Birthday Cake Illustration with dynamic blow progress */}
        <div style={{ margin: '6px auto 20px', display: 'flex', justifyContent: 'center' }}>
          <BirthdayCakeIllustration
            candlesBlown={candlesBlown}
            onBlowOut={handleManualBlow}
            blowProgress={blowProgress}
          />
        </div>

        {/* Interaction Controls */}
        {!candlesBlown ? (
          <div>
            {/* MICROPHONE BLOW BOX WITH NOISE FILTER & SLOW EXTINGUISHING */}
            <div style={{
              background: micState === 'listening' ? '#F4FBF7' : '#FFF9E9',
              border: `2px dashed ${micState === 'listening' ? '#48BB78' : '#FFD166'}`,
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease'
            }}>
              {micState === 'idle' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5C4813', fontSize: '0.95rem', fontWeight: 700 }}>
                    <Mic size={20} color="#E6384F" />
                    <span>Real Candle Experience: Blow directly on your mic! 💨</span>
                  </div>
                  <button
                    onClick={startMicListening}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#FFFFFF',
                      color: '#E6384F',
                      border: '2px solid #E6384F',
                      padding: '9px 26px',
                      borderRadius: '999px',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(230, 56, 79, 0.15)',
                      transition: 'all 0.2s ease'
                    }}
                    className="hover:scale-105 active:scale-95"
                  >
                    <Mic size={16} />
                    <span>Enable Real-Life Mic Blowing 🎤💨</span>
                  </button>
                </>
              )}

              {micState === 'listening' && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  
                  {/* Dynamic Feedback Text */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.98rem' }}>
                    {blowFeedback === 'blowing' ? (
                      <span style={{ color: '#276749' }}>
                        💨 Blowing detected! Keep blowing to put out the candles...
                      </span>
                    ) : blowFeedback === 'voice_rejected' ? (
                      <span style={{ color: '#C53030' }}>
                        🗣️ Talking detected — only a real blowing breath will extinguish the flame!
                      </span>
                    ) : (
                      <span style={{ color: '#2D3748' }}>
                        🎤 Listening... Blow directly into the microphone! 🌬️
                      </span>
                    )}
                  </div>

                  {/* Progressive Candle Extinguishing Bar */}
                  <div style={{
                    width: '100%',
                    maxWidth: '340px',
                    height: '16px',
                    backgroundColor: '#E2E8F0',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    border: '1.5px solid #CBD5E0',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${Math.round(blowProgress * 100)}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #F6AD55 0%, #E53E3E 50%, #319795 100%)',
                      transition: 'width 0.08s ease-out',
                      borderRadius: '999px'
                    }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '340px', fontSize: '0.75rem', fontWeight: 700, color: '#718096' }}>
                    <span>🔥 Flames Burning</span>
                    <span>{Math.round(blowProgress * 100)}% Blown</span>
                    <span>💨 Extinguished</span>
                  </div>

                  {/* Sensitivity Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.78rem', color: '#4A5568' }}>
                    <Sliders size={14} />
                    <span>Mic Sensitivity:</span>
                    <button
                      onClick={() => setSensitivity('normal')}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E0',
                        background: sensitivity === 'normal' ? '#E6384F' : '#FFFFFF',
                        color: sensitivity === 'normal' ? '#FFFFFF' : '#4A5568',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setSensitivity('high')}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E0',
                        background: sensitivity === 'high' ? '#E6384F' : '#FFFFFF',
                        color: sensitivity === 'high' ? '#FFFFFF' : '#4A5568',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      High (Soft Breaths)
                    </button>
                  </div>
                </div>
              )}

              {micState === 'denied' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E6384F', fontSize: '0.9rem', fontWeight: 700 }}>
                  <MicOff size={18} />
                  <span>Mic access blocked. Tap the button below to blow! 👇</span>
                </div>
              )}

              {micState === 'unsupported' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6E5C74', fontSize: '0.9rem', fontWeight: 700 }}>
                  <span>Microphone not supported on this browser. Tap below to blow! 👇</span>
                </div>
              )}
            </div>

            {/* Direct Tap Button to Blow Out */}
            <button
              onClick={handleManualBlow}
              className="btn-primary animate-bounce-gentle"
              style={{
                padding: '16px 40px',
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #FFD166 0%, #F4A261 100%)',
                color: '#39283D',
                boxShadow: '0 10px 25px rgba(255, 209, 102, 0.5)',
                fontWeight: 900
              }}
            >
              <span>{cakeConfig?.blowButtonText || "Blow Out The Candles 💨🕯️"}</span>
            </button>
          </div>
        ) : (
          /* Celebratory Wish Revealed */
          <div className="animate-bounce-gentle" style={{
            background: 'linear-gradient(135deg, #FFF0F3 0%, #FFF9E9 100%)',
            border: '2px solid #FCE5EC',
            borderRadius: '20px',
            padding: '24px 20px',
            boxShadow: '0 8px 24px rgba(230, 56, 79, 0.12)',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🌟🎂💖</div>
            
            <h2 className="font-handwritten" style={{
              fontSize: '2.4rem',
              color: '#E6384F',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              {cakeConfig?.blownMessage || "Your wish is on its way to the stars! 🌟💖"}
            </h2>

            <p style={{
              fontSize: '1.05rem',
              color: '#39283D',
              lineHeight: 1.5,
              maxWidth: '480px',
              margin: '0 auto 24px auto',
              fontWeight: 600
            }}>
              {cakeConfig?.blownSubtext || "May this upcoming year bring you infinite joy, good health, and magic in the year ahead! 🎈✨"}
            </p>

            {/* Replay Button to experience again */}
            <button
              onClick={handleReplayClick}
              className="btn-secondary"
              style={{
                padding: '14px 32px',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#E6384F',
                borderColor: '#F8DCE4',
                background: '#FFFFFF'
              }}
            >
              <RotateCcw size={18} />
              <span>{cakeConfig?.replayButtonText || "Replay The Surprise 🔁"}</span>
            </button>
          </div>
        )}

        {/* Decorative stars footer */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          fontSize: '1.2rem',
          color: '#E6384F'
        }}>
          <span>✨</span>
          <span>💖</span>
          <span>🎂</span>
          <span>💖</span>
          <span>✨</span>
        </div>

      </div>
    </div>
  );
};
