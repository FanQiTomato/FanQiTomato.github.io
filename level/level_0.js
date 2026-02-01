document.addEventListener('DOMContentLoaded', function() {
    const infoBtn = document.querySelector('.info-btn');
    const infoIcon = document.querySelector('.info-icon');
    const closeIcon = document.querySelector('.close-icon');
    const infoPanel = document.querySelector('.info-panel');
    const infoContent = document.querySelector('.info-content');
    let isPanelOpen = false;

    infoBtn.addEventListener('click', function() {
        if (isPanelOpen) {
            closePanel();
        } else {
            openPanel();
        }
    });

    function openPanel() {
        isPanelOpen = true;
        infoIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        infoPanel.style.transform = 'translateX(0)';
        loadGameInfo();
    }

    function closePanel() {
        isPanelOpen = false;
        infoIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        infoPanel.style.transform = 'translateX(-100%)';
    }

    function loadGameInfo() {
        // 从 level_0.json 文件中读取数据
        fetch('level_0.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayGameInfo(data);
            })
            .catch(error => {
                console.error('Error loading game info:', error);
                // JSON 文件加载失败时直接显示"加载失败"
                infoContent.innerHTML = '<div class="error-message">加载失败</div>';
            });
    }

    function displayGameInfo(data) {
        // 处理正文中的换行符
        const contentWithBreaks = data.content.replace(/\n/g, '<br>');
        
        let html = `
            <div class="info-container">
                <div class="top-left">
                    <h2 class="info-title">${data.title}</h2>
                    <div class="info-content-text">${contentWithBreaks}</div>
                    <div class="info-tip">${data.tip}</div>
                </div>
                <div class="bottom-left">
                    <div class="fan-value">Fan值: ${data.fanValue}</div>
                </div>
                <div class="bottom-right">
                    <div class="copyright">© 2026 FanQi</div>
                </div>
            </div>
        `;

        infoContent.innerHTML = html;
    }
});