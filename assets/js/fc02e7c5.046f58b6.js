"use strict";(self.webpackChunkselubi_tech=self.webpackChunkselubi_tech||[]).push([[505],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),h=r,m=d["".concat(s,".").concat(h)]||d[h]||u[h]||i;return n?a.createElement(m,o(o({ref:t},p),{},{components:n})):a.createElement(m,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},9073:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const i={id:"network-physical",title:"Layer 1 - Physical",sidebar_label:"Layer 1 - Physical",sidebar_position:101,tags:["Network"]},o=void 0,l={unversionedId:"network/network-physical",id:"network/network-physical",title:"Layer 1 - Physical",description:"What is it?",source:"@site/docs/network/physical.md",sourceDirName:"network",slug:"/network/network-physical",permalink:"/network/network-physical",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/network/physical.md",tags:[{label:"Network",permalink:"/tags/network"}],version:"current",sidebarPosition:101,frontMatter:{id:"network-physical",title:"Layer 1 - Physical",sidebar_label:"Layer 1 - Physical",sidebar_position:101,tags:["Network"]},sidebar:"defaultSidebar",previous:{title:"Network",permalink:"/category/network"},next:{title:"Layer 2 - DataLink",permalink:"/network/network-datalink"}},s={},c=[{value:"What is it?",id:"what-is-it",level:2},{value:"Duplexing",id:"duplexing",level:2},{value:"Layer 1 devices",id:"layer-1-devices",level:2}],p={toc:c},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"what-is-it"},"What is it?"),(0,r.kt)("p",null,"The physical layer, or layer 1, is the OSI model's lowest layer."),(0,r.kt)("p",null,"The specifications of physical layers define the transmission and reception of unstructured data (bitstreams) between devices (Network Interface Card, Hubs) and physical transmission mediums (such as copper, fiber, or radio frequencies)."),(0,r.kt)("p",null,"The specification may include pins, connectors, distances, voltages, timings, wave frequencies, etc."),(0,r.kt)("p",null,"What the standard defines naturally depends on what kind of device and physical medium."),(0,r.kt)("p",null,"Some overarching standards such as USB, Bluetooth, and Ethernet include physical layer specifications."),(0,r.kt)("h2",{id:"duplexing"},"Duplexing"),(0,r.kt)("p",null,"The duplexing of a channel refers to the ability of a communication channel to transmit and receive data."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Simplex - In a simplex channel, communication only happens one way. An example of this is a TV broadcast."),(0,r.kt)("li",{parentName:"ul"},"Half Duplex - In a half-duplex channel, communication can go both ways but not simultaneously. An example of this is a Wi-Fi connection. A device (e.g., your phone) can transmit data to and receive data from the access point. But it cannot happen at the same time."),(0,r.kt)("li",{parentName:"ul"},"Full Duplex - In a full-duplex channel, communication can go simultaneously in either direction. An example of this is an ethernet connection. Ethernet cables have different pairs of wires within the ethernet cable that are each dedicated to sending and receiving data.")),(0,r.kt)("h2",{id:"layer-1-devices"},"Layer 1 devices"),(0,r.kt)("p",null,"These are a few examples of layer 1 devices."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Network Interface Card (NIC) - An interface between a computing device and a physical network medium. While it is not strictly a layer 1 device, it is one of the primary ways a computer connects to a network. An example of a NIC is the NVIDIA ConnectX series. RJ45 and SFP (and its derivatives) are common connectors for a NIC."),(0,r.kt)("li",{parentName:"ul"},"Hub - A layer 1 device that receives incoming data packets on a port and broadcasts it to all other ports. Switches mostly replaced them."),(0,r.kt)("li",{parentName:"ul"},"Modem - A device that converts digital data to analog data. ONU is a modem-like device used to convert digital to light signal and vice versa, often used in modern residential fiber optic internet."),(0,r.kt)("li",{parentName:"ul"},"Repeater - A device whose job is to amplify and regenerate the signal it receives. It is used for long-distance connections.")),(0,r.kt)("p",null,"Last updated: August 2, 2023"))}u.isMDXComponent=!0}}]);