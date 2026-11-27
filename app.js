var storyFrameIndex = 0;
var storyFrameFlipped = false;
var storyFramesBound = false;

// 1. Ambient Drifting Jasmine Petals + Scroll Breeze Physics
var petalRate = 1;
var petalTargetRate = 1;
var petalBurstCooldownUntil = 0;
var petalBreezeRaf = null;
var petalHoldUntil = 0;

function buildBotanicalSprigSvg(width, height, mirrored) {
     if (mirrored) {
          return (
               '<svg width="' +
               width +
               '" height="' +
               height +
               '" viewBox="0 0 48 112" fill="none">' +
               '<path d="M40 104 C28 76, 18 46, 12 14" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.5" stroke-linecap="round"/>' +
               '<path d="M27 76 C18 71, 12 72, 8 76 C15 79, 22 79, 27 76 Z" fill="var(--kasavu-gold-tint)" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.2"/>' +
               '<path d="M21 54 C12 48, 7 50, 4 54 C11 57, 16 57, 21 54 Z" fill="var(--kasavu-gold-tint)" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.2"/>' +
               '<path d="M16 33 C9 28, 5 30, 3 34 C9 36, 13 36, 16 33 Z" fill="var(--kasavu-gold-tint)" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.2"/>' +
               '<circle cx="32" cy="64" r="3.2" fill="var(--ink-primary)" stroke="var(--kasavu-gold)" stroke-width="1.3"/>' +
               '<circle cx="25" cy="42" r="3" fill="var(--ink-primary)" stroke="var(--kasavu-gold)" stroke-width="1.3"/>' +
               '<circle cx="12" cy="12" r="3.5" fill="var(--kasavu-gold)"/>' +
               "</svg>"
          );
     }
     return (
          '<svg width="' +
          width +
          '" height="' +
          height +
          '" viewBox="0 0 48 112" fill="none">' +
          '<path d="M8 104 C20 76, 30 46, 36 14" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.5" stroke-linecap="round"/>' +
          '<path d="M21 76 C30 71, 36 72, 40 76 C33 79, 26 79, 21 76 Z" fill="var(--kasavu-gold-tint)" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.2"/>' +
          '<path d="M27 54 C36 48, 41 50, 44 54 C37 57, 32 57, 27 54 Z" fill="var(--kasavu-gold-tint)" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.2"/>' +
          '<path d="M32 33 C39 28, 43 30, 45 34 C39 36, 35 36, 32 33 Z" fill="var(--kasavu-gold-tint)" stroke="var(--ink-primary)" stroke-opacity="0.82" stroke-width="1.2"/>' +
          '<circle cx="16" cy="64" r="3.2" fill="var(--ink-primary)" stroke="var(--kasavu-gold)" stroke-width="1.3"/>' +
          '<circle cx="23" cy="42" r="3" fill="var(--ink-primary)" stroke="var(--kasavu-gold)" stroke-width="1.3"/>' +
          '<circle cx="36" cy="12" r="3.5" fill="var(--kasavu-gold)"/>' +
          "</svg>"
     );
}

function buildRoseSvg(size) {
     return (
          '<svg width="' +
          size +
          '" height="' +
          size +
          '" viewBox="0 0 32 32" fill="none">' +
          '<path d="M16 24 C11 23, 8 19, 9 14 C10 10, 14 8, 16 8 C18 8, 22 10, 23 14 C24 19, 21 23, 16 24 Z" fill="var(--heart-soft)" stroke="var(--heart-red)" stroke-opacity="0.82" stroke-width="1.15"/>' +
          '<path d="M11 14 C11 10.8, 14 9, 16.5 9.5 C19.5 10.2, 21 13.5, 19.5 16.8 C18.2 19.4, 14.2 19.8, 12.2 17.6" fill="var(--heart-soft)" stroke="var(--heart-red)" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round"/>' +
          '<path d="M14.2 14.5 C14.2 12.6, 16.2 11.8, 17.5 12.8 C18.6 13.7, 18.2 15.6, 16.6 16.1 C15.2 16.5, 14.3 15.6, 14.2 14.5 Z" fill="var(--kasavu-gold-tint)" stroke="var(--kasavu-gold)" stroke-width="1"/>' +
          '<path d="M12.5 23 C9.5 24, 7.5 26, 6.5 28 C9 27.5, 11.2 26, 12.5 23 Z" fill="var(--kasavu-gold-tint)" stroke="var(--kasavu-gold)" stroke-opacity="0.85" stroke-width="1"/>' +
          '<path d="M19.5 23 C22.5 24, 24.5 26, 25.5 28 C23 27.5, 20.8 26, 19.5 23 Z" fill="var(--kasavu-gold-tint)" stroke="var(--kasavu-gold)" stroke-opacity="0.85" stroke-width="1"/>' +
          "</svg>"
     );
}

function buildLotusSvg(size) {
     return (
          '<svg width="' +
          size +
          '" height="' +
          Math.round(size * 0.72) +
          '" viewBox="0 0 36 26" fill="none">' +
          '<path d="M18 3 C14 9, 14 16, 18 21 C22 16, 22 9, 18 3 Z" fill="var(--petal-fill)" fill-opacity="0.72" stroke="var(--kasavu-gold)" stroke-width="1"/>' +
          '<path d="M13 8 C8 11, 7 17, 12 20 C15 18, 15 12, 13 8 Z" fill="var(--kasavu-gold-tint)" stroke="var(--kasavu-gold)" stroke-opacity="0.85" stroke-width="0.95"/>' +
          '<path d="M23 8 C28 11, 29 17, 24 20 C21 18, 21 12, 23 8 Z" fill="var(--kasavu-gold-tint)" stroke="var(--kasavu-gold)" stroke-opacity="0.85" stroke-width="0.95"/>' +
          '<circle cx="18" cy="22" r="1.4" fill="var(--kasavu-gold)"/>' +
          "</svg>"
     );
}

function buildStarBlossomSvg(size) {
     return (
          '<svg width="' +
          size +
          '" height="' +
          size +
          '" viewBox="0 0 28 28" fill="none">' +
          '<path d="M14 3 C12 8, 12 11, 14 14 C16 11, 16 8, 14 3 Z" fill="var(--petal-fill)" fill-opacity="0.82" stroke="var(--petal-stroke)" stroke-width="0.9"/>' +
          '<path d="M14 25 C12 20, 12 17, 14 14 C16 17, 16 20, 14 25 Z" fill="var(--petal-fill)" fill-opacity="0.82" stroke="var(--petal-stroke)" stroke-width="0.9"/>' +
          '<path d="M3 14 C8 12, 11 12, 14 14 C11 16, 8 16, 3 14 Z" fill="var(--petal-fill)" fill-opacity="0.82" stroke="var(--petal-stroke)" stroke-width="0.9"/>' +
          '<path d="M25 14 C20 12, 17 12, 14 14 C17 16, 20 16, 25 14 Z" fill="var(--petal-fill)" fill-opacity="0.82" stroke="var(--petal-stroke)" stroke-width="0.9"/>' +
          '<circle cx="14" cy="14" r="2" fill="var(--kasavu-gold)"/>' +
          "</svg>"
     );
}

function createSinglePetalElement(isBurst, forceKind) {
     var kind = forceKind;
     if (!kind) {
          var r = Math.random();
          kind =
               r < 0.18
                    ? "sprig"
                    : r < 0.38
                      ? "rose"
                      : r < 0.56
                        ? "lotus"
                        : r < 0.72
                          ? "blossom"
                          : "petal";
     }
     var isSprig = kind === "sprig";
     var isFlower = kind === "rose" || kind === "lotus" || kind === "blossom";
     var petal = document.createElement("div");
     petal.className = isBurst
          ? "jasmine-petal is-burst"
          : "jasmine-petal";
     petal.style.left = Math.random() * 94 + "vw";
     if (isBurst) {
          petal.style.animationDuration =
               (isSprig || isFlower ? 7.8 : 6.8) + Math.random() * 2.4 + "s";
          petal.style.animationDelay = "0s";
     } else {
          petal.style.animationDuration =
               (isSprig || isFlower ? 17 : 14) + Math.random() * 10 + "s";
          petal.style.animationDelay =
               -(Math.random() * 16) + "s";
     }

     if (isSprig) {
          var sprigW = 12 + Math.round(Math.random() * 4);
          var sprigH = Math.round(sprigW * (112 / 48));
          petal.innerHTML = buildBotanicalSprigSvg(
               sprigW,
               sprigH,
               Math.random() < 0.5,
          );
     } else if (kind === "rose") {
          var roseSize = 17 + Math.round(Math.random() * 5);
          petal.innerHTML = buildRoseSvg(roseSize);
     } else if (kind === "lotus") {
          var lotusSize = 18 + Math.round(Math.random() * 5);
          petal.innerHTML = buildLotusSvg(lotusSize);
     } else if (kind === "blossom") {
          var blossomSize = 15 + Math.round(Math.random() * 4);
          petal.innerHTML = buildStarBlossomSvg(blossomSize);
     } else {
          var size = 11 + Math.round(Math.random() * 5);
          petal.innerHTML =
               '<svg width="' +
               size +
               '" height="' +
               size +
               '" viewBox="0 0 24 24" fill="none">' +
               '<path d="M12 3C7 8 7 16 12 21C17 16 17 8 12 3Z" fill="var(--petal-fill)" fill-opacity="0.92" stroke="var(--petal-stroke)" stroke-width="1"/>' +
               "</svg>";
     }
     return petal;
}

function setAllPetalsPlaybackRate(rate) {
     var layer = document.getElementById("petals-layer");
     if (!layer) return;
     var items = layer.querySelectorAll(".jasmine-petal");
     for (var i = 0; i < items.length; i++) {
          var el = items[i];
          if (typeof el.getAnimations === "function") {
               var anims = el.getAnimations();
               for (var j = 0; j < anims.length; j++) {
                    try {
                         if (
                              typeof anims[j]
                                   .updatePlaybackRate ===
                              "function"
                         ) {
                              anims[j].updatePlaybackRate(rate);
                         } else {
                              anims[j].playbackRate = rate;
                         }
                    } catch (e) {}
               }
          }
     }
}

function spawnBurstPetals(count) {
     var layer = document.getElementById("petals-layer");
     if (!layer) return;
     var existingBursts = layer.querySelectorAll(
          ".jasmine-petal.is-burst",
     );
     if (existingBursts.length >= 6) return;
     var toAdd = Math.min(count, 6 - existingBursts.length);
     for (var i = 0; i < toAdd; i++) {
          var petal = createSinglePetalElement(true);
          layer.appendChild(petal);
          (function (p) {
               var removeDone = function () {
                    if (p && p.parentNode)
                         p.parentNode.removeChild(p);
               };
               p.addEventListener("animationend", removeDone, {
                    once: true,
               });
               setTimeout(removeDone, 11500);
          })(petal);
     }
     setAllPetalsPlaybackRate(petalRate);
}

function stepPetalBreeze() {
     var now = Date.now();
     if (now > petalHoldUntil) {
          petalTargetRate += (1 - petalTargetRate) * 0.085;
     }
     petalRate += (petalTargetRate - petalRate) * 0.22;

     setAllPetalsPlaybackRate(petalRate);

     if (
          Math.abs(petalRate - 1) > 0.015 ||
          Math.abs(petalTargetRate - 1) > 0.015 ||
          now <= petalHoldUntil
     ) {
          petalBreezeRaf =
               requestAnimationFrame(stepPetalBreeze);
     } else {
          petalRate = 1;
          petalTargetRate = 1;
          setAllPetalsPlaybackRate(1);
          petalBreezeRaf = null;
     }
}

function applyPetalScrollImpulse(deltaY) {
     if (
          !deltaY ||
          (window.matchMedia &&
               window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
               ).matches)
     )
          return;
     var now = Date.now();
     petalHoldUntil = now + 150;

     if (deltaY > 0) {
          var boost = Math.min(
               2.2,
               1.35 + Math.abs(deltaY) * 0.011,
          );
          petalTargetRate = Math.max(petalTargetRate, boost);
          if (now > petalBurstCooldownUntil) {
               petalBurstCooldownUntil = now + 260;
               spawnBurstPetals(Math.abs(deltaY) > 40 ? 2 : 1);
          }
     } else {
          var slow = Math.max(
               0.24,
               0.48 - Math.min(0.24, Math.abs(deltaY) * 0.004),
          );
          petalTargetRate = Math.min(petalTargetRate, slow);
     }

     if (!petalBreezeRaf) {
          petalBreezeRaf =
               requestAnimationFrame(stepPetalBreeze);
     }
}

function createPetals() {
     var layer = document.getElementById("petals-layer");
     if (!layer) return;
     layer.innerHTML = "";

     for (var i = 0; i < 3; i++) {
          layer.appendChild(createSinglePetalElement(false, "petal"));
     }
     for (var j = 0; j < 2; j++) {
          layer.appendChild(createSinglePetalElement(false, "sprig"));
     }
     for (var k = 0; k < 2; k++) {
          layer.appendChild(createSinglePetalElement(false, "rose"));
     }
     for (var l = 0; l < 2; l++) {
          layer.appendChild(createSinglePetalElement(false, "lotus"));
     }
     layer.appendChild(createSinglePetalElement(false, "blossom"));
}

