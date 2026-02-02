// 共用脚本文件 - 包含信息窗口等共用功能
document.addEventListener('DOMContentLoaded', function() {
    const infoBtn = document.querySelector('.info-btn');
    const infoIcon = document.querySelector('.info-icon');
    const closeIcon = document.querySelector('.close-icon');
    const infoPanel = document.querySelector('.info-panel');
    const infoContent = document.querySelector('.info-content');
    let isPanelOpen = false;

    // 检查是否存在信息按钮，如果存在则添加点击事件
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
        
        // 调用加载游戏信息的函数，由具体关卡实现
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

    // 暴露函数给外部使用
    window.Common = {
        openInfoPanel: openPanel,
        closeInfoPanel: closePanel
    };
});