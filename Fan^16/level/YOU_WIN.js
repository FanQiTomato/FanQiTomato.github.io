// 关卡特定的脚本文件 - 包含关卡特定的功能

// 加载游戏信息的函数
function loadGameInfo() {
    const infoContent = document.querySelector('.info-content');
    if (!infoContent) return;
    
    // 从 YOU_WIN.json 文件中读取数据
    fetch('YOU_WIN.json')
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

// 显示游戏信息的函数
function displayGameInfo(data) {
    const infoContent = document.querySelector('.info-content');
    if (!infoContent) return;
    
    // 处理正文中的换行符
    const contentWithBreaks = data.content.replace(/\n/g, '<br>');
    // 处理提示中的换行符
    const tipWithBreaks = data.tip.replace(/\n/g, '<br>');
    
    let html = `
        <div class="info-container">
            <div class="top-left">
                <h2 class="info-title">${data.title}</h2>
                <div class="info-content-text">${contentWithBreaks}</div>
                <div class="info-tip">${tipWithBreaks}</div>
            </div>
            <div class="bottom-left">
                <div class="fan-value">${data.fanValue}</div>
            </div>
            <div class="bottom-right">
                <div class="copyright">© 2026 FanQi</div>
            </div>
        </div>
    `;

    infoContent.innerHTML = html;
}