// 1B. Ambient Origami Birds (1 flying from start, 2nd joins at RSVP ending)
var ambientBirdsRaf = null;
var ambientBird2Joined = false;
var ambientBird2JoinStartAt = 0;
var ambientBird2OriginX = 0;
var ambientBird2OriginY = 0;
var ambientBirdDist = 0;
var ambientBirdElapsed = 0;
var ambientBirdLastNow = 0;
var ambientBird2Prev = null;
var ambientOrbitCache = null;

function rawBirdOrbitPoint(theta, vw, vh) {
     if (vw < 640) {
          // Vertical figure-8 sweeping across open top/bottom sky and diagonal canvas
          return {
               x: vw * (0.5 + 0.4 * Math.sin(2 * theta + 0.3)),
               y: vh * (0.49 - 0.38 * Math.cos(theta)),
          };
     }
     var dx = (Math.cos(theta) - 0.1 * Math.cos(3 * theta)) / 0.9;
     return {
          x: vw * (0.5 + 0.43 * dx),
          y:
               vh *
               (0.49 +
                    0.38 * Math.sin(2 * theta + 0.35) * 0.82 +
                    0.06 * Math.cos(theta)),
     };
}

function getBirdOrbitTable(vw, vh) {
     if (
          ambientOrbitCache &&
          ambientOrbitCache.vw === vw &&
          ambientOrbitCache.vh === vh
     ) {
          return ambientOrbitCache;
     }
     var N = 360;
     var pts = [];
     var cum = [0];
     var total = 0;
     for (var i = 0; i <= N; i++) {
          var t = (i / N) * Math.PI * 2;
          var p = rawBirdOrbitPoint(t, vw, vh);
          pts.push(p);
          if (i > 0) {
               total += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y);
               cum.push(total);
          }
     }
     ambientOrbitCache = { vw: vw, vh: vh, pts: pts, cum: cum, total: total };
     return ambientOrbitCache;
}

function sampleBirdOrbitAtDist(table, dist) {
     var total = table.total || 1;
     var d = ((dist % total) + total) % total;
     var cum = table.cum;
     var pts = table.pts;
     var lo = 0;
     var hi = cum.length - 1;
     while (lo < hi - 1) {
          var mid = (lo + hi) >> 1;
          if (cum[mid] <= d) lo = mid;
          else hi = mid;
     }
     var segLen = cum[hi] - cum[lo] || 1;
     var f = (d - cum[lo]) / segLen;
     return {
          x: pts[lo].x + (pts[hi].x - pts[lo].x) * f,
          y: pts[lo].y + (pts[hi].y - pts[lo].y) * f,
     };
}

function applyBirdTransform(el, pos, dx, dy) {
     if (!el) return;
     var speed = Math.hypot(dx, dy);
     var facingLeft = dx < -0.02;
     var angleRad =
          speed > 0.01 ? Math.atan2(dy, facingLeft ? -dx : dx) : 0;
     var deg = Math.max(-28, Math.min(28, angleRad * (180 / Math.PI)));

     el.style.transform =
          "translate3d(" +
          pos.x.toFixed(1) +
          "px, " +
          pos.y.toFixed(1) +
          "px, 0) scaleX(" +
          (facingLeft ? -1 : 1) +
          ") rotate(" +
          deg.toFixed(1) +
          "deg)";
}

function stepAmbientOrigamiBirds(now) {
     if (
          document.hidden ||
          (window.matchMedia &&
               window.matchMedia("(prefers-reduced-motion: reduce)").matches)
     ) {
          ambientBirdsRaf = null;
          return;
     }

     if (!ambientBirdLastNow) ambientBirdLastNow = now;
     var dt = Math.min(0.06, Math.max(0.001, (now - ambientBirdLastNow) / 1000));
     ambientBirdLastNow = now;
     ambientBirdElapsed += dt;

     var vw = window.innerWidth || 375;
     var vh = window.innerHeight || 667;
     var table = getBirdOrbitTable(vw, vh);
     var speedPxPerSec =
          vw < 640
               ? Math.max(95, Math.min(125, table.total / 15.5))
               : Math.max(120, Math.min(145, table.total / 22));
     ambientBirdDist = (ambientBirdDist + dt * speedPxPerSec) % table.total;

     var bird1 = document.getElementById("ambient-bird-1");
     var pos1 = sampleBirdOrbitAtDist(table, ambientBirdDist);
     var ahead1 = sampleBirdOrbitAtDist(table, ambientBirdDist + 10);
     var behind1 = sampleBirdOrbitAtDist(table, ambientBirdDist - 10);
     applyBirdTransform(
          bird1,
          pos1,
          ahead1.x - behind1.x,
          ahead1.y - behind1.y,
     );

     if (ambientBird2Joined) {
          var bird2 = document.getElementById("ambient-bird-2");
          var lagDist = ambientBirdDist - (vw < 640 ? 48 : 66);
          var base2 = sampleBirdOrbitAtDist(table, lagDist);
          var weaveX =
               Math.min(18, vw * 0.03) * Math.cos(ambientBirdElapsed * 1.1);
          var weaveY =
               Math.min(14, vh * 0.025) * Math.sin(ambientBirdElapsed * 1.3);
          var target2 = {
               x: Math.max(20, Math.min(vw - 20, base2.x + weaveX)),
               y: Math.max(20, Math.min(vh - 20, base2.y + weaveY)),
          };

          var rawT = Math.min(
               1,
               Math.max(0, (now - ambientBird2JoinStartAt) / 2400),
          );
          var easeT = 1 - Math.pow(1 - rawT, 3);
          var pos2 = {
               x:
                    ambientBird2OriginX +
                    (target2.x - ambientBird2OriginX) * easeT,
               y:
                    ambientBird2OriginY +
                    (target2.y - ambientBird2OriginY) * easeT,
          };
          var dx2 = ambientBird2Prev ? pos2.x - ambientBird2Prev.x : 1;
          var dy2 = ambientBird2Prev ? pos2.y - ambientBird2Prev.y : 0;
          applyBirdTransform(bird2, pos2, dx2, dy2);
          ambientBird2Prev = pos2;
     }

     ambientBirdsRaf = requestAnimationFrame(stepAmbientOrigamiBirds);
}

function startAmbientOrigamiLoop() {
     if (
          ambientBirdsRaf ||
          document.hidden ||
          (window.matchMedia &&
               window.matchMedia("(prefers-reduced-motion: reduce)").matches)
     )
          return;
     ambientBirdLastNow = 0;
     ambientBirdsRaf = requestAnimationFrame(stepAmbientOrigamiBirds);
}

function initAmbientOrigamiBirds() {
     var bird1 = document.getElementById("ambient-bird-1");
     if (!bird1) return;
     if (
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
     )
          return;

     var vw = window.innerWidth || 375;
     var vh = window.innerHeight || 667;
     var table = getBirdOrbitTable(vw, vh);
     ambientBirdDist = table.total * 0.03; // Start visibly in open top sky
     var initPos = sampleBirdOrbitAtDist(table, ambientBirdDist);
     var ahead = sampleBirdOrbitAtDist(table, ambientBirdDist + 10);
     var behind = sampleBirdOrbitAtDist(table, ambientBirdDist - 10);
     applyBirdTransform(
          bird1,
          initPos,
          ahead.x - behind.x,
          ahead.y - behind.y,
     );
     bird1.classList.add("is-visible");

     document.addEventListener("visibilitychange", function () {
          if (document.hidden) {
               if (ambientBirdsRaf) {
                    cancelAnimationFrame(ambientBirdsRaf);
                    ambientBirdsRaf = null;
               }
          } else {
               startAmbientOrigamiLoop();
          }
     });

     startAmbientOrigamiLoop();
}

function joinSecondOrigamiBird(startX, startY) {
     var bird2 = document.getElementById("ambient-bird-2");
     if (!bird2) return;
     if (
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
     )
          return;

     var vw = window.innerWidth || 375;
     var vh = window.innerHeight || 667;
     ambientBird2OriginX =
          typeof startX === "number" ? startX : vw * 0.74;
     ambientBird2OriginY =
          typeof startY === "number" ? startY : vh * 0.26;
     ambientBird2JoinStartAt = performance.now();
     ambientBird2Joined = true;
     ambientBird2Prev = {
          x: ambientBird2OriginX,
          y: ambientBird2OriginY,
     };
     applyBirdTransform(
          bird2,
          { x: ambientBird2OriginX, y: ambientBird2OriginY },
          1,
          -1,
     );
     bird2.classList.add("is-visible");
     startAmbientOrigamiLoop();
}

// 2. 4-Sided Viewport Border Progress (driven by active card, no downward scroll)
var activeSlideIndex = 0;

var rsvpOrigamiStarted = false;
var rsvpOrigamiCompleted = false;

function updateScrollProgress(slideIdx) {
     var slides = document.querySelectorAll(".album-chapter");
     var total = slides.length;
     var idx =
          typeof slideIdx === "number"
               ? slideIdx
               : activeSlideIndex;
     var ratio =
          total > 0
               ? idx >= total - 1 && rsvpOrigamiCompleted
                    ? 1
                    : Math.min(1, Math.max(0, idx / total))
               : 1;

     var seg = 1 / 3;
     var rightPct = Math.min(
          100,
          Math.max(0, (ratio / seg) * 100),
     );
     var bottomPct = Math.min(
          100,
          Math.max(0, ((ratio - seg) / seg) * 100),
     );
     var leftPct = Math.min(
          100,
          Math.max(0, ((ratio - seg * 2) / seg) * 100),
     );

     var elTop = document.getElementById("edge-top");
     var elRight = document.getElementById("edge-right");
     var elBottom = document.getElementById("edge-bottom");
     var elLeft = document.getElementById("edge-left");
     var frame = document.getElementById("page-progress-frame");

     if (elTop) elTop.style.width = "100%";
     if (elRight)
          elRight.style.height = rightPct.toFixed(2) + "%";
     if (elBottom)
          elBottom.style.width = bottomPct.toFixed(2) + "%";
     if (elLeft) elLeft.style.height = leftPct.toFixed(2) + "%";
     if (frame)
          frame.classList.toggle("is-complete", ratio >= 0.995);
}

// 3. Through Our Eyes — Bumble-Style Cards & Cloud Pop-ups (#story)
var advanceFromStoryDeck = null;

function renderStoryPhotobook(animateText) {
     var barsEl = document.getElementById("story-bars");
     var introEl = document.getElementById("story-intro-view");
     var photoEl = document.getElementById("story-photo-view");
     var tapPrev = document.getElementById("story-tap-prev");
     var tapNext = document.getElementById("story-tap-next");
     if (!barsEl || !introEl || !photoEl) return;

     var total = STORY_FRAMES.length;
     var cur = STORY_FRAMES[storyFrameIndex] || STORY_FRAMES[0];

     // Render top segmented story bars
     barsEl.innerHTML = "";
     STORY_FRAMES.forEach(function (f, i) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("role", "tab");
          b.setAttribute(
               "aria-selected",
               i === storyFrameIndex ? "true" : "false",
          );
          b.setAttribute(
               "aria-label",
               f.type === "intro" ? f.title : f.chip,
          );
          b.className =
               "bumble-bar" +
               (i === storyFrameIndex
                    ? " is-active"
                    : i < storyFrameIndex
                      ? " is-seen"
                      : "");
          b.innerHTML = '<span class="bumble-bar-fill"></span>';
          b.addEventListener("click", function (e) {
               e.stopPropagation();
               storyFrameIndex = i;
               storyFrameFlipped = false;
               renderStoryPhotobook(true);
               if (typeof syncMoviePlayback === "function") {
                    syncMoviePlayback();
               }
          });
          barsEl.appendChild(b);
     });

     if (tapPrev) {
          tapPrev.classList.toggle("is-disabled", storyFrameIndex <= 0);
     }
     if (tapNext) {
          tapNext.setAttribute(
               "aria-label",
               storyFrameIndex >= total - 1
                    ? "Continue to Travel"
                    : "Next story card",
          );
     }

     if (cur.type === "intro") {
          introEl.classList.remove("is-hidden");
          photoEl.classList.add("is-hidden");
          var elEyebrow = document.getElementById("story-intro-eyebrow");
          var elIntroTitle = document.getElementById("story-intro-title");
          var elIntroSub = document.getElementById("story-intro-sub");
          var elIntroHint = document.getElementById("story-intro-hint");
          if (elEyebrow) elEyebrow.textContent = cur.eyebrow;
          if (elIntroTitle) elIntroTitle.textContent = cur.title;
          if (elIntroSub) elIntroSub.textContent = cur.subtitle;
          if (elIntroHint) elIntroHint.textContent = cur.hint + " ›";
          return;
     }

     introEl.classList.add("is-hidden");
     photoEl.classList.remove("is-hidden");

     var mediaEl = document.getElementById("story-media");
     var chipEl = document.getElementById("story-photo-chip");
     var titleEl = document.getElementById("story-photo-title");
     var cloudsEl = document.getElementById("story-clouds");
     var noteOverlay = document.getElementById("story-note-overlay");
     var backNoteEl = document.getElementById("story-back-note");
     var flipBtn = document.getElementById("story-btn-flip");

     if (mediaEl) {
          mediaEl.style.background = cur.bg || "";
          if (cur.imgSrc) {
               mediaEl.innerHTML = "";
               var img = document.createElement("img");
               img.src = cur.imgSrc;
               img.alt = cur.title || "";
               img.loading = "lazy";
               img.style.objectPosition = cur.imgPos || "center 22%";
               mediaEl.appendChild(img);
          } else {
               mediaEl.innerHTML = cur.svg || "";
          }
     }
     if (chipEl) chipEl.textContent = cur.chip;
     if (titleEl) titleEl.textContent = cur.title;
     if (backNoteEl) backNoteEl.textContent = cur.backNote || "";

     if (cloudsEl) {
          cloudsEl.innerHTML = "";
          var msgs = Array.isArray(cur.messages) ? cur.messages : [];
          msgs.forEach(function (m) {
               var isManna = m.who === "manna";
               var bubble = document.createElement("div");
               bubble.className =
                    "cloud-bubble " + (isManna ? "is-manna" : "is-john");

               var dot = document.createElement("span");
               dot.className = "cloud-dot";
               dot.textContent = isManna ? "M" : "J";

               var p = document.createElement("p");
               p.className = "cloud-text";
               p.textContent = m.text;

               bubble.appendChild(dot);
               bubble.appendChild(p);
               cloudsEl.appendChild(bubble);
          });

          cloudsEl.classList.remove("is-popped");
          if (animateText !== false) {
               void cloudsEl.offsetWidth;
          }
          cloudsEl.classList.add("is-popped");
     }

     if (noteOverlay) {
          noteOverlay.hidden = !storyFrameFlipped;
     }
     if (flipBtn) {
          flipBtn.setAttribute(
               "aria-pressed",
               storyFrameFlipped ? "true" : "false",
          );
          flipBtn.textContent = storyFrameFlipped ? "Photo ↺" : "Note ↻";
     }
}

