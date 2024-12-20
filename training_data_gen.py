import random
import json

# Define possible intents
intents = [
    "turn_on_lights", "turn_off_lights",
    "adjust_brightness", "set_color", "start_light_show", "stop_light_show"
]

# Define possible devices (lights)
lights = ['lamp', 'strip', 'LED', 'LED strip', 'bedside lamp', 'ceiling light', 'desk lamp', 'shelf lamp', 'reading light', 'nightstand light', 'night lamp']

# Define possible groups
groups = ["bedroom", "kitchen", "living room", "bathroom", "office", "garage", "hallway"]

# Define possible colors
colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "white", "cyan", "magenta"]

# Define possible light shows
light_shows = ["romantic light show", "party mode", "sunset mode", "morning wake up", "disco lights", "movie night", 'chill', "fireplace mode", "rainbow light show"]

# Define phrasing templates
phrasing_templates = {
    "turn_on_lights": [
        "Turn on the {light}",
        "Switch on the {light}",
        "Activate the {light}",
        "Can you turn on the {light}?",
        "Please switch on the {light}",
        "Make sure the {light} is on",
        "Turn on the {light} in the {group}",
        "Switch on the {group} lights"
    ],
    "turn_off_lights": [
        "Turn off the {light}",
        "Switch off the {light}",
        "Deactivate the {light}",
        "Can you turn off the {light}?",
        "Please switch off the {light}",
        "Make sure the {light} is off",
        "Turn off the {light} in the {group}",
        "Switch off the {group} lights",
    ],
    "start_light_show": [
        "Start the {show}",
        "Can you start the {show}?",
        "Activate the {show}",
        "Turn on the {show}",
        "Please start the {show}",
        "Set the {show} in motion",
        "Start the {show} in the {group}"
    ],
    "stop_light_show": [
        "Stop the {show}",
        "Can you stop the {show}?",
        "Deactivate the {show}",
        "Turn off the {show}",
        "Please stop the {show}",
        "End the {show}",
        "Stop the {show} in the {group}"
    ],
    'set_color': [
        'Set the {light} to {color}',
        'Make the {light} {color}',
        'Change the {light} to {color}',
        'Can you make the {light} {color}?',
        'Set the {light} in the {group} to {color}'
    ],
    'adjust_brightness': [
        'Can you dim the {light}?',
        'Set the {light} to {percent}%',
        'Make the {light} a little darker',
        'Brighten the {light}',
        'Change the {light} to {percent}%',
        'Set the brightness of the {light} in the {group} to {percent}%',
        'Make the {light} in the {group} {percent}%'
    ]
}

# Function to generate a single example
def generate_example():
    # Randomly choose an intent
    intent = random.choice(intents)
    
    # Randomly choose devices, locations, and other variables
    group = random.choice(groups)
    show = random.choice(light_shows)
    light = random.choice(lights)
    percent = random.random() * 100
    color = random.choice(colors)
    
    # Select a phrasing template based on the intent
    template = random.choice(phrasing_templates[intent])
    has_percent = template.find("{percent}") != -1
    
    # Initialize the entities list
    entities = []
    
    # Replace placeholders in the template
    if intent == "turn_on_lights" or intent == "turn_off_lights":
        # Ensure no overlap between group and device
        example_text = template.format(light=light, group=group)
        light_index = example_text.find(light)
        if light_index != -1:
            entities.append((light_index, light_index + len(light), "DEVICE"))
        group_index = example_text.find(group)
        if group_index != -1:
            entities.append((group_index, group_index + len(group), "GROUP"))
    elif intent == "start_light_show" or intent == 'stop_light_show':
        # Ensure no overlap between group and light show
        example_text = template.format(show=show, group=group)
        show_index = example_text.find(show)
        if show_index != -1:
            entities.append((show_index, show_index + len(show), "LIGHT_SHOW"))
        group_index = example_text.find(group)
        if group_index != -1:
            entities.append((group_index, group_index + len(group), "GROUP"))
    elif intent == 'set_color':
        # Ensure no overlap between group and device
        example_text = template.format(light=light, color=color, group=group)
        light_index = example_text.find(light)
        if light_index != -1:
            entities.append((light_index, light_index + len(light), 'DEVICE'))
        color_index = example_text.find(color)
        if color_index != -1:
            entities.append((color_index, color_index + len(color), 'COLOR'))
        group_index = example_text.find(group)
        if group_index != -1:
            entities.append((group_index, group_index + len(group), 'GROUP'))
    elif intent == 'adjust_brightness':
        # Ensure no overlap between group and device
        example_text = template.format(light=light, percent=percent, group=group)
        light_index = example_text.find(light)
        if light_index != -1:
            entities.append((light_index, light_index + len(light), 'DEVICE'))
        group_index = example_text.find(group)
        if group_index != -1:
            entities.append((group_index, group_index + len(group), 'GROUP'))
        
        if has_percent:
            percent_index = example_text.find(str(percent))
            if percent_index != -1:
                entities.append((percent_index, percent_index + len(str(percent)), 'PERCENT'))

    # Return the generated example
    return example_text, {"entities": entities, "cats": {intent : 1.0}}

# Function to generate a diverse set of training examples
def generate_training_data(num_examples=100):
    training_data = []
    for _ in range(num_examples):
        example_text, annotations = generate_example()
        training_data.append((example_text, annotations))
    return training_data

# Generate and print a sample of 10 training examples
training_data = generate_training_data(1000)

# Save the training data to a JSON file
with open("light_training_data.json", "w") as f:
    json.dump(training_data, f)
    print('done')
