"use strict";

(function() {

    var onLoad = function() {
        assignEventHandlers();
    };

    var assignEventHandlers = function() {
        var btnMount = document.querySelector("#btnMount");
        btnMount.addEventListener("click", function(e) {
            onClickedBtnMount();
        });
    };

    var onClickedBtnMount = function() {
        var btnMount = document.querySelector("#btnMount");
        event.preventDefault();
        btnMount.setAttribute("disabled", "true");
        $.toast({text: chrome.i18n.getMessage("mountAttempt"), loader: false});
        var request = {
            type: "mount"
        };
        chrome.runtime.sendMessage(request, function(response) {
            if (response && response.success) {
                $.toast({text: chrome.i18n.getMessage("mountSuccess"), loader: false});
                window.setTimeout(function() {
                    window.close();
                }, 1000);
            } else {
                $.toast({text: chrome.i18n.getMessage("mountFail"), loader: false});
                btnMount.removeAttribute("disabled");
            }
        });
    };

    var setMessageResources = function() {
        var selector = "data-message";
        var elements = document.querySelectorAll("[" + selector + "]");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            var messageID = element.getAttribute(selector);
            var messageText = chrome.i18n.getMessage(messageID);

            var textNode = null;
            switch(element.tagName.toLowerCase()) {
            case "button":
                textNode = document.createTextNode(messageText);
                element.appendChild(textNode);
                break;
            case "h1":
            case "title":
            case "div":
                textNode = document.createTextNode(messageText);
                element.appendChild(textNode);
                break;
            }
        }
    };

    window.addEventListener("load", function(e) {
        onLoad();
    });

    setMessageResources();

})();