var storySwipeConsumed = false;
var storySwipeSuppressClickUntil = 0;

function initStoryPhotobook() {
     renderStoryPhotobook(true);
     if (storyFramesBound) return;
     storyFramesBound = true;

     var tapPrev = document.getElementById("story-tap-prev");
     var tapNext = document.getElementById("story-tap-next");
     var btnFlip = document.getElementById("story-btn-flip");
     var stageEl = document.getElementById("story-bumble-stage");

     if (tapPrev) {
          tapPrev.addEventListener("click", function () {
               if (Date.now() < storySwipeSuppressClickUntil) return;
               if (storyFrameFlipped) {
                    storyFrameFlipped = false;
                    renderStoryPhotobook(false);
               } else if (storyFrameIndex > 0) {
                    storyFrameIndex -= 1;
                    renderStoryPhotobook(true);
               }
               if (typeof syncMoviePlayback === "function")
                    syncMoviePlayback();
          });
     }

     if (tapNext) {
          tapNext.addEventListener("click", function () {
               if (Date.now() < storySwipeSuppressClickUntil) return;
               if (storyFrameFlipped) {
                    storyFrameFlipped = false;
                    renderStoryPhotobook(false);
               } else if (storyFrameIndex < STORY_FRAMES.length - 1) {
                    storyFrameIndex += 1;
                    renderStoryPhotobook(true);
               } else if (typeof advanceFromStoryDeck === "function") {
                    advanceFromStoryDeck();
                    return;
               }
               if (typeof syncMoviePlayback === "function")
                    syncMoviePlayback();
          });
     }

     if (btnFlip) {
          btnFlip.addEventListener("click", function (e) {
               e.stopPropagation();
               storyFrameFlipped = !storyFrameFlipped;
               renderStoryPhotobook(false);
               if (typeof syncMoviePlayback === "function")
                    syncMoviePlayback();
          });
     }

     if (stageEl) {
          var touchStartX = null;
          var touchStartY = null;
          stageEl.addEventListener(
               "touchstart",
               function (e) {
                    if (e.touches.length !== 1) return;
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    storySwipeConsumed = false;
               },
               { passive: true },
          );
          stageEl.addEventListener(
               "touchend",
               function (e) {
                    if (touchStartX === null || !e.changedTouches.length)
                         return;
                    var dx = e.changedTouches[0].clientX - touchStartX;
                    var dy = e.changedTouches[0].clientY - touchStartY;
                    touchStartX = null;
                    touchStartY = null;
                    if (
                         Math.abs(dx) > 32 &&
                         Math.abs(dx) > Math.abs(dy) * 1.15
                    ) {
                         storySwipeConsumed = true;
                         storySwipeSuppressClickUntil = Date.now() + 360;
                         storyFrameFlipped = false;
                         if (dx < 0) {
                              if (storyFrameIndex < STORY_FRAMES.length - 1) {
                                   storyFrameIndex += 1;
                                   renderStoryPhotobook(true);
                              } else if (
                                   typeof advanceFromStoryDeck === "function"
                              ) {
                                   advanceFromStoryDeck();
                                   return;
                              }
                         } else if (storyFrameIndex > 0) {
                              storyFrameIndex -= 1;
                              renderStoryPhotobook(true);
                         }
                         if (typeof syncMoviePlayback === "function")
                              syncMoviePlayback();
                    }
               },
               { passive: true },
          );
     }
}

function enterStoryChapter(fromBottom) {
     storyFrameIndex = fromBottom ? STORY_FRAMES.length - 1 : 0;
     storyFrameFlipped = false;
     renderStoryPhotobook(false);
}

function resetStoryChapter() {
     storyFrameFlipped = false;
}

function stepStoryFrame(delta) {
     var next = storyFrameIndex + delta;
     if (next < 0 || next >= STORY_FRAMES.length) return false;
     storyFrameIndex = next;
     storyFrameFlipped = false;
     renderStoryPhotobook(true);
     return true;
}

// 4. Live Countdown to the Wedding (Monday, July 12, 2027)
function updateCountdown() {
     var targetTime = new Date(
          "2027-07-12T10:30:00+05:30",
     ).getTime();
     var diff = Math.max(0, targetTime - Date.now());

     var days = Math.floor(diff / (1000 * 60 * 60 * 24));
     var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
     var mins = Math.floor((diff / (1000 * 60)) % 60);
     var secs = Math.floor((diff / 1000) % 60);

     var elDays = document.getElementById("cd-days");
     var elHours = document.getElementById("cd-hours");
     var elMins = document.getElementById("cd-mins");
     var elSecs = document.getElementById("cd-secs");

     if (elDays) elDays.textContent = days;
     if (elHours)
          elHours.textContent = String(hours).padStart(2, "0");
     if (elMins)
          elMins.textContent = String(mins).padStart(2, "0");
     if (elSecs)
          elSecs.textContent = String(secs).padStart(2, "0");
}

// 5. Interactive Keepsake RSVP Confirmation & Final Farewell Origami Card
var farewellTimers = [];
var rsvpGuestName = "";
var rsvpGuestAttending = true;

function clearFarewellTimers() {
     while (farewellTimers.length) {
          clearTimeout(farewellTimers.pop());
     }
}

function syncFarewellCopy() {
     var farewellTitle =
          document.getElementById("farewell-title");
     var farewellCopy = document.getElementById("farewell-copy");
     var farewellSignoff =
          document.getElementById("farewell-signoff");

     if (farewellTitle) {
          farewellTitle.textContent = rsvpGuestName
               ? "Thank You, " + rsvpGuestName
               : "Thank You";
     }
     if (farewellCopy) {
          farewellCopy.textContent = rsvpGuestAttending
               ? "We are truly looking forward to celebrating with you at the start of a new chapter in our lives."
               : "We carry your warm wishes with us as we begin our life together.";
     }
     if (farewellSignoff) {
          farewellSignoff.textContent =
               "Manna & John • July 12, 2027 • Kerala";
     }
}

function resetFarewellStage() {
     clearFarewellTimers();
     rsvpOrigamiStarted = false;
     rsvpOrigamiCompleted = false;
     var rsvpChapter = document.getElementById("rsvp");
     var flightLayer = document.getElementById(
          "origami-flight-layer",
     );
     if (rsvpChapter) {
          rsvpChapter.classList.remove(
               "is-folding",
               "is-flown",
               "is-post-visible",
          );
     }
     if (flightLayer) {
          flightLayer.classList.remove(
               "is-active",
               "is-folding",
               "is-flying",
          );
     }
     syncFarewellCopy();
     updateScrollProgress(activeSlideIndex);
}

function triggerRsvpOrigami(initialDelayMs) {
     var rsvpChapter = document.getElementById("rsvp");
     var rsvpSheet = document.getElementById("rsvp-sheet");
     var flightLayer = document.getElementById(
          "origami-flight-layer",
     );
     var birdAnchor = document.getElementById(
          "origami-bird-anchor",
     );
     if (!rsvpChapter || !rsvpSheet || rsvpOrigamiStarted)
          return;

     syncFarewellCopy();
     rsvpOrigamiStarted = true;
     clearFarewellTimers();

     var reducedMotion =
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)")
               .matches;
     if (reducedMotion || !flightLayer) {
          rsvpOrigamiCompleted = true;
          rsvpChapter.classList.add(
               "is-flown",
               "is-post-visible",
          );
          updateScrollProgress(activeSlideIndex);
          syncMoviePlayback();
          return;
     }

     var holdDelay =
          typeof initialDelayMs === "number"
               ? initialDelayMs
               : 0;

     function beginFold() {
          if (!rsvpChapter.classList.contains("is-active")) {
               resetFarewellStage();
               return;
          }
          var anchorX = (window.innerWidth || 375) * 0.5;
          var anchorY = (window.innerHeight || 667) * 0.5;
          if (birdAnchor) {
               var rect = rsvpSheet.getBoundingClientRect();
               var visibleTop = Math.max(0, rect.top);
               var visibleBottom = Math.min(
                    window.innerHeight,
                    rect.bottom,
               );
               anchorX = Math.round(rect.left + rect.width * 0.5);
               anchorY = Math.round((visibleTop + visibleBottom) * 0.5);
               birdAnchor.style.left = anchorX + "px";
               birdAnchor.style.top = anchorY + "px";
          }
          flightLayer.classList.add("is-active");
          requestAnimationFrame(function () {
               rsvpChapter.classList.add("is-folding");
               flightLayer.classList.add("is-folding");
          });

          // Phase 2: Wings flap & origami bird flies up to join the first bird
          farewellTimers.push(
               setTimeout(function () {
                    if (
                         !rsvpChapter.classList.contains(
                              "is-active",
                         )
                    )
                         return;
                    flightLayer.classList.add("is-flying");

                    // Phase 3: Reveal ending Thank You card
                    farewellTimers.push(
                         setTimeout(function () {
                              if (
                                   !rsvpChapter.classList.contains(
                                        "is-active",
                                   )
                              )
                                   return;
                              rsvpChapter.classList.add(
                                   "is-flown",
                              );
                              rsvpChapter.scrollTop = 0;
                              requestAnimationFrame(function () {
                                   rsvpChapter.classList.add(
                                        "is-post-visible",
                                   );
                                   rsvpOrigamiCompleted = true;
                                   updateScrollProgress(
                                        activeSlideIndex,
                                   );
                                   syncMoviePlayback();
                              });
                         }, 1050),
                    );

                    // Hand off seamlessly to Bird 2 in the sky so both fly together
                    farewellTimers.push(
                         setTimeout(function () {
                              joinSecondOrigamiBird(
                                   anchorX + (window.innerWidth || 375) * 0.24,
                                   anchorY - (window.innerHeight || 667) * 0.24,
                              );
                              flightLayer.classList.remove(
                                   "is-active",
                                   "is-folding",
                                   "is-flying",
                              );
                         }, 1650),
                    );
               }, 580),
          );
     }

     if (holdDelay > 0) {
          farewellTimers.push(setTimeout(beginFold, holdDelay));
     } else {
          beginFold();
     }
}

var syncMoviePlayback = function () {};
var toggleMovieAutoPlay = function () {};
var toggleMovieRepeat = function () {};
var notifyMovieFormInteraction = function () {};
var rsvpJustSubmitted = false;

function handleRsvpSubmit(event) {
     event.preventDefault();
     var name = document
          .getElementById("rsvp-name")
          .value.trim();
     var attendance =
          document.getElementById("rsvp-attendance").value;
     var guests = document.getElementById("rsvp-guests").value;
     var notes = document
          .getElementById("rsvp-notes")
          .value.trim();

     if (!name) return;

     rsvpGuestName = name;
     rsvpGuestAttending = attendance.indexOf("Wedding") !== -1;
     syncFarewellCopy();

     var message =
          "Dearest <strong>" +
          escapeHtml(name) +
          "</strong>, we have joyfully recorded your reply for <strong>" +
          escapeHtml(guests) +
          "</strong> — <em>" +
          escapeHtml(attendance) +
          "</em>.";

     if (notes) {
          message +=
               '<br><span style="display:inline-block; margin-top:8px; padding:6px 12px; border-radius:999px; background:var(--bg-cotton); border:1px solid var(--border-chip); color:var(--ink-primary); font-size:0.8rem;">Your Note: ' +
               escapeHtml(notes) +
               "</span>";
     }

     document.getElementById("rsvp-receipt-body").innerHTML =
          message;
     document.getElementById("rsvp-form-card").style.display =
          "none";
     document
          .getElementById("rsvp-receipt")
          .classList.add("is-visible");
     rsvpJustSubmitted = true;
     notifyMovieFormInteraction(false);
     syncMoviePlayback();
}

