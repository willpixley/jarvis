from InputHandler import InputHandler

if __name__ == "__main__":
    ip = InputHandler()
    while True:

        ### handle wake word in some while loop
        ip.record_and_process()
        input("Press enter to proceed: ")
