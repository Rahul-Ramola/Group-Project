from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import json
import tensorflow as tf
from preprocess import preprocess_image

app = FastAPI()

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Global storage for models and metadata ----
models = {}
metadata = {}


# ---- Load everything once when server starts ----
@app.on_event("startup")
def load_all_models():
    print("Loading models...")

    models["brain_tumor"] = tf.keras.models.load_model("models/braintumor.keras")
    print("  ✅ Brain tumor model loaded")

    # models["skin_cancer"] = tf.keras.models.load_model("models/skincancer.keras")
    # print("  ✅ Skin cancer model loaded")

    # models["pneumonia"] = tf.keras.models.load_model("models/pneumonia.keras")
    # print("  ✅ Pneumonia model loaded")

    models["symptoms"] = tf.keras.models.load_model("models/symptoms.keras")
    print("  ✅ Symptoms model loaded")

    with open("models/symptom_metadata.json", "r") as f:
        metadata["symptoms"] = json.load(f)
    print("  ✅ Symptom metadata loaded")

    print("All models ready!")


# ================================================================
# HEALTH CHECK
# ================================================================

@app.get("/health")
def health():
    return {"status": "ok", "models_loaded": list(models.keys())}


# ================================================================
# BRAIN TUMOR
# ================================================================

# Change this list to match your train_generator.class_indices order
BRAIN_CLASSES = ["glioma", "meningioma", "notumor", "pituitary"]

@app.post("/api/brain-tumor/predict")
async def predict_brain_tumor(file: UploadFile = File(...)):
    img = preprocess_image(await file.read(), target_size=(224, 224))
    preds = models["brain_tumor"].predict(img)[0]
    idx = int(np.argmax(preds))

    return {
        "prediction": BRAIN_CLASSES[idx],
        "confidence": float(preds[idx]),
        "class_probabilities": dict(zip(BRAIN_CLASSES, [float(p) for p in preds]))
    }


# ================================================================
# SKIN CANCER
# ================================================================

# Change this list to match your skin cancer model's class order
SKIN_CLASSES = [
    "Actinic Keratosis",
    "Basal Cell Carcinoma",
    "Benign Keratosis",
    "Dermatofibroma",
    "Melanoma",
    "Nevus",
    "Vascular Lesion"
]

@app.post("/api/skin-cancer/predict")
async def predict_skin_cancer(file: UploadFile = File(...)):
    img = preprocess_image(await file.read(), target_size=(224, 224))
    preds = models["skin_cancer"].predict(img)[0]
    idx = int(np.argmax(preds))

    return {
        "prediction": SKIN_CLASSES[idx],
        "confidence": float(preds[idx]),
        "class_probabilities": dict(zip(SKIN_CLASSES, [float(p) for p in preds]))
    }


# ================================================================
# PNEUMONIA
# ================================================================

@app.post("/api/pneumonia/predict")
async def predict_pneumonia(file: UploadFile = File(...)):
    img = preprocess_image(await file.read(), target_size=(224, 224))
    pred = float(models["pneumonia"].predict(img)[0][0])

    label = "Pneumonia" if pred > 0.5 else "Normal"
    confidence = pred if pred > 0.5 else 1 - pred
    severity = "High" if pred > 0.8 else "Moderate" if pred > 0.5 else None

    return {
        "prediction": label,
        "confidence": confidence,
        "severity": severity
    }


# ================================================================
# SYMPTOMS
# ================================================================

class SymptomsRequest(BaseModel):
    symptoms: list[str]

@app.post("/api/symptoms/analyze")
def analyze_symptoms(request: SymptomsRequest):
    meta          = metadata["symptoms"]
    symptom_list  = meta["symptoms"]
    disease_names = meta["diseases"]
    descriptions  = meta.get("descriptions", {})
    precautions   = meta.get("precautions", {})

    # Build binary input vector
    input_vector = np.zeros(len(symptom_list), dtype=np.float32)
    unrecognized = []

    for symptom in request.symptoms:
        # Normalize: lowercase + spaces to underscores
        normalized = symptom.strip().lower().replace(" ", "_")
        if normalized in symptom_list:
            input_vector[symptom_list.index(normalized)] = 1.0
        else:
            unrecognized.append(symptom)

    # Run prediction
    preds = models["symptoms"].predict(input_vector.reshape(1, -1))[0]

    # Return top 5 conditions with > 1% probability
    top5_indices = np.argsort(preds)[::-1][:5]
    conditions = []
    for i in top5_indices:
        if preds[i] > 0.01:
            name = disease_names[i]
            conditions.append({
                "name": name,
                "probability": float(preds[i]),
                "description": descriptions.get(name, ""),
                "precautions": precautions.get(name, [])
            })

    return {
        "conditions": conditions,
        "unrecognized_symptoms": unrecognized
    }