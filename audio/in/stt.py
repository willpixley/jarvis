from faster_whisper import WhisperModel
import spacy


class STT:
    def __init__(self, audio_path, classifier_path):
        self.model = WhisperModel("tiny", compute_type="float32")
        self.commands = []
        self.audio_path = audio_path
        self.classifier = spacy.load(classifier_path)

    def transcribe(self):
        segments, _ = self.model.transcribe(self.audio_path)
        out = ""
        for text in segments:
            out += text.text
        self.commands.append(out)
        return out

    def log(self):
        for command in self.commands:
            print(command)

    def get_command(self):
        text = self.transcribe()[:-1]
        print("Text: ", text)
        doc = self.classifier(text)
        intent = max(doc.cats, key=doc.cats.get)
        entities = [(ent.text, ent.label_) for ent in doc.ents]
        return intent, entities
