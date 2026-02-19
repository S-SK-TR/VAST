# VAST Deployment Guide

This guide explains how to deploy your VAST application to GitHub Pages at [https://serdarkul12-lang.github.io/VAST/](https://serdarkul12-lang.github.io/VAST/).

## Configuration Changes Made

1.  **`app/vite.config.js`**: Added `base: '/VAST/'`. This ensures that all assets (JS, CSS, images) are loaded correctly relative to the repository configuration on GitHub Pages.
2.  **`.github/workflows/deploy.yml`**: Created a GitHub Actions workflow that automatically builds and deploys your application.

## How it Works

The deployment is automated using **GitHub Actions**.
- **User Action**: You push code to the `main` branch.
- **Automated Process**:
    1.  GitHub detects the push.
    2.  It spins up a virtual machine.
    3.  Installs Node.js and dependencies.
    4.  Runs `npm run build` in the `app/` directory.
    5.  Uploads the generated `dist/` folder to a special branch named `gh-pages`.

## Initial Setup Required (One-Time)

Before the first deployment works, you need to configure permissions in your GitHub repository:

1.  Go to your repository on GitHub: [https://github.com/serdarkul12-lang/VAST/settings/actions](https://github.com/serdarkul12-lang/VAST/settings/actions)
2.  Navigate to **Settings** > **Actions** > **General**.
3.  Scroll down to **Workflow permissions**.
4.  Select **Read and write permissions**.
5.  Click **Save**.

## Verifying Deployment

1.  Commit and push the changes I made locally to GitHub:
    ```bash
    git add .
    git commit -m "Configure deployment to GitHub Pages"
    git push
    ```
2.  Go to the **Actions** tab in your repository to watch the build process.
3.  Once the "Deploy to GitHub Pages" workflow completes successfully (green checkmark), a new branch `gh-pages` will be created.
4.  Go to **Settings** > **Pages**.
5.  Under **Build and deployment**, ensure:
    - **Source**: Deploy from a branch
    - **Branch**: `gh-pages` / `/ (root)`
6.  Click **Save**.

Your app should be live at: https://serdarkul12-lang.github.io/VAST/
