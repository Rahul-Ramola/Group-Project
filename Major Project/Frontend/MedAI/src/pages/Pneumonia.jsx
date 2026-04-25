import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import { analyzePneumonia } from '../services/api'
import './Page.css'

function Pneumonia() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleAnalyze() {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzePneumonia(file)
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="page-header">
        <span className="page-tag" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
          CNN Model
        </span>
        <h1 className="page-title">🫁 Pneumonia Detection</h1>
        <p className="page-desc">
          Upload a chest X-ray image. The model will predict whether pneumonia is present or absent.
        </p>
      </div>

      <div className="page-body">

        <div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Upload Chest X-Ray</span>
              <span className="card-subtitle">JPG, PNG, WEBP</span>
            </div>
            <div className="card-body">
              <ImageUploader onFile={setFile} />
              <button
                className="analyze-btn"
                onClick={handleAnalyze}
                disabled={!file || loading}
                style={{ backgroundColor: '#10b981' }}
              >
                {loading ? 'Detecting...' : 'Detect Pneumonia'}
              </button>
              {error && <div className="error-box">⚠️ {error}</div>}
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <div className="card-header">
              <span className="card-title">Tips for Best Results</span>
            </div>
            <div className="card-body">
              <ul className="info-list">
                <li>Use a PA (front-facing) chest X-ray</li>
                <li>Make sure both lungs are fully visible</li>
                <li>Use a clear, well-exposed image</li>
                <li>Avoid rotated or cropped X-rays</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          {loading && <Loader message="Analyzing X-ray..." />}
          {result && <ResultCard result={result} />}
          {!loading && !result && (
            <div className="card">
              <div className="empty-state">
                <div className="empty-state-icon">🫁</div>
                <p>Upload a chest X-ray and click <strong>Detect Pneumonia</strong> to see results here.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Pneumonia