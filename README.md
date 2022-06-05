# whatsapp-bot

Bot runs on `node.js`

## How to Run

 - Install `node.js` on the machine - Remember to install the latest version - use node repo
 - Install `whatsap-web.js` library with `npm i whatsapp-web.js`
 - ```node main.js```
 - Copy QR code and run under `qrencode` - use `./qr` script
 - Scan QR with whatsapp mobile as if connecting to whatsapp web

## Scripts

 - Messages are saved to `messages.log` and media files are saved to `media/` directory
 - You can run `media/serve.py` for autoindexing of media files and then navigate `http://192.168.X.X:8000` to view media under browser, or run `updog`
 - You can run `media/clean-videos.py` to delete all existing videos under `media/` directory if they are taking too much space and are not important

## Notes

To run under *ARM*, when error shows up, substitute `chrome` executable causing problems in `node-modules` directory with the ARM compiled version of chromium-browser ( apt install chromium-browser ) under `/usr/bin/chromium-browser`.
