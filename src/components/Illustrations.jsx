import React from 'react';

// Cute Birthday Bear with Party Hat & Balloon
export const CuteBirthdayTeddy = ({ className = "w-48 h-48" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Floating Balloon */}
    <g className="animate-float-slow">
      <path d="M150 70 C150 45 135 30 115 30 C95 30 80 45 80 70 C80 95 95 110 115 110 C135 110 150 95 150 70 Z" fill="#FF85A1" />
      <ellipse cx="102" cy="50" rx="8" ry="12" fill="#FFAEC0" opacity="0.6" />
      <polygon points="113,110 117,110 115,115" fill="#E6384F" />
      <path d="M115 115 Q120 135 110 155" stroke="#999" strokeWidth="1.5" strokeDasharray="3 3" />
    </g>

    {/* Bear Ears */}
    <circle cx="70" cy="90" r="18" fill="#D4A373" />
    <circle cx="70" cy="90" r="10" fill="#FAEDCD" />
    <circle cx="130" cy="90" r="18" fill="#D4A373" />
    <circle cx="130" cy="90" r="10" fill="#FAEDCD" />

    {/* Party Hat */}
    <polygon points="100,50 82,90 118,90" fill="#FFD166" stroke="#F4A261" strokeWidth="2" />
    <polygon points="100,50 90,90 100,90" fill="#FF85A1" />
    <polygon points="100,50 108,90 118,90" fill="#6BCB77" />
    <circle cx="100" cy="50" r="6" fill="#E6384F" className="animate-pulse" />

    {/* Bear Head */}
    <circle cx="100" cy="115" r="38" fill="#D4A373" />

    {/* Bear Snout */}
    <ellipse cx="100" cy="125" rx="16" ry="12" fill="#FAEDCD" />
    <ellipse cx="100" cy="120" rx="6" ry="4" fill="#582F0E" />
    <path d="M100 124 L100 128 M96 128 Q100 132 104 128" stroke="#582F0E" strokeWidth="2" strokeLinecap="round" />

    {/* Eyes */}
    <circle cx="87" cy="110" r="4.5" fill="#39283D" />
    <circle cx="85" cy="108" r="1.5" fill="#FFFFFF" />
    <circle cx="113" cy="110" r="4.5" fill="#39283D" />
    <circle cx="111" cy="108" r="1.5" fill="#FFFFFF" />

    {/* Blushing Cheeks */}
    <ellipse cx="80" cy="122" rx="6" ry="3.5" fill="#FF85A1" opacity="0.6" />
    <ellipse cx="120" cy="122" rx="6" ry="3.5" fill="#FF85A1" opacity="0.6" />

    {/* Bear Body */}
    <path d="M75 145 C75 135 125 135 125 145 C135 170 125 190 100 190 C75 190 65 170 75 145 Z" fill="#D4A373" />
    <ellipse cx="100" cy="165" rx="18" ry="14" fill="#FAEDCD" />

    {/* Little Bowtie */}
    <polygon points="92,143 100,147 92,151" fill="#E6384F" />
    <polygon points="108,143 100,147 108,151" fill="#E6384F" />
    <circle cx="100" cy="147" r="3" fill="#FFD166" />

    {/* Bear Paws */}
    <circle cx="70" cy="155" r="9" fill="#D4A373" />
    <circle cx="130" cy="155" r="9" fill="#D4A373" />
  </svg>
);

