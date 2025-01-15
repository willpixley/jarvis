import sys
from PyQt6.QtWidgets import (
    QApplication,
    QMainWindow,
    QVBoxLayout,
    QPushButton,
    QLabel,
    QWidget,
    QStackedWidget,
)
from PyQt6.QtCore import QTimer, QTime, Qt
from ui.clock import ClockScreen
from ui.swipe_widget import SwipeStackedWidget
from ui.music_screen import MusicScreen



class Dashboard(QMainWindow):

    def __init__(self):
        super().__init__()
        self.setWindowTitle("Jarvis")
        self.setGeometry(100, 100, 800, 600)
        self.clock_screen = ClockScreen()
        self.music_screen = MusicScreen()

        self.tabs = [self.clock_screen, self.music_screen]
        # Init Swipe Widget
        self.stack = SwipeStackedWidget()
        for tab in self.tabs:
            self.stack.addWidget(tab)

        self.setCentralWidget(self.stack)
    def keyPressEvent(self, event):
        """Simulate swipe gestures using keyboard arrow keys."""
        if event.key() == Qt.Key.Key_Right:  # Simulate swipe left
            self.stack.setCurrentIndexWithAnimation(self.stack.current_widget_index + 1)
        elif event.key() == Qt.Key.Key_Left:  # Simulate swipe right
            self.stack.setCurrentIndexWithAnimation(self.stack.current_widget_index - 1)


# Run the application
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = Dashboard()
    window.show()
    sys.exit(app.exec())
