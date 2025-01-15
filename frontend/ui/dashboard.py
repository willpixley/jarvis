import sys
from PyQt6.QtWidgets import (
    QApplication,
    QMainWindow,
    QStackedWidget,
    QLabel,
    QVBoxLayout,
    QWidget,
)
from PyQt6.QtCore import Qt
from PyQt6.QtGui import QSwipeGesture, QGestureEvent


class SwipeStackedWidget(QStackedWidget):
    def __init__(self):
        super().__init__()
        self.setGestureSwipeEnabled()

    def setGestureSwipeEnabled(self):
        """Enable swipe gestures for this widget."""
        self.grabGesture(Qt.GestureType.SwipeGesture)

    def event(self, event):
        """Handle gesture events."""
        if event.type() == Qt.EventType.Gesture:
            return self.handleGestures(event)
        return super().event(event)

    def handleGestures(self, event):
        """Handle swipe gestures to navigate tabs."""
        swipe = event.gesture(Qt.GestureType.SwipeGesture)
        if swipe and swipe.state() == Qt.GestureState.GestureFinished:
            if swipe.horizontalDirection() == QSwipeGesture.SwipeDirection.Left:
                self.nextTab()
            elif swipe.horizontalDirection() == QSwipeGesture.SwipeDirection.Right:
                self.previousTab()
        return True

    def nextTab(self):
        """Switch to the next tab."""
        current_index = self.currentIndex()
        if current_index < self.count() - 1:
            self.setCurrentIndex(current_index + 1)

    def previousTab(self):
        """Switch to the previous tab."""
        current_index = self.currentIndex()
        if current_index > 0:
            self.setCurrentIndex(current_index - 1)


class TabbedSideScrollApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Tabbed Side Scroll with Snapping")
        self.setGeometry(100, 100, 800, 600)

        # Create a SwipeStackedWidget
        self.stack = SwipeStackedWidget()

        # Add example tabs
        for i in range(1, 6):  # Create 5 example tabs
            tab = self.createTab(f"Tab {i}")
            self.stack.addWidget(tab)

        self.setCentralWidget(self.stack)

    def createTab(self, text):
        """Create a tab with a simple label."""
        tab = QWidget()
        layout = QVBoxLayout(tab)
        label = QLabel(text)
        label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        label.setStyleSheet("font-size: 24px; font-weight: bold;")
        layout.addWidget(label)
        return tab


# Run the application
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TabbedSideScrollApp()
    window.show()
    sys.exit(app.exec())
