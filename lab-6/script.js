document.addEventListener('DOMContentLoaded', function() {
    const colorBox = document.getElementById('colorBox');
    const colorInput = document.getElementById('colorInput');
    const checkButton = document.getElementById('checkButton');
    const feedback = document.getElementById('feedback');

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Display a random color when the page loads
    let currentColor = getRandomColor();
    colorBox.style.backgroundColor = currentColor;

    // Check the user's input when they click the button
    checkButton.addEventListener('click', function() {
        const userGuess = colorInput.value.trim().toUpperCase();
        if (userGuess === currentColor.toUpperCase()) {
            feedback.textContent = 'Correct! Great job!';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = `Incorrect! The correct color was: ${currentColor}`;
            feedback.style.color = 'red';
        }

        // Generate a new color and update the box
        currentColor = getRandomColor();
        colorBox.style.backgroundColor = currentColor;
        colorInput.value = ''; // Clear the input field
    });

    // Display last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
});
