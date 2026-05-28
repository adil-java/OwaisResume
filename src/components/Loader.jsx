export default function Loader({ visible }) {
  return (
    <div className={`loader ${!visible ? 'hidden' : ''}`} id="loader">
      <div className="loader-text">
        {'Owais.'.split('').map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
    </div>
  )
}
