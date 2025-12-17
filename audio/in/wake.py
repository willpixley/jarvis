import pvporcupine
import sounddevice as sd
import struct
import queue
import platform
from dotenv import load_dotenv
import os
from InputHandler import InputHandler

load_dotenv()

## need to get a mic for my rpi to test

ACCESS_KEY = os.getenv("PORCUPINE_ACCESS_KEY")
WAKEWORD_PATH = "./rpi.ppn"  # raspberry pi only


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


def main():
    print("Listening for wake word...")
    ip = InputHandler()

    with sd.InputStream(
        channels=1,
        samplerate=LISTEN_RATE,
        dtype="int16",
        blocksize=FRAME_LENGTH,
        callback=wakeword_callback,
    ):
        while True:
            if not detected_queue.empty():
                print("Awakened")
                detected_queue.get()
                ip.record_and_process()


if __name__ == "__main__":
    main()
