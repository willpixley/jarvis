import spacy
from spacy.training.example import Example
from spacy.util import minibatch, compounding
import random
import json
from spacy.training import offsets_to_biluo_tags


# Step 1: Create a blank model

from spacy.pipeline.textcat import single_label_cnn_config
nlp = spacy.blank("en")


textcat = nlp.add_pipe("textcat")



# Step 3: Add labels (categories/intents)
intents = [
    "turn_on_lights", "turn_off_lights", "play_music", "pause_music", 
    "adjust_brightness", "set_color", "start_light_show", "stop_light_show"
]
for intent in intents:
    textcat.add_label(intent)

    

# Step 4: Load training data
with open("training_data.json", "r") as f:
    TRAINING_DATA = json.load(f)

# Step 2: Add the NER pipeline component
if "ner" not in nlp.pipe_names:
    ner = nlp.add_pipe("ner")
else:
    ner = nlp.get_pipe("ner")

# Step 3: Add labels to the NER component
for _, annotations in TRAINING_DATA:
    for ent in annotations.get("entities"):
        ner.add_label(ent[2])


# Ensure training data is formatted for textcat
def prepare_training_data(data):
    examples = []
    for text, annotations in data:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        examples.append(example)
    return examples

training_examples = prepare_training_data(TRAINING_DATA)

# Step 5: Train the model
optimizer = nlp.begin_training()
iterations = []

for i in range(20):  # 20 epochs
    random.shuffle(training_examples)
    losses = {}
    batches = minibatch(training_examples, size=compounding(4.0, 32.0, 1.001))
    for batch in batches:
        nlp.update(batch, drop=0.5, losses=losses)
    print(f"Iteration {i}, Losses: {losses}")
    iterations.append(f"Iteration {i}, Losses: {losses}")

# Step 6: Save the trained model
nlp.to_disk("custom_textcat_model_v1")

# Save loss history to a file
with open("output.txt", "w") as file:
    for item in iterations:
        file.write(item + "\n")