// Cute Character Holding a Gift Box ("I have made something for you")
export const CutePresentCharacter = ({ className = "w-48 h-48" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Confetti particles in background */}
    <circle cx="35" cy="45" r="4" fill="#FFD166" className="animate-ping" style={{ animationDuration: '3s' }} />
    <polygon points="160,40 166,48 156,48" fill="#A78BC8" />
    <circle cx="170" cy="100" r="3" fill="#FF85A1" />
    <rect x="25" y="110" width="6" height="6" fill="#6BCB77" transform="rotate(25 28 113)" />

    {/* Cute Kitten / Bunny Character */}
    {/* Soft Ears */}
    <ellipse cx="78" cy="45" rx="10" ry="25" fill="#FFF0F3" stroke="#F8DCE4" strokeWidth="2" transform="rotate(-15 78 45)" />
    <ellipse cx="78" cy="45" rx="5" ry="16" fill="#FF85A1" opacity="0.7" transform="rotate(-15 78 45)" />
    <ellipse cx="122" cy="45" rx="10" ry="25" fill="#FFF0F3" stroke="#F8DCE4" strokeWidth="2" transform="rotate(15 122 45)" />
    <ellipse cx="122" cy="45" rx="5" ry="16" fill="#FF85A1" opacity="0.7" transform="rotate(15 122 45)" />

    {/* Head */}
    <circle cx="100" cy="78" r="36" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="2" />

    {/* Big cute eyes */}
    <ellipse cx="88" cy="74" rx="5" ry="6" fill="#39283D" />
    <circle cx="86" cy="71" r="2" fill="#FFFFFF" />
    <circle cx="89" cy="76" r="1" fill="#FFFFFF" />

    <ellipse cx="112" cy="74" rx="5" ry="6" fill="#39283D" />
    <circle cx="110" cy="71" r="2" fill="#FFFFFF" />
    <circle cx="113" cy="76" r="1" fill="#FFFFFF" />

    {/* Rosy Cheeks */}
    <ellipse cx="79" cy="83" rx="6" ry="3.5" fill="#FF85A1" opacity="0.6" />
    <ellipse cx="121" cy="83" rx="6" ry="3.5" fill="#FF85A1" opacity="0.6" />

    {/* Cute Mouth */}
    <path d="M96 82 Q100 86 104 82" stroke="#39283D" strokeWidth="2" strokeLinecap="round" />

    {/* Little Body */}
    <ellipse cx="100" cy="130" rx="28" ry="30" fill="#FFF0F3" />

    {/* Glowing Gift Box Held in Hands */}
    <g className="animate-bounce-gentle">
      {/* Gift Box Base */}
      <rect x="70" y="112" width="60" height="52" rx="6" fill="#E6384F" stroke="#C0263B" strokeWidth="2" />
      {/* Vertical Ribbon */}
      <rect x="94" y="112" width="12" height="52" fill="#FFD166" />
      {/* Gift Lid */}
      <rect x="66" y="105" width="68" height="14" rx="4" fill="#FF5D73" stroke="#C0263B" strokeWidth="1.5" />
      {/* Horizontal Ribbon on Lid */}
      <rect x="94" y="105" width="12" height="14" fill="#FFE5A3" />

      {/* Ribbon Bow */}
      <path d="M100 105 C90 92 78 96 88 105 Z" fill="#FFD166" stroke="#E5BA48" strokeWidth="1" />
      <path d="M100 105 C110 92 122 96 112 105 Z" fill="#FFD166" stroke="#E5BA48" strokeWidth="1" />
      <circle cx="100" cy="105" r="4" fill="#F4A261" />

      {/* Tiny Sparkles around Box */}
      <path d="M60 120 L64 120 M62 118 L62 122" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" />
      <path d="M140 125 L144 125 M142 123 L142 127" stroke="#FF85A1" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Cute Paws wrapping the box */}
    <circle cx="68" cy="125" r="8" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="1.5" />
    <circle cx="132" cy="125" r="8" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="1.5" />
  </svg>
);