function editRsvp() {
     rsvpJustSubmitted = false;
     document
          .getElementById("rsvp-receipt")
          .classList.remove("is-visible");
     document.getElementById("rsvp-form-card").style.display =
          "block";
     notifyMovieFormInteraction(true);
}

function escapeHtml(value) {
     return String(value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
}

// 6. Live Colour Palette Preview Switcher
var PALETTES = {
     "olive-gold": {
          label: "Dark Olive & Gold",
          primary: "#29351D",
          accent: "#D4B46A",
     },
     "olive-ivory": {
          label: "Deep Olive & Ivory",
          primary: "#2D3822",
          accent: "#EAE2CC",
     },
     "olive-champagne": {
          label: "Forest Olive & Champagne",
          primary: "#24311D",
          accent: "#DFC592",
     },
};
var PALETTE_STORAGE_KEY = "mj-wedding-palette-v3";

function applyPaletteState(paletteId, persist) {
     if (!PALETTES[paletteId]) paletteId = "olive-gold";
     var meta = PALETTES[paletteId];

     document.documentElement.setAttribute(
          "data-palette",
          paletteId,
     );

     var triggerEl = document.getElementById("palette-trigger");
     var dotPrimary =
          document.getElementById("active-dot-primary");
     var dotAccent =
          document.getElementById("active-dot-accent");
     if (triggerEl)
          triggerEl.setAttribute(
               "title",
               "Settings & Palette (" + meta.label + ")",
          );
     if (dotPrimary) dotPrimary.style.background = meta.primary;
     if (dotAccent) dotAccent.style.background = meta.accent;

     var options = document.querySelectorAll(".palette-option");
     options.forEach(function (btn) {
          var selected =
               btn.getAttribute("data-palette-choice") ===
               paletteId;
          btn.classList.toggle("is-selected", selected);
          btn.setAttribute(
               "aria-selected",
               selected ? "true" : "false",
          );
     });

     if (persist) {
          try {
               localStorage.setItem(
                    PALETTE_STORAGE_KEY,
                    paletteId,
               );
          } catch (e) {}
          try {
               var url = new URL(window.location.href);
               url.searchParams.set("palette", paletteId);
               window.history.replaceState(
                    {},
                    "",
                    url.toString(),
               );
          } catch (e) {}
     }
}

function setPalette(paletteId) {
     applyPaletteState(paletteId, true);
     togglePaletteMenu(false);
}

function togglePaletteMenu(forceState) {
     var switcher = document.getElementById("palette-switcher");
     var trigger = document.getElementById("palette-trigger");
     if (!switcher || !trigger) return;

     var nextOpen =
          typeof forceState === "boolean"
               ? forceState
               : !switcher.classList.contains("is-open");

     switcher.classList.toggle("is-open", nextOpen);
     trigger.setAttribute(
          "aria-expanded",
          nextOpen ? "true" : "false",
     );
     syncMoviePlayback();
}

function initPaletteSwitcher() {
     var initial = "olive-gold";
     try {
          var params = new URLSearchParams(
               window.location.search,
          );
          var fromUrl = params.get("palette");
          if (fromUrl && PALETTES[fromUrl]) {
               initial = fromUrl;
          } else {
               var saved =
                    localStorage.getItem(PALETTE_STORAGE_KEY);
               if (saved && PALETTES[saved]) {
                    initial = saved;
               }
          }
     } catch (e) {}

     applyPaletteState(initial, false);

     document.addEventListener("click", function (event) {
          var switcher =
               document.getElementById("palette-switcher");
          if (
               switcher &&
               switcher.classList.contains("is-open") &&
               !switcher.contains(event.target)
          ) {
               togglePaletteMenu(false);
          }
     });

     document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
               togglePaletteMenu(false);
          }
     });
}

var VERSE_READ_DELAY_MS = 3600;
var DETAILS_READ_DELAY_MS = 5200;
var invitationTimer = null;
var invitationTimerStartedAt = 0;
var invitationRemainingMs = VERSE_READ_DELAY_MS;
var invitationRevealed = false;
var invitationDetailsTimer = null;
var invitationDetailsStartedAt = 0;
var invitationDetailsRemainingMs = DETAILS_READ_DELAY_MS;
var invitationDetailsShown = false;
var invitationHolding = false;
var slideMotionBusy = false;

function pauseInvitationTimer(minRemainingMs) {
     if (invitationTimer) {
          clearTimeout(invitationTimer);
          invitationTimer = null;
          var elapsed = Date.now() - invitationTimerStartedAt;
          invitationRemainingMs = Math.max(
               0,
               invitationRemainingMs - elapsed,
          );
     }
     if (
          typeof minRemainingMs === "number" &&
          !invitationRevealed
     ) {
          invitationRemainingMs = Math.max(
               invitationRemainingMs,
               minRemainingMs,
          );
     }
     if (invitationDetailsTimer) {
          clearTimeout(invitationDetailsTimer);
          invitationDetailsTimer = null;
          var detailsElapsed =
               Date.now() - invitationDetailsStartedAt;
          invitationDetailsRemainingMs = Math.max(
               0,
               invitationDetailsRemainingMs - detailsElapsed,
          );
     }
}

function showInvitationDetailsNow() {
     var sheet = document.getElementById("invitation-sheet");
     if (!sheet || invitationDetailsShown) return;
     invitationDetailsShown = true;
     if (invitationDetailsTimer) {
          clearTimeout(invitationDetailsTimer);
          invitationDetailsTimer = null;
     }
     sheet.classList.add("is-details-shown");
     var fullEl = sheet.querySelector(".invite-names-full");
     var shortEl = sheet.querySelector(".invite-names-short");
     if (fullEl) fullEl.setAttribute("aria-hidden", "true");
     if (shortEl) shortEl.setAttribute("aria-hidden", "false");
     syncMoviePlayback();
}

function revealInvitationNow() {
     var sheet = document.getElementById("invitation-sheet");
     if (!sheet) return;
     invitationRevealed = true;
     invitationHolding = false;
     if (invitationTimer) {
          clearTimeout(invitationTimer);
          invitationTimer = null;
     }
     sheet.classList.add("is-unblurred");
     syncInvitationTimer();
}

function resetInvitationStage() {
     if (invitationTimer) {
          clearTimeout(invitationTimer);
          invitationTimer = null;
     }
     if (invitationDetailsTimer) {
          clearTimeout(invitationDetailsTimer);
          invitationDetailsTimer = null;
     }
     invitationRevealed = false;
     invitationDetailsShown = false;
     invitationHolding = false;
     invitationRemainingMs = VERSE_READ_DELAY_MS;
     invitationDetailsRemainingMs = DETAILS_READ_DELAY_MS;

     var sheet = document.getElementById("invitation-sheet");
     if (sheet) {
          sheet.classList.remove(
               "is-unblurred",
               "is-details-shown",
          );
          var fullEl = sheet.querySelector(".invite-names-full");
          var shortEl = sheet.querySelector(
               ".invite-names-short",
          );
          if (fullEl)
               fullEl.setAttribute("aria-hidden", "false");
          if (shortEl)
               shortEl.setAttribute("aria-hidden", "true");
     }
}

function syncInvitationTimer() {
     var sheet = document.getElementById("invitation-sheet");
     if (!sheet) return;

     if (invitationRevealed && invitationDetailsShown) return;

     var chapter = sheet.closest(".album-chapter");
     var inMainView =
          !document.hidden &&
          chapter &&
          chapter.classList.contains("is-active");

     if (!inMainView) {
          pauseInvitationTimer();
          if (!invitationRevealed) {
               invitationRemainingMs = VERSE_READ_DELAY_MS;
          } else if (!invitationDetailsShown) {
               invitationDetailsRemainingMs =
                    DETAILS_READ_DELAY_MS;
          }
          return;
     }

     if (slideMotionBusy || invitationHolding) {
          pauseInvitationTimer();
          return;
     }

     if (!invitationRevealed) {
          if (!invitationTimer) {
               invitationTimerStartedAt = Date.now();
               invitationTimer = setTimeout(function () {
                    revealInvitationNow();
               }, invitationRemainingMs);
          }
     } else if (!invitationDetailsShown) {
          if (!invitationDetailsTimer) {
               invitationDetailsStartedAt = Date.now();
               invitationDetailsTimer = setTimeout(function () {
                    showInvitationDetailsNow();
               }, invitationDetailsRemainingMs);
          }
     }
}

function setSlideMotionBusy(busy) {
     slideMotionBusy = !!busy;
     syncInvitationTimer();
}

function setupInvitationTrigger() {
     var sheet = document.getElementById("invitation-sheet");
     if (!sheet) return;

     var content = sheet.querySelector(".invitation-content");
     if (content) {
          content.addEventListener("click", function () {
               if (
                    invitationRevealed &&
                    !invitationDetailsShown
               ) {
                    showInvitationDetailsNow();
               }
          });
     }

     var veil = sheet.querySelector(".scripture-veil");
     if (veil) {
          var pressStartTime = 0;
          var pressStartX = 0;
          var pressStartY = 0;
          var pressMoved = false;
          var suppressClickUntil = 0;

          veil.addEventListener("pointerdown", function (event) {
               if (invitationRevealed) return;
               if (event.button && event.button !== 0) return;
               invitationHolding = true;
               pressStartTime = Date.now();
               pressStartX = event.clientX;
               pressStartY = event.clientY;
               pressMoved = false;
               pauseInvitationTimer();
          });

          veil.addEventListener("pointermove", function (event) {
               if (!invitationHolding) return;
               var dx = event.clientX - pressStartX;
               var dy = event.clientY - pressStartY;
               if (Math.hypot(dx, dy) > 12) {
                    pressMoved = true;
               }
          });

          function endHold(isCancelled) {
               if (!invitationHolding) return;
               invitationHolding = false;
               var heldMs = Date.now() - pressStartTime;
               if (isCancelled || pressMoved || heldMs >= 240) {
                    suppressClickUntil = Date.now() + 500;
                    pauseInvitationTimer(1600);
               }
               syncInvitationTimer();
          }

          veil.addEventListener("pointerup", function () {
               endHold(false);
          });

          veil.addEventListener("pointercancel", function () {
               endHold(true);
          });

          veil.addEventListener("click", function (event) {
               if (Date.now() < suppressClickUntil) {
                    event.preventDefault();
                    return;
               }
               revealInvitationNow();
          });

          veil.addEventListener("keydown", function (event) {
               if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    revealInvitationNow();
               }
          });
     }

     document.addEventListener(
          "visibilitychange",
          syncInvitationTimer,
     );
     syncInvitationTimer();
}

