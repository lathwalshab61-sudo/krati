import React, { useState } from 'react';
import { MemoryIllustration } from './Illustrations';
import { soundManager } from '../utils/audio';
import { Camera, Heart, Sparkles, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MemoryGallery = ({ onNext, config }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [likes, setLikes] = useState({});

  const memoriesConfig = config?.memories || {};
  const photos = memoriesConfig?.photos || [
    {
      id: 1,
      title: "That Unforgettable Smile",
      date: "Chapter One",
      caption: "The world became so much brighter and warmer the moment you smiled. A memory etched in my heart forever. ✨",
      frameColor: "pink",
      rotation: -3,
      imageUrl: null,
      emoji: "🌸",
      tag: "First Memory",
    },
    {
      id: 2,
      title: "Laughs & Little Adventures",
      date: "Best Days",
      caption: "Even the simplest ordinary days turn into magical adventures full of random giggles and joy. 🎈",
      frameColor: "lavender",
      rotation: 2.5,
      imageUrl: null,
      emoji: "🍭",
      tag: "Joyful Moments",
    },
    {
      id: 3,
      title: "Late Night Conversations",
      date: "Heart to Heart",
      caption: "Talking for hours under the stars, losing track of time, spilling secrets, and laughing non-stop. 🌙",
      frameColor: "cream",
      rotation: -2,
      imageUrl: null,
      emoji: "⭐",
      tag: "Precious Talks",
    },
    {
      id: 4,
      title: "Foodie Drama & Shenanigans",
      date: "Delicious Chaos",
      caption: "Fighting for the last bite of pizza and ordering way too much because 'we totally deserve it'! 🍕🍟",
      frameColor: "pink",
      rotation: 3,
      imageUrl: null,
      emoji: "🍕",
      tag: "Food Lovers",
    },
    {
      id: 5,
      title: "Unfiltered Goofiness",
      date: "Caught in 4K",
      caption: "The weird faces, inside jokes that nobody else understands, and pure unadulterated silliness. 🤪📸",
      frameColor: "lavender",
      rotation: -2.5,
      imageUrl: null,
      emoji: "📸",
      tag: "Zero Filter",
    },
    {
      id: 6,
      title: "Road Trips & Sunset Chasing",
      date: "Adventure Time",
      caption: "Blasting our favorite playlist with the windows down, singing out of tune at the top of our lungs. 🚗🌅",
      frameColor: "cream",
      rotation: 2,
      imageUrl: null,
      emoji: "🚗",
      tag: "Free Spirits",
    },
    {
      id: 7,
      title: "Comfort & Safe Harbor",
      date: "Quiet Warmth",
      caption: "Those peaceful quiet moments where no words were needed, just knowing you are there is everything. ☕🧸",
      frameColor: "pink",
      rotation: -1.5,
      imageUrl: null,
      emoji: "🧸",
      tag: "Safe Space",
    },
    {
      id: 8,
      title: "Forever & Always",
      date: "A Lifetime Ahead",
      caption: "Here is to another year of shared dreams, unstoppable laughter, and endless happiness together! 🥂💕",
      frameColor: "lavender",
      rotation: 3.5,
      imageUrl: null,
      emoji: "💖",
      tag: "Forever Bond",
    },
  ];

  const handlePhotoClick = (index) => {
    soundManager.playPop();
    setActivePhotoIndex(index);
  };

  const handleCloseModal = () => {
    setActivePhotoIndex(null);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    soundManager.playPop();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    soundManager.playPop();
    setActivePhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handleToggleLike = (e, photoId) => {
    e.stopPropagation();
    soundManager.playUnlockSuccess();
    setLikes((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#FF5D73', '#FF85A1', '#FFD166'],
      });
    } catch {}
  };

  const handleProceed = () => {
    soundManager.playUnlockSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#A78BC8', '#FF85A1', '#FFD166']
      });
    } catch {}
    if (onNext) onNext();
  };

  const getFrameStyle = (colorType) => {
    switch (colorType) {
      case 'pink':
        return {
          borderColor: '#F8DCE4',
          badgeBg: '#FFF0F3',
          badgeColor: '#E6384F',
          tapeBg: 'rgba(255, 182, 193, 0.7)',
        };
      case 'lavender':
        return {
          borderColor: '#E2D4F0',
          badgeBg: '#F3E8FF',
          badgeColor: '#8C6BB1',
          tapeBg: 'rgba(197, 163, 230, 0.7)',
        };
      case 'cream':
      default:
        return {
          borderColor: '#F3E6C8',
          badgeBg: '#FFF9E9',
          badgeColor: '#B48827',
          tapeBg: 'rgba(255, 233, 168, 0.7)',
        };
    }
  };

  // Color bulbs for hanging string lights
  const bulbColors = ['#FF5D73', '#FFD166', '#4D96FF', '#6BCB77', '#A78BC8', '#FF85A1', '#FFD166', '#4D96FF', '#FF5D73', '#A78BC8'];

  const activePhoto = activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  return (
    <div className="bg-scrapbook" style={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px 48px 16px',
      position: 'relative'
    }}>
      
      {/* HANGING STRING LIGHTS ACROSS THE TOP */}
      <div style={{
        width: '100%',
        maxWidth: '1150px',
        position: 'relative',
        height: '42px',
        marginBottom: '16px'
      }}>
        {/* Curved wire line */}
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" style={{ width: '100%', height: '40px' }}>
          <path
            d="M0,8 Q250,28 500,10 Q750,28 1000,8"
            stroke="#7C6B53"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>

        {/* Glowing Bulbs */}
        {bulbColors.map((color, idx) => {
          const leftPercent = (idx / (bulbColors.length - 1)) * 94 + 3;
          const topOffset = idx % 2 === 0 ? 16 : 22;
          return (
            <div
              key={idx}
              className="bulb"
              style={{
                left: `${leftPercent}%`,
                top: `${topOffset}px`,
                backgroundColor: color,
                color: color,
                animationDelay: `${idx * 0.2}s`,
              }}
            />
          );
        })}
      </div>

      <div style={{
        maxWidth: '1200px',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        
        {/* Chapter Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FFFFFF',
          color: '#E6384F',
          padding: '6px 20px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 800,
          boxShadow: '0 4px 12px rgba(57, 40, 61, 0.08)',
          marginBottom: '12px',
          border: '1.5px solid #F3E6C8'
        }}>
          <Camera size={16} />
          <span>CHAPTER 3 : OUR MEMORIES SCRAPBOOK ({photos.length} SPECIAL MOMENTS)</span>
          <Camera size={16} />
        </div>

        {/* Heading */}
        <h1 className="font-handwritten" style={{
          fontSize: 'clamp(2.4rem, 6vw, 3.4rem)',
          color: '#39283D',
          lineHeight: 1.15,
          marginBottom: '6px',
          fontWeight: 700
        }}>
          {memoriesConfig?.heading || "Memories Scrapbook"}
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: '#6E5C74',
          marginBottom: '36px',
          fontWeight: 600
        }}>
          {memoriesConfig?.subheading || "A little collection of cherished moments and smiles 📸✨"}
        </p>

        {/* 8 PHOTO CARDS IN A BALANCED RESPONSIVE GRID (4x2 on desktop, 2x4 on mobile) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          width: '100%',
          marginBottom: '48px'
        }}>
          {photos.map((photo, idx) => {
            const frameTheme = getFrameStyle(photo.frameColor);
            const photoLikes = likes[photo.id] || 0;

            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(idx)}
                className="polaroid-card group cursor-pointer"
                style={{
                  transform: `rotate(${photo.rotation || 0}deg)`,
                  border: `3px solid ${frameTheme.borderColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '12px 12px 16px 12px',
                  boxShadow: '0 8px 24px rgba(57, 40, 61, 0.08)'
                }}
              >
                {/* Washi tape at top of each photo */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '18px',
                  backgroundColor: frameTheme.tapeBg,
                  borderRadius: '2px',
                  borderLeft: '2px dashed rgba(255,255,255,0.7)',
                  borderRight: '2px dashed rgba(255,255,255,0.7)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  zIndex: 2
                }} />

                {/* Photo Container */}
                <div style={{
                  width: '100%',
                  height: '190px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#F9F5EB',
                  position: 'relative',
                  marginBottom: '12px'
                }}>
                  {photo.imageUrl ? (
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <div style={{ width: '100%', height: '100%', display: photo.imageUrl ? 'none' : 'block' }}>
                    <MemoryIllustration index={idx} />
                  </div>
                </div>

                {/* Date & Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: frameTheme.badgeColor,
                    background: frameTheme.badgeBg,
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}>
                    {photo.date}
                  </span>
                  <span style={{ fontSize: '0.9rem' }}>{photo.emoji || "✨"}</span>
                </div>

                {/* Title */}
                <h3 className="font-handwritten" style={{
                  fontSize: '1.35rem',
                  color: '#39283D',
                  fontWeight: 700,
                  marginBottom: '4px',
                  lineHeight: 1.2
                }}>
                  {photo.title}
                </h3>

                {/* Caption */}
                <p style={{
                  fontSize: '0.82rem',
                  color: '#6E5C74',
                  lineHeight: 1.4,
                  flexGrow: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {photo.caption}
                </p>

                {/* Footer with Heart & Click to view */}
                <div style={{
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px dashed #EEDCC8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#E6384F',
                }}>
                  <button
                    onClick={(e) => handleToggleLike(e, photo.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: photoLikes > 0 ? '#E6384F' : '#9E889D',
                      padding: 0,
                      fontWeight: 700
                    }}
                  >
                    <Heart size={14} fill={photoLikes > 0 ? '#E6384F' : 'none'} />
                    <span>{photoLikes > 0 ? `${photoLikes}` : 'Love'}</span>
                  </button>
                  <span>Click to view 🔍</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Step Button */}
        <button
          onClick={handleProceed}
          className="btn-primary"
          style={{
            padding: '16px 40px',
            fontSize: '1.2rem',
            boxShadow: '0 10px 28px rgba(230, 56, 79, 0.35)'
          }}
        >
          <Heart size={20} fill="#FFFFFF" />
          <span>{memoriesConfig?.nextButtonText || "Read My Birthday Letter 💌 →"}</span>
          <ArrowRight size={20} />
        </button>

      </div>

      {/* Lightbox Modal with Next / Prev Navigation for all 8 memories */}
      {activePhoto && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(20, 23, 36, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '20px'
        }} onClick={handleCloseModal}>
          <div 
            className="polaroid-card"
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '24px 24px 28px 24px',
              background: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative',
              borderRadius: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#F0E6D8',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#39283D',
                zIndex: 20
              }}
            >
              <X size={18} />
            </button>

            {/* Expanded Image / Illustration with Navigation Arrows */}
            <div style={{
              width: '100%',
              height: '320px',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '16px',
              position: 'relative'
            }}>
              {activePhoto.imageUrl ? (
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <MemoryIllustration index={activePhotoIndex} />
              )}

              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#39283D',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  zIndex: 10
                }}
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#39283D',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  zIndex: 10
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Counter & Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{
                  background: '#FFF0F3',
                  color: '#E6384F',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px'
                }}>
                  {activePhoto.date}
                </span>
                <span style={{
                  background: '#F3E8FF',
                  color: '#8C6BB1',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '999px'
                }}>
                  {activePhotoIndex + 1} of {photos.length}
                </span>
              </div>
              <span style={{ fontSize: '1.2rem' }}>{activePhoto.emoji || "🌸"}</span>
            </div>

            <h2 className="font-handwritten" style={{
              fontSize: '2rem',
              color: '#39283D',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              {activePhoto.title}
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#55425B',
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              {activePhoto.caption}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={(e) => handleToggleLike(e, activePhoto.id)}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#FFF0F3',
                  border: '1.5px solid #F8DCE4',
                  borderRadius: '999px',
                  padding: '10px',
                  color: '#E6384F',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                <Heart size={18} fill={likes[activePhoto.id] ? '#E6384F' : 'none'} />
                <span>{likes[activePhoto.id] ? `Loved (${likes[activePhoto.id]})` : 'Love this memory'}</span>
              </button>

              <button
                onClick={handleCloseModal}
                className="btn-primary"
                style={{ flex: 1, padding: '10px' }}
              >
                Back to Scrapbook ✨
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
