import random
import json

# Define possible intents
intents = [
    "turn_on_lights", "turn_off_lights", "play_music", "pause_music", 
     "adjust_brightness", "set_color", "start_light_show", "stop_light_show"
]

lights = ['light', 'lamp', 'strip', 'LED', 'LED strip', "bedside lamp", 'ceiling light', 'desk lamp', 'shelf lamp', 'light by the bed', 'reading light']

# Define possible devices
groups = [
    "bedroom",  "kitchen", "living room", "bathroom"
]


# Define possible music genres
music_choices = [
    "rock", "jazz", "pop", "hip hop", "electronic", 'Beatles', "blues", 'rap', 'kendrick lamar', 'chill beats', 'night time', 'late night playlist'
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
        "Turn on the {light}",
        "Switch on the {light}",
        "Activate the {light}",
        "Can you turn on the {light}?",
        "Please switch on the {light}",
        "Make sure the {light} is on"
    ],
    "turn_off_lights": [
        "Turn off the {light}",
        "Switch off the {light}",
        "Deactivate the {light}",
        "Can you turn off the {light}?",
        "Please switch off the {light}",
        "Make sure the {light} is off"
    ],
    "play_music": [
        "Play {music} music",
        "Can you play some {music}?",
        "Start playing {music} music",
        "Please play {music} music",
        "Put on some {music}",
        "Play {music} tracks"
    ],
    "pause_music": [
        "Pause the music",
        "Stop the music",
        "Can you pause the music?",
        "Please stop the music",
        "Turn off the music"
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
        "Start the {show}",
        "Can you start the {show}?",
        "Activate the {show}",
        "Turn on the {show}",
        "Please start the {show}",
        "Set the {show} in motion"
    ],
    'set_color': [
        'Set the {light} to {color}',
        'Make the {light} {color}',
        'Change the {light} to {color}',
        'Can you make the {light} {color}?'
    ],
    'adjust_brightness': [
        'Can you dim the {light}?',
        'Set the {light} to {percent}%',
        'Make the {light} a little darker',
        'Brighten the {light}',
        'Change the {light} to {percent}%'
    ] 
}

# Function to generate a single example
def generate_example():
    # Randomly choose an intent
    intent = random.choice(intents)
    
    # Randomly choose devices, music genres, locations, and other variables
    group = random.choice(groups)
    music = random.choice(music_choices)
    show = random.choice(light_shows)
    light = random.choice(lights)
    percent = random.random() * 100
    color = random.choice(colors)
    
    # Select a phrasing template based on the intent
    template = random.choice(phrasing_templates[intent])
    has_percent = template.find("{percent}") != -1
    
    # Replace placeholders in the template
    if intent == "turn_on_lights" or intent == "turn_off_lights":
        example_text = template.format(light=light)
        light_index = example_text.find(light)
        entities = [(light_index, light_index + len(light), "DEVICE")]
    elif intent == "play_music":
        example_text = template.format(music=music)
        music_index = example_text.find(music)
        entities = [(music_index, music_index + len(music), "MUSIC_GENRE")]
    elif intent == 'pause_music':
        example_text = template.format()
        entities = []
    elif intent == "start_light_show" or intent == 'stop_light_show':
        
        example_text = template.format(show=show)
        show_index = example_text.find(show)
        entities = [(show_index, show_index + len(show), "LIGHT_SHOW")]
    elif intent == 'set_color':
        
        example_text = template.format(light=light, color=color)
        light_index = example_text.find(light)
        color_index = example_text.find(color)


        entities = [(light_index,light_index + len(light), 'DEVICE'), (color_index, color_index + len(color), 'COLOR')]
    elif intent == 'adjust_brightness':
        example_text = template.format(light=light, percent=percent)
        light_index = example_text.find(light)
        entities = [(light_index, light_index + len(light), 'DEVICE')]
        

        if has_percent:
            percent_index = example_text.find(str(percent))
            if percent_index == -1:
                print('fuck')
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
#training_data = generate_training_data(10)
'''for text, annotations in training_data:
    print(f"Text: {text}")
    print(f"Entities: {annotations['entities']}")
    print(f"Intent: {annotations['cats']}")
    print("-" * 40)'''


training_data = generate_training_data(10000)

with open("training_data.json", "w") as f:
    json.dump(training_data, f)
    print('done')