from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel
from PyQt6.QtCore import QTimer, QTime, QDate, Qt


class ClockScreen(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        """Initialize the Clock Screen UI."""
        layout = QVBoxLayout(self)

        # Time Label
        self.time_label = QLabel("--:--:--")
        self.time_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.time_label.setStyleSheet("font-size: 48px; font-weight: bold;")
        layout.addWidget(self.time_label)

        # Date Label
        self.date_label = QLabel("Loading date...")
        self.date_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.date_label.setStyleSheet("font-size: 24px; color: gray;")
        layout.addWidget(self.date_label)

        # Timer to update time and date
        self.update_time()
        timer = QTimer(self)
        timer.timeout.connect(self.update_time)
        timer.start(1000)

    def update_time(self):
        """Update the time and date labels."""
        current_time = QTime.currentTime().toString("hh:mm:ss")
        current_date = QDate.currentDate().toString("dddd, MMMM d, yyyy")
        self.time_label.setText(current_time)
        self.date_label.setText(current_date)
