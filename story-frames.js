/* ==========================================================================
   THROUGH OUR EYES — BUMBLE-STYLE PHOTO CARDS & CLOUD REACTIONS (EDIT HERE)
   Set imgSrc to a path like "public/story-1.jpg" when ready.
   ========================================================================== */
var STORY_FRAMES = [
     {
          type: "intro",
          eyebrow: "Frames & Side Notes",
          title: "Through Our Eyes",
          subtitle: "Manna & John • Four frames, both of us reacting together",
          hint: "Tap right or swipe to begin",
     },
     {
          type: "photo",
          chip: "01 • Dubai & Kuwait",
          title: "Two Coasts, Before We Knew",
          john: "“Still wild we grew up a short flight apart and never crossed paths until Kerala.”",
          manna: "“Two Gulf routines, somehow packing bags for the exact same college town.”",
          backNote: "Swap this frame for a side-by-side childhood throwback from Dubai and Kuwait.",
          imgSrc: "",
          bg: "linear-gradient(145deg, #27371D 0%, #4E5E35 58%, #D4B46A 100%)",
          svg: '<svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice"><path d="M0 118 Q55 96 110 114 T220 108 L220 150 L0 150 Z" fill="#1B2514" opacity="0.65"/><circle cx="168" cy="40" r="18" fill="#F5E6BE" opacity="0.85"/><path d="M35 88 L45 50 L55 88 M68 88 L74 34 L80 88" stroke="#F5F1E4" stroke-width="2" fill="none" opacity="0.7"/><path d="M30 40 Q110 16 190 46" stroke="#D4B46A" stroke-width="1.8" stroke-dasharray="4 4" fill="none"/></svg>',
     },
     {
          type: "photo",
          chip: "02 • Saintgits",
          title: "Where Everything Started",
          john: "“Look at us pretending we had any idea where college—or life—was headed.”",
          manna: "“‘Just grabbing tea after class’ turned into staying till the campus emptied.”",
          backNote: "Drop a favorite college candid or throwback snapshot from Saintgits here.",
          imgSrc: "",
          bg: "linear-gradient(155deg, #1E2C18 0%, #374A2B 60%, #7C8756 100%)",
          svg: '<svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice"><rect x="34" y="64" width="152" height="68" rx="4" fill="#172111" opacity="0.6"/><path d="M56 132 L56 88 A20 20 0 0 1 96 88 L96 132 M124 132 L124 88 A20 20 0 0 1 164 88 L164 132" stroke="#D4B46A" stroke-width="2" fill="none"/><circle cx="76" cy="42" r="6" fill="#F5F1E4"/><circle cx="144" cy="42" r="6" fill="#D4B46A"/></svg>',
     },
     {
          type: "photo",
          chip: "03 • Trivandrum",
          title: "Drives, Coffee & Same Team",
          john: "“After-work drives around town were the best part of my week—no debate.”",
          manna: "“Somewhere between new jobs and monsoon traffic, we knew we wanted life together.”",
          backNote: "Perfect slot for a candid coffee run, car selfie, or weekend Trivandrum memory.",
          imgSrc: "",
          bg: "linear-gradient(150deg, #1D2917 0%, #314429 55%, #B89855 100%)",
          svg: '<svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice"><path d="M20 135 Q110 78 200 135" stroke="#D4B46A" stroke-width="3" fill="none"/><path d="M20 135 Q110 86 200 135" stroke="#F5F1E4" stroke-width="1" stroke-dasharray="6 5" fill="none"/><circle cx="110" cy="52" r="22" fill="#F5E6BE" opacity="0.2"/><path d="M90 66 Q110 42 130 66" stroke="#F5F1E4" stroke-width="2" fill="none"/></svg>',
     },
     {
          type: "photo",
          chip: "04 • July 2027",
          title: "See You in Kerala",
          john: "“Counting down until both our families and friends are all in one place.”",
          manna: "“July 8 in Kundara, July 12 in Chengaroor—save an appetite for the Sadya!”",
          backNote: "Leave as a recent portrait of the two of you looking ahead to July 2027.",
          imgSrc: "",
          bg: "linear-gradient(145deg, #1E2816 0%, #3A4B2A 58%, #E06B5A 100%)",
          svg: '<svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice"><path d="M110 26 L110 54 M99 37 L121 37" stroke="#D4B46A" stroke-width="3" stroke-linecap="round"/><path d="M68 124 L68 78 L110 56 L152 78 L152 124 Z" fill="#172011" opacity="0.65" stroke="#F5F1E4" stroke-width="1.5"/><path d="M101 124 L101 98 A9 9 0 0 1 119 98 L119 124" fill="#D4B46A" opacity="0.85"/></svg>',
     },
];
