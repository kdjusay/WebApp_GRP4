// Shared functionality for removing a specific <li>
function handleRemoveLi() {
    // Check if an item ID is stored in localStorage
    const itemId = localStorage.getItem('removeLiId');
    if (itemId) {
        // Find the <li> with the specified ID and remove it
        const li = document.getElementById(itemId);
        if (li) {
            li.remove();
        }
        // Clear the stored ID to prevent repeated actions
        localStorage.removeItem('removeLiId');
    }
}

// Handle button clicks in courses.html
function setupCoursesPage() {
    // Add event listeners to buttons
    const buttons = document.querySelectorAll('[data-remove-id]');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Get the ID to remove from the button's data attribute
            const itemId = button.getAttribute('data-remove-id');
            
            // Store the ID in localStorage
            localStorage.setItem('removeLiId', itemId);
            
            // Redirect to dashboard.html
            window.location.href = "courses.html";
        });
    });
}

// Initialization function to detect the current page
function initializeScript() {
    if (document.body.contains(document.querySelector('[data-remove-id]'))) {
        // We're on courses.html
        setupCoursesPage();
    }

    if (document.body.contains(document.getElementById('subjectList'))) {
        // We're on dashboard.html
        handleRemoveLi();
    }
}

// Run the initialization function when the script loads
initializeScript();
