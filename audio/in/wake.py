import pvporcupine
import sounddevice as sd
import struct
import queue
import platform
from dotenv import load_dotenv
import os

load_dotenv()

## need to get a mic for my rpi to test

ACCESS_KEY = os.getenv("PORCUPINE_ACCESS_KEY")
WAKEWORD_PATH = "./rpi.ppn"  # raspberry pi only


def process_audio(audio_frames, sample_rate):

    print("recevied audio")
    # run through stt and nlp
    pass


porcupine = pvporcupine.create(access_key=ACCESS_KEY, keyword_paths=[WAKEWORD_PATH])

LISTEN_RATE = porcupine.sample_rate
FRAME_LENGTH = porcupine.frame_length


detected_queue = queue.Queue()


def wakeword_callback(indata, frames, time, status):

    pcm = struct.unpack_from("h" * frames, indata)
    result = porcupine.process(pcm)

    if result >= 0:
        print("Wake word detected!")
        detected_queue.put(True)  # signal main loop


def record_command(duration=3):
    """Record N seconds of audio after wake word."""
    print("Recording command...")
    audio_frames = []

    def command_callback(indata, frames, time, status):
        audio_frames.append(indata.copy())

    with sd.InputStream(
        channels=1,
        samplerate=LISTEN_RATE,
        dtype="int16",
        blocksize=FRAME_LENGTH,
        callback=command_callback,
    ):
        sd.sleep(duration * 1000)

    print("Recording finished.")
    process_audio(audio_frames, LISTEN_RATE)


# --------------------------
#  MAIN LOOP
# --------------------------
def main():
    print("Listening for wake word...")

    with sd.InputStream(
        channels=1,
        samplerate=LISTEN_RATE,
        dtype="int16",
        blocksize=FRAME_LENGTH,
        callback=wakeword_callback,
    ):
        while True:
            if not detected_queue.empty():
                detected_queue.get()
                record_command(duration=3)


if __name__ == "__main__":
    main()
