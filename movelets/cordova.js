var oHead = document.getElementsByTagName('HEAD').item(0);
var oScript = document.createElement("script");
oScript.type = "text/javascript";
oScript.src = "../plugins/Movilizer.js";
console.log("Adding movilizer mockup API");
oHead.appendChild(oScript);
