"use strict";(self.webpackChunkselubi_tech=self.webpackChunkselubi_tech||[]).push([[271],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=i.createContext({}),s=function(e){var t=i.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return i.createElement(d.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,d=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(n),m=a,h=c["".concat(d,".").concat(m)]||c[m]||p[m]||r;return n?i.createElement(h,l(l({ref:t},u),{},{components:n})):i.createElement(h,l({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o[c]="string"==typeof e?e:a,l[1]=o;for(var s=2;s<r;s++)l[s]=n[s];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},442:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var i=n(7462),a=(n(7294),n(3905));const r={id:"linux-cheat-sheet",title:"Linux Cheat Sheet",sidebar_label:"Cheat Sheet",sidebar_position:1,tags:["Linux"]},l=void 0,o={unversionedId:"linux/linux-cheat-sheet",id:"linux/linux-cheat-sheet",title:"Linux Cheat Sheet",description:"Notable commands, variables and files for administering linux.",source:"@site/docs/linux/cheat_sheet.md",sourceDirName:"linux",slug:"/linux/linux-cheat-sheet",permalink:"/linux/linux-cheat-sheet",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/linux/cheat_sheet.md",tags:[{label:"Linux",permalink:"/tags/linux"}],version:"current",sidebarPosition:1,frontMatter:{id:"linux-cheat-sheet",title:"Linux Cheat Sheet",sidebar_label:"Cheat Sheet",sidebar_position:1,tags:["Linux"]},sidebar:"defaultSidebar",previous:{title:"Linux",permalink:"/category/linux"},next:{title:"Boot and Initialization",permalink:"/category/boot-and-initialization"}},d={},s=[{value:"GRUB (Bootloader)",id:"grub-bootloader",level:2},{value:"Commands:",id:"commands",level:3},{value:"Variables:",id:"variables",level:3},{value:"Files:",id:"files",level:3},{value:"Shared Libraries",id:"shared-libraries",level:2},{value:"Commands:",id:"commands-1",level:3},{value:"Variables:",id:"variables-1",level:3},{value:"Files:",id:"files-1",level:3}],u={toc:s},c="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Notable commands, variables and files for administering linux."),(0,a.kt)("h2",{id:"grub-bootloader"},"GRUB (Bootloader)"),(0,a.kt)("p",null,"UEFI system and GRUB 2 is assumed in this section."),(0,a.kt)("h3",{id:"commands"},"Commands:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"grub-install")," - Installs GRUB to ",(0,a.kt)("inlineCode",{parentName:"li"},"/boot/efi"),". Pass the ",(0,a.kt)("inlineCode",{parentName:"li"},"--efi-directory")," option to install to other directory."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"update-grub")," - Updates GRUB configuration file (commonly located in ",(0,a.kt)("inlineCode",{parentName:"li"},"/boot/grub/grub.cfg"),") from the definitions in ",(0,a.kt)("inlineCode",{parentName:"li"},"/etc/default/grub")),(0,a.kt)("li",{parentName:"ul"},"Press",(0,a.kt)("inlineCode",{parentName:"li"},"C")," when on GRUB menu screen to access GRUB shell.")),(0,a.kt)("h3",{id:"variables"},"Variables:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"$prefix")," - GRUB configuration path location. (This is a variable for GRUB shell, not linux one)")),(0,a.kt)("h3",{id:"files"},"Files:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"/boot/efi")," - Mount point of ESP (EFI System Partition) containing the actual bootloader UEFI accesses"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"/boot/grub/grub.cfg")," - Common location for GRUB configuration file. Located in root partition. Do not edit directly, edit ",(0,a.kt)("inlineCode",{parentName:"li"},"/etc/default/grub")," and run ",(0,a.kt)("inlineCode",{parentName:"li"},"update-grub")," instead."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"/etc/default/grub.d/")," - ",(0,a.kt)("inlineCode",{parentName:"li"},"update-grub")," changes ",(0,a.kt)("inlineCode",{parentName:"li"},"/boot/grub/grub.cfg")," based on this folder. Contents are executed in numerical order. Custom entries are usualy added to ",(0,a.kt)("inlineCode",{parentName:"li"},"40_custom")," file. Example entry is shown below.",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},'menuentry "Default OS" {\n    set root=(hd0,1)\n    linux /vmlinuz root=/dev/sda1 ro quiet splash\n    initrd /initrd.img\n')),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"set root=(hd0,1)")," - Sets device and partition of root folder of OS. ",(0,a.kt)("inlineCode",{parentName:"li"},"hd0"),",",(0,a.kt)("inlineCode",{parentName:"li"},"hd1"),",... corresponds to ",(0,a.kt)("inlineCode",{parentName:"li"},"/dev/sda"),",",(0,a.kt)("inlineCode",{parentName:"li"},"dev/sdb"),",... in linux. Partition numbering starts at 1. So, this configuration in particular equates to ",(0,a.kt)("inlineCode",{parentName:"li"},"/dev/sda1")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"/vmlinuz")," - Location of linux kernel. Because the kernel is located directly inside root folder, we can assume that this configuration has a seperate boot partition and it is not located at ",(0,a.kt)("inlineCode",{parentName:"li"},"/dev/sda1")," ",(0,a.kt)("inlineCode",{parentName:"li"},"(hd0,1)"),". If there is no boot partition and the boot folder is located within root parition, something like ",(0,a.kt)("inlineCode",{parentName:"li"},"/boot/vmlinuz")," will instead be shown instead.")))),(0,a.kt)("h2",{id:"shared-libraries"},"Shared Libraries"),(0,a.kt)("h3",{id:"commands-1"},"Commands:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"ldconfig")," - Reads ",(0,a.kt)("inlineCode",{parentName:"li"},"/etc/ld.so.conf")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"/etc/ld.so.conf.d/*")," to configure shared library location and caches them into ",(0,a.kt)("inlineCode",{parentName:"li"},"/etc/ld.so.cache"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-p")," - Shows currently cached shared library (do not update the cache)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-v")," - Updates the cache and show the cache while doing so."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"ldd [program || so]")," - Shows shared library dependencies of a program or shared object."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"objdump")," & ",(0,a.kt)("inlineCode",{parentName:"li"},"readelf")," - Examines contents of object, binary, and shared library files")),(0,a.kt)("h3",{id:"variables-1"},"Variables:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"LD_LIBRARY_PATH")," - Colon (",(0,a.kt)("inlineCode",{parentName:"li"},":"),") separated set of directories to look for libraries for user configuration. Empty by default.")),(0,a.kt)("h3",{id:"files-1"},"Files:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"/etc/ld.so.conf.d/")," - ",(0,a.kt)("inlineCode",{parentName:"li"},"ld")," (dynamic linker) looks for shared library paths defined in files in this folder.")),(0,a.kt)("p",null,"Last updated: July 20, 2023"))}p.isMDXComponent=!0}}]);