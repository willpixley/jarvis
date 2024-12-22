import spacy

# Load the trained model
custom_nlp = spacy.load("custom_textcat_model_v1")

# Test on new text
test_text = "turn on the bedroom lights"
doc = custom_nlp(test_text)
intent = doc.cats
intent = max(doc.cats, key=doc.cats.get)

print(intent)
for ent in doc.ents:
    print(f"Entity: {ent.text}, Label: {ent.label_}")

