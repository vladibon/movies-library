const themes = {
  PROP: 'theme',
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const { PROP, LIGHT, DARK } = themes;

setTheme((themeSwitch.checked = localStorage.getItem(PROP) === DARK));

themeSwitch.onchange = e => setTheme(e.target.checked);

function setTheme(isThemeSwitchChecked) {
  localStorage.setItem(PROP, isThemeSwitchChecked ? DARK : LIGHT);
  document.body.classList.add(localStorage.getItem(PROP));
  document.body.classList.remove(isThemeSwitchChecked ? LIGHT : DARK);
}
