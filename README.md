[![pipeline status](../../../badges/main/pipeline.svg)](../../../pipelines/latest)

# WE 2, Blatt 11

Zur Bearbeitung und Abgabe des Aufgabenblattes gehen Sie wie folgt vor:

1. Erstellen Sie einen Fork des Projekts unter Ihrer Gitlab-Kennung.
2. Setzen Sie die Sichtbarkeit Ihres Forks auf private
3. Klonen Sie Ihren Fork
4. Führen Sie `npm install` aus
5. Bearbeiten Sie die Aufgabe auf dem Branch "main"
6. 'Committen' Sie alle Ihre Änderungen mindestens nach jeder Teilaufgabe, und 'pushen' Sie sie auf Ihren Fork. Geben Sie sinnvolle Commit-Messages an!

Die Tests müssen via `npm test` ausführbar sein. Dies ist initial auch schon so konfiguriert.

Die Pipeline (siehe Badge oben) zeigt Ihnen an, ob Ihr Projekt grundsätzlich für die automatische Korrektur vorbereitet ist.

Für die Abgabe erstellen Sie eine Zip-Datei mittels
```
npm run abgabe
```
Diese enthält Ihr lokales Repository. Diese Datei müssen Sie dann in Moodle hochladen.

Weiteres zur Bearbeitung und Abgabe finden Sie im Blatt "Modalitäten" unter Moodle.

# Server

Für Teile der Aufgabe benötigen Sie Ihr Backend. Sie können dieses entweder über VSCode oder einfacher über die Kommandozeile mit `npm start` starten. Richten Sie Ihr Backend so ein, dass es mit HTTPS auf Port 3001 läuft.

**Achtung:** Starten Sie keinen HTTP-Server auf Port 3000 -- dieser Port wird vom Frontend benötigt!



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Lizenz (License)

Die Dateien dürfen nur im Rahmen der oben genannten Vorlesung verwendet werden und sind nur zum persönlichen Gebrauch bestimmt.