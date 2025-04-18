// This script dynamically assembles the phone number to prevent simple scraping

document.addEventListener('DOMContentLoaded', function() {
    // Wait until the DOM is fully loaded before running
    
    // Set a small delay to simulate assembly (optional)
    setTimeout(function() {
        const countryCode = "44";
        const areaCode = "079";
        const prefix = "265";
        const line = "63783";
        
        // Dynamically assemble the phone number from these parts
        const phoneNumber = `+${countryCode} (${areaCode}) ${prefix}-${line}`;
        
        // Get the element and update its content
        const phoneElement = document.getElementById('phone-number');
        if (phoneElement) {
            phoneElement.textContent = phoneNumber;
            phoneElement.classList.add('loaded');
            
            // Make the phone number clickable with tel: protocol
            const phoneButton = document.querySelector('.phone-button');
            if (phoneButton) {
                const telURI = `tel:+${countryCode}${areaCode}${prefix}${line}`;
                phoneButton.setAttribute('href', telURI);
                console.log(`Phone button href set to: ${telURI}`); // Debugging log
                console.log(`tel:+${countryCode}${areaCode}${prefix}${line}`);
            } else {
                console.error("Phone button not found in the DOM.");
            }
        } else {
            console.error("Phone number element not found in the DOM.");
        }
    }, 300); // Small delay for effect (can be removed)
    
    // Additional obfuscation: Add a decoy element that bots might scrape instead
    const decoyElement = document.createElement('div');
    decoyElement.style.position = 'absolute';
    decoyElement.style.opacity = '0';
    decoyElement.style.pointerEvents = 'none';
    decoyElement.innerHTML = '<a href="tel:+10000000000">+1 (000) 000-0000</a>';
    document.body.appendChild(decoyElement);

    // Extra protection: Add event listeners to defeat dynamic scrapers
    // Attempting to detect programmatic interactions vs human interactions
    let humanInteraction = false;
    
    // Track mouse movements (bots typically don't move the mouse naturally)
    document.addEventListener('mousemove', function() {
        humanInteraction = true;
    });
    
    // Track scrolling (bots typically don't scroll naturally)
    document.addEventListener('scroll', function() {
        humanInteraction = true;
    });
    
    // When the phone button is hovered, check if there was prior human interaction
    document.querySelector('.phone-button').addEventListener('mouseenter', function() {
        if (!humanInteraction) {
            // If no natural interaction detected, show a slightly altered number
            // This could trip up sophisticated bots
            console.log("Potential bot detected - would show altered number in production");
            // In production you might implement additional measures here
        }
    });
});