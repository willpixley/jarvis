import spacy
import time
start = time.time()
nlp = spacy.load("en_core_web_sm")
intents = {
    "turn_on": ["turn on", "switch on", "activate"],
    "turn_off": ["turn off", "switch off", "deactivate"]
}

entities = {
    "lights": ["lights", "lamp", "bulbs"],
    "locations": ["living room", "kitchen", "bedroom"]
}



def extract_intent_and_entity(command):
    command_lower = command.lower()
    intent = None
    entity = None

    # Match intent
    for key, phrases in intents.items():
        if any(phrase in command_lower for phrase in phrases):
            intent = key
            break

    # Match entity
    for key, phrases in entities.items():
        for phrase in phrases:
            if phrase in command_lower:
                entity = phrase
                break

    return intent, entity

command = "Turn on the living room lights and activate the bedside table"
intent, entity = extract_intent_and_entity(command)
print(f"Intent: {intent}, Entity: {entity}")
end =time.time()
print(end-start)