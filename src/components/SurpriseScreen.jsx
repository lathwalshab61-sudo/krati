import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

export const SurpriseScreen = ({ onNext, config }) => {
  const [noCount, setNoCount] = useState(0);

  const handleNoClick = () => {
    soundManager.playPop();
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    soundManager.playUnlockSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF85A1', '#FFD166', '#A78BC8', '#E6384F']
      });
    } catch {}
    if (onNext) onNext();
  };

  // Determine which GIF, prompt, and button scales to show based on how many times NO was pressed
  let currentGif = '/images/shinchan_dance_anim.gif';
  let currentPrompt = 'Do you wanna see it ?';

  if (noCount === 1) {
    currentGif = '/images/shinchan_plead_anim.gif';
    currentPrompt = 'Are you sure? 🥺 Please say YES! 💖';
  } else if (noCount === 2) {
    currentGif = '/images/shinchan_cry_anim.gif';
    currentPrompt = 'Wait, you clicked NO again?! Look how sad he is! 😭';
  } else if (noCount === 3) {
    currentGif = '/images/shinchan_cry_dramatic.gif';
    currentPrompt = 'Final warning! 😱 The NO button is about to vanish forever!';
  } else if (noCount >= 4) {
    currentGif = '/images/shinchan_butt.gif';
    currentPrompt = "NO button is GONE! 😜 Only YES is left, you can't escape now! 💕🎉";
  }

  // Calculate scales for YES and NO
  const yesScale = noCount === 0 ? 1 : noCount === 1 ? 1.3 : noCount === 2 ? 1.6 : noCount === 3 ? 1.95 : 1.25;
  const noScale = noCount === 0 ? 1 : noCount === 1 ? 0.82 : noCount === 2 ? 0.64 : 0.46;

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
          padding: '36px 24px 32px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Confetti sprinkle particles */}
          <span style={{ position: 'absolute', top: '15px', left: '18px', width: '8px', height: '8px', background: '#FFD166', transform: 'rotate(20deg)' }} />
          <span style={{ position: 'absolute', top: '16px', right: '40px', width: '10px', height: '6px', background: '#4D96FF', transform: 'rotate(-30deg)' }} />
          <span style={{ position: 'absolute', top: '35%', left: '8%', color: '#FF922B', fontSize: '1rem' }}>★</span>
          <span style={{ position: 'absolute', top: '25%', right: '10%', color: '#E6384F', fontSize: '0.9rem' }}>■</span>
          <span style={{ position: 'absolute', bottom: '30%', right: '6%', color: '#4D96FF', fontSize: '1rem' }}>★</span>
          <span style={{ position: 'absolute', bottom: '15%', left: '10%', color: '#FF85A1', fontSize: '1rem' }}>●</span>

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
            I have made something for you
          </h1>

          {/* ANIMATED GIF CONTAINER WITH POLISHED CARD PRESENTATION */}
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

          {/* Prompt */}
          <p style={{
            fontSize: '1.25rem',
            color: '#8C1D2F',
            fontWeight: 800,
            marginBottom: '26px',
            fontFamily: 'var(--font-ui)',
            minHeight: '32px',
            transition: 'all 0.25s ease'
          }}>
            {currentPrompt}
          </p>

          {/* Glossy Red Pill Buttons with Underlines */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: noCount >= 4 ? '0px' : `${Math.max(16, 28 + noCount * 6)}px`,
            minHeight: '75px',
            position: 'relative'
          }}>
            {/* YES Button */}
            <button
              onClick={handleYesClick}
              style={{
                background: '#C82A3A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: noCount >= 4 ? '18px 52px' : '10px 38px',
                fontSize: noCount >= 4 ? '1.45rem' : '1.15rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: noCount >= 4
                  ? '0 0 25px rgba(230, 56, 79, 0.7), inset 2px 2px 4px rgba(255, 255, 255, 0.6), 0 8px 24px rgba(200, 42, 58, 0.5)'
                  : 'inset 2px 2px 3px rgba(255, 255, 255, 0.5), 0 6px 16px rgba(200, 42, 58, 0.35)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: `scale(${yesScale})`,
                zIndex: 2,
                letterSpacing: noCount >= 4 ? '1px' : 'normal',
                animation: noCount >= 4 ? 'pulse 1.6s infinite' : 'none'
              }}
              className="hover:scale-105 active:scale-95"
            >
              {noCount >= 4 ? 'YES, OF COURSE! 💖✨' : 'YES'}
            </button>

            {/* NO Button - Shrinks 4 times then disappears completely */}
            {noCount < 4 && (
              <button
                onClick={handleNoClick}
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
                  transition: 'all 0.25s ease',
                  transform: `scale(${noScale})`,
                  transformOrigin: 'center center',
                  opacity: Math.max(0.65, 1 - noCount * 0.1),
                }}
                className="hover:scale-105 active:scale-95"
              >
                NO
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
