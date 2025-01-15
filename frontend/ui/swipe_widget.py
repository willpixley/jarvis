import sys
from PyQt6.QtWidgets import (
    QApplication,
    QMainWindow,
    QStackedWidget,
    QLabel,
    QVBoxLayout,
    QWidget,
    QSwipeGesture
)
from PyQt6.QtCore import Qt, QPropertyAnimation, QEasingCurve, QRect


class SwipeStackedWidget(QStackedWidget):
    def __init__(self):
        super().__init__()
        self.current_widget_index = 0

    def setCurrentIndexWithAnimation(self, index):
        """Switch to the given index with a sliding animation."""
        if index == self.currentIndex() or index < 0 or index >= self.count():
            return

        # Determine the direction of the slide
        direction = 1 if index > self.currentIndex() else -1

        # Get the current and target widgets
        current_widget = self.widget(self.currentIndex())
        target_widget = self.widget(index)

        # Place the target widget to the side before animation starts
        width = self.frameGeometry().width()
        target_widget.setGeometry(
            QRect(
                width * direction,
                0,
                width,
                self.frameGeometry().height(),
            )
        )
        target_widget.show()

        # Create animations for both widgets
        current_animation = QPropertyAnimation(current_widget, b"geometry")
        target_animation = QPropertyAnimation(target_widget, b"geometry")

        # Set animation properties
        current_animation.setDuration(500)
        target_animation.setDuration(500)
        current_animation.setStartValue(current_widget.geometry())
        current_animation.setEndValue(
            QRect(
                -width * direction,
                0,
                width,
                self.frameGeometry().height(),
            )
        )
        target_animation.setStartValue(target_widget.geometry())
        target_animation.setEndValue(self.frameGeometry())

        # Start the animations
        current_animation.start()
        target_animation.start()

        # Update the current index after the animation
        self.current_widget_index = index
        self.setCurrentIndex(index)

