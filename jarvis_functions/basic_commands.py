from datetime import datetime
import pytz

def check_weather(entities):
    print("check_weather", entities)

def check_time(entities):
    central_tz = pytz.timezone('US/Central')
    central_time = datetime.now(central_tz)
    return f"It is {central_time.strftime("%-I:%M %p")}."

def get_day(entities):
    central_tz = pytz.timezone('US/Central')
    central_time = datetime.now(central_tz)
    return f"It is {central_time.strftime("%A, %B %-d")}."

def set_alarm(entities):
    print("set_alarm", entities)

def set_timer(entities):
    print("set_timer", entities)

def set_reminder(entities):
    print("set_reminder", entities)

