"use strict";(self.webpackChunkselubi_tech=self.webpackChunkselubi_tech||[]).push([[777],{3905:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>g});var a=n(7294);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,i=function(t,e){if(null==t)return{};var n,a,i={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var s=a.createContext({}),l=function(t){var e=a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):r(r({},e),t)),n},u=function(t){var e=l(t.components);return a.createElement(s.Provider,{value:e},t.children)},c="mdxType",h={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},b=a.forwardRef((function(t,e){var n=t.components,i=t.mdxType,o=t.originalType,s=t.parentName,u=p(t,["components","mdxType","originalType","parentName"]),c=l(n),b=i,g=c["".concat(s,".").concat(b)]||c[b]||h[b]||o;return n?a.createElement(g,r(r({ref:e},u),{},{components:n})):a.createElement(g,r({ref:e},u))}));function g(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var o=n.length,r=new Array(o);r[0]=b;var p={};for(var s in e)hasOwnProperty.call(e,s)&&(p[s]=e[s]);p.originalType=t,p[c]="string"==typeof t?t:i,r[1]=p;for(var l=2;l<o;l++)r[l]=n[l];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},4258:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var a=n(7462),i=(n(7294),n(3905));const o={id:"gh-apps-index",title:"GitHub Apps",tags:["GitHub","GitHub Apps"]},r=void 0,p={unversionedId:"github/github-apps/gh-apps-index",id:"github/github-apps/gh-apps-index",title:"GitHub Apps",description:"After reading this post, we should be able to:",source:"@site/docs/github/github-apps/index.md",sourceDirName:"github/github-apps",slug:"/github/github-apps/",permalink:"/github/github-apps/",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/github/github-apps/index.md",tags:[{label:"GitHub",permalink:"/tags/git-hub"},{label:"GitHub Apps",permalink:"/tags/git-hub-apps"}],version:"current",frontMatter:{id:"gh-apps-index",title:"GitHub Apps",tags:["GitHub","GitHub Apps"]},sidebar:"tutorialSidebar",previous:{title:"GitHub",permalink:"/github/"},next:{title:"trigger-repository-dispatch",permalink:"/github/github-apps/trigger-repository-dispatch"}},s={},l=[{value:"GitHub Apps Crash Course",id:"github-apps-crash-course",level:2},{value:"What are GitHub Apps?",id:"what-are-github-apps",level:3},{value:"Creation",id:"creation",level:3},{value:"Installation",id:"installation",level:3},{value:"Permission",id:"permission",level:3},{value:"Interacting with GitHub REST API as GitHub Apps with Octokit.js SDK",id:"interacting-with-github-rest-api-as-github-apps-with-octokitjs-sdk",level:2},{value:"Preparation",id:"preparation",level:3},{value:"Authenticating as a GitHub App Installation",id:"authenticating-as-a-github-app-installation",level:3},{value:"Calling the REST API",id:"calling-the-rest-api",level:3}],u={toc:l},c="wrapper";function h(t){let{components:e,...n}=t;return(0,i.kt)(c,(0,a.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"After reading this post, we should be able to:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Understand the concept of GitHub Apps."),(0,i.kt)("li",{parentName:"ol"},"Create, install, and configure GitHub Apps."),(0,i.kt)("li",{parentName:"ol"},"Interact with GitHub REST API as GitHub Apps with Octokit SDK.")),(0,i.kt)("h2",{id:"github-apps-crash-course"},"GitHub Apps Crash Course"),(0,i.kt)("h3",{id:"what-are-github-apps"},"What are GitHub Apps?"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/apps"},"GitHub Apps")," is an entity that can perform actions on GitHub. My use-case is mainly to call ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/rest"},"GitHub REST API"),". Generally, any operations that we want to do with ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"},"PAT (Personal Access Token)")," should be done with GitHub Apps instead."),(0,i.kt)("p",null,'"',(0,i.kt)("em",{parentName:"p"},"GitHub Apps are independent actors within GitHub. A GitHub App acts on its own behalf, which means that you don't need to maintain a bot or service account as a separate user. "),'" - ',(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/apps/creating-github-apps/setting-up-a-github-app/about-creating-github-apps"},"Official Documentation")),(0,i.kt)("h3",{id:"creation"},"Creation"),(0,i.kt)("p",null,"We can create a GitHub app by going to ",(0,i.kt)("inlineCode",{parentName:"p"},"Settings > Developer settings > GitHub Apps > New GitHub Apps"),". GitHub Apps could be created on an account or an organization. GitHub Apps name must be unique on the platform."),(0,i.kt)("h3",{id:"installation"},"Installation"),(0,i.kt)("p",null,"We can install an existing GitHub App by going to ",(0,i.kt)("inlineCode",{parentName:"p"},"Settings > Developer settings > GitHub Apps > YOUR_APP > Install App"),". ",(0,i.kt)("strong",{parentName:"p"},"GitHub App installs to either an account or organization, not a specific repository"),"."),(0,i.kt)("p",null,"After installing, we can grant the GitHub App Installation access to all or select repositories that the account/organization it was installed has access. We can do this via ",(0,i.kt)("inlineCode",{parentName:"p"},"Settings > Integrations > Application > INSTALLED_APP")," on each account/organization."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Notice that the term ",(0,i.kt)("strong",{parentName:"p"},"GitHub App")," is differentiated from ",(0,i.kt)("strong",{parentName:"p"},"GitHub App Installation"),". ",(0,i.kt)("strong",{parentName:"p"},"GitHub App Installation")," Refers to the installation instance of a ",(0,i.kt)("strong",{parentName:"p"},"GitHub App")," on an account or organization.")),(0,i.kt)("h3",{id:"permission"},"Permission"),(0,i.kt)("p",null,"We can give GitHub Apps fine-grained permission during creation or after it via ",(0,i.kt)("inlineCode",{parentName:"p"},"Settings > Developer settings > GitHub Apps > YOUR_APP > Permissions & Events"),". ",(0,i.kt)("strong",{parentName:"p"},"The permission you give to a GitHub App is shared across all installations of the app.")),(0,i.kt)("p",null,"When you change the permission of a GitHub App, all organizations and accounts it is installed to will be notified and asked to review. The review can be accessed at ",(0,i.kt)("inlineCode",{parentName:"p"},"Settings > Integrations > Application > INSTALLED_APP"),". The new permissions will finally take effect when the corresponding account/organization agrees."),(0,i.kt)("h2",{id:"interacting-with-github-rest-api-as-github-apps-with-octokitjs-sdk"},"Interacting with GitHub REST API as GitHub Apps with Octokit.js SDK"),(0,i.kt)("p",null,"We can interact with ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/rest"},"GitHub REST API")," that has ",(0,i.kt)("inlineCode",{parentName:"p"},"Works with GitHub Apps")," written in it with GitHub Apps. Here, we will use ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/octokit/octokit.js"},"Octokit.js SDK")," to authenticate as the app and interact with the REST API. Generally, we want to call the REST API as a GitHub App Installation."),(0,i.kt)("h3",{id:"preparation"},"Preparation"),(0,i.kt)("p",null,"Let's install the dependencies."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install octokit jsonwebtoken\n")),(0,i.kt)("p",null,"We also need the following:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"app_id")," ",(0,i.kt)("inlineCode",{parentName:"li"},"(integer)"),": The ID of the GitHub App. Get it from ",(0,i.kt)("inlineCode",{parentName:"li"},"Settings >  Developer settings > GitHub Apps > YOUR_APP > General > About > App ID"),"."),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"private_key.pem")," ",(0,i.kt)("inlineCode",{parentName:"li"},"(file)"),": A file containing a private key to authenticate as GitHub App. Get it from ",(0,i.kt)("inlineCode",{parentName:"li"},"Settings > Developer settings > GitHub Apps > YOUR_APP > General > Private keys > Generate a private key"),". Read ",(0,i.kt)("a",{parentName:"li",href:"https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps"},"Managing private keys for GitHub Apps")," for more information."),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"install_target")," ",(0,i.kt)("inlineCode",{parentName:"li"},"(string)"),": The account/organization name the app is installed to.")),(0,i.kt)("h3",{id:"authenticating-as-a-github-app-installation"},"Authenticating as a GitHub App Installation"),(0,i.kt)("p",null,"Here is the boilerplate code to authenticate as a GitHub App Installation. The explanation is written below the code."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript",metastring:"showLineNumbers",showLineNumbers:!0},'const jwt = require("jsonwebtoken");\nconst fs = require("fs"); // For file reading\nconst { Octokit, App } = require("octokit");\n\n// Change to your .pem file path\nconst PRIVATE_KEY_PATH = "<PATH TO YOUR PRIVATE KEY>";\n//Change to your app_id\nconst APP_ID = 0;\n// Change to your install_target\nconst INSTALLATION_TARGET = "Selubi";\n// Change to "https://YOUR_GHE_DOMAIN/api/v3" for GitHub Enterprise\nconst GH_URL = "https://api.github.com";\nconst PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");\n\nfunction generateJwtToken() {\n  // Generate JWT Token to authenticate as a GitHub App\n  // Requires: App ID and Private Key\n  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds\n  const payload = {\n    iat: currentTime,\n    exp: currentTime + 600,\n    iss: APP_ID,\n  };\n  const jwtToken = jwt.sign(payload, PRIVATE_KEY, { algorithm: "RS256" });\n  return jwtToken;\n}\n\nasync function getAppInstallationId() {\n  // Get GitHub App Installation ID\n  token = generateJwtToken(APP_ID, PRIVATE_KEY);\n  const octokit = new Octokit({\n    auth: token,\n    baseUrl: GH_URL,\n  });\n  try {\n    // Response should be a github app installation object.\n    const response = await octokit.request(\n      // `GET /orgs/${INSTALLATION_TARGET}/installation` for org installation\n      `GET /users/${INSTALLATION_TARGET}/installation`\n    );\n    return response.data.id; // return the installation id (int)\n  } catch (error) {\n    console.error("Error:", error.message);\n  }\n}\n\nasync function main() {\n  const APP_INSTALLATION_ID = await getAppInstallationId();\n  const app = new App({\n    appId: APP_ID,\n    privateKey: PRIVATE_KEY,\n    Octokit: Octokit.defaults({\n      baseUrl: GH_URL,\n    }),\n  });\n  // octokit below is an authenticated as GitHub App Installation\n  const octokit = await app.getInstallationOctokit(APP_INSTALLATION_ID);\n}\n\nmain();\n')),(0,i.kt)("p",null,"To authenticate as a GitHub App Installation, we must first get the installation ID. The steps to do that:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app"},"Generate JWT Token")," to authenticate as a GitHub app. ",(0,i.kt)("inlineCode",{parentName:"li"},"generateJwtToken()")),(0,i.kt)("li",{parentName:"ol"},"Call ",(0,i.kt)("inlineCode",{parentName:"li"},"GET /users/install_target/installation")," for user installation or ",(0,i.kt)("inlineCode",{parentName:"li"},"GET /orgs/install_target/installation")," for org installation. Change line 39 accordingly.")),(0,i.kt)("p",null,"With the installation ID, we can now authenticate as the GitHub App Installation, as in line 57. We can now use this class to call GitHub REST API as GitHub Apps Installation."),(0,i.kt)("h3",{id:"calling-the-rest-api"},"Calling the REST API"),(0,i.kt)("p",null,"Having authenticated as a GitHub Apps Installation, we can now call ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/rest/overview/endpoints-available-for-github-apps"},"GitHub REST API available for GitHub Apps"),". Ensure the app has ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/rest/overview/permissions-required-for-github-apps"},"permission to call the endpoint"),"."),(0,i.kt)("p",null,"Here is an example code to call the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/rest/branches/branches#list-branches"},"API to list branches in a particular repository"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript",metastring:"showLineNumbers",showLineNumbers:!0},'const OWNER = "<repo owner>";\nconst REPO = "<repo name>";\nresponse = await octokit.request(`GET /repos/${OWNER}/${REPO}/branches`, {\n  owner: OWNER,\n  repo: REPO,\n});\nconsole.log(response);\n')))}h.isMDXComponent=!0}}]);