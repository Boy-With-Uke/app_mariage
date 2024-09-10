document.addEventListener('DOMContentLoaded', function() {
    console.log('js file loaded');
    const errorMessages = document.querySelectorAll('.custom-error-message');
    errorMessages.forEach(function(errorMessage) {
        errorMessage.style.color = '#ff0000';
        errorMessage.style.backgroundColor = '#ffe6e6';
        errorMessage.style.border = '1px solid #ff0000';
        errorMessage.style.padding = '5px';
        errorMessage.style.marginTop = '5px';
        errorMessage.style.borderRadius = '3px';
    });
});