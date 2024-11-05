(function(){var e={1475:function(e,t,n){"use strict";var o=n(5130),a=n(6768);const r={id:"app"};function i(e,t,n,o,i,s){const l=(0,a.g2)("nav-bar"),c=(0,a.g2)("router-view"),u=(0,a.g2)("footer-section");return(0,a.uX)(),(0,a.CE)("div",r,[(0,a.bF)(l),(0,a.bF)(c),(0,a.bF)(u)])}n(4114);var s=n(1387),l={__name:"NavBar",setup(e){const t=(0,s.rd)(),n=e=>{t.push({name:e})};return(e,t)=>{const o=(0,a.g2)("b-navbar-brand"),r=(0,a.g2)("b-navbar");return(0,a.uX)(),(0,a.Wv)(r,{class:"mb-3",toggleable:"lg",light:"",style:{"background-color":"#FF8C00"}},{default:(0,a.k6)((()=>[(0,a.bF)(o,{class:"mx-auto",onClick:t[0]||(t[0]=e=>n("homePage"))},{default:(0,a.k6)((()=>t[1]||(t[1]=[(0,a.Lk)("h1",{class:"title"},"Raymond Portfolio",-1)]))),_:1})])),_:1})}}};const c=l;var u=c,p=n(4232),g=n(144);const d={class:"bg-dark text-white p-3"},m={class:"container"};var h={__name:"FooterSection",setup(e){const t=(new Date).getFullYear();return(e,n)=>((0,a.uX)(),(0,a.CE)("footer",d,[(0,a.Lk)("div",m,[(0,a.Lk)("p",null,"© "+(0,p.v_)((0,g.R1)(t))+" Raymond. All rights reserved.",1),n[0]||(n[0]=(0,a.Lk)("p",null,[(0,a.eW)("Website created and developed by "),(0,a.Lk)("strong",null,"Raymond")],-1)),n[1]||(n[1]=(0,a.Lk)("small",null,"Built with Vue.js and Bootstrap for a responsive, static web experience.",-1))])]))}},f=n(1241);const v=(0,f.A)(h,[["__scopeId","data-v-25129516"]]);var b=v,y={name:"App",components:{NavBar:u,FooterSection:b}};const k=(0,f.A)(y,[["render",i]]);var w=k;n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(4520),n(670);const j={class:"d-flex justify-content-between align-items-center"},L={class:"d-inline"},P=["innerHTML"],_={class:"d-flex flex-wrap",style:{width:"60%","text-align":"justify"}},x={class:"d-flex justify-content-end"};var C={__name:"ProjectPreview",props:["project"],setup(e){const t=e,o=(0,a.EW)((()=>t.project.title)),r=(0,a.EW)((()=>t.project.content)),i=()=>r.value.length>100?r.value.slice(0,100)+"...":r.value,l=(0,a.EW)((()=>t.project.technology)),c=(0,s.rd)(),u=()=>{c.push({name:"projectDetail",params:{projectId:t.project.id}})};return(r,s)=>{const c=(0,a.g2)("b-link"),g=(0,a.g2)("b-card-text"),d=(0,a.g2)("b-button"),m=(0,a.g2)("b-card");return(0,a.uX)(),(0,a.Wv)(m,{"img-src":n(290)(`./${e.project.imgSrc[0]}`),"img-alt":"Card image","img-left":"",class:"mb-3 leftCard shadow"},{default:(0,a.k6)((()=>[(0,a.bF)(g,null,{default:(0,a.k6)((()=>[(0,a.Lk)("div",j,[(0,a.Lk)("h3",L,(0,p.v_)(o.value),1),(0,a.bF)(c,{href:t.project.githubUrl,target:"_blank",rel:"noopener noreferrer",class:"tech-text"},{default:(0,a.k6)((()=>s[0]||(s[0]=[(0,a.eW)("Github")]))),_:1},8,["href"])]),(0,a.Lk)("p",{innerHTML:i()},null,8,P),s[1]||(s[1]=(0,a.Lk)("h3",null,"Technology:",-1)),(0,a.Lk)("div",_,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l.value,(e=>((0,a.uX)(),(0,a.CE)("p",{key:e,class:"d-inline tech-text mb-1"},(0,p.v_)(e)+"  ",1)))),128))])])),_:1}),(0,a.Lk)("div",x,[(0,a.bF)(d,{variant:"outline-secondary",onClick:u,style:{position:"absolute",bottom:"1rem",right:"1rem"}},{default:(0,a.k6)((()=>s[2]||(s[2]=[(0,a.eW)("READ MORE")]))),_:1})])])),_:1},8,["img-src"])}}};const I=(0,f.A)(C,[["__scopeId","data-v-22303992"]]);var A=I,E=n(782);const F={class:"container-fluid"},M={class:"row"},S={class:"col-md-8 bg-light p-4"},R={class:"col-md-4 bg-about-me p-4"},T={class:"d-flex justify-content-end"};var W={__name:"HomePage",setup(e){const t=(0,s.rd)(),n=(0,E.Pj)(),o=n.getters.allProjects,r=new Set(o.flatMap((e=>e.technology))),i=o.filter((e=>"sideProject"===e.category)),l=o.filter((e=>"courseProject"===e.category)),c=e=>{t.push({name:e})};return(e,t)=>{const n=(0,a.g2)("b-card-text"),o=(0,a.g2)("b-button"),s=(0,a.g2)("b-card");return(0,a.uX)(),(0,a.CE)(a.FK,null,[t[7]||(t[7]=(0,a.Lk)("div",{className:"home-page"},[(0,a.Lk)("h5",null,"Welcome to my portfolio! This site showcases a collection of my programming projects.")],-1)),(0,a.Lk)("div",F,[(0,a.Lk)("div",M,[(0,a.Lk)("div",S,[t[1]||(t[1]=(0,a.Lk)("h3",null,"Side Projects:",-1)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,g.R1)(i),(e=>((0,a.uX)(),(0,a.Wv)(A,{key:e.id,project:e},null,8,["project"])))),128)),t[2]||(t[2]=(0,a.Lk)("hr",null,null,-1)),t[3]||(t[3]=(0,a.Lk)("h3",null,"Course Projects:",-1)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,g.R1)(l),(e=>((0,a.uX)(),(0,a.Wv)(A,{key:e.id,project:e},null,8,["project"])))),128)),t[4]||(t[4]=(0,a.Lk)("hr",null,null,-1))]),(0,a.Lk)("div",R,[(0,a.bF)(s,{title:"About Me","img-src":"https://picsum.photos/600/300/?image=25","img-alt":"Image","img-top":"",tag:"article",class:"mb-3 rightCard shadow"},{default:(0,a.k6)((()=>[(0,a.bF)(n,null,{default:(0,a.k6)((()=>t[5]||(t[5]=[(0,a.eW)(" Currently, enrolled in a two-year program in Computer and Information Systems. ")]))),_:1}),(0,a.Lk)("div",T,[(0,a.bF)(o,{variant:"outline-secondary",size:"sm",onClick:t[0]||(t[0]=e=>c("aboutMe")),style:{position:"absolute",bottom:"0.5rem",right:"1rem"}},{default:(0,a.k6)((()=>t[6]||(t[6]=[(0,a.eW)("READ MORE")]))),_:1})])])),_:1}),(0,a.bF)(s,{title:"Skills",class:"mb-3 shadow"},{default:(0,a.k6)((()=>[(0,a.bF)(n,null,{default:(0,a.k6)((()=>[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,g.R1)(r),(e=>((0,a.uX)(),(0,a.CE)("span",{key:e,class:"badge bg-skills text-dark rounded-pill me-2 fs-6 mb-2"},(0,p.v_)(e),1)))),128))])),_:1})])),_:1})])])])],64)}}};const X=(0,f.A)(W,[["__scopeId","data-v-6f0f550b"]]);var O=X;const D=["onClick"],H=["src"];var N={__name:"ProjectsInfo",setup(e){const t=(0,s.rd)(),o=(0,E.Pj)(),r=(e,n)=>{t.push({name:e,params:{projectId:n}})},i=o.getters.allProjects;return(e,t)=>((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,g.R1)(i),(e=>((0,a.uX)(),(0,a.CE)("div",{key:e.id,onClick:t=>r("projectDetail",e.id)},[(0,a.Lk)("b",null,(0,p.v_)(e.title),1),t[0]||(t[0]=(0,a.Lk)("br",null,null,-1)),(0,a.Lk)("img",{src:n(290)(`./${e.imgSrc[0]}`),alt:"project image"},null,8,H),(0,a.eW)(": "+(0,p.v_)(e.content),1)],8,D)))),128))}};const B=N;var Q=B;const K={className:"about-me"},U=["innerHTML"];var q={__name:"AboutMe",setup(e){const t=[{title:"Introduction",content:"Hello! I'm <strong>Raymond</strong>, a passionate developer who enjoys creating engaging and functional\n                software\n                solutions across various platforms. Currently, I am a student at <strong>Douglas College</strong>,\n                enrolled in a\n                two-year Post-Baccalaureate Degree program in <strong>Computer and Information Systems</strong>, with an\n                expected\n                graduation date of <i>May 2026</i>. This program has not only deepened my technical knowledge but also\n                strengthened my <strong>problem-solving skills</strong> and <strong>critical thinking</strong>\n                abilities."},{title:"Learning and Growth",content:"I take pride in my ability to learn quickly in fast-paced environments, which has allowed me to\n                achieve outstanding academic results. My commitment to continuous improvement drives me to explore\n                subjects I’m passionate about, often leading to personal side projects that enhance my skills in\n                diverse areas of software development. I also admire the opportunity to read others' code, especially\n                when they provide simpler solutions to complex problems. This practice broadens my understanding and\n                inspires me to refine my own coding techniques."},{title:"Programming Approach",content:"As a <strong>detail-oriented programmer</strong>, I often produce fewer bugs than my peers, which I\n                attribute to my\n                meticulous approach to coding. I believe that paying close attention to the finer points of programming\n                can lead to cleaner, more efficient code. Additionally, I am <strong>methodical</strong> in my\n                problem-solving approach.\n                When I encounter a bug, I can quickly locate its root cause and implement an effective fix, allowing me\n                to learn and grow from each challenge."},{title:"Future Aspirations",content:"I am excited about the opportunity to apply my skills in a <strong>Co-op Software Development\n                    Engineer</strong> position,\n                where I can contribute to real-world projects while gaining valuable industry experience.\n                I look forward to collaborating with others and continuing my journey in the tech field."}];return console.log(t),(e,n)=>{const o=(0,a.g2)("b-card-text"),r=(0,a.g2)("b-card");return(0,a.uX)(),(0,a.CE)("div",null,[(0,a.Lk)("div",K,[n[0]||(n[0]=(0,a.Lk)("h1",null,"About Me",-1)),((0,a.uX)(),(0,a.CE)(a.FK,null,(0,a.pI)(t,(e=>(0,a.bF)(r,{key:e.title,title:e.title,class:"mb-3 shadow"},{default:(0,a.k6)((()=>[(0,a.bF)(o,{class:"p-3"},{default:(0,a.k6)((()=>[(0,a.Lk)("p",{innerHTML:e.content},null,8,U)])),_:2},1024)])),_:2},1032,["title"]))),64))])])}}};const G=(0,f.A)(q,[["__scopeId","data-v-0d46c114"]]);var z=G;const J={key:0},$={id:"carouselExample",class:"carousel slide"},V={class:"carousel-inner"},Y=["src"],Z={class:"carousel-caption d-none d-md-block text-white"},ee=["innerHTML"],te={class:"projectDescription"},ne=["innerHTML"],oe={class:"d-flex justify-content-end"},ae={key:1};var re={__name:"ProjectDetail",props:["projectId"],setup(e){const t=e,o=(0,E.Pj)(),r=(0,a.EW)((()=>o.getters.allProjects)),i=(0,a.EW)((()=>o.getters.getProjectById(Number(t.projectId)))),s=(0,g.KR)(0),l=()=>i.value&&i.value.content?i.value.content.split("\n"):[],c=e=>{let t=Number(e),n=(t+1)%r.value.length;he.push({name:"projectDetail",params:{projectId:n}})},u=e=>{let t=Number(e),n=(t-1+r.value.length)%r.value.length;he.push({name:"projectDetail",params:{projectId:n}})};(0,a.wB)(i,(e=>{e&&(s.value=0)}));const d=()=>{s.value>0&&s.value--},m=()=>{s.value<i.value.imgSrc.length-1&&s.value++};return(e,t)=>{const o=(0,a.g2)("b-button");return i.value?((0,a.uX)(),(0,a.CE)("div",J,[(0,a.Lk)("div",$,[(0,a.Lk)("div",V,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(i.value.imgSrc,((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:(0,p.C4)(["carousel-item",{active:t===s.value}])},[(0,a.Lk)("img",{src:n(290)(`./${e}`),class:"d-block",alt:"image"},null,8,Y),(0,a.Lk)("div",Z,[(0,a.Lk)("p",{innerHTML:i.value.imgCaption[t],class:"bg-caption d-inline"},null,8,ee)])],2)))),128))]),(0,a.Lk)("button",{class:"carousel-control-prev",type:"button","data-bs-target":"#carouselExample","data-bs-slide":"prev",onClick:d},t[2]||(t[2]=[(0,a.Lk)("span",{class:"carousel-control-prev-icon","aria-hidden":"true"},null,-1),(0,a.Lk)("span",{class:"visually-hidden"},"Previous",-1)])),(0,a.Lk)("button",{class:"carousel-control-next",type:"button","data-bs-target":"#carouselExample","data-bs-slide":"next",onClick:m},t[3]||(t[3]=[(0,a.Lk)("span",{class:"carousel-control-next-icon","aria-hidden":"true"},null,-1),(0,a.Lk)("span",{class:"visually-hidden"},"Next",-1)]))]),t[8]||(t[8]=(0,a.Lk)("br",null,null,-1)),(0,a.Lk)("div",te,[(0,a.Lk)("h3",null,(0,p.v_)(i.value.title),1),t[6]||(t[6]=(0,a.Lk)("br",null,null,-1)),t[7]||(t[7]=(0,a.Lk)("h4",null,"Description: ",-1)),((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(l(),((e,t)=>((0,a.uX)(),(0,a.CE)("p",{key:t,innerHTML:e},null,8,ne)))),128)),(0,a.Lk)("div",oe,[(0,a.bF)(o,{variant:"light",size:"lg",class:"m-2",onClick:t[0]||(t[0]=e=>u(i.value.id))},{default:(0,a.k6)((()=>t[4]||(t[4]=[(0,a.eW)("PREV")]))),_:1}),(0,a.bF)(o,{variant:"dark",size:"lg",class:"m-2",onClick:t[1]||(t[1]=e=>c(i.value.id))},{default:(0,a.k6)((()=>t[5]||(t[5]=[(0,a.eW)("NEXT")]))),_:1})])])])):((0,a.uX)(),(0,a.CE)("div",ae,t[9]||(t[9]=[(0,a.Lk)("h1",null,"Project Not Found",-1)])))}}};const ie=(0,f.A)(re,[["__scopeId","data-v-75747f96"]]);var se=ie;const le={class:"d-flex flex-column min-vh-100"},ce={class:"container text-center flex-grow-1 mt-5"};var ue={__name:"NotFound",setup(e){return(e,t)=>{const n=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)("div",le,[(0,a.Lk)("div",ce,[t[1]||(t[1]=(0,a.Lk)("h1",{class:"display-4"},"404 - Page Not Found",-1)),t[2]||(t[2]=(0,a.Lk)("p",{class:"lead"},"The page you are looking for does not exist.",-1)),t[3]||(t[3]=(0,a.Lk)("p",null,"Check the URL or try searching for what you need.",-1)),(0,a.bF)(n,{class:"btn btn-primary",to:"/"},{default:(0,a.k6)((()=>t[0]||(t[0]=[(0,a.eW)("Go to Home")]))),_:1})])])}}};const pe=ue;var ge=pe;const de=[{path:"/",alias:"/home",name:"homePage",component:O},{path:"/projects",name:"projectsInfo",component:Q},{path:"/about",name:"aboutMe",component:z},{path:"/projects/:projectId",name:"projectDetail",component:se,props:!0},{path:"/:catchAll(.*)",name:"notFound",component:ge}],me=(0,s.aE)({history:(0,s.LA)(),routes:de});var he=me,fe=n(5015),ve=n(5883);n(2577);const be=new E.y$({state(){return{projects:[{id:0,title:"Course Planning Web Application",content:"During my course planning, I often found myself gathering information from various sources. I needed to track mandatory courses in my program, understand the prerequisites for each course, and check their availability. This process was time-consuming, and each registration period required me to revisit multiple websites to compile the necessary information. \nTo address this challenge, I envisioned a solution that consolidates all relevant course data in one place, complete with a visual course map. This feature allows students to easily see the relationships between courses, including prerequisites, and monitor their status—whether they are yet to take a course, currently enrolled, or have already passed it. \nThe goal of this web application is to streamline course planning and eliminate the hassle often associated with it. Currently, the website is still under development, but we are working diligently to complete a comprehensive version as soon as possible. \nThe application is being developed using <strong>JavaScript (React)</strong> for the frontend, <strong>Python</strong> for the backend, and <strong>MongoDB</strong> for the database. We are excited to bring this tool to students, making their academic journey smoother and more organized.",imgSrc:["courseMaster/loading.png","courseMaster/course_map.png","courseMaster/login.png"],imgCaption:["Selecting a program will load the corresponding courses.","Demo: Visual Representation of the Course Map","Login page"],technology:["JavaScript(React)","CSS(Bootstrap)","Python","MongoDB"],githubUrl:"https://github.com/doryang1019/course-tracking-system-frontend",category:"sideProject"},{id:1,title:"Household Resale Android App",content:'This project was a course assignment where we were tasked with developing a household items resale app for the Android platform, using <strong>Java</strong> as the primary programming language. As part of a team, I took on the responsibility of designing and implementing the app’s pages and core functionalities, while my teammates focused on integrating SQLite for data storage and handling CRUD operations.\nIn addition to these core features, I developed several key functionalities to enhance the user experience, including:\n<ul><li>Managing location and notification permissions</li><li>Implementing a "Nearby Me" feature to display listings based on the user\'s current location</li><li>Enabling sorting and filtering of items by various preferences</li></ul>',imgSrc:["vandealApp/welcomePage.png","vandealApp/registerPage.png","vandealApp/loginPage.png","vandealApp/permissionPrompt.png","vandealApp/homePage.png","vandealApp/buyingPage.png","vandealApp/shoppingCart.png","vandealApp/listingPage.png","vandealApp/profilePage.png"],imgCaption:["Welcome Page","Register a new account","Login with user credential","Request for notification and location permission, if not already granted","Home page of the app","Browsing items by keyword search or sorting by features","Reviewing the items in your shopping cart","Listing your items for sale","Reviewing and updating your profile information"],technology:["Java","SQLite"],githubUrl:"https://github.com/GeaByte/household-resale-android-app",category:"courseProject"},{id:2,title:"Online Order Website",content:"This project is a user-friendly online order website developed using <strong>PHP</strong> and the <strong>Laravel framework</strong>. Designed as a course project, it serves as a practical application of my skills in web development, focusing on building a functional and engaging user experience.",imgSrc:["sandwichQueen/home.png","sandwichQueen/menu.png","sandwichQueen/register.png","sandwichQueen/login.png"],imgCaption:["Home page","Menu - browse all products","Register Page","Login Page"],technology:["PHP(Laravel)","MySQL"],githubUrl:"https://github.com/GeaByte/Sandwich_Queen_Online_Order_System",category:"courseProject"}]}},getters:{allProjects(e){return e.projects},getProjectById(e){return t=>e.projects.find((e=>e.id===t))}}});var ye=be;(0,o.Ef)(w).use(he).use(ye).use(fe.SK).use(ve.Ay).mount("#app")},290:function(e,t,n){var o={"./courseMaster/course_map.png":6526,"./courseMaster/loading.png":6416,"./courseMaster/login.png":6063,"./sandwichQueen/home.png":135,"./sandwichQueen/login.png":3639,"./sandwichQueen/menu.png":395,"./sandwichQueen/register.png":997,"./test.jpeg":2189,"./vandealApp/buyingPage.png":1194,"./vandealApp/homePage.png":1647,"./vandealApp/listingPage.png":6466,"./vandealApp/loginPage.png":9449,"./vandealApp/permissionPrompt.png":6476,"./vandealApp/profilePage.png":209,"./vandealApp/registerPage.png":9149,"./vandealApp/shoppingCart.png":1405,"./vandealApp/welcomePage.png":8534};function a(e){var t=r(e);return n(t)}function r(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}a.keys=function(){return Object.keys(o)},a.resolve=r,e.exports=a,a.id=290},6526:function(e,t,n){"use strict";e.exports=n.p+"img/course_map.d6e20200.png"},6416:function(e,t,n){"use strict";e.exports=n.p+"img/loading.10f44cfc.png"},6063:function(e,t,n){"use strict";e.exports=n.p+"img/login.c7b5f7c7.png"},135:function(e,t,n){"use strict";e.exports=n.p+"img/home.8f0f4e6e.png"},3639:function(e,t,n){"use strict";e.exports=n.p+"img/login.e963fc9e.png"},395:function(e,t,n){"use strict";e.exports=n.p+"img/menu.e624bc43.png"},997:function(e,t,n){"use strict";e.exports=n.p+"img/register.847a558e.png"},2189:function(e,t,n){"use strict";e.exports=n.p+"img/test.b886ec97.jpeg"},1194:function(e,t,n){"use strict";e.exports=n.p+"img/buyingPage.741cb748.png"},1647:function(e,t,n){"use strict";e.exports=n.p+"img/homePage.143b0765.png"},6466:function(e,t,n){"use strict";e.exports=n.p+"img/listingPage.5533755d.png"},9449:function(e,t,n){"use strict";e.exports=n.p+"img/loginPage.83d14368.png"},6476:function(e,t,n){"use strict";e.exports=n.p+"img/permissionPrompt.e6789ed4.png"},209:function(e,t,n){"use strict";e.exports=n.p+"img/profilePage.316ac172.png"},9149:function(e,t,n){"use strict";e.exports=n.p+"img/registerPage.88df32e0.png"},1405:function(e,t,n){"use strict";e.exports=n.p+"img/shoppingCart.504e1b3b.png"},8534:function(e,t,n){"use strict";e.exports=n.p+"img/welcomePage.fcb91fc3.png"}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,r){if(!o){var i=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],r=e[u][2];for(var s=!0,l=0;l<o.length;l++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(s=!1,r<i&&(i=r));if(s){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[o,a,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,i=o[0],s=o[1],l=o[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(l)var u=l(n)}for(t&&t(o);c<i.length;c++)r=i[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(u)},o=self["webpackChunkportfolio"]=self["webpackChunkportfolio"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(1475)}));o=n.O(o)})();
//# sourceMappingURL=app.9bf4c3df.js.map