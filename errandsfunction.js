document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the copy operation
    function copyFormContent(copyButton) {
        const formContainer = copyButton.closest('.form-container');
        const inputPairs = formContainer.querySelectorAll('.input-pair');
        const contentToCopy = Array.from(inputPairs)
            .map(pair => {
                const label = pair.querySelector('.input-label')?.textContent.trim();
                const input = pair.querySelector('.input-field')?.value.trim();
                return label && input ? `${label}: ${input}` : null;
            })
            .filter(Boolean);

        // If no content to copy, show a warning and return
        if (contentToCopy.length === 0) {
            return showTemporarySvg(copyButton, '⚠️ Please fill at least 1 field', 1000);
        }

        // Copy the formatted content to the clipboard
        navigator.clipboard.writeText(contentToCopy.join('\n'))
            .then(() => showTemporarySvg(copyButton, '✔️ Copied!', 1000))
            .catch(() => showTemporarySvg(copyButton, '⚠️ Please fill at least 1 field', 1000));
    }

    // Function to add a temporary SVG to the button
    function showTemporarySvg(button, svg, duration) {
        const originalContent = button.textContent;
        button.textContent = svg;

        setTimeout(() => {
            button.textContent = originalContent;
        }, duration);
    }

    // Attach event listeners to all Copy buttons
    document.querySelectorAll('.Copy-button').forEach(button =>
        button.addEventListener('click', () => copyFormContent(button))
    );

    // Clear buttons functionality
    document.querySelectorAll('.Clear-button').forEach(button =>
        button.addEventListener('click', function () {
            const formArea = this.closest('.form-container');
            const inputFields = formArea.querySelectorAll('.input-field');
            const notesArea = formArea.querySelector('#notes');

            // Clear all input fields and notes textarea
            inputFields.forEach(input => input.value = "");
            if (notesArea) notesArea.value = "";

            // Replace button text with bin icon and disable temporarily
            const originalText = this.textContent;
            this.innerHTML = "&#x1F5D1;";
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        })
    );
});
