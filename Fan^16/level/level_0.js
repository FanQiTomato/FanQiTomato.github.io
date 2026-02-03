window.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.querySelectorAll('.nav-btn')[0];
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            window.location.href = 'level_1.html';
        });
    }
});

function loadGameInfo() {
    const infoContent = document.querySelector('.info-content');
    if (!infoContent) return;
    
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
