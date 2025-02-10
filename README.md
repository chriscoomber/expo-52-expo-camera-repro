Reproduction of issue:

1. `npm install`
2. `npx expo export -p web`
3. (Once per workstation) `npm install -g http-server`
4. `npx http-server ./dist -S -C ./cert.pem -K ./key.pem`
5. Go to the URL with the LAN IP address on your mobile device's browser on the same LAN
6. Proceed through the SSL warnings (since this is a self-signed certificate)
