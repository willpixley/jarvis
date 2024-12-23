import random
import json

# Define possible intents
intents = [
    "play_music", "pause_music", "set_volume", "play_song", "play_artist", "play_playlist"
]

# Define possible songs
songs = [
    "bohemian rhapsody", "stairway to heaven", "hotel california", "imagine", "smells like teen spirit",
    "like a rolling stone", "hey jude", "billie jean", "shake it off", "rolling in the deep",
    "uptown funk", "someone like you", "bad guy", "all of me", "shape of you", "blinding lights",
    "thinking out loud", "perfect", "let it be", "purple rain", "livin' on a prayer", "halo",
    "umbrella", "roar", "firework", "shallow", "old town road", "drivers license", "lemonade",
    "we will rock you", "another brick in the wall", "take me home, country roads", "sweet child o' mine",
    "wonderwall", "tears in heaven", "enter sandman", "rolling in the deep", "highway to hell",
    "i want it that way", "every breath you take", "mr. brightside", "american pie", "my heart will go on",
    "time after time", "call me maybe", "chandelier", "wrecking ball", "happy", "closer", "despacito",
    "bad romance", "just the way you are", "can't stop the feeling!", "thinking bout you", "stay with me",
    "stay", "hello", "set fire to the rain", "thank u, next", "no tears left to cry", "watermelon sugar",
    "as it was", "sunflower", "rockstar", "god's plan", "sicko mode", "humble", "alright", "lose yourself",
    "love story", "you belong with me", "shake it off", "blank space", "all too well", "anti-hero",
    "easy on me", "adore you", "sign of the times", "treat you better", "stitches", "senorita", "havana",
    "never gonna give you up", "africa", "don't stop believin'", "in the end", "numb", "somewhere i belong",
    "crawling", "the scientist", "yellow", "viva la vida", "clocks", "fix you", "paradise", "a sky full of stars",
    "believer", "thunder", "demons", "radioactive"
]


# Define possible artists
artists = [
    "the beatles", "taylor swift", "drake", "beyoncé", "kanye west", "adele", "elton john",
    "coldplay", "billie eilish", "bruno mars", "lady gaga", "ed sheeran", "the rolling stones",
    "fleetwood mac", "nirvana", "ariana grande", "kendrick lamar", "queen", "post malone",
    "harry styles", "the weeknd", "pink floyd", "metallica", "frank sinatra", "the eagles",
    "led zeppelin", "shakira", "dua lipa", "imagine dragons", "john legend", "sam smith",
    "red hot chili peppers", "lizzo", "rihanna", "doja cat", "u2", "bob marley", "maroon 5",
    "the killers", "green day", "the 1975", "radiohead", "blackpink", "j cole", "avicii",
    "justin bieber", "macklemore", "foo fighters", "linkin park", "gorillaz", "muse",
    "panic! at the disco", "tame impala", "the lumineers", "twenty one pilots", "bon jovi",
    "alicia keys", "stevie wonder", "pearl jam", "daft punk", "halsey", "sza", "charlie puth",
    "the chain smokers", "meghan trainor", "camila cabello", "shawn mendes", "selena gomez",
    "black sabbath", "jack harlow", "kid cudi", "macklemore", "lorde", "phoebe bridgers",
    "the smiths", "chvrches", "florence + the machine", "lcd soundsystem", "bastille",
    "paramore", "blink-182", "my chemical romance", "arctic monkeys", "alt-j", "the strokes",
    "khalid", "rosalía", "tove lo", "zayn", "lana del rey", "sia", "zedd", "the national",
    "vampire weekend", "king gizzard & the lizard wizard", "wilco", "death cab for cutie",
    "the xx", "justice", "grimes"
]


