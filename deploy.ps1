
npm run build
# runs locally for now
firebase emulators:start

# To deploy run this:
firebase deploy --only hosting

# Deploy on server:
# firebase deploy --only hosting:mywallet-dc4cd
# But first create a firebase and register the app, then modify the firebase.json file.
# then build: npm run build
# Finally deploy to host. Website will be available soon enough!