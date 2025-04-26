(function() {
    // extract account ID from meta tag
    const meta = document.querySelector('meta[name="awsc-session-data"]');
    if (!meta) return;
    let acct;
    try {
        acct = JSON.parse(meta.content).accountId;
    } catch {
        return;
    }

    chrome.storage.sync.get(['excluded', 'defaultColor'], items => {
        const excluded = items.excluded || [];
        const color = (!excluded.includes(acct)) ? (items.defaultColor || '#c12525') : null;
        if (color) {
            let style = document.getElementById('aws-color-header-style');
            if (!style) {
                style = document.createElement('style');
                style.id = 'aws-color-header-style';
                document.head.appendChild(style);
            }
            style.textContent = `
                [class*="globalNav-"] {
                    background: ${color} !important;
                    background-image: none !important;
                }
            `;
        }
    });
})();