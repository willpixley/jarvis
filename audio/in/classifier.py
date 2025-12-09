import json
from spacy.training.example import Example
import spacy
from spacy.util import minibatch, compounding
import random

# train model

with open("training_data.json", "r", encoding="utf-8") as f:
    TRAIN_DATA = json.load(f)
# Create blank English model
nlp = spacy.blank("en")

# Add text classification for intents
textcat = nlp.add_pipe("textcat", last=True)
for label in [
    "turn_on_lights",
    "turn_off_lights",
    "change_volume",
    "pause_music",
    "play_music",
    "skip_song",
    "play_artist",
    "get_weather",
    "get_forcast",
]:
    textcat.add_label(label)


ner = nlp.add_pipe("ner", last=False)
ner.add_label("ARTIST")
ner.add_label("VOLUME")
examples = []
for text, annotations in TRAIN_DATA:
    doc = nlp.make_doc(text)
    example = Example.from_dict(doc, annotations)
    examples.append(example)
optimizer = nlp.begin_training()

n_iter = 20  # number of training epochs
for epoch in range(n_iter):
    random.shuffle(examples)
    losses = {}

    for batch in minibatch(examples, size=compounding(4.0, 32.0, 1.5)):
        nlp.update(batch, sgd=optimizer, losses=losses)
    print(f"Epoch {epoch + 1}/{n_iter} Losses: {losses}")


test_texts = [
    "Play Drake at 50 percent",
    "turn off the lights",
    "set the volume to 75%",
    "Pause the music",
    "What's the weather tomorrow?",
]

for text in test_texts:
    doc = nlp(text)
    intent = max(doc.cats, key=doc.cats.get)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    print(f"Text: {text}")
    print(f"Predicted intent: {intent}")
    print(f"Entities: {entities}\n")


nlp.to_disk("voice_command_model_v2")
