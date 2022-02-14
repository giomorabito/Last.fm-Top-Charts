const getFormattedWelcomeMessage = () => {
    const welcomeMessage = document.querySelector("p#welcome-message");
    return welcomeMessage.innerHTML;
}

// Sample usage - do not modify
console.log(getFormattedWelcomeMessage());