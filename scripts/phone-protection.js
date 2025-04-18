// This script dynamically assembles the phone number to prevent simple scraping

document.addEventListener('DOMContentLoaded', function() {
    // Wait until the DOM is fully loaded before running
    
    // Set a small delay to simulate assembly (optional)
    setTimeout(function() {
        // Break up the phone number into parts to avoid pattern recognition
        const countryCode = "44"; // Example: UK country code
        const areaCode = "079"; // Example: UK mobile area code
        
        // Further splitting the local part of the number
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
                phoneButton.addEventListener('click', function() {
                    // Create the tel URI from the assembled parts rather than string
                    const telURI = `tel:+${countryCode}${areaCode}${prefix}${line}`;
                    window.location.href = telURI;
                });
            }
        }
    }, 300); // Small delay for effect (can be removed)
    
    // Additional obfuscation: Add a decoy element that bots might scrape instead
    // This creates an invisible element with a fake number that might trap bots
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