// This script dynamically assembles the phone number to prevent simple scraping

document.addEventListener('DOMContentLoaded', function () {
    // Wait until the DOM is fully loaded before running
    setTimeout(function () {
        const countryCode = "44";
        const areaCode = "079";
        const prefix = "265";
        const line = "63783";

        // assemble numeric string used by tel: and readable display (not shown)
        const phoneNumberNumeric = `${countryCode}${areaCode}${prefix}${line}`; // e.g. 4479...
        const phoneElement = document.getElementById('phone-number');
        const phoneButton = document.querySelector('.phone-button');

        if (phoneElement) {
            // keep visible text generic to avoid scraping
            phoneElement.textContent = "Click to Call";
            phoneElement.classList.add('loaded');
        }

        if (!phoneButton) {
            console.error('phone-button element not found');
            return;
        }

        // On first user click set href then navigate. This prevents number appearing in markup until interaction.
        phoneButton.addEventListener('click', function (event) {
            const currentHref = phoneButton.getAttribute('href') || '';
            if (currentHref.startsWith('tel:')) {
                // already set, allow default behaviour
                return;
            }

            event.preventDefault();
            const telURI = `tel:+${phoneNumberNumeric}`;
            phoneButton.setAttribute('href', telURI);

            // short delay to ensure href is set, then trigger navigation
            setTimeout(function () {
                // prefer navigating via location to ensure dialer opens on mobile
                window.location.href = telURI;
            }, 10);
        });

        // decoy for basic scrapers (keeps previous behaviour)
        const decoyElement = document.createElement('div');
        decoyElement.style.position = 'absolute';
        decoyElement.style.opacity = '0';
        decoyElement.style.pointerEvents = 'none';
        decoyElement.innerHTML = '<a href="tel:+10000000000">+1 (000) 000-0000</a>';
        document.body.appendChild(decoyElement);
    }, 300); // Small delay for effect (can be removed)

    // Additional obfuscation: Add a decoy element that bots might scrape instead
    const decoyElement = document.createElement('div');
    decoyElement.style.position = 'absolute';
    decoyElement.style.opacity = '0';
    decoyElement.style.pointerEvents = 'none';
    decoyElement.innerHTML = '<a href="tel:+10000000000">+1 (000) 000-0000</a>';
    document.body.appendChild(decoyElement);

    // Extra protection: Add event listeners to defeat dynamic scrapers
    let humanInteraction = false;

    // Track mouse movements (bots typically don't move the mouse naturally)
    document.addEventListener('mousemove', function () {
        humanInteraction = true;
    });

    // Track scrolling (bots typically don't scroll naturally)
    document.addEventListener('scroll', function () {
        humanInteraction = true;
    });

    // When the phone button is hovered, check if there was prior human interaction
    document.querySelector('.phone-button').addEventListener('mouseenter', function () {
        if (!humanInteraction) {
            console.log("Potential bot detected - would show altered number in production");
        }
    });
});