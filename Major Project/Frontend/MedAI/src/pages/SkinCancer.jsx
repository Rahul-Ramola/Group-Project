import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import { analyzeSkinCancer } from '../services/api'
import './Page.css'

function SkinCancer() {
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
      const data = await analyzeSkinCancer(file)
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
        <span className="page-tag" style={{ backgroundColor: '#fdf2f8', color: '#ec4899' }}>
          CNN Model
        </span>
        <h1 className="page-title">🔬 Skin Cancer Classification</h1>
        <p className="page-desc">
          Upload a dermoscopy or clinical photo of a skin lesion. The model classifies it into one of 7 types.
        </p>
      </div>

      <div className="page-body">

        <div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Upload Lesion Image</span>
              <span className="card-subtitle">JPG, PNG, WEBP</span>
            </div>
            <div className="card-body">
              <ImageUploader onFile={setFile} />
              <button
                className="analyze-btn"
                onClick={handleAnalyze}
                disabled={!file || loading}
                style={{ backgroundColor: '#ec4899' }}
              >
                {loading ? 'Classifying...' : 'Classify Lesion'}
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
                <li>Melanoma</li>
                <li>Basal Cell Carcinoma</li>
                <li>Squamous Cell Carcinoma</li>
                <li>Actinic Keratosis</li>
                <li>Benign Keratosis</li>
                <li>Dermatofibroma</li>
                <li>Vascular Lesion</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          {loading && <Loader message="Classifying lesion..." />}
          {result && <ResultCard result={result} />}
          {!loading && !result && (
            <div className="card">
              <div className="empty-state">
                <div className="empty-state-icon">🔬</div>
                <p>Upload a lesion image and click <strong>Classify Lesion</strong> to see results here.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default SkinCancer