// 7. In-Place Card Deck Controller (No Downward Scroll) + Album Opening Sequence
function setupDeckNavigation() {
     var slides = Array.prototype.slice.call(
          document.querySelectorAll(".album-chapter"),
     );
     if (!slides.length) return;

     var coverEl = document.getElementById("cover");
     var isTransitioning = false;
     var isAlbumOpening = false;
     var isAlbumOpen = false;
     var albumOpenTimer = null;
     var albumCloseTimer = null;
     var settleDoneTimer = null;
     var leaveTimers = {};
     var wheelLockUntil = 0;
     var internalScrollLockUntil = 0;
     var wheelAccum = 0;
     var wheelResetTimer = null;
     var touchStartY = 0;
     var touchPrevY = 0;
     var touchStartIdx = 0;
     var touchStartScrollTop = 0;
     var touchStartAtTop = false;
     var touchStartAtBottom = false;
     var isTouching = false;

     function isSlideTall(slide) {
          return !!(
               slide &&
               slide.scrollHeight > slide.clientHeight + 2
          );
     }

     function isSlideAtTop(slide, tolerancePx) {
          var tol =
               typeof tolerancePx === "number"
                    ? tolerancePx
                    : 14;
          return !slide || slide.scrollTop <= tol;
     }

     function isSlideAtBottom(slide, tolerancePx) {
          var tol =
               typeof tolerancePx === "number"
                    ? tolerancePx
                    : 14;
          return (
               !slide ||
               Math.ceil(slide.scrollTop + slide.clientHeight) >=
                    slide.scrollHeight - tol
          );
     }

     var MOVIE_DWELL_MS = {
          cover: 2400,
          invitation: 4800,
          schedule: 4200,
          story: 4200,
          travel: 4500,
          rsvp: 4000,
     };
     var movieUserPaused = false;
     var movieRepeatEnabled = false;
     var movieFormPaused = false;
     var movieFormManualOverride = false;
     var movieTimer = null;
     var movieScrollTimer = null;
     var movieAutoScrollingUntil = 0;

     function prefersReducedMotion() {
          return (
               window.matchMedia &&
               window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
               ).matches
          );
     }

     function isRsvpEditing() {
          var slide = slides[activeSlideIndex];
          if (!slide || slide.id !== "rsvp" || rsvpJustSubmitted)
               return false;
          if (movieFormManualOverride) return false;
          if (movieFormPaused) return true;

          var card = document.getElementById("rsvp-form-card");
          if (!card || card.style.display === "none")
               return false;

          var activeEl = document.activeElement;
          if (activeEl && card.contains(activeEl)) return true;

          var nameInput = document.getElementById("rsvp-name");
          var notesInput = document.getElementById("rsvp-notes");
          if (
               (nameInput && nameInput.value.trim()) ||
               (notesInput && notesInput.value.trim())
          ) {
               return true;
          }
          return false;
     }

     function clearMovieTimers() {
          if (movieTimer) {
               clearTimeout(movieTimer);
               movieTimer = null;
          }
          if (movieScrollTimer) {
               clearTimeout(movieScrollTimer);
               movieScrollTimer = null;
          }
     }

     function updateMovieToggleUI() {
          var btn = document.getElementById("movie-toggle-btn");
          var icon =
               document.getElementById("movie-toggle-icon");
          var label =
               document.getElementById("movie-toggle-label");
          var isPaused = movieUserPaused || isRsvpEditing();
          if (btn) {
               btn.classList.toggle("is-active", !isPaused);
               btn.setAttribute(
                    "aria-pressed",
                    !isPaused ? "true" : "false",
               );
               btn.setAttribute(
                    "aria-label",
                    isPaused
                         ? "Auto advance Off — click to resume"
                         : "Auto advance On — click to pause",
               );
               btn.setAttribute(
                    "title",
                    isPaused
                         ? "Auto advance: Off"
                         : "Auto advance: On",
               );
               if (icon)
                    icon.textContent = isPaused ? "▶" : "❚❚";
               if (label) label.textContent = "Auto";
          }

          var repBtn =
               document.getElementById("repeat-toggle-btn");
          if (repBtn) {
               repBtn.classList.toggle(
                    "is-active",
                    movieRepeatEnabled,
               );
               repBtn.setAttribute(
                    "aria-pressed",
                    movieRepeatEnabled ? "true" : "false",
               );
               repBtn.setAttribute(
                    "aria-label",
                    movieRepeatEnabled
                         ? "Repeat slideshow On — click to turn off"
                         : "Repeat slideshow Off — click to repeat",
               );
               repBtn.setAttribute(
                    "title",
                    movieRepeatEnabled
                         ? "Repeat slideshow: On"
                         : "Repeat slideshow: Off",
               );
          }
     }

     function canAdvanceFromSlide(idx) {
          if (idx < slides.length - 1) return true;
          var slide = slides[idx];
          return !!(
               slide &&
               slide.id === "rsvp" &&
               !rsvpOrigamiStarted
          );
     }

     function canStepBackFromSlide(idx) {
          var slide = slides[idx];
          if (slide && slide.id === "rsvp" && rsvpOrigamiStarted)
               return true;
          return idx > 0;
     }

     function advanceFromCurrentSlide() {
          var slide = slides[activeSlideIndex];
          if (slide && slide.id === "story" && stepStoryFrame(1)) {
               wheelLockUntil = Date.now() + 620;
               wheelAccum = 0;
               if (slide.scrollTop > 8) {
                    movieAutoScrollingUntil = Date.now() + 500;
                    try {
                         slide.scrollTo({
                              top: 0,
                              behavior: "smooth",
                         });
                    } catch (e) {
                         slide.scrollTop = 0;
                    }
               }
               setSlideMotionBusy(false);
               scheduleMovieStep();
               return;
          }
          if (activeSlideIndex < slides.length - 1) {
               goToSlide(activeSlideIndex + 1, false);
          } else if (
               slide &&
               slide.id === "rsvp" &&
               !rsvpOrigamiStarted
          ) {
               wheelLockUntil = Date.now() + 700;
               wheelAccum = 0;
               setSlideMotionBusy(false);
               triggerRsvpOrigami(0);
          }
     }

     function stepBackFromCurrentSlide() {
          var slide = slides[activeSlideIndex];
          if (
               slide &&
               slide.id === "story" &&
               stepStoryFrame(-1)
          ) {
               wheelLockUntil = Date.now() + 620;
               wheelAccum = 0;
               if (slide.scrollTop > 8) {
                    movieAutoScrollingUntil = Date.now() + 500;
                    try {
                         slide.scrollTo({
                              top: 0,
                              behavior: "smooth",
                         });
                    } catch (e) {
                         slide.scrollTop = 0;
                    }
               }
               setSlideMotionBusy(false);
               scheduleMovieStep();
               return;
          }
          if (
               slide &&
               slide.id === "rsvp" &&
               rsvpOrigamiStarted
          ) {
               wheelLockUntil = Date.now() + 520;
               wheelAccum = 0;
               resetFarewellStage();
               setSlideMotionBusy(false);
               scheduleMovieStep();
               return;
          }
          if (activeSlideIndex > 0) {
               goToSlide(activeSlideIndex - 1, true);
          }
     }

     function scheduleMovieStep() {
          clearMovieTimers();
          updateMovieToggleUI();

          if (
               prefersReducedMotion() ||
               movieUserPaused ||
               document.hidden
          )
               return;
          if (isTransitioning || isAlbumOpening || isTouching)
               return;

          var switcher =
               document.getElementById("palette-switcher");
          if (switcher && switcher.classList.contains("is-open"))
               return;

          var slide = slides[activeSlideIndex];
          if (!slide) return;

          if (activeSlideIndex >= slides.length - 1) {
               if (slide.id === "rsvp" && rsvpOrigamiStarted) {
                    if (
                         !rsvpOrigamiCompleted ||
                         !movieRepeatEnabled
                    )
                         return;
                    movieTimer = setTimeout(function () {
                         movieTimer = null;
                         if (
                              !movieUserPaused &&
                              movieRepeatEnabled &&
                              !isTransitioning &&
                              !isAlbumOpening &&
                              !isTouching
                         ) {
                              goToSlide(0, false);
                         }
                    }, 2600);
                    return;
               }
               if (!(slide.id === "rsvp" && !rsvpOrigamiStarted))
                    return;
          }

          if (
               slide.id === "invitation" &&
               (!invitationRevealed || !invitationDetailsShown)
          )
               return;
          if (isRsvpEditing()) return;

          var dwellMs =
               slide.id === "rsvp" && rsvpJustSubmitted
                    ? 2200
                    : slide.id === "story"
                      ? storyFrameIndex === 0
                           ? 2600
                           : 4600
                      : MOVIE_DWELL_MS[slide.id] || 3800;

          var atBottom =
               slide.scrollTop + slide.clientHeight >=
               slide.scrollHeight - 4;
          if (isSlideTall(slide) && !atBottom) {
               var firstHalf = Math.round(dwellMs * 0.45);
               var secondHalf = Math.max(
                    1500,
                    dwellMs - firstHalf,
               );
               movieScrollTimer = setTimeout(function () {
                    movieScrollTimer = null;
                    if (
                         movieUserPaused ||
                         isTransitioning ||
                         isAlbumOpening ||
                         isTouching ||
                         isRsvpEditing()
                    )
                         return;
                    movieAutoScrollingUntil = Date.now() + 900;
                    try {
                         slide.scrollTo({
                              top: slide.scrollHeight,
                              behavior: "smooth",
                         });
                    } catch (e) {
                         slide.scrollTop = slide.scrollHeight;
                    }
                    movieTimer = setTimeout(function () {
                         movieTimer = null;
                         if (
                              !movieUserPaused &&
                              !isTransitioning &&
                              !isAlbumOpening &&
                              !isTouching &&
                              !isRsvpEditing()
                         ) {
                              advanceFromCurrentSlide();
                         }
                    }, secondHalf);
               }, firstHalf);
          } else {
               movieTimer = setTimeout(function () {
                    movieTimer = null;
                    if (
                         !movieUserPaused &&
                         !isTransitioning &&
                         !isAlbumOpening &&
                         !isTouching &&
                         !isRsvpEditing()
                    ) {
                         advanceFromCurrentSlide();
                    }
               }, dwellMs);
          }
     }

     advanceFromStoryDeck = advanceFromCurrentSlide;
     syncMoviePlayback = scheduleMovieStep;

     toggleMovieAutoPlay = function () {
          if (movieUserPaused) {
               movieUserPaused = false;
               if (isRsvpEditing()) {
                    movieFormPaused = false;
                    movieFormManualOverride = true;
               }
               scheduleMovieStep();
          } else if (isRsvpEditing()) {
               movieFormPaused = false;
               movieFormManualOverride = true;
               scheduleMovieStep();
          } else {
               movieUserPaused = true;
               clearMovieTimers();
               updateMovieToggleUI();
          }
     };

     toggleMovieRepeat = function () {
          movieRepeatEnabled = !movieRepeatEnabled;
          updateMovieToggleUI();
          if (movieRepeatEnabled) {
               scheduleMovieStep();
          } else if (
               activeSlideIndex >= slides.length - 1 &&
               rsvpOrigamiCompleted
          ) {
               clearMovieTimers();
          }
     };

     notifyMovieFormInteraction = function (paused) {
          movieFormPaused = !!paused;
          if (movieFormPaused) {
               movieFormManualOverride = false;
               movieAutoScrollingUntil = 0;
               clearMovieTimers();
          }
          scheduleMovieStep();
     };

     function clearLeaveTimer(idx) {
          if (leaveTimers[idx]) {
               clearTimeout(leaveTimers[idx]);
               delete leaveTimers[idx];
          }
     }

     function activateImmediate(idx) {
          clearMovieTimers();
          slides.forEach(function (slide, i) {
               clearLeaveTimer(i);
               slide.classList.remove("is-leaving");
               if (i === idx) {
                    slide.classList.add("is-active", "is-shown");
               } else {
                    slide.classList.remove(
                         "is-active",
                         "is-shown",
                    );
               }
          });
          activeSlideIndex = idx;
          updateScrollProgress(idx);
          if (slides[idx] && slides[idx].id === "schedule") {
               var sched =
                    document.getElementById("schedule-sheet");
               if (sched)
                    sched.classList.add("is-timeline-active");
          }
          if (slides[idx] && slides[idx].id === "story") {
               enterStoryChapter(false);
          } else {
               resetStoryChapter();
          }
          if (slides[idx] && slides[idx].id === "rsvp") {
               resetFarewellStage();
          } else {
               clearFarewellTimers();
          }
          syncInvitationTimer();
          scheduleMovieStep();
     }

     function transitionBetweenSlides(
          fromIdx,
          toIdx,
          scrollToBottom,
     ) {
          if (fromIdx === toIdx) return;

          var fromSlide = slides[fromIdx];
          var toSlide = slides[toIdx];
          if (!toSlide) return;

          clearMovieTimers();

          if (prefersReducedMotion()) {
               activateImmediate(toIdx);
               isTransitioning = false;
               setSlideMotionBusy(isTouching);
               return;
          }

          clearLeaveTimer(fromIdx);
          clearLeaveTimer(toIdx);
          if (settleDoneTimer) {
               clearTimeout(settleDoneTimer);
               settleDoneTimer = null;
          }

          isTransitioning = true;
          setSlideMotionBusy(true);

          if (fromSlide) {
               fromSlide.classList.remove(
                    "is-active",
                    "is-shown",
               );
               fromSlide.classList.add("is-leaving");
               if (fromSlide.id === "story") {
                    resetStoryChapter();
               }
               if (fromSlide.id === "rsvp") {
                    rsvpJustSubmitted = false;
                    movieFormPaused = false;
                    movieFormManualOverride = false;
                    clearFarewellTimers();
                    var fl = document.getElementById(
                         "origami-flight-layer",
                    );
                    if (fl)
                         fl.classList.remove(
                              "is-active",
                              "is-folding",
                              "is-flying",
                         );
               }
               leaveTimers[fromIdx] = setTimeout(
                    function () {
                         delete leaveTimers[fromIdx];
                         fromSlide.classList.remove(
                              "is-leaving",
                         );
                         if (fromSlide.id === "schedule") {
                              var schedOut =
                                   document.getElementById(
                                        "schedule-sheet",
                                   );
                              if (schedOut)
                                   schedOut.classList.remove(
                                        "is-timeline-active",
                                   );
                         }
                         if (fromSlide.id === "rsvp") {
                              resetFarewellStage();
                         }
                    },
                    fromSlide.id === "cover" ? 340 : 280,
               );
          }

          if (toSlide.id === "schedule") {
               var schedReset =
                    document.getElementById("schedule-sheet");
               if (schedReset)
                    schedReset.classList.remove(
                         "is-timeline-active",
                    );
          }
          if (toSlide.id === "story") {
               enterStoryChapter(!!scrollToBottom);
          }
          if (toSlide.id === "rsvp") {
               resetFarewellStage();
          }
          if (toSlide.id === "cover") {
               closeAlbumCover(0);
          }

          toSlide.classList.remove("is-leaving", "is-shown");
          toSlide.classList.add("is-active");
          movieAutoScrollingUntil = Date.now() + 120;
          toSlide.scrollTop = scrollToBottom
               ? toSlide.scrollHeight
               : 0;

          activeSlideIndex = toIdx;
          updateScrollProgress(toIdx);
          updateMovieToggleUI();
          syncInvitationTimer();

          requestAnimationFrame(function () {
               requestAnimationFrame(function () {
                    if (activeSlideIndex !== toIdx) return;
                    toSlide.classList.add("is-shown");
                    if (toSlide.id === "schedule") {
                         var schedIn =
                              document.getElementById(
                                   "schedule-sheet",
                              );
                         if (schedIn)
                              schedIn.classList.add(
                                   "is-timeline-active",
                              );
                    }
               });
          });

          settleDoneTimer = setTimeout(function () {
               settleDoneTimer = null;
               isTransitioning = false;
               setSlideMotionBusy(isTouching);
               scheduleMovieStep();
          }, 600);
     }

     function closeAlbumCover(delayMs) {
          if (albumOpenTimer) {
               clearTimeout(albumOpenTimer);
               albumOpenTimer = null;
          }
          if (albumCloseTimer) {
               clearTimeout(albumCloseTimer);
               albumCloseTimer = null;
          }
          isAlbumOpening = false;
          isAlbumOpen = false;
          if (!coverEl) return;

          if (!delayMs || prefersReducedMotion()) {
               coverEl.classList.remove(
                    "is-album-opening",
                    "is-album-open",
               );
          } else {
               albumCloseTimer = setTimeout(function () {
                    albumCloseTimer = null;
                    if (coverEl) {
                         coverEl.classList.remove(
                              "is-album-opening",
                              "is-album-open",
                         );
                    }
               }, delayMs);
          }
     }

     function openAlbumToSlide(targetIdx) {
          clearMovieTimers();
          if (!coverEl || prefersReducedMotion()) {
               isAlbumOpen = true;
               wheelLockUntil = Date.now() + 650;
               wheelAccum = 0;
               transitionBetweenSlides(
                    activeSlideIndex,
                    targetIdx,
                    false,
               );
               return;
          }

          if (albumCloseTimer) {
               clearTimeout(albumCloseTimer);
               albumCloseTimer = null;
          }
          if (albumOpenTimer) {
               clearTimeout(albumOpenTimer);
               albumOpenTimer = null;
          }

          isAlbumOpening = true;
          isTransitioning = true;
          setSlideMotionBusy(true);
          wheelLockUntil = Date.now() + 920;
          wheelAccum = 0;

          coverEl.classList.add("is-album-opening");

          albumOpenTimer = setTimeout(function () {
               albumOpenTimer = null;
               if (coverEl)
                    coverEl.classList.add("is-album-open");
               isAlbumOpening = false;
               isAlbumOpen = true;
               transitionBetweenSlides(0, targetIdx, false);
          }, 260);
     }

     function goToSlide(idx, scrollToBottom) {
          idx = Math.max(0, Math.min(slides.length - 1, idx));
          if (
               idx === activeSlideIndex ||
               isTransitioning ||
               isAlbumOpening
          )
               return;

          var currentSlide = slides[activeSlideIndex];
          if (
               currentSlide &&
               currentSlide.id === "invitation" &&
               idx > activeSlideIndex
          ) {
               if (!invitationRevealed) {
                    wheelLockUntil = Date.now() + 900;
                    wheelAccum = 0;
                    clearMovieTimers();
                    setSlideMotionBusy(false);
                    revealInvitationNow();
                    scheduleMovieStep();
                    return;
               }
               if (!invitationDetailsShown) {
                    wheelLockUntil = Date.now() + 950;
                    wheelAccum = 0;
                    clearMovieTimers();
                    setSlideMotionBusy(false);
                    showInvitationDetailsNow();
                    scheduleMovieStep();
                    return;
               }
          }

          if (
               activeSlideIndex === 0 &&
               idx > 0 &&
               !isAlbumOpen
          ) {
               openAlbumToSlide(idx);
               return;
          }

          wheelLockUntil = Date.now() + 640;
          wheelAccum = 0;

          if (idx === 0) {
               rsvpJustSubmitted = false;
               movieFormPaused = false;
               movieFormManualOverride = false;
               resetInvitationStage();
               closeAlbumCover(0);
               transitionBetweenSlides(
                    activeSlideIndex,
                    0,
                    false,
               );
               return;
          }

          transitionBetweenSlides(
               activeSlideIndex,
               idx,
               scrollToBottom,
          );
     }

     window.addEventListener(
          "wheel",
          function (event) {
               if (event.ctrlKey || event.metaKey) return;

               var switcher =
                    document.getElementById("palette-switcher");
               if (
                    switcher &&
                    switcher.classList.contains("is-open") &&
                    switcher.contains(event.target)
               ) {
                    return;
               }

               applyPetalScrollImpulse(event.deltaY);

               if (
                    isTransitioning ||
                    isAlbumOpening ||
                    Date.now() < wheelLockUntil
               ) {
                    event.preventDefault();
                    return;
               }

               movieAutoScrollingUntil = 0;

               var slide = slides[activeSlideIndex];
               var isTall = isSlideTall(slide);

               if (isTall) {
                    var atBottom = isSlideAtBottom(slide, 4);
                    var atTop = isSlideAtTop(slide, 4);
                    if (
                         (event.deltaY > 0 && !atBottom) ||
                         (event.deltaY < 0 && !atTop)
                    ) {
                         internalScrollLockUntil =
                              Date.now() + 420;
                         wheelAccum = 0;
                         scheduleMovieStep();
                         return;
                    }
                    if (Date.now() < internalScrollLockUntil) {
                         event.preventDefault();
                         wheelAccum = 0;
                         scheduleMovieStep();
                         return;
                    }
               }

               event.preventDefault();

               wheelAccum += event.deltaY;
               if (wheelResetTimer)
                    clearTimeout(wheelResetTimer);
               wheelResetTimer = setTimeout(function () {
                    wheelAccum = 0;
               }, 150);

               if (
                    wheelAccum >= 48 &&
                    canAdvanceFromSlide(activeSlideIndex)
               ) {
                    advanceFromCurrentSlide();
               } else if (
                    wheelAccum <= -48 &&
                    canStepBackFromSlide(activeSlideIndex)
               ) {
                    stepBackFromCurrentSlide();
               } else {
                    scheduleMovieStep();
               }
          },
          { passive: false },
     );

     window.addEventListener(
          "touchstart",
          function (event) {
               if (
                    event.touches.length !== 1 ||
                    isAlbumOpening ||
                    isTransitioning
               )
                    return;
               isTouching = true;
               movieAutoScrollingUntil = 0;
               clearMovieTimers();
               setSlideMotionBusy(true);
               touchStartY = event.touches[0].clientY;
               touchPrevY = touchStartY;
               touchStartIdx = activeSlideIndex;
               var startSlide = slides[touchStartIdx];
               touchStartScrollTop = startSlide
                    ? startSlide.scrollTop
                    : 0;
               touchStartAtTop = isSlideAtTop(startSlide, 14);
               touchStartAtBottom = isSlideAtBottom(
                    startSlide,
                    14,
               );
          },
          { passive: true },
     );

     window.addEventListener(
          "touchmove",
          function (event) {
               if (!isTouching || event.touches.length !== 1)
                    return;
               var switcher =
                    document.getElementById("palette-switcher");
               if (
                    switcher &&
                    switcher.classList.contains("is-open") &&
                    switcher.contains(event.target)
               ) {
                    return;
               }
               var currentY = event.touches[0].clientY;
               var touchStepDelta = touchPrevY - currentY;
               touchPrevY = currentY;
               applyPetalScrollImpulse(touchStepDelta);

               var slide = slides[touchStartIdx];
               if (!isSlideTall(slide)) {
                    event.preventDefault();
                    return;
               }
               var moveDelta = touchStartY - currentY;
               if (
                    (touchStartAtBottom &&
                         moveDelta > 1 &&
                         canAdvanceFromSlide(touchStartIdx)) ||
                    (touchStartAtTop &&
                         moveDelta < -1 &&
                         canStepBackFromSlide(touchStartIdx))
               ) {
                    if (event.cancelable) {
                         event.preventDefault();
                    }
               }
          },
          { passive: false },
     );

     window.addEventListener(
          "touchend",
          function (event) {
               isTouching = false;
               if (isAlbumOpening || isTransitioning) return;
               if (!event.changedTouches.length) {
                    setSlideMotionBusy(false);
                    return;
               }

               var switcher =
                    document.getElementById("palette-switcher");
               if (
                    switcher &&
                    switcher.classList.contains("is-open") &&
                    switcher.contains(event.target)
               ) {
                    setSlideMotionBusy(false);
                    return;
               }

               if (storySwipeConsumed) {
                    storySwipeConsumed = false;
                    setSlideMotionBusy(false);
                    scheduleMovieStep();
                    return;
               }

               var slide = slides[touchStartIdx];
               var delta =
                    touchStartY -
                    event.changedTouches[0].clientY;
               var isTall = isSlideTall(slide);

               if (!isTall) {
                    if (
                         delta > 36 &&
                         canAdvanceFromSlide(touchStartIdx)
                    ) {
                         advanceFromCurrentSlide();
                         return;
                    } else if (
                         delta < -36 &&
                         canStepBackFromSlide(touchStartIdx)
                    ) {
                         stepBackFromCurrentSlide();
                         return;
                    }
               } else {
                    var scrollMoved = Math.abs(
                         slide.scrollTop - touchStartScrollTop,
                    );
                    var endAtBottom = isSlideAtBottom(slide, 14);
                    var endAtTop = isSlideAtTop(slide, 14);
                    if (
                         (touchStartAtBottom || endAtBottom) &&
                         scrollMoved < 20 &&
                         delta > 36 &&
                         canAdvanceFromSlide(touchStartIdx)
                    ) {
                         advanceFromCurrentSlide();
                         return;
                    } else if (
                         (touchStartAtTop || endAtTop) &&
                         scrollMoved < 20 &&
                         delta < -36 &&
                         canStepBackFromSlide(touchStartIdx)
                    ) {
                         stepBackFromCurrentSlide();
                         return;
                    }
               }

               setSlideMotionBusy(false);
               scheduleMovieStep();
          },
          { passive: true },
     );

     window.addEventListener(
          "touchcancel",
          function () {
               isTouching = false;
               storySwipeConsumed = false;
               setSlideMotionBusy(
                    isTransitioning || isAlbumOpening,
               );
               scheduleMovieStep();
          },
          { passive: true },
     );

     window.addEventListener("keydown", function (event) {
          var tag = event.target && event.target.tagName;
          if (
               tag === "INPUT" ||
               tag === "SELECT" ||
               tag === "TEXTAREA" ||
               tag === "BUTTON" ||
               tag === "A"
          )
               return;
          if (isAlbumOpening || isTransitioning) {
               event.preventDefault();
               return;
          }

          var slide = slides[activeSlideIndex];
          var isTall = isSlideTall(slide);

          if (
               event.key === "ArrowDown" ||
               event.key === "PageDown" ||
               (event.key === " " && !event.shiftKey)
          ) {
               applyPetalScrollImpulse(55);
               if (
                    isTall &&
                    slide.scrollTop + slide.clientHeight <
                         slide.scrollHeight - 4
               ) {
                    movieAutoScrollingUntil = 0;
                    scheduleMovieStep();
                    return;
               }
               if (canAdvanceFromSlide(activeSlideIndex)) {
                    event.preventDefault();
                    advanceFromCurrentSlide();
               }
          } else if (
               event.key === "ArrowUp" ||
               event.key === "PageUp" ||
               (event.key === " " && event.shiftKey)
          ) {
               applyPetalScrollImpulse(-55);
               if (isTall && slide.scrollTop > 4) {
                    movieAutoScrollingUntil = 0;
                    scheduleMovieStep();
                    return;
               }
               if (canStepBackFromSlide(activeSlideIndex)) {
                    event.preventDefault();
                    stepBackFromCurrentSlide();
               }
          } else if (
               slide &&
               slide.id === "story" &&
               event.key === "ArrowRight"
          ) {
               event.preventDefault();
               advanceFromCurrentSlide();
          } else if (
               slide &&
               slide.id === "story" &&
               event.key === "ArrowLeft"
          ) {
               event.preventDefault();
               if (storyFrameIndex > 0) {
                    stepBackFromCurrentSlide();
               }
          } else if (event.key === "Home") {
               event.preventDefault();
               goToSlide(0, false);
          } else if (event.key === "End") {
               event.preventDefault();
               if (activeSlideIndex < slides.length - 1) {
                    goToSlide(slides.length - 1, false);
               } else {
                    advanceFromCurrentSlide();
               }
          }
     });

     slides.forEach(function (slide) {
          slide.addEventListener(
               "scroll",
               function () {
                    if (slide !== slides[activeSlideIndex])
                         return;
                    if (
                         isTransitioning ||
                         isAlbumOpening ||
                         isTouching
                    )
                         return;
                    if (Date.now() < movieAutoScrollingUntil)
                         return;
                    scheduleMovieStep();
               },
               { passive: true },
          );
     });

     document
          .querySelectorAll('a[href^="#"]')
          .forEach(function (link) {
               link.addEventListener("click", function (event) {
                    var id = link.getAttribute("href").slice(1);
                    var targetIdx = slides.findIndex(
                         function (s) {
                              return s.id === id;
                         },
                    );
                    if (targetIdx !== -1) {
                         event.preventDefault();
                         goToSlide(targetIdx, false);
                    }
               });
          });

     var rsvpFormCard =
          document.getElementById("rsvp-form-card");
     if (rsvpFormCard) {
          [
               "focusin",
               "input",
               "change",
               "keydown",
               "compositionstart",
               "mousedown",
               "touchstart",
               "pointerdown",
          ].forEach(function (evtName) {
               rsvpFormCard.addEventListener(
                    evtName,
                    function () {
                         notifyMovieFormInteraction(true);
                    },
                    evtName === "touchstart"
                         ? { passive: true }
                         : false,
               );
          });
     }

     document.addEventListener(
          "visibilitychange",
          scheduleMovieStep,
     );

     activateImmediate(0);
}

