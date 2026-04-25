import tensorflow as tf

models = {}

def load_models():
    models["brain_tumor"] = tf.keras.models.load_model("models/braintumor.keras")
    # models["skin_cancer"] = tf.keras.models.load_model("models/skincancer.keras")
    # models["pneumonia"]   = tf.keras.models.load_model("models/pneumonia.keras")
    print("All models loaded.")