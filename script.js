// script.js for Receipt Creation Page

document.addEventListener('DOMContentLoaded', function () {
    // Set default date to today
    const dateInput = document.getElementById('transactionDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Image preview
    const confirmationImage = document.getElementById('confirmationImage');
    const imagePreview = document.getElementById('imagePreview');
    if (confirmationImage && imagePreview) {
        confirmationImage.addEventListener('change', function (e) {
            imagePreview.innerHTML = '';
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    const img = document.createElement('img');
                    img.src = evt.target.result;
                    img.alt = 'Confirmation Preview';
                    imagePreview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Form submission
    const form = document.getElementById('receiptForm');
    const messageArea = document.getElementById('messageArea');
    const submitButton = document.getElementById('submitButton');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            messageArea.textContent = '';
            messageArea.className = 'message-area';
            submitButton.disabled = true;
            submitButton.textContent = 'Generating...';

            // Gather form data
            const data = {
                businessName: 'SwiftPay Solutions',
                businessContact: 'contact@swiftpaysolutions.com',
                customerName: form.customerName.value.trim(),
                customerPhone: form.customerPhone.value.trim(),
                transactionDate: form.transactionDate.value,
                receiptId: form.receiptId.value.trim(),
                paymentMethod: form.paymentMethod.value,
                amount: form.amount.value,
                description: form.description.value.trim(),
                confirmationImage: null // Will be set below
            };

            // Validate required fields
            if (!data.customerName || !data.customerPhone || !data.transactionDate || !data.paymentMethod || !data.amount) {
                messageArea.textContent = 'Please fill in all required fields.';
                messageArea.classList.add('error');
                submitButton.disabled = false;
                submitButton.textContent = 'Generate Receipt';
                return;
            }

            // Handle image
            const file = confirmationImage.files[0];
            if (!file) {
                messageArea.textContent = 'Please upload a bank transfer confirmation image.';
                messageArea.classList.add('error');
                submitButton.disabled = false;
                submitButton.textContent = 'Generate Receipt';
                return;
            }
            const reader = new FileReader();
            reader.onload = function (evt) {
                data.confirmationImage = evt.target.result;
                // Generate receipt ID if blank
                if (!data.receiptId) {
                    data.receiptId = 'SP-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000000);
                }
                // Save to localStorage (simulate backend)
                let receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
                receipts.push(data);
                localStorage.setItem('receipts', JSON.stringify(receipts));
                // Success message
                messageArea.textContent = `Receipt generated successfully!`;
                messageArea.classList.add('success');
                // Link to view receipt
                const link = document.createElement('a');
                link.href = `/view-receipt.html?id=${encodeURIComponent(data.receiptId)}`;
                link.textContent = 'View Receipt';
                link.style.display = 'block';
                link.style.marginTop = '0.7rem';
                messageArea.appendChild(link);

                // WhatsApp image send simulation
                const whatsappArea = document.getElementById('whatsappArea');
                whatsappArea.innerHTML = '';
                const waDiv = document.createElement('div');
                waDiv.style.marginTop = '1.2rem';
                waDiv.style.textAlign = 'center';
                waDiv.innerHTML = `<strong>To send via WhatsApp:</strong><br>Long-press or right-click the image below to save it, then send it directly in your WhatsApp chat with the customer.`;
                const img = document.createElement('img');
                img.src = data.confirmationImage;
                img.alt = 'Receipt Confirmation';
                img.style.maxWidth = '180px';
                img.style.display = 'block';
                img.style.margin = '0.7rem auto 0.2rem auto';
                waDiv.appendChild(img);
                whatsappArea.appendChild(waDiv);

                form.reset();
                if (dateInput) dateInput.value = today;
                imagePreview.innerHTML = '';
                submitButton.disabled = false;
                submitButton.textContent = 'Generate Receipt';
            };
            reader.readAsDataURL(file);
        });
    }
});
