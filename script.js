// script.js for Receipt Creation Page

document.addEventListener('DOMContentLoaded', function () {
    // Clear receipts button functionality
    const clearBtn = document.getElementById('clearReceiptsButton');
    if (clearBtn) {
        clearBtn.onclick = function() {
            if (confirm('Are you sure you want to delete all receipts? This cannot be undone.')) {
                localStorage.removeItem('receipts');
                alert('All receipts deleted. The page will now reload.');
                window.location.reload();
            }
        };
    }
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('transactionDate');
    if (dateInput) {
        dateInput.value = today;
    }

    // Image preview
    const confirmationImage = document.getElementById('confirmationImage');
    const imagePreview = document.getElementById('imagePreview');

