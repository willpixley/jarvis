import spacy
from spacy.training.example import Example
from spacy.util import minibatch, compounding
import random
import json

iterations = []
## saves to v1
def init_model(training_data):
    nlp = spacy.blank("en")
    textcat = nlp.add_pipe("textcat")
    intents = [
        "turn_on_lights", "turn_off_lights",  
        "adjust_brightness", "set_color", "start_light_show", "stop_light_show", "play_music", "pause_music", "set_volume", "play_song", "play_artist", "play_playlist", 'check_weather', 'check_time', 'set_alarm', 'set_timer', 'set_reminder'
    ]
    for intent in intents:
        textcat.add_label(intent)
        # Step 2: Add the NER pipeline component
    if "ner" not in nlp.pipe_names:
        ner = nlp.add_pipe("ner")
    else:
        ner = nlp.get_pipe("ner")

    # Step 3: Add labels to the NER component
    for _, annotations in training_data:
        for ent in annotations.get("entities"):
            ner.add_label(ent[2])
    return nlp

def train_lights(iterations):
    iterations.append("Training lights")
    with open("light_training_data.json", "r") as f:
        TRAINING_DATA = json.load(f)
    nlp = init_model( TRAINING_DATA)


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

    for i in range(20):  # 20 epochs
        random.shuffle(training_examples)
        losses = {}
        batches = minibatch(training_examples, size=compounding(4.0, 32.0, 1.001))
        for batch in batches:
            nlp.update(batch, drop=0.5, losses=losses, sgd=optimizer)
        print(f"Iteration {i}, Losses: {losses}")
        iterations.append(f"Iteration {i}, Losses: {losses}")

    # Step 6: Save the trained model
    nlp.to_disk("custom_textcat_model_v1")

    # Save loss history to a file

## saves to v2
def train_music(iterations):
    iterations.append("Training music")

    intents = ["play_music", "pause_music", "set_volume", "play_song", "play_artist", "play_playlist"]
    # Load your custom model
    model_path = "custom_textcat_model_v1"  # Replace with your model's path
    nlp = spacy.load(model_path)
    
    # Load the new training data
    with open("spotify_training_data.json", "r") as f:
        training_data = json.load(f)
    ner = nlp.get_pipe("ner")

    # Step 3: Add labels to the NER component
   
    for _, annotations in training_data:
        for ent in annotations.get("entities"):
            ner.add_label(ent[2])
    # Convert training data to spaCy Examples
    examples = []
    for text, annotations in training_data:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        examples.append(example)

        # Start the training process
    optimizer = nlp.resume_training()
    # Train the model with the new data
    for i in range(20):  # Adjust epochs as needed
        random.shuffle(examples)
        losses = {}
        batches = minibatch(examples, size=compounding(4.0, 32.0, 1.001))
        for batch in batches:
            nlp.update(batch, drop=0.5, losses=losses, sgd=optimizer)
        print(f"Iteration {i}, Losses: {losses}")
        iterations.append(f"Iteration {i}, Losses: {losses}")
       

    # Save the updated model
    updated_model_path = "custom_textcat_model_v2"  # Replace with desired path
    nlp.to_disk(updated_model_path)
    print(f"Updated model saved to {updated_model_path}")

## saves to v3
def train_basic_cmds(iterations):
    iterations.append("Training basic commands")
    model_path = "custom_textcat_model_v2"  # Replace with your model's path
    nlp = spacy.load(model_path)
    
    # Load the new training data
    with open("basic_cmd_training_data.json", "r") as f:
        training_data = json.load(f)
    ner = nlp.get_pipe("ner")

    # Step 3: Add labels to the NER component
   
    for _, annotations in training_data:
        for ent in annotations.get("entities"):
            ner.add_label(ent[2])
    # Convert training data to spaCy Examples
    examples = []
    for text, annotations in training_data:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        examples.append(example)

        # Start the training process
    optimizer = nlp.resume_training()
    # Train the model with the new data
    for i in range(20):  # Adjust epochs as needed
        random.shuffle(examples)
        losses = {}
        batches = minibatch(examples, size=compounding(4.0, 32.0, 1.001))
        for batch in batches:
            nlp.update(batch, drop=0.5, losses=losses, sgd=optimizer)
        print(f"Iteration {i}, Losses: {losses}")
        iterations.append(f"Iteration {i}, Losses: {losses}")
    updated_model_path = "custom_textcat_model_v3"  # Replace with desired path
    nlp.to_disk(updated_model_path)
    print(f"Updated model saved to {updated_model_path}")
train_lights(iterations)
train_music(iterations)
train_basic_cmds(iterations)


with open("output.txt", "w") as file:
    for item in iterations:
        file.write(item + "\n")