// 8. Background Wedding Music (Can't help falling in love - David Bay)
// Uses Web Audio API dual-deck equal-power crossfade looping so short tracks
// continue seamlessly without silence gaps or end-of-clip fade dips, with
// automatic fallback to <audio id="bg-music" loop> on file:// or unsupported envs.
var musicEnabled = true;
var musicActuallyPlaying = false;
var musicAwaitingGesture = false;
var musicUnavailable = false;

var MUSIC_BASE_GAIN = 0.72;
var MUSIC_FADE_CURVE_STEPS = 64;
var musicFadeInCurve = null;
var musicFadeOutCurve = null;

var musicAudioCtx = null;
var musicMasterGain = null;
var musicBuffer = null;
var musicLoopConfig = null;
var musicActiveDecks = [];
var musicSchedulerTimer = null;
var musicPausedOffset = null;
var musicWebAudioMode = false;
var musicWebAudioFailed = false;
var musicLoadPromise = null;
var musicUsingHtmlFallback = false;

function getBgMusicEl() {
     return document.getElementById("bg-music");
}

function getBgMusicSrcUrl() {
     var audio = getBgMusicEl();
     if (!audio) return "public/music.m4a";
     var source = audio.querySelector("source");
     return (source && source.getAttribute("src")) || audio.currentSrc || "public/music.m4a";
}