# Define possible playlists
playlists = [
    "chill vibes", "party mix", "road trip tunes", "focus beats", "feel good hits", "workout jams",
    "throwback classics", "morning motivation", "evening unwind", "summer anthems", "love songs",
    "study session", "rainy day moods", "coffeehouse vibes", "dance floor favorites", "soft acoustic",
    "indie essentials", "pop hits", "rock legends", "mellow moods", "weekend vibes", "sunset chill",
    "midnight drive", "golden oldies", "festival bangers", "top 40 hits", "alt rock vibes", "late night jams",
    "happy tunes", "sad songs", "romantic ballads", "hype tracks", "underground gems", "piano moments",
    "cinematic soundscapes", "country roads", "urban beats", "latin grooves", "90s nostalgia",
    "early 2000s hits", "eclectic mix", "summer nights", "winter warmth", "autumn leaves", "spring awakening",
    "instrumental bliss", "calm and cozy", "power ballads", "feel the bass", "good vibes only",
    "relax and unwind", "sing-along hits", "shower anthems", "gaming soundtrack", "epic journeys",
    "yoga flow", "ambient escape", "driving anthems", "festival vibes", "happy hour tunes",
    "cozy evenings", "soulful rhythms", "timeless classics", "dreamy beats", "vintage vibes",
    "ultimate chill", "pumped up hits", "sunday brunch", "weekend warriors", "global grooves",
    "epic road trip", "night out vibes", "campfire songs", "pure nostalgia", "uplifting melodies",
    "melancholy moods", "the great outdoors", "sunny days", "cloudy skies", "dark and moody",
    "power workout", "slow and steady", "peaceful piano", "zen garden", "rom-com soundtrack",
    "movie magic", "guitar heroes", "festival fever", "heartbreak hotel", "coastal chill",
    "mountain retreat", "city nights", "timeless hits", "hidden gems", "goodbye blues",
    "vintage vinyl", "classic road trip", "under the stars", "festival nights"
]


# Define possible volume levels
volume_levels = [
    "10%", "20%", "50%", "75%", "max volume", "half volume", "low volume", "high volume", "100%"
]

# Define phrasing templates
phrasing_templates = {
    "play_music": [
        "play some music",
        "can you play music?",
        "start playing music",
        "turn on the music",
    ],
    "pause_music": [
        "pause the music",
        "can you pause the music?",
        "stop playing music",
        "hold the music",
        "pause",
        "stop",
        "shut up"
    ],
    "set_volume": [
        "set the volume to {volume}",
        "adjust the volume to {volume}",
        "make it {volume}",
        "can you set the volume to {volume}?",
        "set the sound to {volume}",
    ],
    "play_song": [
        "play the song {song}",
        "i want to hear {song}",
        "can you play {song}",
        "start the song {song}",
        "play {song} for me"
    ],
    "play_artist": [
        "play songs by {artist}",
        "i want to listen to {artist}",
        "can you play {artist}?",
        "start playing {artist}'s music",
        "play {artist}",
        "play some {artist}"
    ],
    "play_playlist": [
        "play the playlist {playlist}",
        "can you play {playlist}?",
        "start the playlist {playlist}",
        "i want to hear {playlist}",
        "play {playlist} for me",
        "play my {playlist} playlist"
    ]
}

# Function to generate a single example
def generate_example():
    # Randomly choose an intent
    intent = random.choice(intents)
    
    # Randomly choose variables
    song = random.choice(songs)
    artist = random.choice(artists)
    playlist = random.choice(playlists)
    volume = random.choice(volume_levels)
    
    # Select a phrasing template based on the intent
    template = random.choice(phrasing_templates[intent])
    
    # Initialize the entities list
    entities = []
    
    # Replace placeholders in the template
    if intent == "set_volume":
        example_text = template.format(volume=volume).lower()
        volume_index = example_text.find(volume)
        if volume_index != -1:
            entities.append((volume_index, volume_index + len(volume), "VOLUME"))
    elif intent == "play_song":
        example_text = template.format(song=song).lower()
        song_index = example_text.find(song)
        if song_index != -1:
            entities.append((song_index, song_index + len(song), "SONG"))
    elif intent == "play_artist":
        example_text = template.format(artist=artist).lower()
        artist_index = example_text.find(artist)
        if artist_index != -1:
            entities.append((artist_index, artist_index + len(artist), "ARTIST"))
    elif intent == "play_playlist":
        example_text = template.format(playlist=playlist).lower()
        playlist_index = example_text.find(playlist)
        if playlist_index != -1:
            entities.append((playlist_index, playlist_index + len(playlist), "PLAYLIST"))
    else:
        example_text = template.lower()

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

with open("spotify_training_data.json", "w") as f:
    json.dump(training_data, f)
    print("Training data saved to spotify_training_data.json")
