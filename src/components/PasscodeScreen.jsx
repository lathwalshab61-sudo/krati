import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { Delete, RotateCcw } from 'lucide-react';

export const PasscodeScreen = ({ onUnlocked, config, passcode }) => {
  const [digits, setDigits] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const targetPasscode = passcode || config?.passcode || "1234";

  const handleKeyPress = (num) => {
    if (isWrong) {
      setDigits(String(num));
      setIsWrong(false);
      soundManager.playKeypad(num);
      return;
    }

    if (digits.length >= 4) return;
    const newDigits = digits + num;
    setDigits(newDigits);
    soundManager.playKeypad(num);

    // Auto-check when 4 digits are reached
    if (newDigits.length === 4) {
      validateCode(newDigits);
    }
  };

  const handleBackspace = () => {
    soundManager.playPop();
    setIsWrong(false);
    setDigits((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    soundManager.playPop();
    setDigits('');
    setIsWrong(false);
  };

  const validateCode = (codeToTest) => {
    const code = codeToTest !== undefined ? codeToTest : digits;
    if (code === targetPasscode) {
      soundManager.playUnlockSuccess();
      setIsSuccess(true);
      setTimeout(() => {
        if (onUnlocked) onUnlocked();
      }, 700);
    } else {
      soundManager.playError();
      setIsWrong(true);
    }
  };

  const handleSkip = () => {
    soundManager.playUnlockSuccess();
    if (onUnlocked) onUnlocked();
  };

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      {/* CARD CONTAINER MATCHING THE REFERENCE VIDEO */}
      <div style={{
        maxWidth: '820px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
        position: 'relative',
        background: '#FAF6E9',
      }}>

        {/* ================= LEFT COLUMN: CREAM WITH SHINCHAN ================= */}
        <div style={{
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#FAF6E9',
          backgroundImage: 'repeating-linear-gradient(90deg, #FAF6E9, #FAF6E9 22px, #F0EAD2 22px, #F0EAD2 44px)',
          overflow: 'hidden'
        }}>
          {/* Decorative Stars */}
          <span style={{ position: 'absolute', top: '15%', right: '15%', color: '#E6384F', fontSize: '1.2rem' }}>★</span>
          <span style={{ position: 'absolute', top: '50%', right: '8%', color: '#3BA99C', fontSize: '1.1rem' }}>★</span>
          <span style={{ position: 'absolute', bottom: '15%', right: '18%', color: '#4D96FF', fontSize: '1.3rem' }}>★</span>
          <span style={{ position: 'absolute', bottom: '25%', left: '10%', color: '#FFD166', fontSize: '1.1rem' }}>★</span>

          {/* Scalloped Purple Postage-Stamp Frame */}
          <div style={{
            position: 'relative',
            padding: '16px',
            borderRadius: '16px',
            backgroundColor: '#826F9E',
            boxShadow: '0 10px 28px rgba(0,0,0,0.2)',
            display: 'inline-block',
            maxWidth: '280px',
            width: '100%',
            transition: 'transform 0.3s ease'
          }} className="animate-float-slow">
            
            {/* Scalloped teeth around frame */}
            <div style={{
              position: 'absolute',
              inset: '-6px',
              border: '6px dotted #826F9E',
              borderRadius: '22px',
              pointerEvents: 'none'
            }} />

            {/* Inner White and Gold Bordered Photo */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '6px',
              boxShadow: 'inset 0 0 0 2px #E8C170'
            }}>
              <div style={{
                borderRadius: '6px',
                overflow: 'hidden',
                width: '100%',
                height: '210px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFF8F0'
              }}>
                {isWrong ? (
                  /* Animated Crying / Emotional Shinchan on incorrect passcode */
                  <img
                    src="/images/shinchan_cry_anim.gif"
                    alt="Wrong Passcode - Shinchan Crying"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '4px'
                    }}
                  />
                ) : (
                  /* Shinchan Celebration Animated GIF (Initial state) */
                  <img
                    src="/images/shinchan_happy.gif"
                    alt="Shinchan Happy Celebration"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '4px'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: LAVENDER KEYPAD ================= */}
        <div style={{
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#826F9E',
          color: '#FFFFFF',
          position: 'relative'
        }}>
          {/* Wavy left divider overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '-12px',
            width: '16px',
            overflow: 'hidden',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
          }}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '18px',
                  height: '28px',
                  borderRadius: '50% 0 0 50%',
                  backgroundColor: '#826F9E',
                  margin: '-4px 0'
                }}
              />
            ))}
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            marginBottom: '4px',
            color: '#FFFFFF',
            textAlign: 'center',
            letterSpacing: '0.3px'
          }}>
            Enter a passcode
          </h2>

          {/* Subtitle / Status */}
          <p style={{
            fontSize: '0.85rem',
            color: isWrong ? '#FFD1D6' : '#E8DCF5',
            marginBottom: '18px',
            textAlign: 'center',
            fontWeight: 600,
            minHeight: '22px'
          }}>
            {isWrong
              ? "Oops! Wrong Passcode! Try again, buddy! 😭"
              : "Enter the 4-digit secret passcode 💖"}
          </p>

          {/* 4 Square Digit Indicator Boxes */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            {[0, 1, 2, 3].map((idx) => {
              const val = digits[idx];
              const isFilled = val !== undefined;
              const isCurrent = digits.length === idx;

              return (
                <div
                  key={idx}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: isFilled ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.12)',
                    border: isWrong
                      ? '2px solid #FF5D73'
                      : isCurrent
                      ? '2px solid #E5C358'
                      : '2px solid rgba(255, 255, 255, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: isWrong ? '#FFD1D6' : '#FFFFFF',
                    boxShadow: isCurrent ? '0 0 10px rgba(229, 195, 88, 0.5)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isFilled ? val : ''}
                </div>
              );
            })}
          </div>

          {/* Try Again Button (Shown when wrong passcode) */}
          {isWrong && (
            <button
              onClick={handleClear}
              className="btn-primary"
              style={{
                marginBottom: '16px',
                padding: '8px 24px',
                fontSize: '0.9rem',
                background: '#E6384F',
                boxShadow: '0 4px 12px rgba(230, 56, 79, 0.4)'
              }}
            >
              <RotateCcw size={15} />
              <span>Try Again 🔄</span>
            </button>
          )}

          {/* 3-Column Keypad */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px',
            marginBottom: '14px'
          }}>
            {/* 1, 2, 3 */}
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => handleKeyPress(n)}
                className="keypad-btn"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#8B1E2E',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  cursor: 'pointer'
                }}
              >
                <span>{n}</span>
                <span style={{ width: '12px', height: '2px', background: '#E8A3AC', marginTop: '-2px', borderRadius: '1px' }} />
              </button>
            ))}

            {/* 4, 5, 6 */}
            {[4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => handleKeyPress(n)}
                className="keypad-btn"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#8B1E2E',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  cursor: 'pointer'
                }}
              >
                <span>{n}</span>
                <span style={{ width: '12px', height: '2px', background: '#E8A3AC', marginTop: '-2px', borderRadius: '1px' }} />
              </button>
            ))}

            {/* 7, 8, 9 */}
            {[7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handleKeyPress(n)}
                className="keypad-btn"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#8B1E2E',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  cursor: 'pointer'
                }}
              >
                <span>{n}</span>
                <span style={{ width: '12px', height: '2px', background: '#E8A3AC', marginTop: '-2px', borderRadius: '1px' }} />
              </button>
            ))}

            {/* Row 4: Backspace, 0, Heart (Unlock) */}
            <button
              onClick={handleBackspace}
              className="keypad-btn"
              title="Backspace"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#FFFFFF',
                color: '#E6384F',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Delete size={22} color="#E6384F" />
            </button>

            <button
              onClick={() => handleKeyPress(0)}
              className="keypad-btn"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#FFFFFF',
                color: '#8B1E2E',
                fontSize: '1.25rem',
                fontWeight: 800,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
            >
              <span>0</span>
              <span style={{ width: '12px', height: '2px', background: '#E8A3AC', marginTop: '-2px', borderRadius: '1px' }} />
            </button>

            <button
              onClick={() => validateCode()}
              className="keypad-btn"
              title="Unlock with Love"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#FFF0F3',
                border: '2px solid #FF85A1',
                boxShadow: '0 4px 12px rgba(230, 56, 79, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.3rem'
              }}
            >
              <span>💖</span>
            </button>
          </div>

          {/* Quick Skip button for testing */}
          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginTop: '4px'
            }}
            className="hover:text-white"
          >
            Skip to birthday surprise →
          </button>
        </div>

      </div>
    </div>
  );
};
