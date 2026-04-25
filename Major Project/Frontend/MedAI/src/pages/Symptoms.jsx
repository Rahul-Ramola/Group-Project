import { useState } from 'react'
import { Link } from 'react-router-dom'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'
import { analyzeSymptoms } from '../services/api'
import './Page.css'
import './Symptoms.css'

const commonSymptoms = [
  'Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea',
  'Chest pain', 'Shortness of breath', 'Dizziness',
  'Sore throat', 'Body aches', 'Runny nose', 'Diarrhea',
  'Vomiting', 'Back pain', 'Joint pain', 'Rash',
]

function Symptoms() {
  const [inputText, setInputText] = useState('')
  const [symptoms, setSymptoms] = useState([])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function addSymptom(name) {
    const trimmed = name.trim()
    if (trimmed && !symptoms.includes(trimmed)) {
      setSymptoms([...symptoms, trimmed])
    }
    setInputText('')
  }

  function removeSymptom(name) {
    setSymptoms(symptoms.filter(s => s !== name))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && inputText.trim()) {
      addSymptom(inputText)
    }
  }

  async function handleAnalyze() {
    if (symptoms.length === 0) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeSymptoms(symptoms)
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
        <span className="page-tag" style={{ backgroundColor: '#fffbeb', color: '#f59e0b' }}>
          Neural Network Model
        </span>
        <h1 className="page-title">📋 Symptom Checker</h1>
        <p className="page-desc">
          Add your symptoms by typing or clicking the quick-add buttons. Then click Analyze to get possible conditions.
        </p>
      </div>

      <div className="page-body">

        {/* Left column */}
        <div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Enter Symptoms</span>
              <span className="card-subtitle">{symptoms.length} added</span>
            </div>
            <div className="card-body">

              {/* Text input */}
              <input
                type="text"
                className="symptom-input"
                placeholder="Type a symptom, press Enter..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              {/* Tags */}
              {symptoms.length > 0 && (
                <div className="symptom-tags">
                  {symptoms.map(s => (
                    <span key={s} className="symptom-tag">
                      {s}
                      <button onClick={() => removeSymptom(s)} className="tag-remove">×</button>
                    </span>
                  ))}
                </div>
              )}

              {/* Quick add */}
              <p className="quick-label">Quick add:</p>
              <div className="quick-buttons">
                {commonSymptoms.map(s => (
                  <button
                    key={s}
                    onClick={() => symptoms.includes(s) ? removeSymptom(s) : addSymptom(s)}
                    className={`quick-btn ${symptoms.includes(s) ? 'quick-btn-active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                className="analyze-btn"
                onClick={handleAnalyze}
                disabled={symptoms.length === 0 || loading}
                style={{ backgroundColor: '#f59e0b' }}
              >
                {loading
                  ? 'Analyzing...'
                  : `Analyze ${symptoms.length > 0 ? `(${symptoms.length} symptom${symptoms.length > 1 ? 's' : ''})` : ''}`
                }
              </button>

              {error && <div className="error-box">⚠️ {error}</div>}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          {loading && <Loader message="Analyzing symptoms..." />}
          {result && <ResultCard result={result} />}
          {!loading && !result && (
            <div className="card">
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <p>Add at least one symptom and click <strong>Analyze</strong> to see possible conditions.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Symptoms