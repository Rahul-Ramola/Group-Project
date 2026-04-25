const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function analyzeBrainTumor(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/api/brain-tumor/predict`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to analyze. Make sure the backend is running.')
  }

  return response.json()
}

export async function analyzeSkinCancer(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/api/skin-cancer/predict`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to analyze. Make sure the backend is running.')
  }

  return response.json()
}

export async function analyzePneumonia(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/api/pneumonia/predict`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to analyze. Make sure the backend is running.')
  }

  return response.json()
}

export async function analyzeSymptoms(symptoms) {
  const response = await fetch(`${API_URL}/api/symptoms/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms }),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze. Make sure the backend is running.')
  }

  return response.json()
}