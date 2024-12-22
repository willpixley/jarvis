import spacy
from jarvis_functions import *

nlp = spacy.load("custom_textcat_model_v3")


while True:
    user_input = input("Tell Jarvis what to do: ")
    doc = nlp(user_input)
    intent = max(doc.cats, key=doc.cats.get)
    if intent:
        globals()[intent](doc.ents)
    else:
        print("No intent found")
        continue