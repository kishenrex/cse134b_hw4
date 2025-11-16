const pickerBtn = document.getElementById('theme-picker-btn');
const dialog = document.getElementById('theme-dialog');
const closeBtn = document.getElementById('close-dialog');
const themeRadios = document.querySelectorAll('input[name="theme"]');
const customBg = document.getElementById('custom-bg');
const customText = document.getElementById('custom-text');
const customFont = document.getElementById('custom-font');
const applyBtn = document.getElementById('apply-custom');
const resetBtn = document.getElementById('reset-custom');

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

if (pickerBtn && dialog) {
    pickerBtn.style.display = 'inline-block'; 
    pickerBtn.addEventListener('click', () => {
        dialog.showModal();
    });
}

themeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const themeName = e.target.value;
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme-name', themeName);
        
        localStorage.removeItem('custom-theme');
        applyCustomTheme(null); 
    });
});


if (applyBtn) {
    applyBtn.addEventListener('click', () => {
        const theme = {
            bg: customBg.value,
            text: customText.value,
            font: customFont.value
        };
        
        localStorage.setItem('custom-theme', JSON.stringify(theme));
        applyCustomTheme(theme);
        
        themeRadios.forEach(radio => radio.checked = false);
        
        dialog.close();
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('custom-theme');
        applyCustomTheme(null); 
        initUI();
    });
}

function initUI() {
    const savedTheme = localStorage.getItem('theme-name') || 'light';
    const activeRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
    if (activeRadio) {
        activeRadio.checked = true;
    }

    const customThemeJSON = localStorage.getItem('custom-theme');
    if (customThemeJSON) {
        const themeSettings = JSON.parse(customThemeJSON);
        customBg.value = themeSettings.bg || '#ffffff';
        customText.value = themeSettings.text || '#212529';
        customFont.value = themeSettings.font || 'default';
        
        themeRadios.forEach(radio => radio.checked = false);
    } else {
        customBg.value = '#ffffff';
        customText.value = '#212529';
        customFont.value = 'default';
    }
}

initUI();