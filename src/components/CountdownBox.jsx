import { pluralize } from '../utils/time'

export function CountdownBox({ hours, minutes, seconds, stage, intensity }) {
  const minuteWord = pluralize(minutes, 'minuut', 'minuten')
  const secondWord = pluralize(seconds, 'seconde', 'seconden')

  return (
    <div
      className={`countdown-box stage-${stage}`}
      style={{ '--intensity': intensity }}
    >
      <h1 className="title">Bye.</h1>
      <div className="countdown-lines">
        <p className="line">Nog</p>
        <p className="line">
          <span className="num">{hours}</span> <span className="unit">uur,</span>
        </p>
        <p className="line">
          <span className="num">{minutes}</span>{' '}
          <span className="unit-word">{minuteWord}</span>
        </p>
        <p className="line">
          en <span className="num">{seconds}</span>{' '}
          <span className="unit-word">{secondWord}.</span>
        </p>
      </div>
    </div>
  )
}
