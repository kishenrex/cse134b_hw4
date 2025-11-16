(function() {
    function applyCustomTheme(theme) {
        const root = document.documentElement;
        if (!theme) {
            root.style = '';
            return;
        }

        if (theme.bg) {
            root.style.setProperty('--bg-color', theme.bg);
            root.style.setProperty('--form-bg', theme.bg);
            root.style.setProperty('--header-bg', theme.bg);
        }
        if (theme.text) {
            root.style.setProperty('--text-color', theme.text);
            root.style.setProperty('--text-label', theme.text);
        }
        
        if (theme.font === 'sans-serif') {
            root.style.setProperty('--font-primary', 'var(--font-primary, sans-serif)');
            root.style.setProperty('--font-secondary', 'var(--font-primary, sans-serif)');
        } else {
            root.style.setProperty('--font-primary', 'var(--font-secondary, serif)');
            root.style.setProperty('--font-secondary', 'var(--font-primary, sans-serif)');
        }
    }

    try {
        const themeName = localStorage.getItem('theme-name') || 'light';
        document.documentElement.setAttribute('data-theme', themeName);

        const customThemeJSON = localStorage.getItem('custom-theme');
        if (customThemeJSON) {
            const customTheme = JSON.parse(customThemeJSON);
            applyCustomTheme(customTheme);
        }
    } catch (err) {
        console.warn('Could not apply saved theme.', err);
    }
})();