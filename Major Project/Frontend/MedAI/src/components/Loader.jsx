import './Loader.css'

function Loader({ message }) {
  return (
    <div className="loader-box">
      <div className="loader-spinner"></div>
      <p className="loader-text">{message || 'Analyzing...'}</p>
    </div>
  )
}

export default Loader