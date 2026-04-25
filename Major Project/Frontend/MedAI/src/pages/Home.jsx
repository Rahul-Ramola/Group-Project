import { Link } from 'react-router-dom'
import './Home.css'

const tools = [
  {
    path: '/brain-tumor',
    emoji: '🧠',
    title: 'Brain Tumor',
    description: 'Upload an MRI scan to detect and classify brain tumors using a CNN model.',
    tag: 'CNN Model',
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    path: '/skin-cancer',
    emoji: '🔬',
    title: 'Skin Cancer',
    description: 'Upload a skin lesion image to classify it into one of 7 categories.',
    tag: 'CNN Model',
    color: '#ec4899',
    bg: '#fdf2f8',
  },
  {
    path: '/pneumonia',
    emoji: '🫁',
    title: 'Pneumonia',
    description: 'Upload a chest X-ray to detect if pneumonia is present or not.',
    tag: 'CNN Model',
    color: '#10b981',
    bg: '#ecfdf5',
  },
  {
    path: '/symptoms',
    emoji: '📋',
    title: 'Symptom Checker',
    description: 'Enter your symptoms to get a list of possible conditions.',
    tag: 'Neural Network',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
]

function Home() {
  return (
    <div className="home">

      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">🩺 AI-Powered Medical Research</div>
        <h1 className="hero-title">Intelligent Medical Diagnostics</h1>
        <p className="hero-subtitle">
          Upload medical images or describe your symptoms to get AI-based analysis.
          Built for research and educational purposes.
        </p>
        <div className="hero-warning">
          ⚠️ This tool is for research only — not a replacement for professional medical advice.
        </div>
      </div>

      {/* Tool cards */}
      <div className="tools-section">
        <h2 className="tools-heading">Available Tools</h2>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link to={tool.path} key={tool.path} className="tool-card">
              <div className="tool-emoji-box" style={{ backgroundColor: tool.bg }}>
                <span className="tool-emoji">{tool.emoji}</span>
              </div>
              <div className="tool-info">
                <div className="tool-top">
                  <h3 className="tool-title">{tool.title}</h3>
                  <span className="tool-tag" style={{ color: tool.color, backgroundColor: tool.bg }}>
                    {tool.tag}
                  </span>
                </div>
                <p className="tool-desc">{tool.description}</p>
                <span className="tool-link" style={{ color: tool.color }}>
                  Open tool →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home