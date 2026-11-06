import React from 'react';
import { CuteBirthdayTeddy } from './Illustrations';
import { soundManager } from '../utils/audio';
import { Heart, Sparkles, Mail, Cake, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BirthdayLetter = ({ onNext, config }) => {
  const letterConfig = config?.letter || {};
  const recipientName = config?.recipientName || "My Favourite Person";

  const paragraphs = letterConfig?.paragraphs || [
    "Happy Birthday to my favourite person! 💗",
    "Today is all about you, your smile, and all the little things that make you special.",
    "I hope your day is filled with happiness, laughter, beautiful memories, and all the love you deserve.",
    "Thank you for being such a wonderful part of my world. May this new year of your life bring you countless reasons to smile.",
    "You deserve every beautiful thing life has to offer.",
    "Happy Birthday! 🎂💕"
  ];

  const handleProceed = () => {
    soundManager.playGiftOpen();
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF85A1', '#FFD166', '#A78BC8', '#E6384F']
      });
    } catch {}
    if (onNext) onNext();
  };

  return (
    <div className="bg-lavender-theme" style={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '36px 16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Floating Hearts in Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '8%', fontSize: '1.8rem', opacity: 0.3 }} className="animate-float-slow">💖</div>
        <div style={{ position: 'absolute', top: '75%', left: '5%', fontSize: '1.4rem', opacity: 0.35 }} className="animate-float-slow">✨</div>
        <div style={{ position: 'absolute', top: '20%', right: '7%', fontSize: '2rem', opacity: 0.25 }} className="animate-float-slow">🌸</div>
        <div style={{ position: 'absolute', top: '80%', right: '10%', fontSize: '1.6rem', opacity: 0.3 }} className="animate-float-slow">💕</div>
      </div>

      <div style={{
        maxWidth: '1020px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'center',
        zIndex: 10
      }}>
        
        {/* ================= LEFT: FRAMED BIRTHDAY ILLUSTRATION ================= */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* Paper card with gentle floating & tilting */}
          <div className="paper-card animate-float-slow" style={{
            maxWidth: '360px',
            width: '100%',
            padding: '32px 24px',
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '4px solid #FCE5EC',
            boxShadow: '0 20px 45px rgba(57, 40, 61, 0.25)',
            position: 'relative'
          }}>
            {/* Washi Tape */}
            <div className="washi-tape-top" />

            {/* Stamp in corner */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              border: '2px dashed #FF85A1',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#E6384F',
              transform: 'rotate(10deg)'
            }}>
              POSTAGE PAID ❤️
            </div>

            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
              <CuteBirthdayTeddy className="w-56 h-56 mx-auto" />
            </div>

            <h3 className="font-handwritten" style={{
              fontSize: '2rem',
              color: '#E6384F',
              fontWeight: 700,
              marginBottom: '6px'
            }}>
              For {recipientName}
            </h3>

            <p style={{
              fontSize: '0.9rem',
              color: '#6E5C74',
              lineHeight: 1.4
            }}>
              Every word in this letter was written with genuine love and appreciation for you.
            </p>
          </div>
        </div>

        {/* ================= RIGHT: VINTAGE BIRTHDAY LETTER CARD ================= */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div className="paper-card" style={{
            width: '100%',
            maxWidth: '540px',
            padding: '40px 32px',
            background: '#FFF9E9',
            borderRadius: '24px',
            border: '3px solid #EBDCBA',
            boxShadow: '0 20px 50px rgba(57, 40, 61, 0.28)',
            position: 'relative'
          }}>
            {/* Washi Tape Accent */}
            <div className="washi-tape-top" style={{ background: 'rgba(230, 56, 79, 0.4)' }} />

            {/* Top Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFF0F3',
              color: '#E6384F',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              marginBottom: '16px',
              border: '1px solid #FCE5EC'
            }}>
              <Mail size={14} />
              <span>{letterConfig?.badge || "A LETTER FROM MY HEART 💌"}</span>
            </div>

            {/* Heading */}
            <h2 className="font-handwritten" style={{
              fontSize: 'clamp(2rem, 5vw, 2.7rem)',
              color: '#E6384F',
              lineHeight: 1.15,
              fontWeight: 700,
              marginBottom: '18px',
              textShadow: '0 1px 3px rgba(230, 56, 79, 0.15)'
            }}>
              {letterConfig?.heading || "Happy birthday to my favourite person"}
            </h2>

            {/* Letter Body Content */}
            <div style={{
              fontFamily: 'var(--font-letter)',
              fontSize: '1.35rem',
              color: '#39283D',
              lineHeight: 1.6,
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {paragraphs.map((p, idx) => (
                <p key={idx} style={{ margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signature & Wax Seal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px dashed #E0CFAC',
              paddingTop: '16px',
              marginTop: '12px'
            }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#887455', fontStyle: 'italic', marginBottom: '2px' }}>
                  {letterConfig?.signature || "With all my love,"}
                </p>
                <p className="font-handwritten" style={{ fontSize: '1.4rem', color: '#E6384F', fontWeight: 700 }}>
                  {letterConfig?.signerName || config?.senderName || "Always Yours ❤️"}
                </p>
              </div>

              {/* Red Wax Seal */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #E6384F 40%, #B31B32 100%)',
                boxShadow: '0 4px 12px rgba(179, 27, 50, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '1.2rem',
                border: '2px solid #8C0E20'
              }}>
                ❤️
              </div>
            </div>

            {/* Advance to Final Cake Screen Button */}
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <button
                onClick={handleProceed}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '16px 28px',
                  fontSize: '1.15rem',
                  background: 'linear-gradient(135deg, #FF5D73 0%, #E6384F 100%)',
                  boxShadow: '0 10px 25px rgba(230, 56, 79, 0.35)'
                }}
              >
                <Cake size={20} />
                <span>{letterConfig?.nextButtonText || "Make A Birthday Wish! 🎂 →"}</span>
                <ArrowRight size={20} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
