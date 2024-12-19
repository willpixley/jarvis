import random
import json

# Define possible intents
intents = [
    "turn_on_lights", "turn_off_lights",
    "adjust_brightness", "set_color", "start_light_show", "stop_light_show"
]

# Define possible devices and groups
lights = [
    'light', 'lamp', 'strip', 'LED', 'LED strip', "bedside lamp", 'ceiling light',
    'desk lamp', 'shelf lamp', 'light by the bed', 'reading light'
]
groups = [
    "all lights", "bedroom lights", "kitchen lights", "living room lights", "bathroom lights",
    "downstairs lights", "upstairs lights", "house lights"
]

# Define possible colors
colors = [
    "red", "blue", "green", "yellow", "purple", "orange", "pink", "white"
]

# Define possible light shows
light_shows = [
    "romantic light show", "party mode", "sunset mode", "morning wake up", "disco lights", "movie night", 'chill'
]

phrasing_templates = {
    "turn_on_lights": [
        "Turn on the {device}",
        "Switch on the {device}",
        "Activate the {device}",
        "Can you turn on the {device}?",
        "Please switch on the {device}",
        "Make sure the {device} is on"
    ],
    "turn_off_lights": [
        "Turn off the {device}",
        "Switch off the {device}",
        "Deactivate the {device}",
        "Can you turn off the {device}?",
        "Please switch off the {device}",
        "Make sure the {device} is off"
    ],
    "start_light_show": [
        "Start the {show}",
        "Can you start the {show}?",
        "Activate the {show}",
        "Turn on the {show}",
        "Please start the {show}",
        "Set the {show} in motion"
    ],
    "stop_light_show": [
        "Stop the {show}",
        "Can you stop the {show}?",
        "Deactivate the {show}",
        "Turn off the {show}",
        "Please stop the {show}",
        "End the {show}"
    ],
    "set_color": [
        "Set the {device} to {color}",
        "Make the {device} {color}",
        "Change the {device} to {color}",
        "Can you make the {device} {color}?"
    ],
    "adjust_brightness": [
        "Can you dim the {device}?",
        "Set the {device} to {percent}%",
        "Make the {device} a little darker",
        "Brighten the {device}",
        "Change the {device} to {percent}%"
    ]
}

# Function to generate a single example
def generate_example():
    # Randomly choose an intent
    intent = random.choice(intents)

    # Randomly choose a device (single light or group)
    if random.random() < 0.5:
        device = random.choice(lights)
        device_type = "DEVICE"
    else:
        device = random.choice(groups)
        device_type = "DEVICE_GROUP"

    show = random.choice(light_shows)
    percent = round(random.random() * 100, 2)
    color = random.choice(colors)

    # Select a phrasing template based on the intent
    template = random.choice(phrasing_templates[intent])
    has_percent = "{percent}" in template

    # Replace placeholders in the template
    if intent in ["turn_on_lights", "turn_off_lights"]:
        example_text = template.format(device=device)
        device_index = example_text.find(device)
        entities = [(device_index, device_index + len(device), device_type)]
    elif intent in ["start_light_show", "stop_light_show"]:
        example_text = template.format(show=show)
        show_index = example_text.find(show)
        entities = [(show_index, show_index + len(show), "LIGHT_SHOW")]
    elif intent == "set_color":
        example_text = template.format(device=device, color=color)
        device_index = example_text.find(device)
        color_index = example_text.find(color)
        entities = [(device_index, device_index + len(device), device_type), (color_index, color_index + len(color), "COLOR")]
    elif intent == "adjust_brightness":
        example_text = template.format(device=device, percent=percent)
        device_index = example_text.find(device)
        entities = [(device_index, device_index + len(device), device_type)]
        if has_percent:
            percent_index = example_text.find(str(percent))
            entities.append((percent_index, percent_index + len(str(percent)), "PERCENT"))

    # Return the generated example
    return example_text, {"entities": entities, "cats": {intent: 1.0}}

# Function to generate a diverse set of training examples
def generate_training_data(num_examples=100):
    training_data = []
    for _ in range(num_examples):
        example_text, annotations = generate_example()
        training_data.append((example_text, annotations))
    return training_data

# Generate and save training data
training_data = generate_training_data(10000)
with open("light_training_data.json", "w") as f:
    json.dump(training_data, f)
    print("Training data saved to training_data.json")
