import { useState } from 'react'

export function SafeGif({ src, alt = '', className, style, onClick }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setFailed(true)}
      onClick={onClick}
    />
  )
}
