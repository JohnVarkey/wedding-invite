/* ==========================================================================
   THROUGH OUR EYES — PORTRAIT PHOTO CARDS & CLOUD CONVERSATIONS (EDIT HERE)
   - Set imgSrc to a portrait photo path like "public/story-1.jpg" when ready.
   - Optional imgPos adjusts framing (defaults to "center 22%" for selfies).
   - Each photo card has 2-3 short back-and-forth messages (who: "john" | "manna").
   ========================================================================== */
var STORY_FRAMES = [
     {
          type: "intro",
          eyebrow: "Frames & Side Notes",
          title: "Through Our Eyes",
          subtitle: "Manna & John • Four frames, told in our own banter",
          hint: "Tap right or swipe to begin",
     },
     {
          type: "photo",
          chip: "01 • Dubai & Kuwait",
          title: "Two Coasts, Same Direction",
          imgSrc: "",
          imgPos: "center 22%",
          messages: [
               {
                    who: "john",
                    text: "Still wild we grew up a short flight apart and never met.",
               },
               {
                    who: "manna",
                    text: "And somehow both packed bags for the exact same college town.",
               },
               {
                    who: "john",
                    text: "Best coincidence we never planned.",
               },
          ],
          backNote: "Swap this frame for a side-by-side childhood throwback from Dubai and Kuwait.",
          bg: "linear-gradient(145deg, #27371D 0%, #4E5E35 58%, #D4B46A 100%)",
          svg: '<svg viewBox="0 0 220 280" preserveAspectRatio="xMidYMid slice"><path d="M0 205 Q55 180 110 198 T220 192 L220 280 L0 280 Z" fill="#1B2514" opacity="0.65"/><circle cx="168" cy="58" r="22" fill="#F5E6BE" opacity="0.85"/><path d="M35 152 L45 104 L55 152 M68 152 L74 82 L80 152" stroke="#F5F1E4" stroke-width="2.2" fill="none" opacity="0.72"/><path d="M28 66 Q110 34 192 72" stroke="#D4B46A" stroke-width="2" stroke-dasharray="4 4" fill="none"/></svg>',
     },
     {
          type: "photo",
          chip: "02 • Saintgits",
          title: "Where Everything Started",
          imgSrc: "",
          imgPos: "center 22%",
          messages: [
               {
                    who: "manna",
                    text: "Remember ‘just grabbing tea after class’?",
               },
               {
                    who: "john",
                    text: "Yeah, two hours later the entire campus was empty.",
               },
               {
                    who: "manna",
                    text: "Zero regrets on that detour.",
               },
          ],
          backNote: "Drop a favorite college portrait or throwback selfie from Saintgits here.",
          bg: "linear-gradient(155deg, #1E2C18 0%, #374A2B 60%, #7C8756 100%)",
          svg: '<svg viewBox="0 0 220 280" preserveAspectRatio="xMidYMid slice"><rect x="34" y="96" width="152" height="104" rx="5" fill="#172111" opacity="0.6"/><path d="M56 200 L56 138 A20 20 0 0 1 96 138 L96 200 M124 200 L124 138 A20 20 0 0 1 164 138 L164 200" stroke="#D4B46A" stroke-width="2.2" fill="none"/><circle cx="76" cy="64" r="7" fill="#F5F1E4"/><circle cx="144" cy="64" r="7" fill="#D4B46A"/></svg>',
     },
     {
          type: "photo",
          chip: "03 • Trivandrum",
          title: "Drives, Coffee & Same Team",
          imgSrc: "",
          imgPos: "center 22%",
          messages: [
               {
                    who: "john",
                    text: "After-work drives around town were my favorite part of the week.",
               },
               {
                    who: "manna",
                    text: "Monsoon traffic, good playlist, and coffee stops.",
               },
               {
                    who: "john",
                    text: "Never wanted those drives to end.",
               },
          ],
          backNote: "Perfect slot for a car selfie, coffee run, or weekend Trivandrum portrait.",
          bg: "linear-gradient(150deg, #1D2917 0%, #314429 55%, #B89855 100%)",
          svg: '<svg viewBox="0 0 220 280" preserveAspectRatio="xMidYMid slice"><path d="M18 205 Q110 125 202 205" stroke="#D4B46A" stroke-width="3" fill="none"/><path d="M18 205 Q110 136 202 205" stroke="#F5F1E4" stroke-width="1.2" stroke-dasharray="6 5" fill="none"/><circle cx="110" cy="84" r="26" fill="#F5E6BE" opacity="0.2"/><path d="M86 98 Q110 68 134 98" stroke="#F5F1E4" stroke-width="2.2" fill="none"/></svg>',
     },
     {
          type: "photo",
          chip: "04 • July 2027",
          title: "See You in Kerala",
          imgSrc: "",
          imgPos: "center 22%",
          messages: [
               {
                    who: "manna",
                    text: "Next real photos go straight here—July 2027!",
               },
               {
                    who: "john",
                    text: "Kundara on the 8th, Chengaroor on the 12th.",
               },
               {
                    who: "manna",
                    text: "Save an appetite for the Sadya.",
               },
          ],
          backNote: "Drop a recent portrait selfie of the two of you looking ahead to July 2027.",
          bg: "linear-gradient(145deg, #1E2816 0%, #3A4B2A 58%, #E06B5A 100%)",
          svg: '<svg viewBox="0 0 220 280" preserveAspectRatio="xMidYMid slice"><path d="M110 42 L110 78 M97 56 L123 56" stroke="#D4B46A" stroke-width="3.2" stroke-linecap="round"/><path d="M64 195 L64 118 L110 86 L156 118 L156 195 Z" fill="#172011" opacity="0.65" stroke="#F5F1E4" stroke-width="1.6"/><path d="M98 195 L98 156 A12 12 0 0 1 122 156 L122 195" fill="#D4B46A" opacity="0.85"/></svg>',
     },
];
