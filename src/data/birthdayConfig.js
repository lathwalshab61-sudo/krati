// ============================================================
// SECRET BIRTHDAY GIFT - CONFIGURATION FILE
// ============================================================
// You can customize all texts, passcode, recipient name, memories,
// photos, and love letter right here!
// ============================================================

export const birthdayConfig = {
  // Passcode to unlock the website
  passcode: "1234",

  // Recipient details
  recipientName: "My Favourite Person",
  senderName: "With All My Love 💕",

  // Top header text
  header: {
    prefix: "Secret",
    suffix: "Birthday Gift",
  },

  // Opening screen: Curtains & Vintage Clock
  opening: {
    clockLabel: "A SPECIAL SURPRISE AWAITS",
    subLabel: "Tap anywhere or click below to unlock the curtains",
    buttonText: "Open The Curtains ✨",
    autoOpenDelaySeconds: 4, // 0 to disable auto open
  },

  // Secret passcode screen
  passcodeScreen: {
    title: "Enter a passcode",
    hint: "Enter the secret 4-digit code (Default: 1234)",
    errorMessage: "Oops! Incorrect code. Hint: Try 1234 😉",
    leftBadge: "HAPPY BIRTHDAY",
    leftCardTitle: "Special Delivery For You 💌",
    leftCardSubtitle: "A handmade digital gift crafted with lots of love!",
    skipButtonText: "Skip to birthday surprise →",
  },

  // First surprise screen: "I have made something for you"
  surprise1: {
    heading: "I have made something for you",
    question: "Are you ready to see your special surprise?",
    yesButtonText: "YES! 💖",
    noButtonText: "NO 🙈",
    noResponses: [
      "Wait, are you sure? 🥺",
      "Oops! Wrong button! Try the other one 💕",
      "Pretty please? I worked so hard on this! ✨",
      "Haha nice try! The YES button is irresistible! 😉",
      "You know you want to see it! 🎁",
    ],
  },

  // Second surprise screen: "Are you really excited?"
  surprise2: {
    heading: "Are you really excited?",
    question: "There is so much love waiting inside for you! 🥰",
    yesButtonText: "YES, SUPER EXCITED! 🎉",
    noButtonText: "NOT REALLY 😜",
    noResponses: [
      "Come on, you know you are! 💖",
      "Don't play hard to get! 🌸",
      "The excitement meter just went to 100% anyway! 🚀",
      "Click the YES button already! 🎁✨",
    ],
  },

  // Secret Gift Section: 3 Funny Mystery Boxes & Meme Moments
  giftSection: {
    heading: "The Secret Funny Vault 🎁🤣",
    instruction: "Tap on each mystery box to unwrap a funny moment! (Prepare to laugh 💀)",
    gifts: [
      {
        id: "funny-1",
        boxColor: "#FF5D73",
        boxEmoji: "🚨",
        badge: "DO NOT OPEN ❌",
        title: "Warning: High Derp Energy",
        // Replace imageUrl with your own funny photo, e.g. "/photos/funny1.jpg"
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
    ],
    unlockedHeading: "ALL 3 FUNNY MOMENTS UNLOCKED! 🤣🎉",
    unlockedMessage: "Certified goofy, 100% lovable. You will always be my favorite human!",
    nextButtonText: "Now Step Into Our Memories Scrapbook 📸 →"
  },

  // Photo scrapbook gallery
  memories: {
    heading: "Memories Scrapbook",
    subheading: "A little collection of cherished moments and smiles 📸✨",
    instruction: "Tap on any photo to look closer!",
    photos: [
      {
        id: 1,
        title: "That Unforgettable Smile",
        date: "Chapter One",
        caption: "The world became so much brighter and warmer the moment you smiled. A memory etched in my heart forever. ✨",
        frameColor: "pink",
        rotation: -3,
        // Replace with your photo path, e.g. "/photos/memory1.jpg"
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
    ],
    nextButtonText: "Read My Birthday Letter 💌 →",
  },

  // Birthday letter
  letter: {
    heading: "Happy birthday to my favourite person",
    badge: "FROM THE BOTTOM OF MY HEART 💌",
    salutation: "Dearest,",
    paragraphs: [
      "Happy Birthday to my favourite person! 💗",
      "Today is all about you, your smile, and all the little things that make you special.",
      "I hope your day is filled with happiness, laughter, beautiful memories, and all the love you deserve.",
      "Thank you for being such a wonderful part of my world. May this new year of your life bring you countless reasons to smile.",
      "You deserve every beautiful thing life has to offer.",
      "Happy Birthday! 🎂💕",
    ],
    signature: "With all my love & warmest hugs,",
    signerName: "Always Yours ❤️",
    nextButtonText: "Make A Birthday Wish! 🎂 →",
  },

  // Final screen: Make a Wish & Cake
  cakeSection: {
    heading: "MAKE A WISH",
    subtitle: "Close your eyes, make a wish, and let the magic begin! 🎂✨",
    instruction: "Tap the cake or button below to blow out the candles 🕯️",
    blowButtonText: "Blow Out The Candles 💨🕯️",
    blownMessage: "Your wish is on its way to the stars! 🌟💖",
    blownSubtext: "May every candle blown bring you infinite joy, good health, and magic in the year ahead! 🎈✨",
    replayButtonText: "Replay The Surprise 🔁",
  },

  // Sound settings
  sound: {
    bgMusicUrl: null, // Add local file e.g. "/music/birthday.mp3" or use built-in procedural synth!
    autoplayMusicPrompt: true,
  },
};
