import './ResultCard.css'

function ResultCard({ result }) {
  if (!result) return null

  const { prediction, confidence, class_probabilities, conditions, severity, unrecognized_symptoms } = result
  const percent = confidence != null ? Math.round(confidence * 100) : null

  // Decide badge color based on prediction text
  const isPositive =
    prediction?.toLowerCase() === 'glioma' ||
    prediction?.toLowerCase() === 'meningioma' ||
    prediction?.toLowerCase() === 'pituitary' ||
    prediction?.toLowerCase().includes('cancer') ||
    prediction?.toLowerCase().includes('melanoma') ||
    prediction?.toLowerCase().includes('pneumonia') ||
    prediction?.toLowerCase().includes('malignant')

  return (
    <div className="result-card">

      {/* Top: Prediction */}
      <div className={`result-header ${isPositive ? 'result-header-warning' : 'result-header-good'}`}>
        <div className="result-icon">{isPositive ? '⚠️' : '✅'}</div>
        <div>
          <p className="result-label">Prediction</p>
          <h3 className="result-prediction">{prediction}</h3>
        </div>
        {severity && (
          <span className={`severity-badge severity-${severity.toLowerCase()}`}>
            {severity}
          </span>
        )}
      </div>

      {/* Confidence bar */}
      {percent != null && (
        <div className="result-section">
          <div className="confidence-row">
            <span className="confidence-label">Confidence</span>
            <span className="confidence-value">{percent}%</span>
          </div>
          <div className="progress-bg">
            <div
              className="progress-fill"
              style={{ width: percent + '%' }}
            />
          </div>
        </div>
      )}

      {/* Class probabilities */}
      {class_probabilities && (
        <div className="result-section">
          <h4 className="section-title">All Classes</h4>
          {Object.entries(class_probabilities).map(([cls, prob]) => (
            <div key={cls} className="prob-row">
              <span className="prob-name">{cls}</span>
              <div className="prob-bar-bg">
                <div
                  className="prob-bar-fill"
                  style={{ width: Math.round(prob * 100) + '%' }}
                />
              </div>
              <span className="prob-pct">{Math.round(prob * 100)}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Conditions list (for symptoms) */}
      {conditions && conditions.length > 0 && (
        <div className="result-section">
          <h4 className="section-title">Possible Conditions</h4>
          {conditions.map((item, i) => (
            <div key={i} className="condition-card">
              <div className="condition-top">
                <span className="condition-name">{item.name}</span>
                <span className="condition-match">{Math.round((item.probability || 0) * 100)}% match</span>
              </div>
              <div className="prob-bar-bg" style={{ marginBottom: 8 }}>
                <div className="prob-bar-fill" style={{ width: Math.round((item.probability || 0) * 100) + '%' }} />
              </div>
              {item.description && (
                <p className="condition-desc">{item.description}</p>
              )}
              {item.precautions && item.precautions.length > 0 && (
                <div className="condition-precautions">
                  <p className="precautions-label">💊 Precautions</p>
                  <ul className="precautions-list">
                    {item.precautions.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Unrecognized symptoms */}
      {unrecognized_symptoms && unrecognized_symptoms.length > 0 && (
        <div className="result-section">
          <div className="unrecognized-box">
            ⚠️ Not recognized by the model: <strong>{unrecognized_symptoms.join(', ')}</strong>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="result-disclaimer">
        ⚠️ For research purposes only. Always consult a qualified doctor.
      </div>

    </div>
  )
}

export default ResultCard