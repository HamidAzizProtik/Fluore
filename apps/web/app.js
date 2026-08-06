let dark_theme = localStorage.getItem('dark-theme')

const themeToggleBtn = document.getElementById('themeToggleBtn')

const enableDarkTheme = () => {
    document.body.classList.add('dark-theme')
    localStorage.setItem('dark-theme', 'active')
}

const disableDarkTheme = () => {
    document.body.classList.remove('dark-theme')
    localStorage.setItem('dark-theme', null)
}

if(dark_theme == "active") enableDarkTheme()

themeToggleBtn.addEventListener("click", () => {
    dark_theme = localStorage.getItem('dark-theme')
    dark_theme != "active" ? enableDarkTheme() : disableDarkTheme()
})