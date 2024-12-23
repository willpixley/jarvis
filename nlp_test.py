import spacy

# Load the trained model
custom_nlp = spacy.load("custom_textcat_model_v4")

# Test on new text
test_text = "make the bedroom lights blue"
doc = custom_nlp(test_text)
intent = doc.cats
#print(intent)
intent = max(doc.cats, key=doc.cats.get)

print(intent)
for ent in doc.ents:
    print(f"Entity: {ent.text}, Label: {ent.label_}")

