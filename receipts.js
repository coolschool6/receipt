// receipts.js - List all receipts

document.addEventListener('DOMContentLoaded', function () {
    const receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
    const tbody = document.getElementById('receiptsList');
    const noMsg = document.getElementById('noReceiptsMessage');
    if (!receipts.length) {
        noMsg.style.display = 'block';
        return;
    }
    noMsg.style.display = 'none';
    receipts.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.receiptId}</td>
            <td>${r.transactionDate}</td>
            <td>${r.customerName}</td>
            <td>$${r.amount}</td>
            <td>${r.paymentMethod}</td>
            <td><a href="view-receipt.html?id=${encodeURIComponent(r.receiptId)}">View (Business)</a> | <a href="view-receipt.html?id=${encodeURIComponent(r.receiptId)}&customer=1">View (Customer)</a></td>
        `;
        tbody.appendChild(tr);
    });
});