import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, Clock } from 'lucide-react';

export const CurtainIntro = ({ onOpened, openingConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // Real-time calculation until 12:00 AM midnight
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Next midnight (12:00 AM)
    const diff = Math.max(0, midnight.getTime() - now.getTime());

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Current clock hand angles
    const currentHours = now.getHours() % 12;
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    const hourDeg = (currentHours * 30) + (currentMinutes * 0.5);
    const minDeg = currentMinutes * 6;
    const secDeg = currentSeconds * 6;

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      hourDeg,
      minDeg,
      secDeg,
      diff
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const handleOpenCurtains = () => {
    if (isOpen) return;
    soundManager.playCurtainOpen();
    setIsOpen(true);
    setTimeout(() => {
      setIsRendered(false);
      if (onOpened) onOpened();
    }, 1600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated.diff <= 0) {
        handleOpenCurtains();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div className={`curtain-container ${isOpen ? 'curtains-open' : ''}`} onClick={handleOpenCurtains}>
      {/* Top Drapery Valance */}
      <div className="curtain-valance" />

      {/* Left Curtain Panel with 3D Fabric Folds */}
      <div className="curtain-panel curtain-left">
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent 40%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Right Curtain Panel with 3D Fabric Folds */}
      <div className="curtain-panel curtain-right">
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(0,0,0,0.5), transparent 40%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Center Vintage Clock & Real-time 12:00 AM Countdown Ornament */}
      <div className="clock-ornament">
        {/* Analog Clock Face with real-time hands */}
        <div className="clock-face">
          {/* Roman numerals */}
          <span style={{ position: 'absolute', top: '10px', fontWeight: 800, color: '#39283D', fontSize: '13px' }}>XII</span>
          <span style={{ position: 'absolute', right: '12px', fontWeight: 800, color: '#39283D', fontSize: '13px' }}>III</span>
          <span style={{ position: 'absolute', bottom: '10px', fontWeight: 800, color: '#39283D', fontSize: '13px' }}>VI</span>
          <span style={{ position: 'absolute', left: '12px', fontWeight: 800, color: '#39283D', fontSize: '13px' }}>IX</span>

          {/* Real-time moving hands */}
          <div
            className="clock-hand-hour"
            style={{ transform: `rotate(${timeLeft.hourDeg}deg)` }}
          />
          <div
            className="clock-hand-min"
            style={{ transform: `rotate(${timeLeft.minDeg}deg)` }}
          />
          <div
            style={{
              position: 'absolute',
              width: '2px',
              height: '62px',
              background: '#FFD166',
              top: '23px',
              left: 'calc(50% - 1px)',
              transformOrigin: 'bottom center',
              transform: `rotate(${timeLeft.secDeg}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
            }}
          />

          <div style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            background: '#E6384F',
            borderRadius: '50%',
            boxShadow: '0 0 5px rgba(0,0,0,0.4)',
            zIndex: 10
          }} />

          {/* Centered heart emblem in clock */}
          <div style={{ position: 'absolute', bottom: '36px', fontSize: '14px' }}>
            ❤️
          </div>
        </div>

        {/* Decorative Plaque under Clock displaying real-time 12:00 AM Countdown */}
        <div style={{
          marginTop: '20px',
          background: 'rgba(20, 23, 36, 0.94)',
          border: '2px solid #FFD166',
          borderRadius: '20px',
          padding: '18px 28px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.65)',
          maxWidth: '380px',
          width: '90vw',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#FFD166',
            fontWeight: 800,
            fontSize: '0.85rem',
            letterSpacing: '1.5px',
            marginBottom: '8px'
          }}>
            <Clock size={16} />
            <span>COUNTDOWN TO 12:00 AM 🎂</span>
            <Sparkles size={16} />
          </div>

          {/* Real-time Digits display */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: '12px 0 16px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1.5px solid rgba(255, 209, 102, 0.4)',
              borderRadius: '10px',
              padding: '6px 12px',
              minWidth: '58px'
            }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace' }}>
                {timeLeft.hours}
              </span>
              <div style={{ fontSize: '0.65rem', color: '#FFD166', textTransform: 'uppercase', marginTop: '2px' }}>
                Hours
              </div>
            </div>

            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFD166' }}>:</span>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1.5px solid rgba(255, 209, 102, 0.4)',
              borderRadius: '10px',
              padding: '6px 12px',
              minWidth: '58px'
            }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'monospace' }}>
                {timeLeft.minutes}
              </span>
              <div style={{ fontSize: '0.65rem', color: '#FFD166', textTransform: 'uppercase', marginTop: '2px' }}>
                Mins
              </div>
            </div>

            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFD166' }}>:</span>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1.5px solid rgba(255, 209, 102, 0.4)',
              borderRadius: '10px',
              padding: '6px 12px',
              minWidth: '58px'
            }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FF85A1', fontFamily: 'monospace' }}>
                {timeLeft.seconds}
              </span>
              <div style={{ fontSize: '0.65rem', color: '#FFD166', textTransform: 'uppercase', marginTop: '2px' }}>
                Secs
              </div>
            </div>
          </div>

          <p style={{
            fontSize: '0.85rem',
            color: '#F8DCE4',
            marginBottom: '14px',
            fontWeight: 500
          }}>
            The birthday magic unlocks at midnight 12:00 AM! ✨
          </p>

          {/* Action button to open curtains anytime */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenCurtains();
            }}
            className="btn-primary"
            style={{
              padding: '10px 24px',
              fontSize: '1rem',
              width: '100%',
              background: 'linear-gradient(135deg, #FFD166 0%, #F4A261 100%)',
              color: '#39283D',
              boxShadow: '0 6px 18px rgba(255, 209, 102, 0.4)',
              fontWeight: 800
            }}
          >
            <span>Open The Curtains ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