// Excited Dancing Bunny / Cat ("Are you really excited?")
export const CuteDancingBunny = ({ className = "w-48 h-48" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Floating Stars */}
    <g className="animate-spin-slow" style={{ transformOrigin: '100px 100px' }}>
      <polygon points="40,30 43,38 52,39 45,45 47,54 40,49 33,54 35,45 28,39 37,38" fill="#FFD166" />
      <polygon points="160,35 162,42 170,43 164,48 165,56 160,52 154,56 156,48 150,43 158,42" fill="#FF85A1" />
    </g>

    {/* Bunny Body tilted with excitement */}
    <g className="animate-wiggle">
      {/* Ears tilted */}
      <ellipse cx="75" cy="40" rx="12" ry="32" fill="#FFFFFF" stroke="#E6384F" strokeWidth="2" transform="rotate(-25 75 40)" />
      <ellipse cx="75" cy="40" rx="6" ry="20" fill="#FF85A1" transform="rotate(-25 75 40)" />

      <ellipse cx="125" cy="40" rx="12" ry="32" fill="#FFFFFF" stroke="#E6384F" strokeWidth="2" transform="rotate(25 125 40)" />
      <ellipse cx="125" cy="40" rx="6" ry="20" fill="#FF85A1" transform="rotate(25 125 40)" />

      {/* Head */}
      <circle cx="100" cy="85" r="42" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="2" />

      {/* Big joyful closed eyes (happy smile eyes ^_^) */}
      <path d="M78 80 Q88 70 96 80" stroke="#39283D" strokeWidth="3" strokeLinecap="round" />
      <path d="M104 80 Q112 70 122 80" stroke="#39283D" strokeWidth="3" strokeLinecap="round" />

      {/* Deep Rosy Cheeks */}
      <circle cx="74" cy="92" r="8" fill="#FF85A1" opacity="0.7" />
      <circle cx="126" cy="92" r="8" fill="#FF85A1" opacity="0.7" />

      {/* Cute Open Mouth with Tongue */}
      <path d="M94 94 Q100 108 106 94 Z" fill="#E6384F" />
      <ellipse cx="100" cy="100" rx="4" ry="3" fill="#FF85A1" />

      {/* Body */}
      <ellipse cx="100" cy="145" rx="34" ry="32" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="2" />
      <ellipse cx="100" cy="148" rx="20" ry="18" fill="#FFF0F3" />

      {/* Excited Raised Hands / Paws */}
      <circle cx="60" cy="120" r="10" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="2" />
      <circle cx="140" cy="120" r="10" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="2" />

      {/* Party Horn in mouth */}
      <polygon points="106,94 145,80 148,88 108,98" fill="#FFD166" stroke="#E5BA48" strokeWidth="1" />
      <circle cx="148" cy="84" r="5" fill="#E6384F" />
    </g>

    {/* Little Paws / Feet */}
    <ellipse cx="85" cy="178" rx="14" ry="8" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="1.5" />
    <ellipse cx="115" cy="178" rx="14" ry="8" fill="#FFFFFF" stroke="#F8DCE4" strokeWidth="1.5" />
  </svg>
);

// Glossy Red Heart Gift Box with Gold Ribbon & Shadow
export const HeartGiftBox = ({ size = 160, isHovered = false, isSelected = false }) => (
  <div className={`relative transition-all duration-300 ${isSelected ? 'scale-110 drop-shadow-2xl' : isHovered ? 'scale-105' : ''}`}>
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Soft realistic drop shadow */}
        <filter id="heartShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#8C2030" floodOpacity="0.35" />
        </filter>
        {/* Glossy gradient */}
        <radialGradient id="heartGradient" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FF6B82" />
          <stop offset="45%" stopColor="#E6384F" />
          <stop offset="90%" stopColor="#B31B32" />
          <stop offset="100%" stopColor="#7F0E1F" />
        </radialGradient>
        {/* Ribbon gold gradient */}
        <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#E5A93C" />
        </linearGradient>
      </defs>

      {/* Heart Box Body */}
      <path
        d="M100 175 C30 130 15 80 40 45 C65 10 95 30 100 45 C105 30 135 10 160 45 C185 80 170 130 100 175 Z"
        fill="url(#heartGradient)"
        filter="url(#heartShadow)"
        stroke="#FF85A1"
        strokeWidth="2"
      />

      {/* Top Gloss Highlights */}
      <path
        d="M45 45 C55 25 78 28 88 40 C75 38 55 42 45 55 Z"
        fill="#FFFFFF"
        opacity="0.45"
      />
      <ellipse cx="60" cy="50" rx="14" ry="6" fill="#FFFFFF" opacity="0.3" transform="rotate(-30 60 50)" />
      <ellipse cx="140" cy="50" rx="12" ry="5" fill="#FFFFFF" opacity="0.2" transform="rotate(30 140 50)" />

      {/* Golden Vertical Ribbon */}
      <path
        d="M93 38 C93 38 92 120 100 175 C101 175 107 120 107 38 Z"
        fill="url(#goldRibbon)"
        opacity="0.9"
      />

      {/* Golden Horizontal Ribbon */}
      <path
        d="M26 80 C60 92 140 92 174 80 C175 88 174 94 172 100 C140 110 60 110 28 100 C26 94 25 88 26 80 Z"
        fill="url(#goldRibbon)"
        opacity="0.9"
      />

      {/* Golden Ribbon Bow in Center */}
      <g transform="translate(100, 92)">
        <ellipse cx="-16" cy="-8" rx="16" ry="10" fill="url(#goldRibbon)" transform="rotate(-25)" stroke="#D4A373" strokeWidth="1" />
        <ellipse cx="16" cy="-8" rx="16" ry="10" fill="url(#goldRibbon)" transform="rotate(25)" stroke="#D4A373" strokeWidth="1" />
        <circle cx="0" cy="0" r="8" fill="#FFF2B2" stroke="#D4A373" strokeWidth="1" />
        <circle cx="0" cy="0" r="4" fill="#FFD166" />
      </g>
    </svg>
  </div>
);

