// TODO(duco): curate/replace these — auto-selected from giphy.com search results
// for 'almost time', 'bored', 'out of office', 'weekend', 'vacation', 'fired' and
// 'desk flip' (plus a few more targeted phrases), 10 per stage. Each entry is
// { url, stage }. `stage` must be one of:
// 'mild' | 'building' | 'frantic' | 'chaos' | 'done'.
//
// Broken/expired links are handled gracefully (see SafeGif.jsx) — a 404 just
// makes that entry silently skip itself, so it's safe to swap links in/out
// without double-checking every one of them.

export const GIPHY_LINKS = [
  // --- mild ---
  { url: 'https://media.giphy.com/media/rq6c5xD7leHW8/200w.gif', stage: 'mild' }, // The Big Lebowski Reaction GIF
  { url: 'https://media.giphy.com/media/h41uUhjop8NJCI7CQX/200w.gif', stage: 'mild' }, // Im So Bored GIF
  { url: 'https://media.giphy.com/media/wqbAfFwjU8laXMWZ09/200w.gif', stage: 'mild' }, // Bored Season 3 GIF by The Office
  { url: 'https://media.giphy.com/media/l2JhpjWPccQhsAMfu/200w.gif', stage: 'mild' }, // Bored Spongebob Squarepants GIF by Nickelodeon
  { url: 'https://media.giphy.com/media/ZXKZWB13D6gFO/200w.gif', stage: 'mild' }, // Bored Over It GIF
  { url: 'https://media.giphy.com/media/mlvseq9yvZhba/200w.gif', stage: 'mild' }, // Bored Cat GIF
  { url: 'https://media.giphy.com/media/tmQrpA8zpG4a16SSxm/200w.gif', stage: 'mild' }, // Tired Pbs Nature GIF by Nature on PBS
  { url: 'https://media.giphy.com/media/dT7LBdAZP1Rh6/200w.gif', stage: 'mild' }, // Sad Cat GIF
  { url: 'https://media.giphy.com/media/xUOxfh6ZM75efM3Bqo/200w.gif', stage: 'mild' }, // You Can Do It GIF by chuber channel
  { url: 'https://media.giphy.com/media/Qz4RaxcOh4qndWOG5N/200w.gif', stage: 'mild' }, // Clock Tick Tock GIF by MOODMAN

  // --- building ---
  { url: 'https://media.giphy.com/media/L8btfDSVJIyDjiaDh3/200w.gif', stage: 'building' }, // Counting Down Super Bowl GIF by SportsManias
  { url: 'https://media.giphy.com/media/sMIWHEw2zQwxO/200w.gif', stage: 'building' }, // wait 2 more years GIF
  { url: 'https://media.giphy.com/media/3oz8xWUo64RZ6lfr32/200w.gif', stage: 'building' }, // mel giedroyc one hour remaining GIF by BBC
  { url: 'https://media.giphy.com/media/F3BeiZNq6VbDwyxzxF/200w.gif', stage: 'building' }, // Bored Season 5 GIF by The Office
  { url: 'https://media.giphy.com/media/KWBBmkxu0nvMs/200w.gif', stage: 'building' }, // i hate my job bored at work GIF
  { url: 'https://media.giphy.com/media/FBYTrYyjsyq7m/200w.gif', stage: 'building' }, // bored office space GIF
  { url: 'https://media.giphy.com/media/5q3NyUvgt1w9unrLJ9/200w.gif', stage: 'building' }, // Seth Meyers Time GIF by Late Night with Seth Meyers
  { url: 'https://media.giphy.com/media/26n6xBpxNXExDfuKc/200w.gif', stage: 'building' }, // Waiting Patiently GIF by General Hospital
  { url: 'https://media.giphy.com/media/jnKow6rCXEwxR1d09B/200w.gif', stage: 'building' }, // Hurry Up Countdown GIF by Escape Hunt UK
  { url: 'https://media.giphy.com/media/1RGMupUKxvwTphyRUT/200w.gif', stage: 'building' }, // What Time Is It GIF by Atlanta Jewish Film Festival

  // --- frantic ---
  { url: 'https://media.giphy.com/media/FKsCiEI5pFvIQ/200w.gif', stage: 'frantic' }, // office rage GIF
  { url: 'https://media.giphy.com/media/xTddge121hs7H0UhEu/200w.gif', stage: 'frantic' }, // Angry Flipping Out GIF by Creative Unicorn
  { url: 'https://media.giphy.com/media/E3o0OfKDhWUiIRZwK0/200w.gif', stage: 'frantic' }, // Angry GIF by ClickUp
  { url: 'https://media.giphy.com/media/Cp7dFpCc2LrXkkutZB/200w.gif', stage: 'frantic' }, // Frustrated Pixel Art GIF by Potatozzz by 9GAG
  { url: 'https://media.giphy.com/media/QFyd9fQplkxqw/200w.gif', stage: 'frantic' }, // work frustration GIF
  { url: 'https://media.giphy.com/media/NTur7XlVDUdqM/200w.gif', stage: 'frantic' }, // This Is Fine GIF
  { url: 'https://media.giphy.com/media/z09RgyqqkpqNGxCBLs/200w.gif', stage: 'frantic' }, // Fired GIF by BabylonBee
  { url: 'https://media.giphy.com/media/c1JeeIPHNb3E11UHu8/200w.gif', stage: 'frantic' }, // Season 7 Nbc GIF by The Office
  { url: 'https://media.giphy.com/media/lffW0sDfrzBXr1AxME/200w.gif', stage: 'frantic' }, // benedict cumberbatch time GIF by Sky
  { url: 'https://media.giphy.com/media/jFBDPMTZUFvt4N6mli/200w.gif', stage: 'frantic' }, // Whitney Waiting GIF by Big Brother

  // --- chaos ---
  { url: 'https://media.giphy.com/media/yBGiswlJ2z1dl1A3l9/200w.gif', stage: 'chaos' }, // Mad Desk Flip GIF by Eminem
  { url: 'https://media.giphy.com/media/J5WWeBm83nmSs/200w.gif', stage: 'chaos' }, // alan rickman desk flip GIF
  { url: 'https://media.giphy.com/media/5saWnCIJL7nmU/200w.gif', stage: 'chaos' }, // Table Flip GIF
  { url: 'https://media.giphy.com/media/8GLXkEdQgQTgA/200w.gif', stage: 'chaos' }, // desk flip GIF
  { url: 'https://media.giphy.com/media/4qx6IRdg26uZ3MTtRn/200w.gif', stage: 'chaos' }, // Angry Season 3 GIF by SuccessionHBO
  { url: 'https://media.giphy.com/media/HmY5vP7hXP5ba/200w.gif', stage: 'chaos' }, // Donald Trump GIF
  { url: 'https://media.giphy.com/media/lA1UjqWVdmmpq/200w.gif', stage: 'chaos' }, // youre fired donald trump GIF
  { url: 'https://media.giphy.com/media/l41lO8vRXzSB0CkqQ/200w.gif', stage: 'chaos' }, // Vince Mcmahon GIF
  { url: 'https://media.giphy.com/media/ToMjGpmjnM666vQ73X2/200w.gif', stage: 'chaos' }, // Gordon Ramsay Fox GIF
  { url: 'https://media.giphy.com/media/1n4iuWZFnTeN6qvdpD/200w.gif', stage: 'chaos' }, // This Is Fine On Fire GIF

  // --- done ---
  { url: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/200w.gif', stage: 'done' }, // The Office Party Hard GIF
  { url: 'https://media.giphy.com/media/KYElw07kzDspaBOwf9/200w.gif', stage: 'done' }, // The Office Party Hard GIF
  { url: 'https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/200w.gif', stage: 'done' }, // Excited Season 2 GIF by The Office
  { url: 'https://media.giphy.com/media/oPQJidn1zDv2UomYO9/200w.gif', stage: 'done' }, // Its Friday GIF by de chinezen
  { url: 'https://media.giphy.com/media/3o7btV1sSvBaaSAQKc/200w.gif', stage: 'done' }, // Its Friday GIF by reactionseditor
  { url: 'https://media.giphy.com/media/3o7WTqZqJNyoCLnqJW/200w.gif', stage: 'done' }, // Its Friday Yes GIF by Denyse®
  { url: 'https://media.giphy.com/media/4NcSmVux3G2rWvFxhh/200w.gif', stage: 'done' }, // Its Friday GIF by DealPoint Merrill
  { url: 'https://media.giphy.com/media/WOTPHDMN9QDTS6v3Xh/200w.gif', stage: 'done' }, // out of office vacation GIF
  { url: 'https://media.giphy.com/media/dWwAQ5B0qYL69M6hos/200w.gif', stage: 'done' }, // Clocking Out See You Later GIF by Kanpai Pandas
  { url: 'https://media.giphy.com/media/7vQZanyufdRe0/200w.gif', stage: 'done' }, // Drunk Spring Break GIF
]
