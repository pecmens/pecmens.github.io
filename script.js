function updateClock() {
    const now = new Date();
    
    // 获取本地时间
    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localSeconds = String(now.getSeconds()).padStart(2, '0');
    const localTime = `${localHours}:${localMinutes}:${localSeconds}`;
    
    // 获取本地日期
    const localYear = now.getFullYear();
    const localMonth = String(now.getMonth() + 1).padStart(2, '0');
    const localDate = String(now.getDate()).padStart(2, '0');
    const localDateString = `${localMonth}-${localDate}-${localYear}`;
    
    // 获取UTC时间
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    const utcTime = `${utcHours}:${utcMinutes}:${utcSeconds}`;
    
    // 获取UTC日期
    const utcYear = now.getUTCFullYear();
    const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0');
    const utcDate = String(now.getUTCDate()).padStart(2, '0');
    const utcDateString = `${utcMonth}-${utcDate}-${utcYear}`;
    
    // 更新DOM元素
    document.getElementById('local-time').textContent = localTime;
    document.getElementById('local-date').textContent = localDateString;
    document.getElementById('utc-time').textContent = utcTime;
    document.getElementById('utc-date').textContent = utcDateString;
}

// 初始调用
updateClock();

// 每秒更新一次时钟
setInterval(updateClock, 1000);