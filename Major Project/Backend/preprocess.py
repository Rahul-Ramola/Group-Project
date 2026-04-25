import numpy as np
from PIL import Image
import io

def preprocess_image(file_bytes: bytes, target_size=(224, 224)) -> np.ndarray:
    img = Image.open(io.BytesIO(file_bytes)).convert("RGB")  # convert to RGB always
    img = img.resize(target_size)
    arr = np.array(img, dtype=np.float32) / 255.0  # same as rescale=1./255
    return np.expand_dims(arr, axis=0)  # shape becomes (1, 224, 224, 3)