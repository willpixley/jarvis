# jarvis

## TODO

1. Train NLP model to recognize difference between searching for artists, tracks, and playlist

## Connecting to JBL 6 via bluetooth

1. `pulseaudio --start`
2. Enter `bluetoothctl` to start the bluetooth interfact
3. Inside the interface: `agent on` then `default-agent`
4. `pair 10:28:74:A2:BE:44`
5. `trust 10:28:74:A2:BE:44`
6. `connect 10:28:74:A2:BE:44`
7. `exit`
8. `pactl list short sinks`
9. `pactl set-default-sink bluez_sink.10_28_74_A2_BE_44.a2dp_sink`

### Spotify setup info

https://pimylifeup.com/raspberry-pi-spotify/
https://github.com/dtcooper/raspotify/issues/675#issuecomment-2375392925

1. Run `librespot --cache librespot-cache -j` from willpixley directory
2. curl request URL returned (unclear how often this must be run)
