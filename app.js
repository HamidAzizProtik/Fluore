// note that this code is temporary and only for testing

const themeToggleBtn = document.getElementById('themeToggleBtn');

themeToggleBtn.addEventListener('click', () => {
    
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = '🌅'; 
    } else {
        themeToggleBtn.textContent = '🌆'; 
    }
});