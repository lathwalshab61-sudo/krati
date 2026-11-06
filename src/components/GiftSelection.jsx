import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, ArrowRight, X, ZoomIn, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GiftSelection = ({ onNext, config }) => {
  const giftSection = config?.giftSection || {};
  const gifts = giftSection?.gifts || [
    {
      id: "funny-1",
      boxColor: "#FF5D73",
      boxEmoji: "🚨",
      badge: "DO NOT OPEN ❌",
      title: "Warning: High Derp Energy",
      imageUrl: "/images/shinchan_butt.gif",
      caption: "When you say 'I am ready in 5 mins' but you haven't even gotten out of bed yet 🛌😂",
      tag: "Classic You 💀"
    },
    {
      id: "funny-2",
      boxColor: "#FFD166",
      boxEmoji: "🤪",
      badge: "CAUGHT IN 4K 📸",
      title: "The Hunger Meltdown",
      imageUrl: "/images/shinchan_cry_dramatic.gif",
      caption: "Your dramatic reaction when someone takes the last slice of pizza without asking 🍕😭",
      tag: "100% Chaos 🔥"
    },
    {
      id: "funny-3",
      boxColor: "#A78BC8",
      boxEmoji: "🏆",
      badge: "CERTIFIED GOOFBALL 👑",
      title: "Pure Celebration Mode",
      imageUrl: "/images/shinchan_happy.gif",
      caption: "You doing your goofy happy dance whenever good food or gossip arrives 🕺✨",
      tag: "My Favorite Idiot 💕"
    }
  ];

  const [openedGifts, setOpenedGifts] = useState({});
  const [activeModal, setActiveModal] = useState(null);

  const openedCount = Object.keys(openedGifts).length;
  const allOpened = openedCount === gifts.length;

  const handleOpenGift = (gift) => {
    if (openedGifts[gift.id]) {
      setActiveModal(gift);
      return;
    }

    soundManager.playGiftOpen();
    setOpenedGifts((prev) => ({ ...prev, [gift.id]: true }));

    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.5 },
        colors: ['#FFD166', '#FF5D73', '#A78BC8', '#4D96FF']
      });
    } catch {}
  };

  const handleOpenAll = () => {
    soundManager.playUnlockSuccess();
    const all = {};
    gifts.forEach((g) => { all[g.id] = true; });
    setOpenedGifts(all);
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF5D73', '#FFD166', '#A78BC8', '#6BCB77']
      });
    } catch {}
  };

  const handleProceed = () => {
    soundManager.playUnlockSuccess();
    if (onNext) onNext();
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
      <div style={{
        maxWidth: '1080px',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        
        {/* Top Header Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.12)',
          color: '#FFD166',
          padding: '6px 18px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 800,
          border: '1.5px solid rgba(255, 209, 102, 0.4)',
          marginBottom: '10px'
        }}>
          <PartyPopper size={16} />
          <span>CHAPTER 3 : THE SECRET FUNNY VAULT</span>
          <PartyPopper size={16} />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          color: '#FFFFFF',
          fontWeight: 900,
          letterSpacing: '0.5px',
          margin: '0 0 6px 0',
          textShadow: '0 4px 16px rgba(0,0,0,0.4)'
        }}>
          {giftSection?.heading || "The Secret Funny Vault 🎁🤣"}
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: '#E0D6EB',
          maxWidth: '650px',
          margin: '0 auto 18px auto',
          fontWeight: 600
        }}>
          {giftSection?.instruction || "Tap on each mystery box to unwrap a funny moment! (Prepare to laugh 💀)"}
        </p>

        {/* UNWRAP PROGRESS PILL */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '999px',
          padding: '6px 18px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <span style={{ fontSize: '0.85rem', color: '#FFD166', fontWeight: 800 }}>
            {openedCount} of {gifts.length} Moments Unwrapped 🤣
          </span>
          <div style={{
            width: '100px',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(openedCount / gifts.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF85A1, #FFD166)',
              borderRadius: '999px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          {!allOpened && (
            <button
              onClick={handleOpenAll}
              style={{
                background: 'none',
                border: 'none',
                color: '#FF85A1',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Open All 💥
            </button>
          )}
        </div>

        {/* 3 FUNNY MYSTERY GIFT BOXES */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '24px',
          width: '100%',
          marginBottom: '32px'
        }}>
          {gifts.map((gift) => {
            const isOpened = !!openedGifts[gift.id];

            return (
              <div
                key={gift.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '24px 20px',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.25)',
                  border: isOpened ? `3px solid ${gift.boxColor}` : '3px solid #FCE5EC',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '380px',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {/* Badge Tag */}
                <div style={{ width: '100%', textAlign: 'center', marginBottom: '8px' }}>
                  <span style={{
                    display: 'inline-block',
                    background: isOpened ? '#FFF0F3' : '#FFF9E9',
                    color: isOpened ? '#E6384F' : '#B48827',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '3px 12px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    {gift.badge}
                  </span>
                </div>

                {!isOpened ? (
                  /* ================= UNOPENED MYSTERY BOX ================= */
                  <div
                    onClick={() => handleOpenGift(gift)}
                    className="cursor-pointer group"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      width: '100%',
                      padding: '16px 0'
                    }}
                  >
                    {/* 3D Mystery Gift Box SVG */}
                    <div className="group-hover:scale-105 group-active:scale-95 transition-transform duration-300">
                      <svg width="170" height="170" viewBox="0 0 180 180" fill="none">
                        {/* Aura glow */}
                        <circle cx="90" cy="95" r="75" fill={gift.boxColor} opacity="0.25" className="animate-pulse" />

                        {/* Box body */}
                        <rect x="35" y="75" width="110" height="85" rx="12" fill={gift.boxColor} stroke="#2E1C33" strokeWidth="2.5" />
                        
                        {/* Vertical ribbon */}
                        <rect x="83" y="75" width="14" height="85" fill="#FFFFFF" />

                        {/* Decorative pattern stripes */}
                        <line x1="45" y1="90" x2="65" y2="150" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
                        <line x1="115" y1="90" x2="135" y2="150" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />

                        {/* Mystery Question Tag */}
                        <circle cx="90" cy="115" r="18" fill="#FFFFFF" stroke="#2E1C33" strokeWidth="2" />
                        <text x="90" y="122" fontSize="20" fontWeight="900" fill={gift.boxColor} textAnchor="middle">
                          {gift.boxEmoji}
                        </text>

                        {/* Box lid */}
                        <g className="group-hover:-translate-y-2 transition-transform duration-200">
                          <rect x="25" y="55" width="130" height="24" rx="6" fill="#FFFFFF" stroke="#2E1C33" strokeWidth="2" />
                          <rect x="83" y="55" width="14" height="24" fill={gift.boxColor} />

                          {/* Ribbon Bow */}
                          <path d="M90 55 C75 32 50 42 70 55 Z" fill={gift.boxColor} stroke="#2E1C33" strokeWidth="1.5" />
                          <path d="M90 55 C105 32 130 42 110 55 Z" fill={gift.boxColor} stroke="#2E1C33" strokeWidth="1.5" />
                          <circle cx="90" cy="55" r="6" fill="#FFFFFF" stroke="#2E1C33" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenGift(gift);
                      }}
                      className="btn-primary"
                      style={{
                        marginTop: '12px',
                        padding: '10px 24px',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        background: `linear-gradient(135deg, ${gift.boxColor} 0%, #D1233A 100%)`,
                        boxShadow: '0 6px 16px rgba(0,0,0,0.18)'
                      }}
                    >
                      <span>Tap To Open! 💥</span>
                    </button>
                  </div>
                ) : (
                  /* ================= OPENED FUNNY MOMENT CARD ================= */
                  <div
                    onClick={() => setActiveModal(gift)}
                    className="cursor-pointer group animate-bounce-gentle"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1
                    }}
                  >
                    {/* Media Container (Animated GIF or Photo) */}
                    <div style={{
                      width: '100%',
                      height: '210px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      background: '#FFF9E9',
                      border: '2px solid rgba(0,0,0,0.06)',
                      boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <img
                        src={gift.imageUrl}
                        alt={gift.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.65)',
                        color: '#FFFFFF',
                        borderRadius: '999px',
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <ZoomIn size={12} />
                        <span>Zoom</span>
                      </div>
                    </div>

                    {/* Funny Title */}
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: '#39283D',
                      margin: '0 0 6px 0',
                      lineHeight: 1.2
                    }}>
                      {gift.title}
                    </h3>

                    {/* Funny Meme Caption */}
                    <p style={{
                      fontSize: '0.88rem',
                      color: '#6E5C74',
                      lineHeight: 1.4,
                      fontWeight: 600,
                      margin: 0
                    }}>
                      "{gift.caption}"
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* GRAND FINALE BANNER */}
        {openedCount > 0 && (
          <div className="animate-bounce-gentle" style={{
            background: 'linear-gradient(135deg, rgba(230, 56, 79, 0.25) 0%, rgba(255, 209, 102, 0.25) 100%)',
            border: '2px solid rgba(255, 209, 102, 0.55)',
            borderRadius: '24px',
            padding: '24px 32px',
            maxWidth: '620px',
            width: '100%',
            boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
            textAlign: 'center',
            marginTop: '8px'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#FFD166',
              marginBottom: '6px'
            }}>
              {allOpened
                ? (giftSection?.unlockedHeading || "ALL 3 FUNNY MOMENTS UNLOCKED! 🤣🎉")
                : `Awesome! (${openedCount}/3 Moments Unwrapped) 🤪`}
            </h3>

            <p style={{
              fontSize: '0.95rem',
              color: '#FFFFFF',
              marginBottom: '20px',
              fontWeight: 600
            }}>
              {allOpened
                ? (giftSection?.unlockedMessage || "Certified goofy, 100% lovable. You will always be my favorite human!")
                : "Open the rest of the boxes or step right into the memories scrapbook!"}
            </p>

            <button
              onClick={handleProceed}
              className="btn-primary"
              style={{
                padding: '16px 36px',
                fontSize: '1.15rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFD166 0%, #F4A261 100%)',
                color: '#39283D',
                boxShadow: '0 8px 25px rgba(255, 209, 102, 0.45)'
              }}
            >
              <span>{giftSection?.nextButtonText || "Now Step Into Our Memories Scrapbook 📸 →"}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

      </div>

      {/* EXPANDED FUNNY MOMENT LIGHTBOX MODAL */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 17, 26, 0.85)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 110,
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-bounce-gentle"
            style={{
              maxWidth: '460px',
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px 20px 28px 20px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#F0E6D8',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#39283D'
              }}
            >
              <X size={18} />
            </button>

            {/* Tag */}
            <span style={{
              background: '#FFF0F3',
              color: '#E6384F',
              fontSize: '0.8rem',
              fontWeight: 800,
              padding: '4px 14px',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              {activeModal.tag}
            </span>

            {/* Large Image/GIF */}
            <div style={{
              width: '100%',
              maxHeight: '320px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#FFF9E9',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={activeModal.imageUrl}
                alt={activeModal.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '320px',
                  objectFit: 'contain'
                }}
              />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#39283D', marginBottom: '8px' }}>
              {activeModal.title}
            </h3>

            <p style={{ fontSize: '1.05rem', color: '#6E5C74', lineHeight: 1.5, fontWeight: 600, marginBottom: '20px' }}>
              "{activeModal.caption}"
            </p>

            <button
              onClick={() => setActiveModal(null)}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Haha Close 😂
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
