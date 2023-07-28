"use strict";(self.webpackChunkselubi_tech=self.webpackChunkselubi_tech||[]).push([[926],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=i.createContext({}),u=function(e){var t=i.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=u(e.components);return i.createElement(o.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=u(n),c=a,h=d["".concat(o,".").concat(c)]||d[c]||p[c]||l;return n?i.createElement(h,r(r({ref:t},m),{},{components:n})):i.createElement(h,r({ref:t},m))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,r=new Array(l);r[0]=c;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[d]="string"==typeof e?e:a,r[1]=s;for(var u=2;u<l;u++)r[u]=n[u];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3959:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>u});var i=n(7462),a=(n(7294),n(3905));const l={id:"linux-concept-service",title:"Service Manager",sidebar_label:"Service Manager",sidebar_position:103,tags:["Linux"]},r=void 0,s={unversionedId:"linux/linux-concept-service",id:"linux/linux-concept-service",title:"Service Manager",description:"Main source of this document 101.3",source:"@site/docs/linux/service.md",sourceDirName:"linux",slug:"/linux/linux-concept-service",permalink:"/linux/linux-concept-service",draft:!1,editUrl:"https://github.com/Selubi/selubi.github.io/tree/main/docs/linux/service.md",tags:[{label:"Linux",permalink:"/tags/linux"}],version:"current",sidebarPosition:103,frontMatter:{id:"linux-concept-service",title:"Service Manager",sidebar_label:"Service Manager",sidebar_position:103,tags:["Linux"]},sidebar:"defaultSidebar",previous:{title:"GRUB Bootloader",permalink:"/linux/linux-concept-grub"},next:{title:"Setup",permalink:"/category/setup"}},o={},u=[{value:"What are services, processes, and jobs?",id:"what-are-services-processes-and-jobs",level:2},{value:"What about service managers?",id:"what-about-service-managers",level:2},{value:"<code>systemd</code>: Service manager of modern Linux distribution",id:"systemd-service-manager-of-modern-linux-distribution",level:2},{value:"A Brief Overview",id:"a-brief-overview",level:3},{value:"Interacting with <code>systemd</code> with <code>systemctl</code>",id:"interacting-with-systemd-with-systemctl",level:3},{value:"General",id:"general",level:4},{value:"Services",id:"services",level:4},{value:"Targets",id:"targets",level:4},{value:"More on units",id:"more-on-units",level:3},{value:"What exactly are targets?",id:"what-exactly-are-targets",level:4},{value:"Mount units vs. automount units",id:"mount-units-vs-automount-units",level:4},{value:"<code>SysVinit</code>: The legacy service manager",id:"sysvinit-the-legacy-service-manager",level:2},{value:"Extra Notes",id:"extra-notes",level:2}],m={toc:u},d="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,i.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Main source of this document: ",(0,a.kt)("a",{parentName:"p",href:"https://learning.lpi.org/en/learning-materials/learning-materials/"},"LPIC-1 Exam 101 Learning Material: 101.3")),(0,a.kt)("h2",{id:"what-are-services-processes-and-jobs"},"What are services, processes, and jobs?"),(0,a.kt)("p",null,"In Linux, a process is a running instance of a computer program. Any running program is a process, no matter by who or from where it is executed."),(0,a.kt)("p",null,"A service (also called daemons) usually refers to a background process (a process that does not need user interaction) that provides functionality for the operating system. Services are generally started during boot and managed by the service manager."),(0,a.kt)("p",null,"A job is a concept related to the shell, not the OS itself. A job is a process that we, the user, start interactively."),(0,a.kt)("p",null,"Details on jobs and processes will be discussed in another note. We will focus on services and service managers on this note."),(0,a.kt)("h2",{id:"what-about-service-managers"},"What about service managers?"),(0,a.kt)("p",null,"Service Managers are the program that manages services, and it is the first program launched by the kernel boot. Strictly speaking, it is the first process executed in the ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/User_space_and_kernel_space"},"user-space environment"),". This is why its PID (process identification number) is always ",(0,a.kt)("inlineCode",{parentName:"p"},"1"),"."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"systemd")," is the service manager most used in modern Linux distributions. We will discuss mainly ",(0,a.kt)("inlineCode",{parentName:"p"},"systemd")," and then explain the difference with its predecessor, ",(0,a.kt)("inlineCode",{parentName:"p"},"SysVinit"),"."),(0,a.kt)("h2",{id:"systemd-service-manager-of-modern-linux-distribution"},(0,a.kt)("inlineCode",{parentName:"h2"},"systemd"),": Service manager of modern Linux distribution"),(0,a.kt)("h3",{id:"a-brief-overview"},"A Brief Overview"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"systemd")," is the manager for most modern Linux distributions. In ",(0,a.kt)("inlineCode",{parentName:"p"},"systemd"),", system resources and services are referred to as units. For example, the docker service is called ",(0,a.kt)("inlineCode",{parentName:"p"},"docker.service"),", and the collection of units needed for a graphical desktop environment is called ",(0,a.kt)("inlineCode",{parentName:"p"},"graphical.target"),". As shown by these examples, the naming scheme of units follows ",(0,a.kt)("inlineCode",{parentName:"p"},"<name>.<type>"),"."),(0,a.kt)("p",null,"Some of the primary unit types include:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"service")," - Individual service. The most common unit."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"target")," - A collection of other units representing a system state."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"socket")," - Unit for inter-process communication."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"device")," - Unit associated with a hardware device. A device will only be taken as a unit if a udev rule for it exists."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"mount")," - A mount point definition in the filesystem, similar to ",(0,a.kt)("inlineCode",{parentName:"li"},"/etc/fstab"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"automount")," - A mount unit that is automatically activated instead of manually activated.")),(0,a.kt)("p",null,"Configuration files of every unit are located in ",(0,a.kt)("inlineCode",{parentName:"p"},"/lib/systemd/system/")),(0,a.kt)("p",null,"Here is an example of a configuration for a ",(0,a.kt)("inlineCode",{parentName:"p"},".mount")," unit."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ini",metastring:"title=/lib/systemd/system/sample.mount",title:"/lib/systemd/system/sample.mount"},"[Unit]\nDescription=USB Drive Automount sample\n\n[Mount]\nWhat=/dev/sdb1\nWhere=/mnt/usb\nType=auto\nOptions=defaults,noatime\nx-systemd.automount=true\n\n[Install]\nWantedBy=multi-user.target\n")),(0,a.kt)("h3",{id:"interacting-with-systemd-with-systemctl"},"Interacting with ",(0,a.kt)("inlineCode",{parentName:"h3"},"systemd")," with ",(0,a.kt)("inlineCode",{parentName:"h3"},"systemctl")),(0,a.kt)("p",null,"We can interact with ",(0,a.kt)("inlineCode",{parentName:"p"},"systemd")," with the ",(0,a.kt)("inlineCode",{parentName:"p"},"systemctl")," utility. Here is a list of frequently used ",(0,a.kt)("inlineCode",{parentName:"p"},"systemctl")," commands. Here, ",(0,a.kt)("inlineCode",{parentName:"p"},"<type>")," refers to unit type the command applies to."),(0,a.kt)("h4",{id:"general"},"General"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl list-unit-files")," - Lists all available units and show if they are enabled. Pass the option ",(0,a.kt)("inlineCode",{parentName:"li"},"--type=TYPE")," to only show units of ",(0,a.kt)("inlineCode",{parentName:"li"},"TYPE")," type."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl list-units")," - Lists all active units. Pass the option ",(0,a.kt)("inlineCode",{parentName:"li"},"--type=TYPE")," to only show units of ",(0,a.kt)("inlineCode",{parentName:"li"},"TYPE")," type."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl reboot")," - Reboot the system. Same effect as ",(0,a.kt)("inlineCode",{parentName:"li"},"systemctl isolate reboot.target")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl poweroff")," - Power off the system. Same effect as ",(0,a.kt)("inlineCode",{parentName:"li"},"systemctl isolate shutdown.target")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl suspend")," - Sleeps the system. Data in memory is saved as is."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl hibernate")," - Hibernates the system. Data in memory is moved to disk."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl rescue"),' - Puts the system in rescue mode (similar to "safe mode" on Windows). Same effect as ',(0,a.kt)("inlineCode",{parentName:"li"},"systemctl isolate rescue.target"))),(0,a.kt)("h4",{id:"services"},"Services"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl start [<service>]"),"\u3000- Starts unit"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl stop [<service>]"),"\u3000- Stops unit"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl restart [<service>]"),"\u3000- Restarts unit"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl status [<service>]"),"\u3000- Shows the state of unit"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl is-active [<service>]"),"\u3000- Shows ",(0,a.kt)("inlineCode",{parentName:"li"},"active")," if unit is running, ",(0,a.kt)("inlineCode",{parentName:"li"},"inactive")," otherwise."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl enable [<service>]"),"\u3000- Makes unit start from the next system initialization. Does NOT start unit immediately."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl disable [<service>]"),"\u3000- Unit will not start from the next system initialization."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl is-enabled [<service>]")," - Outputs ",(0,a.kt)("inlineCode",{parentName:"li"},"enabled")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"disabled"),".")),(0,a.kt)("h4",{id:"targets"},"Targets"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl isolate [<target>]")," - Alternate to the target unit."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl set-default [<target>]")," - Set the default initialization target for subsequent boots. Usually defaults to ",(0,a.kt)("inlineCode",{parentName:"li"},"multi-user.target")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"graphical.target"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"systemctl get-default")," - Get the default initialization target.")),(0,a.kt)("h3",{id:"more-on-units"},"More on units"),(0,a.kt)("h4",{id:"what-exactly-are-targets"},"What exactly are targets?"),(0,a.kt)("p",null,"Targets are a unit containing a collection of other units to represent a system state.\nIf our Linux installation has a graphical desktop environment, that is a system state in which the GUI is loaded (as opposed to a CLI only installation).\nThe collection of units needed to achieve this state is called the ",(0,a.kt)("inlineCode",{parentName:"p"},"graphical.target"),".\nFor example, in an installation of Ubuntu for desktop use, this ",(0,a.kt)("inlineCode",{parentName:"p"},"graphical.target")," is the default target.\nThe default target is the target unit that is targeted when the system boots (i.e., the default state of the system we want to achieve on the boot process)."),(0,a.kt)("p",null,"In this ",(0,a.kt)("inlineCode",{parentName:"p"},"graphical.target"),", there might be multiple units, such as ",(0,a.kt)("inlineCode",{parentName:"p"},"mutter.service")," if we use GNOME for our desktop environment, ",(0,a.kt)("inlineCode",{parentName:"p"},"network.target")," to provide network connectivity, etc."),(0,a.kt)("p",null,"Some targets could co-exist and complement each other such as the ",(0,a.kt)("inlineCode",{parentName:"p"},"graphical.target")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"network.target"),", however some targets, such as ",(0,a.kt)("inlineCode",{parentName:"p"},"rescue.target")," (single user target) and ",(0,a.kt)("inlineCode",{parentName:"p"},"multi-user.target")," (usually the default target for a non-graphical Linux installation) are mutually exclusive."),(0,a.kt)("p",null,"There can be only one default target. It will usually be ",(0,a.kt)("inlineCode",{parentName:"p"},"multi-user.target")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"graphical.target"),". Another notable target is the ",(0,a.kt)("inlineCode",{parentName:"p"},"rescue.target"),', a system state for recovery akin to "Safe Mode" for Windows.'),(0,a.kt)("h4",{id:"mount-units-vs-automount-units"},"Mount units vs. automount units"),(0,a.kt)("p",null,"On a mount unit configuration such as the ",(0,a.kt)("inlineCode",{parentName:"p"},"/lib/systemd/system/sample.mount")," example above, we can pass the ",(0,a.kt)("inlineCode",{parentName:"p"},"x-systemd.automount=true")," to enable automount. When automounting is available, the device is not mounted right away. Instead, when an access to ",(0,a.kt)("inlineCode",{parentName:"p"},"/mnt/usb")," is detected (via ",(0,a.kt)("a",{parentName:"p",href:"https://man7.org/linux/man-pages/man7/inotify.7.html"},"kernel inotify event"),"), ",(0,a.kt)("inlineCode",{parentName:"p"},"/dev/sdb1")," is mounted at that time and the ",(0,a.kt)("inlineCode",{parentName:"p"},"sample.automount")," event is created. When ",(0,a.kt)("inlineCode",{parentName:"p"},"/mnt/usb")," doesn't get accessed after a while after mounting, it is automatically dismounted."),(0,a.kt)("p",null,"This is in contrast to if you activate the mount unit via ",(0,a.kt)("inlineCode",{parentName:"p"},"systemctl mount sample.mount"),", it will mount ",(0,a.kt)("inlineCode",{parentName:"p"},"/dev/sdb1")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"/mnt/usb")," until we unmount it with ",(0,a.kt)("inlineCode",{parentName:"p"},"systemctl umount sample.mount"),"."),(0,a.kt)("h2",{id:"sysvinit-the-legacy-service-manager"},(0,a.kt)("inlineCode",{parentName:"h2"},"SysVinit"),": The legacy service manager"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"SysVinit")," is a service manager replaced by ",(0,a.kt)("inlineCode",{parentName:"p"},"systemd"),", which we might still encounter in legacy systems.\n",(0,a.kt)("inlineCode",{parentName:"p"},"SysVinit")," systems are easily understandable if we understand the concept of target units in ",(0,a.kt)("inlineCode",{parentName:"p"},"systemd"),"."),(0,a.kt)("p",null,"In ",(0,a.kt)("inlineCode",{parentName:"p"},"SysVinit"),", there are only 6 desired system state which is called runlevels.\nEach runlevel is mutually exclusive to the other (i.e., you cannot have two runlevels active at the same time).\nWhat services should be enabled and disabled are defined at each runlevel.\nIn systemd terms, think of it as having 6 mutually exclusive targets as the whole service manager."),(0,a.kt)("p",null,"The runlevels are defined below:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Runlevel 0")," - Shutdown (equivalent to systemd's ",(0,a.kt)("inlineCode",{parentName:"li"},"shutdown.target"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Runlevel 1, s or single")," - Single user mode (",(0,a.kt)("inlineCode",{parentName:"li"},"rescue.target"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Runlevel 2,3,4")," - Multi-user mode. 3 is the most used one (",(0,a.kt)("inlineCode",{parentName:"li"},"multi-user.target"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Runlevel 5")," - Graphical multi-user mode (",(0,a.kt)("inlineCode",{parentName:"li"},"graphical.target"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Runlevel 6")," - Restart (",(0,a.kt)("inlineCode",{parentName:"li"},"reboot.target"),")")),(0,a.kt)("p",null,"The settings, such as default runlevel, is set on the ",(0,a.kt)("inlineCode",{parentName:"p"},"/etc/inittab")," file."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ini",metastring:"title=/etc/inittab",title:"/etc/inittab"},"# id:runlevels:action:process is the syntax\n...\nid:x:initdefault # Default runlevel is x, x should not be 0 or 6\n...\n")),(0,a.kt)("p",null,"During boot, the program ",(0,a.kt)("inlineCode",{parentName:"p"},"/sbin/init")," will look into this ",(0,a.kt)("inlineCode",{parentName:"p"},"/etc/inittab")," and get the default runlevel. If for example, the default runlevel is 3, it will execute the scripts stored at ",(0,a.kt)("inlineCode",{parentName:"p"},"/etc/init.d/rc3.d/"),"."),(0,a.kt)("p",null,"An example of ",(0,a.kt)("inlineCode",{parentName:"p"},"/etc/init.d/rc3.d/")," contents is as follows."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-txt",metastring:"title=/etc/init.d/rc3.d/",title:"/etc/init.d/rc3.d/"},"S01network\nS02sshd\nS10cron\nK20apache2\nK30smbd\nK99halt\n")),(0,a.kt)("p",null,"Here, files starting with ",(0,a.kt)("inlineCode",{parentName:"p"},"S")," indicates that the service should be started, and ",(0,a.kt)("inlineCode",{parentName:"p"},"K")," means that the service should be killed to achieve the desired runlevel. The two digits after it represents the order the service should be started and killed. Lastly, there is the service name itself."),(0,a.kt)("p",null,"Some useful commands related to runlevels:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"runlevel")," - Shows current runlevel"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"telinit <runlevel>")," - Change system to runlevel ",(0,a.kt)("inlineCode",{parentName:"li"},"<runlevel>")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"telinit q")," - Reload configuration. Run this if ",(0,a.kt)("inlineCode",{parentName:"li"},"/etc/inittab")," is modified.")),(0,a.kt)("h2",{id:"extra-notes"},"Extra Notes"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The exact definition of service and daemons are rather foggy. It is safe to assume that it refers to the background process closely related to the operating system and managed by service managers."),(0,a.kt)("li",{parentName:"ul"},"There are also other service managers such as ",(0,a.kt)("inlineCode",{parentName:"li"},"Upstart")," that we didn't discuss, as modern Linux systems mostly use ",(0,a.kt)("inlineCode",{parentName:"li"},"systemd")," and legacy systems ",(0,a.kt)("inlineCode",{parentName:"li"},"SysV"))),(0,a.kt)("p",null,"Last Updated: July 28, 2023"))}p.isMDXComponent=!0}}]);