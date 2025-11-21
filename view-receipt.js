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
    document.getElementById('viewCustomerName').textContent = receipt.customerName;
    document.getElementById('viewCustomerPhone').textContent = receipt.customerPhone;
    document.getElementById('viewReceiptId').textContent = receipt.receiptId;
    document.getElementById('viewTransactionDate').textContent = receipt.transactionDate;
    document.getElementById('viewAmount').textContent = receipt.amount;
    document.getElementById('viewPaymentMethod').textContent = receipt.paymentMethod;
    document.getElementById('viewDescription').textContent = receipt.description;
    document.getElementById('viewConfirmationImage').src = receipt.confirmationImage;

    // WhatsApp send button
    const waBtn = document.getElementById('whatsappSendButton');
    waBtn.onclick = function() {
        // WhatsApp web link with receipt link
        const phone = encodeURIComponent(receipt.customerPhone.replace(/[^\d+]/g, ''));
        const receiptLink = `${window.location.origin}/view-receipt.html?id=${encodeURIComponent(receipt.receiptId)}`;
        const msg = encodeURIComponent(`Hello ${receipt.customerName}, here is your receipt for ${receipt.amount} (${receipt.description || 'Payment'}).\nView your confirmation receipt: ${receiptLink}`);
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    };
});
