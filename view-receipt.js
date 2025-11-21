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
        // Show modal or message with image and instructions
        let modal = document.getElementById('waImageModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'waImageModal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.7)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
            modal.innerHTML = `<div style="background:#fff;padding:1.5rem 1.2rem;border-radius:10px;max-width:90vw;text-align:center;position:relative;">
                <button id="waCloseModal" style="position:absolute;top:0.5rem;right:0.7rem;font-size:1.5rem;background:none;border:none;cursor:pointer;">&times;</button>
                <strong>To send via WhatsApp:</strong><br>Long-press or right-click the image below to save it, then send it directly in your WhatsApp chat with the customer.<br><br>
                <img src="${receipt.confirmationImage}" alt="Receipt Confirmation" style="max-width:220px;display:block;margin:0.7rem auto 0.2rem auto;border-radius:8px;">
            </div>`;
            document.body.appendChild(modal);
            document.getElementById('waCloseModal').onclick = function() {
                modal.remove();
            };
        }
    };
});
