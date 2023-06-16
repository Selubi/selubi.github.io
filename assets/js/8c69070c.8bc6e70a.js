"use strict";(self.webpackChunkselubi_tech=self.webpackChunkselubi_tech||[]).push([[939],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var s=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,s,r=function(e,t){if(null==e)return{};var n,s,r={},l=Object.keys(e);for(s=0;s<l.length;s++)n=l[s],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(s=0;s<l.length;s++)n=l[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var a=s.createContext({}),u=function(e){var t=s.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return s.createElement(a.Provider,{value:t},e.children)},h="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},m=s.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,a=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),h=u(n),m=r,g=h["".concat(a,".").concat(m)]||h[m]||c[m]||l;return n?s.createElement(g,o(o({ref:t},p),{},{components:n})):s.createElement(g,o({ref:t},p))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i[h]="string"==typeof e?e:r,o[1]=i;for(var u=2;u<l;u++)o[u]=n[u];return s.createElement.apply(null,o)}return s.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7074:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var s=n(7462),r=(n(7294),n(3905));const l={id:"setup-env-zsh",title:"Shell Setup (Z Shell)",sidebar_label:"Z Shell",sidebar_position:1,tags:["Setup","Environment","Z Shell"]},o=void 0,i={unversionedId:"setup/setup-env-zsh",id:"setup/setup-env-zsh",title:"Shell Setup (Z Shell)",description:"My shell setup. I am using Z Shell (Zsh), but this documentation may also include non-zsh-exclusive general shell setup.",source:"@site/docs/setup/env-zsh.md",sourceDirName:"setup",slug:"/setup/setup-env-zsh",permalink:"/setup/setup-env-zsh",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/setup/env-zsh.md",tags:[{label:"Setup",permalink:"/tags/setup"},{label:"Environment",permalink:"/tags/environment"},{label:"Z Shell",permalink:"/tags/z-shell"}],version:"current",lastUpdatedAt:1686899452,formattedLastUpdatedAt:"Jun 16, 2023",sidebarPosition:1,frontMatter:{id:"setup-env-zsh",title:"Shell Setup (Z Shell)",sidebar_label:"Z Shell",sidebar_position:1,tags:["Setup","Environment","Z Shell"]},sidebar:"defaultSidebar",previous:{title:"Python",permalink:"/setup/setup-env-python"},next:{title:"Mac OS",permalink:"/setup/setup-os-mac"}},a={},u=[{value:"Setup",id:"setup",level:2},{value:"Setup Oh My Zsh",id:"setup-oh-my-zsh",level:3},{value:"Install plugins for Oh My Zsh",id:"install-plugins-for-oh-my-zsh",level:3},{value:"Configuration Files",id:"configuration-files",level:3}],p={toc:u},h="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(h,(0,s.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"My shell setup. I am using ",(0,r.kt)("a",{parentName:"p",href:"https://zsh.sourceforge.io/"},"Z Shell (Zsh)"),", but this documentation may also include non-zsh-exclusive general shell setup."),(0,r.kt)("h2",{id:"setup"},"Setup"),(0,r.kt)("h3",{id:"setup-oh-my-zsh"},"Setup ",(0,r.kt)("a",{parentName:"h3",href:"https://ohmyz.sh/"},"Oh My Zsh")),(0,r.kt)("p",null,"Oh My Zsh is mainly used to install themes to make the shell look pretty."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"\n')),(0,r.kt)("h3",{id:"install-plugins-for-oh-my-zsh"},"Install plugins for Oh My Zsh"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k # Powerlevel 10K\ngit clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting # Zsh Syntax Highlighting\ngit clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions # Zsh Auto Suggestion\n")),(0,r.kt)("h3",{id:"configuration-files"},"Configuration Files"),(0,r.kt)("p",null,"Copy all the configurations file at ",(0,r.kt)("a",{parentName:"p",href:"/setup/config/setup-files-zsh"},"Z Shell Configuration Files")))}c.isMDXComponent=!0}}]);