function ensureEqualPowerCurves() {
     if (musicFadeInCurve && musicFadeOutCurve) return;
     musicFadeInCurve = new Float32Array(MUSIC_FADE_CURVE_STEPS);
     musicFadeOutCurve = new Float32Array(MUSIC_FADE_CURVE_STEPS);
     for (var i = 0; i < MUSIC_FADE_CURVE_STEPS; i++) {
          var t = i / (MUSIC_FADE_CURVE_STEPS - 1);
          musicFadeInCurve[i] = Math.sin(t * Math.PI * 0.5);
          musicFadeOutCurve[i] = Math.cos(t * Math.PI * 0.5);
     }
}

function computeMusicLoopConfig(buffer) {
     var dur = buffer.duration;
     var sr = buffer.sampleRate;
     var ch0 = buffer.getChannelData(0);

     // Trim AAC priming & trailing silence
     var firstSample = 0;
     var lastSample = ch0.length - 1;
     while (firstSample < ch0.length && Math.abs(ch0[firstSample]) < 0.002) {
          firstSample++;
     }
     while (lastSample > firstSample && Math.abs(ch0[lastSample]) < 0.002) {
          lastSample--;
     }
     var activeStart = Math.min(firstSample / sr, Math.max(0, dur - 1));
     var activeEnd = Math.max(activeStart + 1, lastSample / sr);

     // Verified STFT harmonic + rhythmic match for the bundled 29.12s David Bay clip:
     // skips the 22.9ms priming silence and 27.9s-29.12s fade-out tail, crossfading
     // 26.320s -> 1.307s over 1.50s (cosine spectral similarity 0.910, matched RMS).
     if (Math.abs(dur - 29.12) < 0.25 && dur > 27.85) {
          return {
               initialStart: Math.max(activeStart, 0.025),
               loopIn: 1.307,
               loopOut: 26.32,
               fadeDur: 1.5,
          };
     }

     // Generic analyzer if music.m4a is replaced with another track:
     // trim trailing fade-out dip and crossfade smoothly back to activeStart.
     var winSamples = Math.max(1, Math.floor(sr * 0.1));
     var blockRms = [];
     for (var i = firstSample; i + winSamples <= lastSample; i += winSamples) {
          var sum = 0;
          for (var j = 0; j < winSamples; j++) {
               var v = ch0[i + j];
               sum += v * v;
          }
          blockRms.push(Math.sqrt(sum / winSamples));
     }
     var sorted = blockRms.slice().sort(function (a, b) {
          return a - b;
     });
     var medianRms = sorted.length ? sorted[Math.floor(sorted.length * 0.5)] : 0.1;
     var tailCut = activeEnd;
     var maxScanBlocks = Math.min(blockRms.length, 40); // scan up to last 4s
     for (var b = blockRms.length - 1; b >= blockRms.length - maxScanBlocks; b--) {
          if (blockRms[b] >= medianRms * 0.65) {
               tailCut = activeStart + (b + 1) * 0.1;
               break;
          }
     }
     var fadeDur = Math.min(1.8, Math.max(0.4, (tailCut - activeStart) * 0.12));
     var loopOut = Math.max(activeStart + fadeDur + 0.5, tailCut - fadeDur);
     return {
          initialStart: activeStart,
          loopIn: activeStart,
          loopOut: Math.min(loopOut, Math.max(activeStart + 0.5, dur - fadeDur - 0.05)),
          fadeDur: fadeDur,
     };
}

function ensureMusicAudioContext() {
     var AudioCtx = window.AudioContext || window.webkitAudioContext;
     if (!AudioCtx) return null;
     if (!musicAudioCtx) {
          musicAudioCtx = new AudioCtx();
          musicMasterGain = musicAudioCtx.createGain();
          musicMasterGain.gain.value = MUSIC_BASE_GAIN;
          musicMasterGain.connect(musicAudioCtx.destination);
          musicAudioCtx.addEventListener("statechange", function () {
               if (!musicWebAudioMode || !musicAudioCtx) return;
               if (musicAudioCtx.state === "running" && musicEnabled && !document.hidden) {
                    if (musicBuffer && !musicActiveDecks.length) {
                         startWebAudioPlayback();
                    }
               } else if (musicAudioCtx.state !== "running") {
                    musicActuallyPlaying = false;
                    updateMusicToggleUI();
               }
          });
     }
     return musicAudioCtx;
}

function isFileProtocol() {
     return !!(
          typeof window !== "undefined" &&
          window.location &&
          window.location.protocol === "file:"
     );
}

function loadMusicBufferOnce() {
     if (musicBuffer) return Promise.resolve(musicBuffer);
     if (musicLoadPromise) return musicLoadPromise;
     if (isFileProtocol() || typeof fetch !== "function") {
          musicWebAudioFailed = true;
          return Promise.reject(new Error("fetch unavailable"));
     }
     var ctx = ensureMusicAudioContext();
     if (!ctx) {
          musicWebAudioFailed = true;
          return Promise.reject(new Error("Web Audio unavailable"));
     }
     ensureEqualPowerCurves();
     musicLoadPromise = fetch(getBgMusicSrcUrl())
          .then(function (res) {
               if (!res.ok) throw new Error("HTTP " + res.status);
               return res.arrayBuffer();
          })
          .then(function (arr) {
               return ctx.decodeAudioData(arr);
          })
          .then(function (decoded) {
               musicBuffer = decoded;
               musicLoopConfig = computeMusicLoopConfig(decoded);
               musicWebAudioMode = true;
               return decoded;
          })
          .catch(function (err) {
               musicWebAudioFailed = true;
               musicLoadPromise = null;
               throw err;
          });
     return musicLoadPromise;
}

function stopAllWebAudioDecks(immediate) {
     if (musicSchedulerTimer) {
          clearInterval(musicSchedulerTimer);
          musicSchedulerTimer = null;
     }
     if (!musicActiveDecks.length || !musicAudioCtx) {
          musicActiveDecks = [];
          return;
     }
     var now = musicAudioCtx.currentTime;
     // Record exact playback position from the latest started deck for smooth resume
     for (var i = musicActiveDecks.length - 1; i >= 0; i--) {
          var d = musicActiveDecks[i];
          if (d.startCtxTime <= now + 0.02) {
               var elapsed = Math.max(0, now - d.startCtxTime);
               var pos = d.startOffset + elapsed;
               if (musicLoopConfig && pos >= musicLoopConfig.loopOut) {
                    pos = musicLoopConfig.loopIn;
               }
               musicPausedOffset = pos;
               break;
          }
     }
     var stopAt = immediate ? now : now + 0.06;
     musicActiveDecks.forEach(function (deck) {
          try {
               if (!immediate) {
                    deck.gain.gain.cancelScheduledValues(now);
                    deck.gain.gain.setValueAtTime(deck.gain.gain.value, now);
                    deck.gain.gain.linearRampToValueAtTime(0, stopAt);
               }
               deck.source.stop(stopAt + 0.01);
          } catch (e) {}
     });
     musicActiveDecks = [];
}

function spawnWebAudioDeck(startCtxTime, offsetSec, useCrossfadeIn) {
     if (!musicAudioCtx || !musicBuffer || !musicMasterGain || !musicLoopConfig) return null;
     var source = musicAudioCtx.createBufferSource();
     source.buffer = musicBuffer;
     var gain = musicAudioCtx.createGain();
     if (useCrossfadeIn) {
          gain.gain.setValueAtTime(0, Math.min(startCtxTime, musicAudioCtx.currentTime));
          gain.gain.setValueCurveAtTime(
               musicFadeInCurve,
               startCtxTime,
               musicLoopConfig.fadeDur,
          );
     } else {
          var now = musicAudioCtx.currentTime;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(1, now + 0.08);
     }
     source.connect(gain);
     gain.connect(musicMasterGain);

     var minLeadDuration = useCrossfadeIn
          ? musicLoopConfig.fadeDur + 0.2
          : 0.25;
     var crossfadeAtCtxTime =
          startCtxTime +
          Math.max(minLeadDuration, musicLoopConfig.loopOut - offsetSec);
     var deck = {
          source: source,
          gain: gain,
          startCtxTime: startCtxTime,
          startOffset: offsetSec,
          crossfadeAtCtxTime: crossfadeAtCtxTime,
          nextScheduled: false,
     };
     source.onended = function () {
          var idx = musicActiveDecks.indexOf(deck);
          if (idx !== -1) musicActiveDecks.splice(idx, 1);
     };
     source.start(startCtxTime, offsetSec);
     musicActiveDecks.push(deck);
     return deck;
}

function tickWebAudioScheduler() {
     if (
          !musicWebAudioMode ||
          !musicEnabled ||
          document.hidden ||
          !musicAudioCtx ||
          !musicBuffer ||
          !musicLoopConfig ||
          musicAudioCtx.state !== "running"
     ) {
          return;
     }
     var lead = musicActiveDecks[musicActiveDecks.length - 1];
     if (!lead) return;
     var now = musicAudioCtx.currentTime;
     if (!lead.nextScheduled && now >= lead.crossfadeAtCtxTime - 0.65) {
          lead.nextScheduled = true;
          var xStart = Math.max(now + 0.02, lead.crossfadeAtCtxTime);
          var xEnd = xStart + musicLoopConfig.fadeDur;
          try {
               lead.gain.gain.setValueAtTime(1, xStart);
               lead.gain.gain.setValueCurveAtTime(
                    musicFadeOutCurve,
                    xStart,
                    musicLoopConfig.fadeDur,
               );
               lead.source.stop(xEnd + 0.06);
          } catch (e) {}
          spawnWebAudioDeck(xStart, musicLoopConfig.loopIn, true);
     }
}

function startWebAudioPlayback() {
     if (!musicAudioCtx || !musicBuffer || !musicLoopConfig) return;
     if (!musicEnabled || document.hidden) return;
     if (musicAudioCtx.state !== "running") return;

     // Stop HTML <audio> fallback if it was active
     var htmlAudio = getBgMusicEl();
     if (htmlAudio && !htmlAudio.paused) {
          try {
               htmlAudio.pause();
          } catch (e) {}
     }
     musicUsingHtmlFallback = false;

     if (musicActiveDecks.length) return;
     var offset =
          musicPausedOffset !== null &&
          musicPausedOffset >= musicLoopConfig.initialStart &&
          musicPausedOffset < musicLoopConfig.loopOut - 0.35
               ? musicPausedOffset
               : musicLoopConfig.initialStart;
     musicPausedOffset = null;

     spawnWebAudioDeck(musicAudioCtx.currentTime + 0.015, offset, false);
     if (!musicSchedulerTimer) {
          musicSchedulerTimer = setInterval(tickWebAudioScheduler, 150);
     }
     musicUnavailable = false;
     musicActuallyPlaying = true;
     musicAwaitingGesture = false;
     updateMusicToggleUI();
}

