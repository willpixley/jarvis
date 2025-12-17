import json
import random
from collections import defaultdict

labels = [
    "turn_on_lights",
    "turn_off_lights",
    "change_volume",
    "pause_music",
    "play_music",
    "skip_song",
    "play_artist",
    "get_weather",
    "get_forcast",
]
stubs = {
    "play_artist": [
        "Play {artist}.",
        "I want to listen to {artist}",
        "Start playing {artist}",
        "Play some {artist}",
        "Can you play {artist}?",
        "Play {artist}",
        "play {artist}",
        "play some {artist}",
    ],
    "turn_on_lights": [
        "Turn on the lights",
        "turn the lights on",
        "turn the light on in here",
    ],
    "turn_off_lights": [
        "Turn off the lights",
        "turn the lights off",
        "turn the light off in here",
    ],
    "change_volume": [
        "turn down the music",
        "turn the music up",
        "mute the music",
        "set the volume to {amount}%",
        "turn it down",
        "turn it up",
    ],
    "pause_music": ["Pause", "Pause the music", "stop the music", "quiet", "pause"],
    "play_music": [
        "play some music",
        "keep playing",
        "start the music",
        "resume",
        "play",
        "Play",
        "play music",
        "Play music",
    ],
    "skip_song": [
        "skip this",
        "next song",
        "skip this song",
        "play the next song",
        "skip",
        "Skip",
        "Next song",
        "Skip this song",
        "Next track",
    ],
    "get_weather": [
        "what's it like out right now?",
        "What's the temperature?",
        "Is it raining?",
        "is it sunny?",
        "how cold is it?",
        "how hot is it",
        "what's the temperature",
        "What's the high today?",
    ],
    "get_forecast": [
        "What's it going to be like tomorrow?",
        "What's the weather tomorrow?",
        "Will it rain tomorrow?",
        "What's the high tomorrow?",
    ],
    "none": [
        "I went to the store yesterday",
        "Can you tell me the time?",
        "I really like pizza",
        "I need to buy groceries",
        "Did you watch the game last night?",
        "I have a meeting tomorrow",
        "My cat is sleeping on the couch",
        "I am reading a book right now",
        "Let's go for a walk later",
        "go bears",
    ],
}

artists = [
    "The Beatles",
    "Taylor Swift",
    "Drake",
    "Kanye West",
    "Beyonce",
    "Rihanna",
    "Eminem",
    "Kendrick Lamar",
    "Bob Dylan",
    "Queen",
    "Radiohead",
    "Chris Stapleton",
    "Treaty Oak Revival",
    "Pink Floyd",
    "Adele",
    "Bruno Mars",
    "Post Malone",
    "Billie Eilish",
    "The Rolling Stones",
    "Coldplay",
    "Jay-Z",
    "Ariana Grande",
    "Lady Gaga",
    "Ed Sheeran",
    "Sia",
    "El Alpha",
    "Foo Fighters",
    "Taylor Swift",
    "Fleetwood Mac",
    "Metallica",
    "Imagine Dragons",
    "Red Hot Chili Peppers",
    "Linkin Park",
    "Dr. Dre",
    "Lil Wayne",
    "Outkast",
    "Frank Ocean",
    "The Weeknd",
    "Lana Del Rey",
    "Shakira",
    "Shawn Mendes",
    "Dua Lipa",
    "Daft Punk",
    "Childish Gambino",
    "Khalid",
    "Camila Cabello",
    "Justin Bieber",
    "Snoop Dogg",
    "Maroon 5",
    "Green Day",
    "Queen Latifah",
    "Miley Cyrus",
    "Post Malone",
    "Travis Scott",
    "Doja Cat",
    "Drake",
    "The Who",
    "Tyler Childers",
    "Green Day",
    "Zach Bryan",
    "Eurythmics",
    "Billie Holiday",
    "Aretha Franklin",
    "Jimi Hendrix",
    "David Bowie",
    "Bob Marley",
    "Bruce Springsteen",
    "Madonna",
    "Prince",
    "Elvis Presley",
    "Whitney Houston",
    "Aerosmith",
    "AC/DC",
    "The Killers",
    "Arctic Monkeys",
    "The Cure",
    "Blink-182",
    "Paramore",
    "Nine Inch Nails",
    "DaBaby",
    "Lil Nas X",
    "Megan Thee Stallion",
    "Cardi B",
    "Post Malone",
    "Jonas Brothers",
    "The Chainsmokers",
    "Flume",
    "Kygo",
    "Avicii",
    "Calvin Harris",
    "Zayn Malik",
    "Rage Against the Machine",
    "System of a Down",
    "Pantera",
    "Tool",
    "Sza",
    "Kendrick Lamar",
    "Bad Bunny",
    "Queen",
]


volumes = [0, 10, 25, 50, 75, 100]


def generate_training_data(num_samples=500):
    training_data = []

    for _ in range(num_samples):
        # Pick a random label
        label = random.choice(labels)
        # Pick a random stub for that label
        stub = random.choice(stubs[label])

        text = stub
        entities = []

        # Fill placeholders dynamically
        if "{artist}" in text:
            artist = random.choice(artists)
            start = text.index("{artist}")
            end = start + len(artist)
            text = text.replace("{artist}", artist)
            entities.append((start, end, "ARTIST"))

        if "{amount}" in text:
            amount = str(random.choice(volumes))
            start = text.index("{amount}")
            end = start + len(amount)
            text = text.replace("{amount}", amount)
            entities.append((start, end, "VOLUME"))
        elif label == "change_volume":
            # add up and down and mute to change volume
            if "up" in text:
                start = text.index("up")
                end = start + 2
                entities.append((start, end, "VOLUME"))
            elif "down" in text:
                start = text.index("down")
                end = start + 4
                entities.append((start, end, "VOLUME"))
            elif "mute" in text:
                start = text.index("mute")
                end = start + 4
                entities.append((start, end, "VOLUME"))

        # One-hot encode intents
        cats = {l: 1.0 if l == label else 0.0 for l in labels}

        training_data.append((text, {"cats": cats, "entities": entities}))

    return training_data


# Generate data
data = generate_training_data(num_samples=10000)

# Export to JSON
with open("training_data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Generated {len(data)} training examples and saved to training_data.json")
