(function (global) {
    var consolePane = document.createElement("div");
    consolePane.setAttribute("id", "concolePane");
    consolePane.setAttribute("style", "position: static; bottom: 0; width: 100%; min-height: 200px");

    document.addEventListener("DOMContentLoaded", function() {
        var bodyElem = document.querySelectorAll('body')[0];
        bodyElem.appendChild(consolePane);
    }, false);

    //Monkey patch console
    console.log = function (msg) {
        var newLineElem = document.createElement("div");
        consolePane.setAttribute("style", "font-size:10px; color: black; padding: 3px; margin-left: 10px; margin-top: 4px");
        newLineElem.appendChild(document.createTextNode(msg));
        consolePane.appendChild(newLineElem);
    };

    console.error = function (msg) {
        var newLineElem = document.createElement("div");
        consolePane.setAttribute("style", "font-size:10px; color: red; padding: 3px; margin-left: 10px; margin-top: 4px");
        newLineElem.appendChild(document.createTextNode(msg));
        consolePane.appendChild(newLineElem);
    };
})(this);
