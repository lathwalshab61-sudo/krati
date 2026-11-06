import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Header = ({ currentStep, totalSteps, titleConfig, onReset }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleToggleMusic = () => {
    const isNowPlaying = soundManager.toggleMusic();
    setIsPlayingMusic(isNowPlaying);
  };

  return (
    <header style={{
      width: '100%',
      padding: '24px 20px 16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'transparent',
      zIndex: 50
    }}>
      {/* Centered Website Title matching the reference video */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: 'clamp(1.7rem, 4vw, 2.3rem)',
        fontWeight: 900,
        letterSpacing: '0.5px',
        fontFamily: 'var(--font-ui)',
        textAlign: 'center',
        userSelect: 'none'
      }}>
        <span style={{ color: '#FFFFFF' }}>{titleConfig?.prefix || "Secret"}</span>
        <span style={{ color: '#E6384F', textShadow: '0 0 16px rgba(230, 56, 79, 0.45)' }}>
          {titleConfig?.suffix || "Birthday Gift"}
        </span>
      </div>

      {/* Floating Control Buttons (Top-Right: Music & Restart) */}
      <div style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {/* Restart Experience */}
        <button
          onClick={onReset}
          title="Restart Experience"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            padding: '7px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          className="hover:scale-110 active:scale-95"
        >
          <RotateCcw size={16} />
        </button>

        {/* Music Player Button */}
        <button
          onClick={handleToggleMusic}
          title={isPlayingMusic ? "Mute Background Music" : "Play Gentle Birthday Music"}
          style={{
            background: isPlayingMusic 
              ? 'linear-gradient(135deg, #E6384F 0%, #FF85A1 100%)' 
              : 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '999px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 700,
            transition: 'all 0.25s ease',
          }}
          className="hover:scale-105 active:scale-95"
        >
          {isPlayingMusic ? (
            <>
              <Volume2 size={16} className="animate-bounce-gentle" />
              <span>Music: On 🎵</span>
            </>
          ) : (
            <>
              <VolumeX size={16} />
              <span>Music: Off 🔇</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
