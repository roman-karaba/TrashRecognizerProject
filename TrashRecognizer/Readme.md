# The ITOS (trash recognizer) app

## Requirements

- Node.js v10 LTS
- Expo

## How Tos

To install the project, run either `npm install` or `expo install` in the TrashRecognizer directory where `package.json` is located

Once again it is required to make a change, this time in `src/TrashCamera.js` on line 20. where the IP address of the URL has to be the IP of the machine where the Node.js server and Python environment is running. 


To run the project, execute `expo-start` in the TrashRecognizer directory. You will notice that the expo development console will open in your browser. Use the expo mobile app to read the generated QR code in the console to connect your device with your pc to transfer the app onto the device. From this point you should be able to take photos and see their evaluation in the app. 