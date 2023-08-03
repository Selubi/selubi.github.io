"use strict";(self.webpackChunkselubi_tech=self.webpackChunkselubi_tech||[]).push([[302],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>f});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),d=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),h=d(a),u=i,f=h["".concat(l,".").concat(u)]||h[u]||p[u]||r;return a?n.createElement(f,s(s({ref:t},c),{},{components:a})):n.createElement(f,s({ref:t},c))}));function f(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,s=new Array(r);s[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[h]="string"==typeof e?e:i,s[1]=o;for(var d=2;d<r;d++)s[d]=a[d];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},2690:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var n=a(7462),i=(a(7294),a(3905));const r={id:"network-datalink",title:"Layer 2 - Data Link",sidebar_label:"Layer 2 - Data Link",sidebar_position:102,tags:["Network"]},s=void 0,o={unversionedId:"network/network-datalink",id:"network/network-datalink",title:"Layer 2 - Data Link",description:"What is it?",source:"@site/docs/network/datalink.md",sourceDirName:"network",slug:"/network/network-datalink",permalink:"/network/network-datalink",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/network/datalink.md",tags:[{label:"Network",permalink:"/tags/network"}],version:"current",sidebarPosition:102,frontMatter:{id:"network-datalink",title:"Layer 2 - Data Link",sidebar_label:"Layer 2 - Data Link",sidebar_position:102,tags:["Network"]},sidebar:"defaultSidebar",previous:{title:"Layer 1 - Physical",permalink:"/network/network-physical"},next:{title:"Layer 3 - Network",permalink:"/network/"}},l={},d=[{value:"What is it?",id:"what-is-it",level:2},{value:"MAC Address",id:"mac-address",level:3},{value:"Frames",id:"frames",level:3},{value:"Devices",id:"devices",level:2},{value:"Switching",id:"switching",level:2},{value:"CSMA/CD",id:"csmacd",level:3}],c={toc:d},h="wrapper";function p(e){let{components:t,...a}=e;return(0,i.kt)(h,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"what-is-it"},"What is it?"),(0,i.kt)("p",null,"The data link layer builds on top of layer 1, the physical layer. It handles intra-network connections."),(0,i.kt)("p",null,"When we think of layer 2, we think about frames being sent across devices with MAC Addresses."),(0,i.kt)("p",null,"A considerable advantage of layer 2 is the collision reduction due to more and smaller collision domains. With a hub, all devices share a collision domain."),(0,i.kt)("p",null,"With switches, if it is a half-duplex connection, each port is its collision domain."),(0,i.kt)("p",null,"Even better, with a modern full-duplex connection, each data direction is its collision domain. Here, collisions do not happen."),(0,i.kt)("h3",{id:"mac-address"},"MAC Address"),(0,i.kt)("p",null,"In layer 2, devices have unique addresses assigned to them called MAC ( Media Access Control) addresses. MAC address is assigned to the device at a hardware level. Therefore, it is permanent."),(0,i.kt)("p",null,"MAC address consists of a 48-bit (6-byte address) and is typically represented as 6 pairs of hexadecimal digits such as ",(0,i.kt)("inlineCode",{parentName:"p"},"00:1A:2B:3C:4D:5E"),".\nMAC addresses are globally unique (i.e., no two devices with the same MAC address)."),(0,i.kt)("p",null,"The first 3 bytes are called OUI (Organizationally Unique Identifier). It is an identifier assigned to the vendor of the device by IEEE. Refer to ",(0,i.kt)("a",{parentName:"p",href:"https://standards-oui.ieee.org/"},"list of OUI vendors")),(0,i.kt)("p",null,"The last 3 bytes are the unique identifier of the device itself."),(0,i.kt)("h3",{id:"frames"},"Frames"),(0,i.kt)("p",null,"The frame is the data structure used to communicate in the data link layer."),(0,i.kt)("p",null,"The structure of a frame differs based on what technology is used. For example, Wi-Fi frames are different from Ethernet frames."),(0,i.kt)("p",null,"There are, however, structural similarities between frames. Typically a frame includes the following components:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Header - The frame header typically includes source and destination MAC Addresses, as well as other information for handling the frame, such as the preamble indicating the start of the frame, the length of the frame, and more."),(0,i.kt)("li",{parentName:"ul"},"Payload - The actual data being transmitted. Usually, this contains data from the higher layers, such as packets of the network layer."),(0,i.kt)("li",{parentName:"ul"},"Trailer - Typically, the trailer contains bits for error detection and correction.")),(0,i.kt)("p",null,"For more specific frame specifications, refer to the standard itself, such as ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Ethernet_frame"},"Ethernet frames")," and ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/802.11_Frame_Types"},"802.11 (Wi-Fi) frames"),"."),(0,i.kt)("h2",{id:"devices"},"Devices"),(0,i.kt)("p",null,"Below are the majority of L2 devices:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Network Interface Cards (NIC) - This is the same NIC as in L1. NICs provide a way for the computing device to communicate with other devices. In the specific context of L2, NICs are assigned MAC Addresses, so when other devices want to communicate with this computer, it actually sends the frame to the NIC's MAC Address."),(0,i.kt)("li",{parentName:"ul"},"Switch - A network switch is the most common L2 device\u2014more on it at ",(0,i.kt)("a",{parentName:"li",href:"#switching"},"switching"),"."),(0,i.kt)("li",{parentName:"ul"},"Wireless Access Points (WAP) - A WAP bridges wired and wireless networks. They are commonly seen in Wi-Fi connections.")),(0,i.kt)("h2",{id:"switching"},"Switching"),(0,i.kt)("p",null,"A switch is an L2 device that provides unicast (sending data to a single connected target device) functionality in addition to broadcast (sending data to all target devices) functionality, as seen in hubs."),(0,i.kt)("p",null,"To do this, switches maintain a MAC address table, A list of what MAC address is physically connected to a port on the switch. An important to note that one port may correspond to multiple MAC addresses. This structure makes it convenient to connect devices through another switch."),(0,i.kt)("p",null,"As a side-effect, loops may form. Modern switches may implement the ",(0,i.kt)("a",{parentName:"p",href:"https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/5234-5.html#:~:text=Spanning%20Tree%20Protocol%20(STP)%20is,are%20deadly%20to%20a%20network"},"Spanning Tree Protocol")," to prevent loops."),(0,i.kt)("p",null,"When a frame passes through a switch, the frame is not modified. The source MAC address is the original sending device MAC address. As a result, switches are mutually transparent (i.e. the switch does not know if the frame has passed through another switch)."),(0,i.kt)("p",null,"At first, the switch does not know what MAC addresses are connected to it. When a packet is sent through the switch, it reads the source MAC Address from the frame header and registers it to the table."),(0,i.kt)("p",null,"The switch will then look at the destination MAC address, find out which port the destination MAC address is from the table, and sends the data."),(0,i.kt)("p",null,"If the destination MAC address does not exist in the table, the switch forwards the frame to all ports except the incoming port. Later, when the intended recipient eventually responds, the switch learns the MAC address from the source MAC address header."),(0,i.kt)("p",null,"Switches can also broadcast frames like a hub broadcasts data. If we send a frame with the destination ",(0,i.kt)("inlineCode",{parentName:"p"},"FF:FF:FF:FF:FF:FF")," (broadcast address), the frame will be broadcasted."),(0,i.kt)("h3",{id:"csmacd"},"CSMA/CD"),(0,i.kt)("p",null,"On old switches, which still use half-duplex, use the CSMA/CD protocol to reduce collision. This protocol enables the device to see if something data transfer is happening."),(0,i.kt)("p",null,"If another transfer is happening, the device waits until the transfer is over and starts its own transfer after. Additionally, if a collision still occurs (usually because two devices send data at the same time), it will back off and add a random time delay before retrying."),(0,i.kt)("p",null,"Modern wired connections use full-duplex, so collisions itself doesn't happen. This naturally means that the need for CSMA/CD also disappears."),(0,i.kt)("p",null,"Last updated: August 3, 2023"))}p.isMDXComponent=!0}}]);