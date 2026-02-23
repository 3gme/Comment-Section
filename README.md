# Interactive Comment Section

A React implementation of the Frontend Mentor Interactive Comments challenge.

Users can:
- Add a new comment
- Reply to comments and replies
- Edit comments and replies
- Delete comments and replies
- Keep data persisted with `localStorage`

## Tech Stack

- React (Create React App)
- JavaScript (ES6+)
- CSS Modules
- Local Storage API

## Project Structure

- `src/Context.js`: global state, CRUD handlers, localStorage sync
- `src/App.js`: app layout, comments list, bottom composer
- `src/Comment.jsx`: top-level comment item + edit/delete behavior
- `src/RepliesList.jsx`: replies rendering + reply edit mode
- `src/ReplyComposer.jsx`: reusable composer for reply, update, and send
- `src/Body.jsx`: comment/reply body and action buttons

## Local Development

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## GitHub Pages Deployment

This project is configured for GitHub Pages at:

`https://3gme.github.io/Comment-Section`

### One-time setup

```bash
npm install
```

### Deploy

```bash
npm run deploy
```

This command builds the app and publishes the `build` folder to the `gh-pages` branch.

## Repository

`https://github.com/3gme/Comment-Section`
