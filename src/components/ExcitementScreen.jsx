import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

export const ExcitementScreen = ({ onNext, config }) => {
  const [evadeCount, setEvadeCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 60, y: 88, isMoved: false });

  // Move the NO button to a random position across the card, guaranteed far away from current position
  const handleNoEvade = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    soundManager.playPop();

    let newX = noPos.x;
    let newY = noPos.y;
    let attempts = 0;

    // Pick a new position at least 35% distance away from current position
    while (attempts < 25) {
      const candX = Math.floor(Math.random() * 70) + 12; // 12% to 82%
      const candY = Math.floor(Math.random() * 65) + 15; // 15% to 80%
      const dist = Math.hypot(candX - noPos.x, candY - noPos.y);

      // Avoid dead center where the Shinchan illustration is
      const isOverCenter = candX > 35 && candX < 65 && candY > 30 && candY < 65;

      if (dist >= 35 && !isOverCenter) {
        newX = candX;
        newY = candY;
        break;
      }
      attempts++;
    }

    setNoPos({ x: newX, y: newY, isMoved: true });
    setEvadeCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    soundManager.playGiftOpen();
    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#FF85A1', '#FFD166', '#A78BC8', '#6BCB77', '#E6384F']
      });
    } catch {}
    if (onNext) onNext();
  };

  // Determine current GIF based on evades
  let currentGif = '/images/shinchan_dance_anim2.gif';
  let currentPrompt = 'There is so much love waiting inside for you! 🥰';

  if (evadeCount === 1) {
    currentGif = '/images/shinchan_plead_anim.gif';
    currentPrompt = 'Hey! The NO button ran away from you! 🏃‍♂️💨';
  } else if (evadeCount === 2) {
    currentGif = '/images/shinchan_butt.gif';
    currentPrompt = "Haha, you can't catch NO! 😜 Just click YES!";
  } else if (evadeCount === 3) {
    currentGif = '/images/shinchan_cry_dramatic.gif';
    currentPrompt = 'Look how big YES is getting! Give in and click it! 💖';
  } else if (evadeCount >= 4) {
    currentGif = '/images/shinchan_dance_anim.gif';
    currentPrompt = 'Still trying to catch NO?! The giant YES button is waiting! 🚀🎉';
  }

  // YES button size increases slowly slowly with each evasion/click
  const yesScale = Math.min(1 + evadeCount * 0.14, 2.0);

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      {/* RED-AND-WHITE CHECKERED GINGHAM CARD WRAPPER */}
      <div style={{
        maxWidth: '680px',
        width: '100%',
        padding: '12px',
        background: 'repeating-conic-gradient(#D75265 0% 25%, #FFFFFF 0% 50%) 50% / 14px 14px',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
      }}>
        {/* INNER CARD WITH PINK VERTICAL STRIPES */}
        <div style={{
          backgroundColor: '#FFF0F3',
          backgroundImage: 'repeating-linear-gradient(90deg, #FFF0F3, #FFF0F3 26px, #FCE2E8 26px, #FCE2E8 52px)',
          borderRadius: '16px',
          padding: '36px 24px 36px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '520px',
        }}>
          {/* Confetti sprinkle particles */}
          <span style={{ position: 'absolute', top: '15px', left: '20px', width: '8px', height: '8px', background: '#FFD166', transform: 'rotate(20deg)' }} />
          <span style={{ position: 'absolute', top: '20px', right: '35px', width: '10px', height: '6px', background: '#4D96FF', transform: 'rotate(-30deg)' }} />
          <span style={{ position: 'absolute', top: '40%', left: '6%', color: '#FF922B', fontSize: '1rem' }}>★</span>
          <span style={{ position: 'absolute', top: '30%', right: '8%', color: '#E6384F', fontSize: '0.9rem' }}>■</span>
          <span style={{ position: 'absolute', bottom: '25%', right: '7%', color: '#4D96FF', fontSize: '1rem' }}>★</span>
          <span style={{ position: 'absolute', bottom: '15%', left: '8%', color: '#FF85A1', fontSize: '1rem' }}>●</span>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)',
            color: '#8C1D2F',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 16px 0',
            fontFamily: 'var(--font-ui)',
            letterSpacing: '0.2px'
          }}>
            {config?.surprise2?.heading || "Are you really excited?"}
          </h1>

          {/* Animated Shinchan Celebratory / Emotional GIF */}
          <div style={{
            margin: '12px auto 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px'
          }}>
            <div style={{
              background: '#FFFFFF',
              padding: '10px',
              borderRadius: '16px',
              border: '2px solid rgba(230, 56, 79, 0.15)',
              boxShadow: '0 8px 24px rgba(230, 56, 79, 0.12)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              maxWidth: '240px',
              maxHeight: '240px'
            }}>
              <img
                key={currentGif}
                src={currentGif}
                alt="Shinchan Animation"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'contain',
                  borderRadius: '10px'
                }}
              />
            </div>
          </div>

          {/* Playful Prompt */}
          <p style={{
            fontSize: '1.2rem',
            color: '#8C1D2F',
            fontWeight: 800,
            marginBottom: '28px',
            fontFamily: 'var(--font-ui)',
            minHeight: '32px',
            transition: 'all 0.25s ease'
          }}>
            {currentPrompt}
          </p>

          {/* Buttons Area */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            minHeight: '75px',
            position: 'relative'
          }}>
            {/* YES Button - Scales up slowly slowly with every NO attempt */}
            <button
              onClick={handleYesClick}
              style={{
                background: '#C82A3A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: evadeCount > 2 ? '14px 48px' : '10px 38px',
                fontSize: evadeCount > 2 ? '1.25rem' : '1.15rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: evadeCount > 1
                  ? '0 0 20px rgba(230, 56, 79, 0.5), inset 2px 2px 3px rgba(255, 255, 255, 0.5), 0 6px 16px rgba(200, 42, 58, 0.35)'
                  : 'inset 2px 2px 3px rgba(255, 255, 255, 0.5), 0 6px 16px rgba(200, 42, 58, 0.35)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.3s ease, font-size 0.3s ease',
                transform: `scale(${yesScale})`,
                zIndex: 5,
              }}
              className="hover:scale-105 active:scale-95"
            >
              {evadeCount > 3 ? 'YES! TAKE ME THERE! 💖✨' : 'YES'}
            </button>

            {/* Normal inline NO button before first move */}
            {!noPos.isMoved && (
              <button
                onClick={handleNoEvade}
                onMouseEnter={handleNoEvade}
                onTouchStart={handleNoEvade}
                style={{
                  background: '#C82A3A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '10px 38px',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: 'inset 2px 2px 3px rgba(255, 255, 255, 0.5), 0 6px 16px rgba(200, 42, 58, 0.35)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  transition: 'transform 0.2s ease',
                }}
                className="hover:scale-105 active:scale-95"
              >
                NO
              </button>
            )}
          </div>

          {/* Teleported / Relocated NO Button (Jumps across card not near to previous position) */}
          {noPos.isMoved && (
            <button
              onClick={handleNoEvade}
              onMouseEnter={handleNoEvade}
              onTouchStart={handleNoEvade}
              style={{
                position: 'absolute',
                left: `${noPos.x}%`,
                top: `${noPos.y}%`,
                transform: 'translate(-50%, -50%)',
                background: '#C82A3A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '9px 34px',
                fontSize: '1.1rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: 'inset 2px 2px 3px rgba(255, 255, 255, 0.5), 0 8px 20px rgba(0, 0, 0, 0.25)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 10,
                whiteSpace: 'nowrap'
              }}
              className="hover:scale-110 active:scale-90"
            >
              NO 🏃‍♂️
            </button>
          )}

        </div>
      </div>
    </div>
  );
};