function updateMusicToggleUI() {
     var btn = document.getElementById("music-toggle-btn");
     var svgOn = document.getElementById("music-toggle-svg-on");
     var svgOff = document.getElementById(
          "music-toggle-svg-off",
     );
     if (!btn) return;

     btn.classList.toggle(
          "is-active",
          musicEnabled && !musicUnavailable,
     );
     btn.classList.toggle(
          "is-playing",
          musicEnabled &&
               musicActuallyPlaying &&
               !musicUnavailable,
     );
     btn.setAttribute(
          "aria-pressed",
          musicEnabled ? "true" : "false",
     );

     if (svgOn)
          svgOn.style.display = musicEnabled ? "block" : "none";
     if (svgOff)
          svgOff.style.display = musicEnabled ? "none" : "block";

     if (musicUnavailable) {
          btn.setAttribute("aria-label", "Music file not found");
          btn.setAttribute(
               "title",
               "Add music.mp3 (or music.m4a) to enable background music",
          );
     } else if (
          musicEnabled &&
          musicAwaitingGesture &&
          !musicActuallyPlaying
     ) {
          btn.setAttribute(
               "aria-label",
               "Music On — tap to play",
          );
          btn.setAttribute(
               "title",
               "Music: On (tap anywhere to start audio) — Can't Help Falling in Love",
          );
     } else if (musicEnabled) {
          btn.setAttribute(
               "aria-label",
               "Music On — click to pause",
          );
          btn.setAttribute(
               "title",
               "Music: On — Can't Help Falling in Love (David Bay)",
          );
     } else {
          btn.setAttribute(
               "aria-label",
               "Music Off — click to play",
          );
          btn.setAttribute("title", "Music: Off");
     }
}

var htmlCrossfadeDecks = null;
var htmlActiveDeckIdx = 0;
var htmlCrossfadeTimer = null;
var htmlCrossfadeState = null;

function getHtmlLoopConfig(duration) {
     if (!duration || !isFinite(duration) || duration <= 4) return null;
     if (Math.abs(duration - 29.12) < 0.25 && duration > 27.85) {
          return { loopIn: 1.307, loopOut: 26.32, fadeDur: 1.5 };
     }
     var fadeDur = Math.min(1.8, Math.max(0.5, duration * 0.1));
     return {
          loopIn: 0.05,
          loopOut: Math.max(1.0, duration - fadeDur - 0.5),
          fadeDur: fadeDur,
     };
}

function ensureHtmlCrossfadeDecks() {
     var deck0 = getBgMusicEl();
     if (!deck0) return null;
     if (htmlCrossfadeDecks) return htmlCrossfadeDecks;
     var deck1 = document.createElement("audio");
     deck1.preload = "auto";
     deck1.setAttribute("playsinline", "");
     deck1.setAttribute("aria-hidden", "true");
     deck1.src = getBgMusicSrcUrl();
     htmlCrossfadeDecks = [deck0, deck1];
     return htmlCrossfadeDecks;
}

function stopHtmlCrossfadeWatcher() {
     if (htmlCrossfadeTimer) {
          clearInterval(htmlCrossfadeTimer);
          htmlCrossfadeTimer = null;
     }
     htmlCrossfadeState = null;
}

function tickHtmlCrossfade() {
     if (
          !musicUsingHtmlFallback ||
          !musicEnabled ||
          document.hidden ||
          !htmlCrossfadeDecks
     ) {
          stopHtmlCrossfadeWatcher();
          return;
     }
     var lead = htmlCrossfadeDecks[htmlActiveDeckIdx];
     var nextIdx = 1 - htmlActiveDeckIdx;
     var next = htmlCrossfadeDecks[nextIdx];
     if (!lead || !next) return;

     if (htmlCrossfadeState) {
          var elapsed = (Date.now() - htmlCrossfadeState.startedAt) / 1000;
          var p = Math.min(1, Math.max(0, elapsed / htmlCrossfadeState.fadeDur));
          try {
               lead.volume = MUSIC_BASE_GAIN * Math.cos(p * Math.PI * 0.5);
               next.volume = MUSIC_BASE_GAIN * Math.sin(p * Math.PI * 0.5);
          } catch (e) {}
          if (p >= 1) {
               var cfgDone = htmlCrossfadeState.cfg;
               htmlCrossfadeState = null;
               htmlActiveDeckIdx = nextIdx;
               try {
                    next.volume = MUSIC_BASE_GAIN;
                    lead.pause();
                    lead.volume = 0;
                    lead.currentTime = cfgDone.loopIn;
               } catch (e) {}
          }
          return;
     }

     var cfg = getHtmlLoopConfig(lead.duration);
     if (!cfg || lead.paused) return;
     if (lead.currentTime >= cfg.loopOut) {
          try {
               lead.loop = false;
               next.loop = false;
               if (next.readyState >= 1) {
                    next.currentTime = cfg.loopIn;
               }
               next.volume = 0;
               var pNext = next.play();
               htmlCrossfadeState = {
                    startedAt: Date.now(),
                    fadeDur: cfg.fadeDur,
                    cfg: cfg,
               };
               if (pNext && typeof pNext.catch === "function") {
                    pNext.catch(function () {
                         htmlCrossfadeState = null;
                         lead.loop = true;
                    });
               }
          } catch (e) {
               htmlCrossfadeState = null;
               lead.loop = true;
          }
     }
}

function startHtmlAudioFallback() {
     var decks = ensureHtmlCrossfadeDecks();
     var audio = decks && decks[htmlActiveDeckIdx];
     if (
          !audio ||
          musicUnavailable ||
          !musicEnabled ||
          document.hidden
     )
          return;
     musicUsingHtmlFallback = true;
     try {
          audio.volume = MUSIC_BASE_GAIN;
          var playPromise = audio.play();
          if (
               playPromise &&
               typeof playPromise.then === "function"
          ) {
               playPromise
                    .then(function () {
                         musicActuallyPlaying = true;
                         musicAwaitingGesture = false;
                         updateMusicToggleUI();
                         if (!htmlCrossfadeTimer) {
                              htmlCrossfadeTimer = setInterval(tickHtmlCrossfade, 45);
                         }
                    })
                    .catch(function (err) {
                         if (
                              err &&
                              (err.name ===
                                   "NotSupportedError" ||
                                   err.name === "AbortError") &&
                              audio.error
                         ) {
                              musicUnavailable = true;
                         } else {
                              musicAwaitingGesture = true;
                         }
                         musicActuallyPlaying = false;
                         updateMusicToggleUI();
                    });
          }
     } catch (e) {
          musicAwaitingGesture = true;
          updateMusicToggleUI();
     }
}

function startMusicPlayer() {
     if (musicUnavailable || !musicEnabled || document.hidden) return;
     if (!musicWebAudioFailed) {
          var ctx = ensureMusicAudioContext();
          if (ctx) {
               if (ctx.state === "suspended" && typeof ctx.resume === "function") {
                    ctx.resume().catch(function () {
                         if (musicEnabled && !musicActuallyPlaying) {
                              musicAwaitingGesture = true;
                              updateMusicToggleUI();
                         }
                    });
               }
               if (musicBuffer) {
                    if (ctx.state === "running") {
                         startWebAudioPlayback();
                    } else {
                         musicAwaitingGesture = true;
                         updateMusicToggleUI();
                    }
                    return;
               }
               loadMusicBufferOnce()
                    .then(function () {
                         if (!musicEnabled || document.hidden) return;
                         if (ctx.state === "running") {
                              startWebAudioPlayback();
                         } else {
                              musicAwaitingGesture = true;
                              updateMusicToggleUI();
                         }
                    })
                    .catch(function () {
                         startHtmlAudioFallback();
                    });
               return;
          }
     }
     startHtmlAudioFallback();
}

function pauseMusicPlayer() {
     stopAllWebAudioDecks(false);
     stopHtmlCrossfadeWatcher();
     var decks = htmlCrossfadeDecks || (getBgMusicEl() ? [getBgMusicEl()] : []);
     decks.forEach(function (a) {
          if (a && !a.paused) {
               try {
                    a.pause();
               } catch (e) {}
          }
     });
     musicActuallyPlaying = false;
}

function toggleMusicPlayback() {
     if (
          musicEnabled &&
          musicAwaitingGesture &&
          !musicActuallyPlaying
     ) {
          musicAwaitingGesture = false;
          startMusicPlayer();
          updateMusicToggleUI();
          return;
     }

     musicEnabled = !musicEnabled;
     musicAwaitingGesture = false;

     if (musicEnabled) {
          if (musicUnavailable) {
               musicUnavailable = false;
               musicWebAudioFailed = isFileProtocol();
               musicLoadPromise = null;
               var audio = getBgMusicEl();
               if (audio) audio.load();
          }
          startMusicPlayer();
     } else {
          pauseMusicPlayer();
     }
     updateMusicToggleUI();
}

function initBackgroundMusic() {
     var audio = getBgMusicEl();
     updateMusicToggleUI();

     if (isFileProtocol()) {
          musicWebAudioFailed = true;
     } else if (!musicWebAudioFailed) {
          // Preload & decode Web Audio buffer right away on http(s)
          loadMusicBufferOnce().catch(function () {});
     }

     if (audio) {
          audio.addEventListener("playing", function () {
               if (!musicUsingHtmlFallback || !musicEnabled || document.hidden) {
                    if (!musicUsingHtmlFallback || !musicEnabled) {
                         try {
                              audio.pause();
                         } catch (e) {}
                    }
                    return;
               }
               musicUnavailable = false;
               musicActuallyPlaying = true;
               musicAwaitingGesture = false;
               updateMusicToggleUI();
          });

          audio.addEventListener("pause", function () {
               if (!musicUsingHtmlFallback) return;
               if (
                    htmlCrossfadeState ||
                    (htmlCrossfadeDecks &&
                         htmlCrossfadeDecks[htmlActiveDeckIdx] &&
                         !htmlCrossfadeDecks[htmlActiveDeckIdx].paused)
               ) {
                    return;
               }
               musicActuallyPlaying = false;
               updateMusicToggleUI();
          });

          audio.addEventListener("canplay", function () {
               musicUnavailable = false;
               updateMusicToggleUI();
          });

          audio.addEventListener("error", function () {
               if (!musicUsingHtmlFallback) return;
               musicUnavailable = true;
               musicActuallyPlaying = false;
               updateMusicToggleUI();
          });

          var lastSource = audio.querySelector("source:last-of-type");
          if (lastSource) {
               lastSource.addEventListener("error", function () {
                    if (!musicUsingHtmlFallback) return;
                    musicUnavailable = true;
                    musicActuallyPlaying = false;
                    updateMusicToggleUI();
               });
          }
     }

     if (musicEnabled && !document.hidden) {
          startMusicPlayer();
     }

     var lastWheelUnlockAt = 0;
     function unlockMusicOnGesture(event) {
          if (
               !musicEnabled ||
               musicActuallyPlaying ||
               musicUnavailable ||
               document.hidden
          )
               return;
          if (
               event.target &&
               event.target.closest &&
               event.target.closest("#music-toggle-btn")
          )
               return;
          if (event.type === "wheel") {
               var now = Date.now();
               if (now - lastWheelUnlockAt < 500) return;
               lastWheelUnlockAt = now;
          }
          musicAwaitingGesture = false;
          startMusicPlayer();
     }

     window.addEventListener(
          "pointerdown",
          unlockMusicOnGesture,
          { passive: true },
     );
     window.addEventListener("touchend", unlockMusicOnGesture, {
          passive: true,
     });
     window.addEventListener("click", unlockMusicOnGesture, {
          passive: true,
     });
     window.addEventListener("keydown", unlockMusicOnGesture, {
          passive: true,
     });
     window.addEventListener("wheel", unlockMusicOnGesture, {
          passive: true,
     });

     document.addEventListener("visibilitychange", function () {
          if (document.hidden) {
               pauseMusicPlayer();
               updateMusicToggleUI();
          } else if (musicEnabled) {
               startMusicPlayer();
          }
     });
}

function setupGlassGlint() {
     if (
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)")
               .matches
     )
          return;
     var root = document.documentElement;
     var rafPending = false;
     var nextX = 18;
     var nextY = 8;

     window.addEventListener(
          "pointermove",
          function (event) {
               if (
                    event.pointerType &&
                    event.pointerType !== "mouse"
               )
                    return;
               nextX = Math.max(
                    0,
                    Math.min(
                         100,
                         (event.clientX /
                              (window.innerWidth || 1)) *
                              100,
                    ),
               );
               nextY = Math.max(
                    0,
                    Math.min(
                         100,
                         (event.clientY /
                              (window.innerHeight || 1)) *
                              100,
                    ),
               );
               if (!rafPending) {
                    rafPending = true;
                    requestAnimationFrame(function () {
                         rafPending = false;
                         root.style.setProperty(
                              "--glint-x",
                              nextX.toFixed(1) + "%",
                         );
                         root.style.setProperty(
                              "--glint-y",
                              nextY.toFixed(1) + "%",
                         );
                    });
               }
          },
          { passive: true },
     );
}

window.addEventListener("DOMContentLoaded", function () {
     initPaletteSwitcher();
     createPetals();
     initAmbientOrigamiBirds();
     setupGlassGlint();
     setupInvitationTrigger();
     initStoryPhotobook();
     setupDeckNavigation();
     initBackgroundMusic();
     updateScrollProgress(0);
     updateCountdown();
     setInterval(updateCountdown, 1000);
});
