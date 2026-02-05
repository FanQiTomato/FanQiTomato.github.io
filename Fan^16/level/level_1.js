window.addEventListener('DOMContentLoaded', function() {
    const levelInput = document.querySelector('.level-input');
    const levelBox = document.querySelector('.level-box');
    
    if (levelBox) {
        levelBox.style.opacity = '0';
        levelBox.style.transform = 'translateY(-50%)';
        levelBox.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            levelBox.style.opacity = '1';
            levelBox.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                levelBox.style.transition = '';
            }, 500);
        }, 100);
    }
    
    if (levelInput) {
        levelInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleEnterPress();
            }
        });
    }
});

function handleEnterPress() {
    const levelInput = document.querySelector('.level-input');
    const levelBox = document.querySelector('.level-box');
    const levelSubtitle = document.querySelector('.level-subtitle');
    
    if (!levelInput || !levelBox || !levelSubtitle) return;
    
    if (levelSubtitle.textContent === '请输入密码') {
        if (levelInput.value === '密码') {
            levelInput.value = '';
            levelSubtitle.textContent = '密码正确，但请输入正确的密码';
            addShakeAnimation(levelBox);
            levelInput.focus();
        }
    } else if (levelSubtitle.textContent === '密码正确，但请输入正确的密码') {
        if (levelInput.value === '正确的密码') {
            window.location.href = 'YOU_WIN.html';
        }
    }
}

function addShakeAnimation(element) {
    element.classList.add('shake');
    
    element.addEventListener('animationend', function() {
        element.classList.remove('shake');
    }, { once: true });
}

function loadGameInfo() {
    const infoContent = document.querySelector('.info-content');
    if (!infoContent) return;
    
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
            infoContent.innerHTML = '<div class="error-message">加载失败</div>';
        });
}

function displayGameInfo(data) {
    const infoContent = document.querySelector('.info-content');
    if (!infoContent) return;
    
    const contentWithBreaks = data.content.replace(/\n/g, '<br>');
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
