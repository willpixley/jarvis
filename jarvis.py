import spacy
from jarvis_functions import *

nlp = spacy.load("custom_textcat_model_v4")


while True:
    user_input = input("Tell Jarvis what to do: ")
    doc = nlp(user_input)
    intent = max(doc.cats, key=doc.cats.get)
    if intent:
        globals()[intent](doc.ents)
        for ent in doc.ents:
            print(f"Entity: {ent.text}, Label: {ent.label_}")
    else:
        print("No intent found")
        continue