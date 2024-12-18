# jarvis

## Connecting to JBL 6 via bluetooth

1. `pulseaudio --start`
2. Enter `bluetoothctl` to start the bluetooth interfact
3. Inside the interface: `agent on` then `default-agent`
4. `pair 10:28:74:A2:BE:44`
5. `trust 10:28:74:A2:BE:44`
6. `connect 10:28:74:A2:BE:44`
7. `exit`
8. `pactl list short sinks`
9. `pactl set-default-sink bluez_sink.XX_XX_XX_XX_XX_XX`
