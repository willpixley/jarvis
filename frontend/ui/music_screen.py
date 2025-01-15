from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel
from PyQt6.QtCore import QTimer, QTime, QDate, Qt



class MusicScreen(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout(self)

        # Time Label
        self.music_label = QLabel("Muisc tab")
        self.music_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.music_label.setStyleSheet("font-size: 48px; font-weight: bold;")
        layout.addWidget(self.music_label)


