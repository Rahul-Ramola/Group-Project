import { useState, useRef } from 'react'
import './ImageUploader.css'

function ImageUploader({ onFile }) {
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef()

  function handleFile(file) {
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onFile(file)
  }

  function handleInputChange(e) {
    handleFile(e.target.files[0])
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  function handleRemove() {
    setPreview(null)
    onFile(null)
    inputRef.current.value = ''
  }

  return (
    <div>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      {/* Show dropzone if no image selected */}
      {!preview && (
        <div
          className={`dropzone ${isDragging ? 'dropzone-active' : ''}`}
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="dropzone-icon">🖼️</div>
          <p className="dropzone-text">Click to upload or drag & drop</p>
          <p className="dropzone-hint">PNG, JPG, WEBP supported</p>
        </div>
      )}

      {/* Show preview if image is selected */}
      {preview && (
        <div className="preview-box">
          <img src={preview} alt="Uploaded" className="preview-image" />
          <button className="remove-btn" onClick={handleRemove}>
            ✕ Remove Image
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUploader