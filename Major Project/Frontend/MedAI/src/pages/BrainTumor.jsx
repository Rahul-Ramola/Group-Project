import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import { analyzeBrainTumor } from '../services/api'
import './Page.css'

function BrainTumor() {
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
      const data = await analyzeBrainTumor(file)
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
        <span className="page-tag" style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>
          CNN Model
        </span>
        <h1 className="page-title">🧠 Brain Tumor Detection</h1>
        <p className="page-desc">
          Upload a brain MRI scan. The model will predict whether a tumor is present and classify it.
        </p>
      </div>

      <div className="page-body">

        {/* Left column — upload */}
        <div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Upload MRI Scan</span>
              <span className="card-subtitle">JPG, PNG, WEBP</span>
            </div>
            <div className="card-body">
              <ImageUploader onFile={setFile} />
              <button
                className="analyze-btn"
                onClick={handleAnalyze}
                disabled={!file || loading}
              >
                {loading ? 'Analyzing...' : 'Analyze MRI'}
              </button>
              {error && <div className="error-box">⚠️ {error}</div>}
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <div className="card-header">
              <span className="card-title">Detectable Classes</span>
            </div>
            <div className="card-body">
              <ul className="info-list">
                <li>Glioma</li>
                <li>Meningioma</li>
                <li>Pituitary Tumor</li>
                <li>No Tumor</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right column — results */}
        <div>
          {loading && <Loader message="Analyzing MRI scan..." />}
          {result && <ResultCard result={result} />}
          {!loading && !result && (
            <div className="card">
              <div className="empty-state">
                <div className="empty-state-icon">🧠</div>
                <p>Upload an MRI scan and click <strong>Analyze MRI</strong> to see results here.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default BrainTumor