"use strict";(self.webpackChunknotes_selubi_tech=self.webpackChunknotes_selubi_tech||[]).push([[247],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>v});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},p=Object.keys(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,p=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=s(n),h=r,v=m["".concat(l,".").concat(h)]||m[h]||c[h]||p;return n?a.createElement(v,i(i({ref:t},u),{},{components:n})):a.createElement(v,i({ref:t},u))}));function v(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=n.length,i=new Array(p);i[0]=h;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[m]="string"==typeof e?e:r,i[1]=o;for(var s=2;s<p;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1397:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>p,metadata:()=>o,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const p={id:"setup-env-python",title:"Python Environment Setup with pyenv and venv",sidebar_label:"Python",sidebar_position:1,tags:["Setup","Environment","Python"]},i=void 0,o={unversionedId:"setup/setup-env-python",id:"setup/setup-env-python",title:"Python Environment Setup with pyenv and venv",description:"Setup for python development environment. We will use pyenv (version manager) + venv instead of conda.",source:"@site/docs/setup/env-python.md",sourceDirName:"setup",slug:"/setup/setup-env-python",permalink:"/setup/setup-env-python",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/setup/env-python.md",tags:[{label:"Setup",permalink:"/tags/setup"},{label:"Environment",permalink:"/tags/environment"},{label:"Python",permalink:"/tags/python"}],version:"current",sidebarPosition:1,frontMatter:{id:"setup-env-python",title:"Python Environment Setup with pyenv and venv",sidebar_label:"Python",sidebar_position:1,tags:["Setup","Environment","Python"]},sidebar:"defaultSidebar",previous:{title:"Visual Studio Code",permalink:"/setup/setup-app-vscode"},next:{title:"Ruby",permalink:"/setup/setup-env-ruby"}},l={},s=[{value:"Setup pyenv",id:"setup-pyenv",level:2},{value:"Setup project environment",id:"setup-project-environment",level:2}],u={toc:s},m="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(m,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Setup for python development environment. We will use ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pyenv/pyenv/"},"pyenv")," (version manager) + ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/venv.html"},"venv")," instead of conda."),(0,r.kt)("h2",{id:"setup-pyenv"},"Setup pyenv"),(0,r.kt)("p",null,"This section is for the installation of pyenv itself. It should be only done once per machine."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install pyenv and dependencies with package manager according to the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/pyenv/pyenv/wiki#how-to-build-cpython-with-framework-support-on-os-x"},"official suggested build environment"),"."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Mac OS"',title:'"Mac','OS"':!0},"brew install openssl readline sqlite3 xz zlib tcl-tk\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Initialize pyenv so the shell uses it by default"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pyenv init # Follow the instructions outputted\n")),(0,r.kt)("p",{parentName:"li"},"I put mine in the login shell (",(0,r.kt)("inlineCode",{parentName:"p"},".zprofile"),") instead of the interactive shell settings.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"See which versions of python is available for install"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pyenv install -l\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install one of the versions"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pyenv install 3.11 # Installs the latest revision of python 3.11\n")),(0,r.kt)("p",{parentName:"li"},"If you encounter dependency errors such as missing lzma lib, it maybe because the dependency in step1 is not configured properly.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Set global python version"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pyenv global 3.11\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Relogin / restart shell.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Verify installation"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"which python # Should output ~/.pyenv/shims/python instead of /bin/python\npython --version # Should output previously set global python version\n")))),(0,r.kt)("h2",{id:"setup-project-environment"},"Setup project environment"),(0,r.kt)("p",null,"This section is for project environment setup. It should be done for every project."),(0,r.kt)("p",null,"To start, make sure you're in the project directory."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install the correct python version if needed (optonal)."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pyenv install <PYTHON_VERSION>\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Set the local python version (optional)"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pyenv local <PYTHON_VERSION> # Will overwrite .python-version\n")),(0,r.kt)("p",{parentName:"li"},"This binds the python version to project directory by creating ",(0,r.kt)("inlineCode",{parentName:"p"},".python-version")," in the directory.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Create virtual environment"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'python -m venv .venv # Creates virtual environment at the .venv/ folder\necho ".venv" >> .gitignore # Add it to .gitignore\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Activate the venv and verify"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"source .venv/bin/activate\nwhich python # Should output <PROJECT>/.venv/bin/python\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Upgrade pip"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python -m pip install --upgrade pip\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"If its an existing project that has ",(0,r.kt)("inlineCode",{parentName:"p"},"requirements.txt"),", install the requirements. (optional)"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python -m pip install -r requirements.txt\n")))),(0,r.kt)("p",null,"Extras:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Freeze the project requirements into ",(0,r.kt)("inlineCode",{parentName:"li"},"requirements.txt"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"python -m pip freeze > requirements.txt\n"))),(0,r.kt)("li",{parentName:"ul"},"Update all outdated packages",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"pip list -o | tail -n +3 | awk '{ print $1 }' | xargs pip install -U\n")))))}c.isMDXComponent=!0}}]);