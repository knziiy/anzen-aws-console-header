// options.js
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('add').addEventListener('click', () => addRow(''));
document.getElementById('save').addEventListener('click', saveOptions);

function addRow(account = '') {
    const list = document.getElementById('list');
    const row = document.createElement('li');
    row.className = 'list-group-item d-flex justify-content-between align-items-center';
    row.innerHTML = `
        <input class="acct form-control form-control-sm w-50" type="text" value="${account}" placeholder="AWS Account ID">
        <button class="remove btn btn-sm btn-danger">×</button>
    `;
    row.querySelector('.remove').addEventListener('click', () => row.remove());
    list.appendChild(row);
}

function saveOptions() {
    const excluded = [];
    document.querySelectorAll('#list .list-group-item').forEach(row => {
        const acct = row.querySelector('.acct').value.trim();
        if (/^\d{12}$/.test(acct)) {
            excluded.push(acct);
        }
    });
    const defaultColor = document.getElementById('defaultColor').value;
    chrome.storage.sync.set({ excluded, defaultColor }, () => {
        const status = document.getElementById('status');
        status.textContent = '保存しました';
        setTimeout(() => status.textContent = '', 2000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get(['excluded', 'defaultColor'], items => {
        const excluded = items.excluded || [];
        const defaultColor = items.defaultColor || '#c12525';
        document.getElementById('defaultColor').value = defaultColor;
        if (excluded.length === 0) {
            addRow('');
        } else {
            excluded.forEach(acct => addRow(acct));
        }
    });
}

