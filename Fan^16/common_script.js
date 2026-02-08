document.addEventListener('DOMContentLoaded', function() {
    const infoBtn = document.querySelector('.info-btn');
    const infoIcon = document.querySelector('.info-icon');
    const closeIcon = document.querySelector('.close-icon');
    const infoPanel = document.querySelector('.info-panel');
    const infoContent = document.querySelector('.info-content');
    let isPanelOpen = false;

    if (infoBtn) {
        infoBtn.addEventListener('click', function() {
            if (isPanelOpen) {
                closePanel();
            } else {
                openPanel();
            }
        });
    }

    function openPanel() {
        if (!infoPanel || !infoIcon || !closeIcon) return;
        
        isPanelOpen = true;
        infoIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        infoPanel.style.transform = 'translateX(0)';
        
        if (typeof loadGameInfo === 'function') {
            loadGameInfo();
        }
    }

    function closePanel() {
        if (!infoPanel || !infoIcon || !closeIcon) return;
        
        isPanelOpen = false;
        infoIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        infoPanel.style.transform = 'translateX(-100%)';
    }

    window.Common = {
        openInfoPanel: openPanel,
        closeInfoPanel: closePanel
    };
});