// Centered Mystery Gift Box with question mark tag
export const MysteryGiftBox = ({ isOpen = false, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer group relative p-4 transition-transform duration-300 ${isOpen ? 'scale-110' : 'hover:scale-105 active:scale-95'}`}
  >
    <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="boxGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura Glow */}
      <circle cx="100" cy="110" r="85" fill="url(#boxGlow)" className="animate-pulse" />

      {/* Gift Box Body */}
      <rect x="45" y="90" width="110" height="85" rx="10" fill="#FFF0F3" stroke="#E6384F" strokeWidth="3" />
      {/* Pink Vertical Stripes on Box */}
      <rect x="58" y="90" width="12" height="85" fill="#F8DCE4" />
      <rect x="80" y="90" width="12" height="85" fill="#F8DCE4" />
      <rect x="108" y="90" width="12" height="85" fill="#F8DCE4" />
      <rect x="130" y="90" width="12" height="85" fill="#F8DCE4" />

      {/* Golden Vertical Ribbon on Box */}
      <rect x="94" y="90" width="12" height="85" fill="#E6384F" />

      {/* Box Lid (opens when isOpen is true) */}
      <g className={`transition-transform duration-700 origin-top-left ${isOpen ? '-translate-y-8 -rotate-12' : 'group-hover:-translate-y-1'}`}>
        <rect x="38" y="70" width="124" height="24" rx="6" fill="#E6384F" stroke="#C0263B" strokeWidth="2.5" />
        <rect x="94" y="70" width="12" height="24" fill="#FFD166" />

        {/* Big Bow on Lid */}
        <path d="M100 70 C85 45 60 55 80 70 Z" fill="#FFD166" stroke="#E5A93C" strokeWidth="1.5" />
        <path d="M100 70 C115 45 140 55 120 70 Z" fill="#FFD166" stroke="#E5A93C" strokeWidth="1.5" />
        <circle cx="100" cy="70" r="7" fill="#FFF2B2" stroke="#E5A93C" strokeWidth="1" />
      </g>

      {/* Hanging Tag with Heart / Question Mark */}
      <g transform="translate(132, 105)">
        <polygon points="0,0 20,-5 28,15 12,22" fill="#FFD166" stroke="#D4A373" strokeWidth="1.5" />
        <circle cx="5" cy="5" r="2" fill="#39283D" />
        <text x="14" y="14" fontSize="12" fontWeight="bold" fill="#E6384F" textAnchor="middle">?</text>
      </g>
    </svg>
  </div>
);

// Interactive Birthday Cake with Glowing / Blowing Candles
export const BirthdayCakeIllustration = ({ candlesBlown = false, onBlowOut, blowProgress = 0 }) => {
  const flameScale = candlesBlown ? 0 : Math.max(0.08, 1 - blowProgress * 0.92);
  const windTilt = Math.min(blowProgress * 26, 30);
  const flameOpacity = candlesBlown ? 0 : Math.max(0.2, 1 - blowProgress * 0.75);

  return (
    <div onClick={onBlowOut} className="relative cursor-pointer group flex flex-col items-center select-none">
      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Glow for candle flames */}
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE066" stopOpacity="1" />
            <stop offset="60%" stopColor="#FF922B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FA5252" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cake Stand / Plate */}
        <ellipse cx="120" cy="205" rx="90" ry="18" fill="#FFF9E9" stroke="#E6384F" strokeWidth="3" />
        <ellipse cx="120" cy="205" rx="80" ry="12" fill="#FFE5EC" />
        <path d="M110 205 L110 225 Q120 230 130 225 L130 205 Z" fill="#FFF9E9" stroke="#E6384F" strokeWidth="2" />
        <ellipse cx="120" cy="225" rx="40" ry="8" fill="#FFF9E9" stroke="#E6384F" strokeWidth="2" />

        {/* Tier 1 (Bottom Cake Layer) */}
        <rect x="50" y="145" width="140" height="50" rx="12" fill="#FFF0F3" stroke="#F8DCE4" strokeWidth="2" />
        {/* Strawberry cream filling stripes */}
        <path d="M50 170 Q70 176 90 170 T130 170 T170 170 T190 170 L190 176 Q170 182 150 176 T110 176 T70 176 T50 176 Z" fill="#FF85A1" />
        {/* Bottom Frosting drip */}
        <path d="M50 150 Q60 162 70 150 Q80 165 90 150 Q100 163 110 150 Q120 166 130 150 Q140 162 150 150 Q160 165 170 150 Q180 162 190 150" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Tier 2 (Top Cake Layer) */}
        <rect x="75" y="105" width="90" height="42" rx="10" fill="#FFF9E9" stroke="#F8DCE4" strokeWidth="2" />
        {/* Lavender cream swirl */}
        <path d="M75 125 Q90 130 105 125 T135 125 T165 125 L165 130 Q150 135 135 130 T105 130 T75 130 Z" fill="#A78BC8" opacity="0.8" />
        {/* Top Dripping Cream */}
        <path d="M75 110 Q85 120 95 110 Q105 122 115 110 Q125 121 135 110 Q145 120 155 110 Q165 118 165 110" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Decorative Strawberries & Cherries */}
        <circle cx="85" cy="103" r="6" fill="#E6384F" />
        <circle cx="120" cy="102" r="7" fill="#E6384F" />
        <circle cx="155" cy="103" r="6" fill="#E6384F" />

        {/* 3 Candles */}
        {/* Candle 1 (Left) */}
        <rect x="92" y="70" width="6" height="32" rx="3" fill="#A78BC8" stroke="#8C6BB1" strokeWidth="1" />
        <line x1="92" y1="78" x2="98" y2="84" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="92" y1="90" x2="98" y2="96" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="95" y1="70" x2="95" y2="65" stroke="#39283D" strokeWidth="1.5" />

        {/* Candle 2 (Center - Taller) */}
        <rect x="117" y="62" width="6" height="40" rx="3" fill="#FF85A1" stroke="#E6384F" strokeWidth="1" />
        <line x1="117" y1="72" x2="123" y2="78" stroke="#FFD166" strokeWidth="2" />
        <line x1="117" y1="84" x2="123" y2="90" stroke="#FFD166" strokeWidth="2" />
        <line x1="120" y1="62" x2="120" y2="57" stroke="#39283D" strokeWidth="1.5" />

        {/* Candle 3 (Right) */}
        <rect x="142" y="70" width="6" height="32" rx="3" fill="#6BCB77" stroke="#4D96FF" strokeWidth="1" />
        <line x1="142" y1="78" x2="148" y2="84" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="142" y1="90" x2="148" y2="96" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="145" y1="70" x2="145" y2="65" stroke="#39283D" strokeWidth="1.5" />

        {/* Dynamic Wind Breeze Lines when blowing is detected */}
        {blowProgress > 0.12 && !candlesBlown && (
          <g opacity={Math.min(blowProgress * 1.5, 0.85)}>
            <path d="M50 48 Q80 40 110 46 T170 42" stroke="#68D391" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" fill="none" />
            <path d="M65 60 Q95 54 125 58 T185 52" stroke="#4FD1C5" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" fill="none" />
            <path d="M40 72 Q75 66 115 70 T180 65" stroke="#63B3ED" strokeWidth="1.5" strokeDasharray="5 5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Candle Flames or Smoke Curls */}
        {!candlesBlown ? (
          <g
            className={blowProgress > 0.05 ? "" : "animate-flicker"}
            style={{
              transition: 'opacity 0.15s ease',
              opacity: flameOpacity
            }}
          >
            {/* Flame 1 */}
            <g
              style={{
                transformOrigin: '95px 65px',
                transform: `rotate(${windTilt}deg) scale(${flameScale})`,
                transition: 'transform 0.08s ease'
              }}
            >
              <circle cx="95" cy="55" r="9" fill="url(#flameGlow)" />
              <path d="M95 48 C91 55 92 60 95 65 C98 60 99 55 95 48 Z" fill="#FFD166" />
              <circle cx="95" cy="58" r="2.5" fill="#FFFFFF" />
            </g>

            {/* Flame 2 (Center) */}
            <g
              style={{
                transformOrigin: '120px 57px',
                transform: `rotate(${windTilt * 1.1}deg) scale(${flameScale})`,
                transition: 'transform 0.08s ease'
              }}
            >
              <circle cx="120" cy="46" r="11" fill="url(#flameGlow)" />
              <path d="M120 38 C115 46 116 52 120 57 C124 52 125 46 120 38 Z" fill="#FFD166" />
              <circle cx="120" cy="49" r="3" fill="#FFFFFF" />
            </g>

            {/* Flame 3 */}
            <g
              style={{
                transformOrigin: '145px 65px',
                transform: `rotate(${windTilt * 0.9}deg) scale(${flameScale})`,
                transition: 'transform 0.08s ease'
              }}
            >
              <circle cx="145" cy="55" r="9" fill="url(#flameGlow)" />
              <path d="M145 48 C141 55 142 60 145 65 C148 60 149 55 145 48 Z" fill="#FFD166" />
              <circle cx="145" cy="58" r="2.5" fill="#FFFFFF" />
            </g>
          </g>
        ) : (
          /* Smoke puffs when blown out */
          <g className="animate-smoke-rise">
            <path d="M95 63 Q90 55 95 48 T100 40" stroke="#BBB" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M120 55 Q125 45 118 36 T122 25" stroke="#BBB" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M145 63 Q150 55 145 48 T140 40" stroke="#BBB" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
            {/* Floating wish sparkles */}
            <text x="120" y="32" fontSize="16" textAnchor="middle">✨</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// Fallback Memory Photo Card Illustration
export const MemoryIllustration = ({ index = 0 }) => {
  const themes = [
    // 0: First Smile / Sunny day
    {
      bg: "from-pink-100 to-rose-200",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle">🌸</span>
          <span className="font-handwritten text-xl font-bold text-rose-700">The First Smile</span>
          <p className="text-xs text-rose-500 font-sans mt-1">When everything changed for the better 💕</p>
        </div>
      ),
    },
    // 1: Fun adventures & laughs
    {
      bg: "from-purple-100 to-indigo-200",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🎡</span>
          <span className="font-handwritten text-xl font-bold text-purple-700">Sweet Adventures</span>
          <p className="text-xs text-purple-500 font-sans mt-1">Endless laughter and goofy moments ✨</p>
        </div>
      ),
    },
    // 2: Late night talks & stars
    {
      bg: "from-amber-100 to-orange-200",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🌙</span>
          <span className="font-handwritten text-xl font-bold text-amber-800">Under The Stars</span>
          <p className="text-xs text-amber-700 font-sans mt-1">Talking about everything and nothing 💖</p>
        </div>
      ),
    },
    // 3: Foodie Shenanigans
    {
      bg: "from-red-100 to-amber-200",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>🍕</span>
          <span className="font-handwritten text-xl font-bold text-red-700">Foodie Drama</span>
          <p className="text-xs text-amber-800 font-sans mt-1">Fighting for the last bite of pizza 🍟</p>
        </div>
      ),
    },
    // 4: Unfiltered Goofiness
    {
      bg: "from-fuchsia-100 to-pink-200",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>📸</span>
          <span className="font-handwritten text-xl font-bold text-fuchsia-700">Caught in 4K</span>
          <p className="text-xs text-fuchsia-600 font-sans mt-1">Zero filter, 100% silly goofiness 🤪</p>
        </div>
      ),
    },
    // 5: Road Trips & Sunset Chasing
    {
      bg: "from-sky-100 to-teal-200",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🚗</span>
          <span className="font-handwritten text-xl font-bold text-teal-800">Wind & Playlists</span>
          <p className="text-xs text-teal-700 font-sans mt-1">Singing out of tune on long drives 🌅</p>
        </div>
      ),
    },
    // 6: Comfort & Safe Place
    {
      bg: "from-emerald-100 to-green-200",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🧸</span>
          <span className="font-handwritten text-xl font-bold text-emerald-800">Safe Harbor</span>
          <p className="text-xs text-emerald-700 font-sans mt-1">Quiet warmth where words aren't needed ☕</p>
        </div>
      ),
    },
    // 7: Forever & Always
    {
      bg: "from-pink-100 to-rose-300",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center p-3">
          <span className="text-4xl mb-2 animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>🥂</span>
          <span className="font-handwritten text-xl font-bold text-rose-800">To Many More Years</span>
          <p className="text-xs text-rose-600 font-sans mt-1">My absolute favourite human forever 💕</p>
        </div>
      ),
    },
  ];

  const current = themes[index % themes.length];

  return (
    <div className={`w-full h-full bg-gradient-to-br ${current.bg} rounded-lg flex items-center justify-center border border-white/50 shadow-inner`}>
      {current.content}
    </div>
  );
};
