// ==UserScript==
// @name         Schoology Automatically expand
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically expand
// @author       YigeYigeren & ChatGPT
// @match        *://*.schoology.com/course/*
// @match        *://schoology.com/course/*
// @supportURL   https://github.com/yige-yigeren/better_schoology.user.js/issues
// @homepageURL  https://github.com/yige-yigeren/better_schoology.user.js
// @downloadURL  https://github.com/yige-yigeren/better_schoology.user.js/raw/main/Schoology_Auto_expand.user.js
// @updateURL    https://github.com/yige-yigeren/better_schoology.user.js/raw/main/Schoology_Auto_expand.user.js
// @license MIT
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

        // Auto-expand and remove loading images part with delay
        function simulateClick(element) {
            element.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            }));
        }

        function removeLoadingImages() {
            var loadingImages = document.querySelectorAll('img.pending[src*="ajax-loader.gif"]');
            loadingImages.forEach(function(img) {
                img.parentElement.removeChild(img);
            });
        }

        function expandWithDelay(elements, index = 0) {
            if (index < elements.length) {
                simulateClick(elements[index]);
                removeLoadingImages();
                setTimeout(() => expandWithDelay(elements, index + 1), 200); // 200ms delay
            }
        }

        let expandAttempts = 0;
        const maxExpandAttempts = 4;
        const expandInterval = setInterval(function() {
            // Select only expanders that are not already expanded
            var expanders = document.querySelectorAll('.folder-expander:not(.expanded)');
            expandWithDelay(expanders);

            expandAttempts++;
            if (expandAttempts >= maxExpandAttempts) {
                clearInterval(expandInterval);
            }
        },1000);
})();
