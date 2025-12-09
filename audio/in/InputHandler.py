import sounddevice as sd
from scipy.io.wavfile import write
from stt import STT
import numpy as np
import requests


class InputHandler:

    def __init__(self):
        self.OUTPUT_PATH = "output.wav"
        self.stt = STT(
            audio_path=self.OUTPUT_PATH, classifier_path="voice_command_model_v2"
        )
        self.spotifyUrl = "http://localhost:8888/api/spotify"

    def record_and_process(self):
        DURATION = 4  # seconds
        SAMPLE_RATE = 44100
        print("recording")
        audio = sd.rec(int(DURATION * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1)

        sd.wait()
        write(self.OUTPUT_PATH, SAMPLE_RATE, audio)
        print("done")
        intent, entities = self.stt.get_command()
        print(intent, entities)
        self.execute_command(intent, entities)

    def execute_command(self, intent, entities):
        match intent:
            case "turn_on_lights":
                print("Turning on lights")

            case "turn_off_lights":
                print("Turning off lights")

            case "change_volume":
                print(f"Changing volume to")

            case "pause_music":
                print("Pausing music")
                response = requests.get(
                    "http://localhost:8888/api/spotify/control/pause"
                )
                if response.status_code != 200:
                    print(response.json())

            case "play_music":
                print("playing music")
                response = requests.get(
                    "http://localhost:8888/api/spotify/control/play"
                )
                if response.status_code != 200:
                    print(response)

            case "skip_song":
                url = self.spotifyUrl + "/control/next"
                response = requests.get(url)
                if response.status_code != 200:
                    print(response)

            case "play_artist":
                print(f"Playing artist")
                if len(entities) == 0:
                    print("No artist found")
                else:
                    artist, label = entities[0]
                    if label == "ARTIST":
                        params = {"search": artist}
                        url = self.spotifyUrl + "/search/artist"
                        response = requests.get(url, params)
                        if response.status_code != 200:
                            print(response)
                    else:
                        print("Detected non-artist entity", entities)

            case "get_weather":
                print("Getting current weather")

            case "get_forcast":
                print("Getting weather forecast")

            case _:
                print("Unkown error. Nothing detected", intent, entities)
