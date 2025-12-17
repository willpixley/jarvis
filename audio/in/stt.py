from faster_whisper import WhisperModel
import spacy


class STT:
    def __init__(self, audio_path, classifier_path):
        # tiny
        self.model = WhisperModel("tiny.en", compute_type="int8")
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
        text = self.transcribe()
        text = text.replace(".", "")  # cut out periods for sake of NLP
        text = text.strip()  # same with extra spaces
        print("Text: ", text)
        doc = self.classifier(text)
        scores = doc.cats
        threshold = 0.7
        label, confidence = max(scores.items(), key=lambda x: x[1])
        print("Confidence", confidence)
        if confidence >= threshold:
            intent = label
        else:
            intent = "none"
        entities = [(ent.text, ent.label_) for ent in doc.ents]
        return intent, entities
