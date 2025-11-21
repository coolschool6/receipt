// view-receipt.js

document.addEventListener('DOMContentLoaded', function () {
    function getQueryParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    const receiptId = getQueryParam('id');
    const receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
    const receipt = receipts.find(r => r.receiptId === receiptId);

    const notFound = document.getElementById('receiptNotFound');
    const details = document.getElementById('receiptDetails');
    if (!receipt) {
        notFound.style.display = 'block';
        details.style.display = 'none';
        document.getElementById('receiptViewTitle').textContent = 'Receipt Not Found';
        return;
    }

    document.getElementById('receiptViewTitle').textContent = `Receipt Details - ${receipt.receiptId}`;
    document.getElementById('viewBusinessName').textContent = receipt.businessName;
    document.getElementById('viewBusinessContact').textContent = receipt.businessContact;
    document.getElementById('viewCustomerName').textContent = receipt.customerName;
    document.getElementById('viewCustomerPhone').textContent = receipt.customerPhone;
    document.getElementById('viewReceiptId').textContent = receipt.receiptId;
    document.getElementById('viewTransactionDate').textContent = receipt.transactionDate;
    document.getElementById('viewAmount').textContent = receipt.amount;
    document.getElementById('viewPaymentMethod').textContent = receipt.paymentMethod;
    document.getElementById('viewDescription').textContent = receipt.description;
    document.getElementById('viewConfirmationImage').src = receipt.confirmationImage;

    // Print button
    const printBtn = document.getElementById('printReceiptButton');
    if (printBtn) {
        printBtn.onclick = function() {
            window.print();
        };
    }

    // WhatsApp send button
    const waBtn = document.getElementById('whatsappSendButton');
    if (waBtn) {
        // Prepare the basic message text
        const waMessage = encodeURIComponent(
            `Hello ${receipt.customerName},\n\n` +
            `Thank you for your payment! Here is your receipt from ${receipt.businessName}.\n\n` +
            `Receipt ID: ${receipt.receiptId}\n` +
            `Amount: $${receipt.amount}\n` +
            `Date: ${receipt.transactionDate}\n\n` +
            `Please see the attached file/image for the official receipt.`
        );
        // WhatsApp link structure (customerPhone includes country code)
        const waLink = `https://web.whatsapp.com/send?phone=${receipt.customerPhone}&text=${waMessage}`;
        waBtn.onclick = function() {
            window.open(waLink, '_blank');
        };
    }
});
