# How to Deploy to GitHub Pages

Here is a complete guide to deploying your Vite + React portfolio to GitHub Pages.

## Prerequisite: Git Repository
Ensure your project is a git repository and pushed to GitHub.
```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub.com and copy the commands to push an existing repo
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 1: Install `gh-pages`
This package helps deploy your `dist` folder to a branch that GitHub Pages can serve.
```bash
npm install gh-pages --save-dev
```

## Step 2: Update `vite.config.js`
You need to tell Vite where the site will be hosted. Use your repository name.

**Open `vite.config.js` and add the `base` property:**
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/YOUR_REPO_NAME/', // <--- Add this line! e.g., '/minimal-portfolio/'
})
```
*Note: If you are deploying to a user site (username.github.io), set base to `'/'`.*

## Step 3: Update `package.json`
Add the deployment scripts.

**Open `package.json` and add these to "scripts":**
```json
"scripts": {
  // ... existing scripts ...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## Step 4: Handle Routing (Important!)
Since GitHub Pages is a static host, standard routing (like `/projects`) will default to 404 errors if you refresh the page, because GitHub doesn't know how to handle that route server-side.

**Option A: Use HashRouter (Easiest)**
This adds a `#` to your URLs (e.g., `domain.com/#/projects`) but ensures reload works perfectly on static hosts.
1. Open `src/App.jsx`.
2. Change `import { BrowserRouter as Router ... }` to `import { HashRouter as Router ... }`.

**Option B: 404 Hack**
If you want to keep clean URLs, you need to add a specialized `404.html` script to your `public/` folder that redirects to `index.html`. (Search for "Generic Single Page App 404 hack" for details).

## Step 5: Deploy!
Run the deploy command:
```bash
npm run deploy
```
This will build your project and push it to a `gh-pages` branch on your GitHub repository.

## Step 6: GitHub Settings
1. Go to your repository on GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Source**, ensure "Deploy from a branch" is selected.
4. Set the branch to `gh-pages` / `/(root)`.
5. Click **Save**.

Your site should be live in a few minutes!
