"use strict";(self.webpackChunkselubi_tech=self.webpackChunkselubi_tech||[]).push([[495],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>d});var n=a(7294);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,l=function(e,t){if(null==e)return{};var a,n,l={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(l[a]=e[a]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var p=n.createContext({}),o=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=o(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=o(a),h=l,d=u["".concat(p,".").concat(h)]||u[h]||c[h]||r;return a?n.createElement(d,i(i({ref:t},m),{},{components:a})):n.createElement(d,i({ref:t},m))}));function d(e,t){var a=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=a.length,i=new Array(r);i[0]=h;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[u]="string"==typeof e?e:l,i[1]=s;for(var o=2;o<r;o++)i[o]=a[o];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},2939:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>o});var n=a(7462),l=(a(7294),a(3905));const r={id:"setup-os-mac",title:"Mac OS Setup (Ventura)",tags:["Setup","Operating System","Mac OS"]},i=void 0,s={unversionedId:"setup/setup-os-mac",id:"setup/setup-os-mac",title:"Mac OS Setup (Ventura)",description:"My setup settings on Mac OS (Ventura). From a fresh Mac OS installation.",source:"@site/docs/setup/os-mac.md",sourceDirName:"setup",slug:"/setup/setup-os-mac",permalink:"/setup/setup-os-mac",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/setup/os-mac.md",tags:[{label:"Setup",permalink:"/tags/setup"},{label:"Operating System",permalink:"/tags/operating-system"},{label:"Mac OS",permalink:"/tags/mac-os"}],version:"current",lastUpdatedAt:1686211197,formattedLastUpdatedAt:"Jun 8, 2023",frontMatter:{id:"setup-os-mac",title:"Mac OS Setup (Ventura)",tags:["Setup","Operating System","Mac OS"]},sidebar:"defaultSidebar",previous:{title:"Shell Setup (Z Shell)",permalink:"/setup/setup-env-zsh"}},p={},o=[{value:"System Related Settings",id:"system-related-settings",level:2},{value:"Applications Setup",id:"applications-setup",level:2},{value:"Install Xcode Command Line Tools and Homebrew",id:"install-xcode-command-line-tools-and-homebrew",level:3},{value:"List of Apps to Install",id:"list-of-apps-to-install",level:3},{value:"Development Environment Setup",id:"development-environment-setup",level:2},{value:"Setup Z Shell (zsh) as the default shell",id:"setup-z-shell-zsh-as-the-default-shell",level:3}],m={toc:o},u="wrapper";function c(e){let{components:t,...a}=e;return(0,l.kt)(u,(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"My setup settings on Mac OS (Ventura). From a fresh Mac OS installation."),(0,l.kt)("p",null,'This setup is done at Macbook Pro 14" M2.'),(0,l.kt)("h2",{id:"system-related-settings"},"System Related Settings"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Enable dark mode at ",(0,l.kt)("inlineCode",{parentName:"li"},"System Settings > Appearance")),(0,l.kt)("li",{parentName:"ul"},"Setup Japanese <-> English input switching",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Enable Caps Lock key to ",(0,l.kt)("a",{parentName:"li",href:"https://support.apple.com/en-euro/guide/mac-help/mchl84525d76/mac"},"switch between Japanese input and English"),". ",(0,l.kt)("inlineCode",{parentName:"li"},"System Settings > Language input methods > All Input Sources > Use the Caps Lock key to switch to and from ABC")),(0,l.kt)("li",{parentName:"ul"},"Type \u30ab\u30bf\u30ab\u30ca with shift key while on hiragana input by enabling it at ",(0,l.kt)("inlineCode",{parentName:"li"},"System Settings > Language input methods > Japanese - Romaji > Shift key action > Type Katakana")),(0,l.kt)("li",{parentName:"ul"},"Disable all input mode (except Hiragana which is the default) at ",(0,l.kt)("inlineCode",{parentName:"li"},"System Settings > Language input methods > Japanese - Romaji")),(0,l.kt)("li",{parentName:"ul"},"To input weird inputs such as half-width Katakana or full-width Romaji, type with hiragana input and scroll up during the conversion."))),(0,l.kt)("li",{parentName:"ul"},"Setup keyboard",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Change modifier keys at ",(0,l.kt)("inlineCode",{parentName:"li"},"System Settings > Keyboard > Keyboard Shortcuts > Modifier Keys"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Caps Lock -> Caps Lock"),(0,l.kt)("li",{parentName:"ul"},"Control (^) key -> \u2318 Command"),(0,l.kt)("li",{parentName:"ul"},"Option (\u2325) key -> \u2325 Option"),(0,l.kt)("li",{parentName:"ul"},"Command (\u2318) key -> ^ Control"),(0,l.kt)("li",{parentName:"ul"},"Globe key -> \u2318 Command"))))),(0,l.kt)("li",{parentName:"ul"},"Add Home folder to Finder ",(0,l.kt)("inlineCode",{parentName:"li"},"Finder > Settings > Sidebar"))),(0,l.kt)("h2",{id:"applications-setup"},"Applications Setup"),(0,l.kt)("p",null,"We install everything with Homebrew for easier app management and cleanup."),(0,l.kt)("h3",{id:"install-xcode-command-line-tools-and-homebrew"},"Install Xcode Command Line Tools and Homebrew"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Install ",(0,l.kt)("a",{parentName:"p",href:"https://www.manpagez.com/man/1/xcode-select/"},"Xcode Command Line Tools")),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"xcode-select --install\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Install ",(0,l.kt)("a",{parentName:"p",href:"https://brew.sh/"},"Homebrew")," and check the output for installation path."),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"Add homebrew to bash login profile"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"}," echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> ~/.profile\neval \"$(/opt/homebrew/bin/brew shellenv)\"\nwhich brew # Check path of homebrew, if empty its not registered.\n")))),(0,l.kt)("h3",{id:"list-of-apps-to-install"},"List of Apps to Install"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://1password.com/"},"1Password")," - Password manager",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install --cask 1password\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://mos.caldis.me/"},"Mos")," - Set mouse scroll independent to trackpad.",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install --cask mos\n")),"Open via ",(0,l.kt)("inlineCode",{parentName:"li"},"Finder > Applications > Right Click > Open")," when opening for the first time."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://arc.net/"},"Arc")," - Browser",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install --cask arc\n")),"Custom shortcut",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Go back: \u2318D"),(0,l.kt)("li",{parentName:"ul"},"Go forward: \u2318\u21e7D"),(0,l.kt)("li",{parentName:"ul"},"Add Split View: \u2318E"),(0,l.kt)("li",{parentName:"ul"},"New Little Arc Window: \u2318N"),(0,l.kt)("li",{parentName:"ul"},"New Window: \u2318\u21e7N"),(0,l.kt)("li",{parentName:"ul"},"New Incognito Window: \u2318^\u21e7N"),(0,l.kt)("li",{parentName:"ul"},"Open Extension: Removed"),(0,l.kt)("li",{parentName:"ul"},"Pin/Unpin Tab: Removed"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://rectangleapp.com/"},"Rectangle")," - Window snapping",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install --cask rectangle\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://code.visualstudio.com/"},"Visual Studio Code")," - Code editor",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install --cask visual-studio-code\n")),"More at ",(0,l.kt)("a",{parentName:"li",href:"/setup/setup-app-vscode"},"Visual Studio Code Setup")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://github.com/tonsky/FiraCode"},"Fira Code")," - Font",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew tap homebrew/cask-fonts\nbrew install --cask font-fira-code\n"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://iterm2.com/"},"iTerm2")," - Replacement Terminal",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install --cask iterm2\n")))),(0,l.kt)("h2",{id:"development-environment-setup"},"Development Environment Setup"),(0,l.kt)("h3",{id:"setup-z-shell-zsh-as-the-default-shell"},"Setup ",(0,l.kt)("a",{parentName:"h3",href:"https://zsh.sourceforge.io/"},"Z Shell (zsh)")," as the default shell"),(0,l.kt)("p",null,"We will also use the brew's zsh instead of the default one"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Install zsh",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install zsh\nwhich zsh # Check path of zsh. /bin/zsh is not the brew one\n"))),(0,l.kt)("li",{parentName:"ol"},"Add it to list of shells",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'echo "$(which zsh)" | sudo tee -a /etc/shells\n'))),(0,l.kt)("li",{parentName:"ol"},"Change the default shell",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'chsh -s "$(which zsh)"\n'))),(0,l.kt)("li",{parentName:"ol"},"Readd brew to login profile which is now ",(0,l.kt)("inlineCode",{parentName:"li"},".zprofile"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> ~/.zprofile\n"))),(0,l.kt)("li",{parentName:"ol"},"Re-login to Mac OS, launch terminal and check zsh and brew settings",(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"echo $SHELL # Current shell path\nwhich brew # Homebrew path\n")))),(0,l.kt)("p",null,"More at ",(0,l.kt)("a",{parentName:"p",href:"/setup/setup-env-zsh"},"Shell Setup (Z Shell)")))}c.isMDXComponent=!0}}]);