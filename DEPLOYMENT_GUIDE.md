# 🚀 Deployment Guide: AI DNA LAB

Your application is built and ready. Follow these steps to put it online.

## Option 1: Vercel (Recommended)
*Best for speed, performance, and keeping the "Agent Logic" running perfectly.*

### Step 1: Push to GitHub
1.  Download **GitHub Desktop** (if you don't have it).
2.  Drag the `nexus-ai` folder into GitHub Desktop to create a repository.
3.  Click **"Publish repository"** to push it to your GitHub account.
    *   *Note: Make sure to uncheck "Keep this code private" if you want it to be public.*

### Step 2: Connect Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up (using GitHub is easiest).
2.  Click **"Add New..."** -> **"Project"**.
3.  You will see your `nexus-ai` repo in the list. Click **"Import"**.
4.  Leave all settings as default (Framework Preset: Next.js).
5.  Click **"Deploy"**.

**Wait about 1 minute...** and your site will be live!

---

## Option 2: Netlify (Alternative)
1.  Go to [Netlify.com](https://netlify.com).
2.  Click **"Add new site"** -> **"Import from existing project"**.
3.  Select **GitHub** and choose your `nexus-ai` repository.
4.  Netlify will auto-detect Next.js.
5.  Click **"Deploy"**.

---

## ⚡ How to Run Locally (Testing)
If you want to play with it on your computer before deploying:

1.  Open your terminal/command prompt in this folder.
2.  Run: `npm run dev`
3.  Open `http://localhost:3000` in your browser.
