document.addEventListener('DOMContentLoaded', () => {

    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    function calculateDocHash() {
        const content = document.getElementById('declaration-content').innerText;
        sha256(content).then(hash => {
            const hashElement = document.getElementById('doc-hash');
            if (hashElement) {
                hashElement.textContent = `0x${hash}`;
            }
        });
    }

    function setupTooltips() {
        const terms = document.querySelectorAll('.interactive-term');
        const tooltip = document.getElementById('tooltip');
        if (!tooltip) return;

        terms.forEach(term => {
            term.addEventListener('mouseover', (event) => {
                const definition = term.dataset.definition;
                if (definition) {
                    tooltip.textContent = definition;
                    tooltip.style.visibility = 'visible';
                    tooltip.style.opacity = '1';
                }
            });

            term.addEventListener('mousemove', (event) => {
                let x = event.clientX + 15;
                let y = event.clientY + 15;

                if (x + tooltip.offsetWidth > window.innerWidth) {
                    x = event.clientX - tooltip.offsetWidth - 15;
                }
                if (y + tooltip.offsetHeight > window.innerHeight) {
                    y = event.clientY - tooltip.offsetHeight - 15;
                }

                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            });

            term.addEventListener('mouseout', () => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
        });
    }

    calculateDocHash();
    setupTooltips();

});

