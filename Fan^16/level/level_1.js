// 关卡特定的脚本文件 - 包含关卡特定的功能

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 添加输入框的键盘事件监听
    const levelInput = document.querySelector('.level-input');
    if (levelInput) {
        levelInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleEnterPress();
            }
        });
    }
});

// 处理回车键按下事件
function handleEnterPress() {
    const levelInput = document.querySelector('.level-input');
    const levelBox = document.querySelector('.level-box');
    const levelSubtitle = document.querySelector('.level-subtitle');
    
    if (!levelInput || !levelBox || !levelSubtitle) return;
    
    // 检查当前小标题状态
    if (levelSubtitle.textContent === '请输入密码') {
        if (levelInput.value === '密码') {
            levelInput.value = '';
            levelSubtitle.textContent = '密码正确，但请输入正确的密码';
            addShakeAnimation(levelBox);
            // 重新聚焦到输入框
            levelInput.focus();
        }
    } else if (levelSubtitle.textContent === '密码正确，但请输入正确的密码') {
        if (levelInput.value === '正确的密码') {
            window.location.href = 'YOU_WIN.html';
        }
    }
}

// 添加抖动动画
function addShakeAnimation(element) {
    // 添加抖动类
    element.classList.add('shake');
    
    // 动画结束后移除抖动类
    element.addEventListener('animationend', function() {
        element.classList.remove('shake');
    }, { once: true });
}

// 加载游戏信息的函数
function loadGameInfo() {
    const infoContent = document.querySelector('.info-content');
    if (!infoContent) return;
    
    // 从 level_1.json 文件中读取数据
    fetch('level_1.json')
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
                <div class="fan-value">Fan值: ${data.fanValue}</div>
            </div>
            <div class="bottom-right">
                <div class="copyright">© 2026 FanQi</div>
            </div>
        </div>
    `;

    infoContent.innerHTML = html;
}
