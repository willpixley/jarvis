from flask import Flask, request, jsonify
import spacy

# Load your NLP model (you can use your own model)
nlp = spacy.load("custom_textcat_model_v1")

app = Flask(__name__)

@app.route("/process", methods=["POST"])
def process_text():
    # Get text from the POST request
    data = request.json
    text = data.get("text", "")
    
    # Process the text using NLP model
    doc = nlp(text)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
    
    # Return the entities as JSON
    return jsonify({"entities": entities})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
