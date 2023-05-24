---
id: gh-apps-index
title: GitHub Apps
tags:
  - GitHub
  - GitHub Apps
---

After reading this post we should be able to:

1. Understand the concept of GitHub Apps.
2. Create, install and setup GitHub Apps.
3. Interact with GitHub REST API as GitHub Apps with octokit SDK.

## GitHub Apps Crash Course

### What is GitHub Apps?

[GitHub Apps](https://docs.github.com/en/apps) is an entity that can perform actions on GitHub. My usecase for it is mainly to call [GitHub REST API](https://docs.github.com/en/rest). Generally, any operations that we want to do with [PAT (Personal Access Token)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) should be done with GitHub Apps instead.

"_GitHub Apps are independent actors within GitHub. A GitHub App acts on its own behalf, which means that you don't need to maintain a bot or service account as a separate user. _" - [Official Documentation](https://docs.github.com/en/apps/creating-github-apps/setting-up-a-github-app/about-creating-github-apps)

### Creation

We can create a GitHub app by going to `Settings > Developer settings > GitHub Apps > New GitHub Apps`. GitHub Apps could be created on an account or an organization. GitHub Apps name must be unique on the platform.

### Installation

We can install an existing GitHub App by going to `Settings > Developer settings > GitHub Apps > YOUR_APP > Install App`. **GitHub App installs to either an account or organization, not a specific repository**.

After installing, we can grant the GitHub App Installation access to all or select repositories that the account/organization it was installed has access to. We can do this via `Settings > Integrations > Application > INSTALLED_APP` on each account/organization.

> Notice that the term **GitHub App** is differentiated from **GitHub App Installation**. **GitHub App Installation** Refers to the installation instance of a **GitHub App** on an account or organization.

### Permission

We can give GitHub Apps fine-grained permission during creation or after it via `Settings > Developer settings > GitHub Apps > YOUR_APP > Permissions & Events`. **The permission you give to a GitHub App is shared across all installation of the app.**

When you change the permission of a GitHub App, all organization and accounts it is installed to will be notified and asked for review. When the corresponsing account/organization agrees, the new permissions will finally take effect. The review can be accessed at `Settings > Integrations > Application > INSTALLED_APP`.

## Interacting with GitHub REST API as GitHub Apps with Octokit.js SDK

We can interact with [GitHub REST API](https://docs.github.com/en/rest) that has `Works with GitHub Apps` written in it with GitHub Apps. Here, we will use [Octokit.js SDK](https://github.com/octokit/octokit.js) to authenticate as the app, and interact with the REST API. Generally, we want to call the REST API as a GitHub App Installation.

### Preparation

Let's install the dependencies.

```bash
npm install octokit jsonwebtoken
```

We also need the following:

1. `app_id` `(integer)`: The ID of the GitHub App. Get it from `Settings >  Developer settings > GitHub Apps > YOUR_APP > General > About > App ID`.
2. `private_key.pem` `(file)`: A file containing a private key to authenticate as GitHub App. Get it from `Settings > Developer settings > GitHub Apps > YOUR_APP > General > Private keys > Generate a private key`. Read [Managing private keys for GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps) for more information.
3. `install_target` `(string)`: The account/organization name the app is installed to.

### Authenticating as a GitHub App Installation

Here is the boilerplate code to authenticate as a GitHub App Installation. Explanation is written below the code.

```javascript showLineNumbers
const jwt = require("jsonwebtoken");
const fs = require("fs"); // For file reading
const { Octokit, App } = require("octokit");

// Change to your .pem file path
const PRIVATE_KEY_PATH = "<PATH TO YOUR PRIVATE KEY>";
//Change to your app_id
const APP_ID = 0;
// Change to your install_target
const INSTALLATION_TARGET = "Selubi";
// Change to "https://YOUR_GHE_DOMAIN/api/v3" for GitHub Enterprise
const GH_URL = "https://api.github.com";
const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");

function generateJwtToken() {
  // Generate JWT Token to authenticate as a GitHub App
  // Requires: App ID and Private Key
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const payload = {
    iat: currentTime,
    exp: currentTime + 600,
    iss: APP_ID,
  };
  const jwtToken = jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256" });
  return jwtToken;
}

async function getAppInstallationId() {
  // Get GitHub App Installation ID
  token = generateJwtToken(APP_ID, PRIVATE_KEY);
  const octokit = new Octokit({
    auth: token,
    baseUrl: GH_URL,
  });
  try {
    // Response should be a github app installation object.
    const response = await octokit.request(
      // `GET /orgs/${INSTALLATION_TARGET}/installation` for org installation
      `GET /users/${INSTALLATION_TARGET}/installation`
    );
    return response.data.id; // return the installation id (int)
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function main() {
  const APP_INSTALLATION_ID = await getAppInstallationId();
  const app = new App({
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
    Octokit: Octokit.defaults({
      baseUrl: GH_URL,
    }),
  });
  // octokit below is an authenticated as GitHub App Installation
  const octokit = await app.getInstallationOctokit(APP_INSTALLATION_ID);
}

main();
```

To authenticate as a GitHub App Installation, we first need to get the installation ID. The steps to do that:

1. [Generate JWT Token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app) to authenticate as a github app. `generateJwtToken()`
2. Call `GET /users/install_target/installation` for user installation or `GET /orgs/install_target/installation` for org installation. Change line 39 accordingly.

With the installation ID in hand, we can now authenticate as the GitHub App Installation as in line 57. We can use this class to call GitHub REST API as GitHub Apps Installation now.

### Calling the REST API

Having authenticated as a GitHub Apps Installation, now we can call [GitHub REST API available for GitHub Apps](https://docs.github.com/en/rest/overview/endpoints-available-for-github-apps). Make sure the app has [permission to call the endpoint](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps).

Here is an example code to call the GitHub REST API to list branches in a certain repository.

```javascript showLineNumbers
response = await octokit.request(`GET /repos/{OWNER}/{REPO}/branches`, {
  owner: "OWNER",
  repo: "REPO",
});
console.log(response);
```
