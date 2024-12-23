import random
import json

# Define possible intents
intents = ['check_weather', 'check_time', 'set_alarm', 'set_timer', 'set_reminder']

# Define possible locations
locations = ["new york", "los angeles", "london", "paris", "tokyo", "home", "office", 'iowa city', 'des moines', 'chicago']

# Define possible times
times = ["7:00 am", "12:30 pm", "8:45 pm", "midnight", "noon", '3 pm', '6 am']
timer_lengths = ["10 minute", "12 minutes", "26 minutes", "30 seconds", "an hour", "an hour and a half", '90 minutes', '1 minute']

# Define possible tasks
tasks = [
    "call mom", "buy groceries", "take medicine", "finish the report", "walk the dog",
    "water the plants", "pick up the kids", "send an email to john", "schedule a dentist appointment",
    "return library books", "pay the electricity bill", "call the plumber", "write a thank-you note",
    "feed the cat", "clean the kitchen", "do the laundry", "work out", "take out the trash",
    "buy a birthday gift for sarah", "attend the meeting", "set up the presentation", 
    "prepare for the exam", "visit grandma", "call the bank", "order pizza", "read a chapter of the book",
    "renew the car insurance", "check the mail", "update the software", "submit the assignment",
    "book flight tickets", "call the doctor", "register for the conference", "plan the vacation",
    "practice the guitar", "bake cookies", "organize the closet", "take the car for servicing",
    "charge the phone", "pick up dry cleaning", "prepare dinner", "call the teacher",
    "update the resume", "check the credit score", "back up the laptop", "order groceries online",
    "pay the rent", "write a blog post", "post a photo on instagram", "fill up the gas tank",
    "schedule a team meeting", "practice meditation", "write the article", "decorate the living room",
    "call a friend", "prepare the budget", "organize the bookshelf", "research a new recipe",
    "pack for the trip", "plan the birthday party", "get a haircut", "write a poem",
    "watch the webinar", "update the website", "apply for the job", "review the contract",
    "clean the garage", "replace the lightbulb", "download the app", "fix the leaky faucet",
    "buy a new phone case", "study for the quiz", "prepare a guest room", "schedule a photo shoot",
    "visit the park", "attend the workshop", "check the stock market", "renew the subscription",
    "call the insurance company", "check the weather", "go for a jog", "write the code",
    "test the application", "set up the home network", "read the news", "buy a new notebook",
    "practice the speech", "clean the aquarium", "organize a movie night", "call the delivery service",
    "replace the batteries", "arrange the furniture", "check the bank account", "schedule the car wash",
    "write the letter", "check the tracking number", "pick up the package", "call the neighbor"
]


# Define phrasing templates
phrasing_templates = {
    "check_weather": [
        "what's the weather in {location}?",
        "can you tell me the weather in {location}?",
        "what's the weather like at {location}?",
        "how's the weather outside?",
        "is it going to rain in {location}?",
        "what's the temperature",
        "what's it like outside",
        "is it going to rain",
        "what's it like out",
        
    ],
    "check_time": [
        "what time is it?",
        "can you tell me the time?",
        "what's the current time?",
    ],
    "set_alarm": [
        "set an alarm for {time}",
        "can you wake me up at {time}?",
        "set an alarm at {time}",
        "wake me up at {time}, please",
        "schedule an alarm for {time}",
        "wake me up at {time}"
    ],
    "set_timer": [
        "set a timer for {timer_length}",
        "start a timer for {timer_length}",
        "can you set a timer for {timer_length}?",
        "create a timer for {timer_length}",
        "set a countdown for {timer_length}"
    ],
    "set_reminder": [
        "remind me to {task} at {time}",
        "can you remind me to {task} at {time}?",
        "set a reminder to {task} at {time}",
        "please remind me to {task} at {time}",
        "schedule a reminder for {task} at {time}",
        "at {time} remind me to {task}"
    ]
}

# Function to generate a single example
def generate_example():
    # Randomly choose an intent
    intent = random.choice(intents)
    
    # Randomly choose variables
    location = random.choice(locations)
    time = random.choice(times)
    task = random.choice(tasks)
    timer_length = random.choice(timer_lengths)
    
    # Select a phrasing template based on the intent
    template = random.choice(phrasing_templates[intent])
    
    # Initialize the entities list
    entities = []
    
    # Replace placeholders in the template
    if intent == "check_weather":
        example_text = template.format(location=location)
        location_index = example_text.find(location)
        if location_index != -1:
            entities.append((location_index, location_index + len(location), "LOCATION"))
    elif intent == "check_time":
        example_text = template.format(location=location)
    elif intent == "set_alarm":
        example_text = template.format(time=time)
        time_index = example_text.find(time)
        if time_index != -1:
            entities.append((time_index, time_index + len(time), "TIME"))
    elif intent == "set_timer":
        example_text = template.format(timer_length=timer_length)
        timer_length_index = example_text.find(timer_length)
        if timer_length_index != -1:
            entities.append((timer_length_index, timer_length_index + len(timer_length), "TIMER_LENGTH"))
    elif intent == "set_reminder":
        example_text = template.format(task=task, time=time)
        task_index = example_text.find(task)
        time_index = example_text.find(time)
        if time_index != -1:
            entities.append((time_index, time_index + len(time), "TIME"))
        if task_index != -1:
            entities.append((task_index, task_index + len(task), "TASK"))

    # Return the generated example
    return example_text, {"entities": entities, "cats": {intent: 1.0}}

# Function to generate a diverse set of training examples
def generate_training_data(num_examples=100):
    training_data = []
    for _ in range(num_examples):
        example_text, annotations = generate_example()
        training_data.append((example_text, annotations))
    return training_data

training_data = generate_training_data(10000)
# Save the training data to a JSON file
with open("basic_cmd_training_data.json", "w") as f:
    json.dump(training_data, f)
    print("done")
