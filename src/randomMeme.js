// Live random memes for the 'calm' stage, which can run for multiple days —
// a fixed gif list would get repetitive fast, so instead each spawn picks a
// random topic and fetches a real random post from meme-api.com (a free,
// no-key, CORS-enabled wrapper around a curated pool of meme subreddits).
const MEME_TOPICS = [
  'ProgrammerHumor',
  'BoredAtWork',
  'meirl',
  'me_irl',
  'wholesomememes',
  'CasualUK',
  'funny',
]

const IMAGE_EXTENSION_RE = /\.(gif|jpe?g|png|webp)$/i
const FETCH_ATTEMPTS = 3

export async function fetchRandomCalmMeme() {
  for (let attempt = 0; attempt < FETCH_ATTEMPTS; attempt++) {
    const topic = MEME_TOPICS[Math.floor(Math.random() * MEME_TOPICS.length)]

    try {
      const res = await fetch(`https://meme-api.com/gimme/${topic}`)
      if (!res.ok) continue

      const post = await res.json()
      if (post.nsfw || post.spoiler) continue
      if (!IMAGE_EXTENSION_RE.test(post.url)) continue

      return post.url
    } catch {
      continue
    }
  }

  return null
}
