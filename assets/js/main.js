document.addEventListener('DOMContentLoaded', function(){
    const userLang = navigator.language || navigator.userLanguage; // Detect browser language
    if (userLang.startsWith('en')) {
        window.location.href = "index-en.html"; // Redirect English users
    }

    const tocbox = document.querySelector('.toc-box');
    var headers = document.querySelectorAll('.subject-name');

    headers.forEach((h) => {
        let tocItem = document.createElement("li");
        tocItem.id = "toc-id-" + h.textContent;

        let itemLink = document.createElement("a");
        itemLink.classList.add("content-link");
        itemLink.textContent = h.textContent;

        tocItem.append(itemLink);

        tocItem.addEventListener('click', function(){
            h.scrollIntoView({
                behavior: 'smooth'
            });
        });

        tocbox.append(tocItem);
    });

    var contents = document.querySelectorAll('.subject, .item');

    setInterval(function(){
        var scrollPos = document.documentElement.scrollTop;
        var wh = window.innerHeight;

        Array.from(tocbox.querySelectorAll('li')).forEach(function(tocItem){
            tocItem.classList.remove('active');
        });

        var currHead;

        Array.from(headers).forEach(function(h){
            let headPos = h.getBoundingClientRect().top + window.scrollY - wh/2;

            if (scrollPos > headPos) currHead = h;
        });

        Array.from(contents).forEach(function(c){
            let contentPos = c.getBoundingClientRect().top + window.scrollY - wh;

            if (c.classList.contains("appear")) return;

            if (scrollPos < contentPos) return;

            c.classList.add('appear');
        });

        if (currHead != undefined){
            let tocLink = document.getElementById("toc-id-" + currHead.textContent);
            tocLink.classList.add('active');
        }
    }, 200);


    // scroll up to the top of the page
    // Get the button element
    const button = document.getElementById("back-to-top");

    // Timeout variable to hide the button after a certain period
    let timeout;

    // Show the button when scrolling down
    window.onscroll = function() {
        // Show the button when scrolled down more than 100px
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            button.style.display = "block"; // Show the button
            resetTimeout(); // Reset timeout every time the user scrolls
        } else {
            button.style.display = "none"; // Hide the button when at the top
        }
    };

    // Scroll to the top when the button is clicked
    button.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default action
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to the top
    });

    // Function to hide the button after a period of inactivity
    function hideButton() {
        button.style.display = "none"; // Hide the button after inactivity
    }

    // Function to reset the timeout and hide the button after 3 seconds of inactivity
    function resetTimeout() {
        clearTimeout(timeout); // Clear any existing timeout
        timeout = setTimeout(hideButton, 2000); // Set a new timeout for 2 seconds
    }

    // Initialize the timeout to hide the button after 3 seconds of inactivity
    resetTimeout();
    
    document.querySelectorAll('.content-sub-header').forEach(div => {
        if (!div.textContent.trim()) { // Removes whitespace-only divs
            div.remove();
        }
    });
});