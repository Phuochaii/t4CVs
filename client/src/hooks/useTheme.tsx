export enum Theme {
  Light = "light",
  Dark = "dark",
}

const defaultTheme = Theme.Light;

function isValidTheme(theme: string): boolean {
  return !(theme in Theme);
}

function getTheme(): Theme {
  const theme = localStorage.getItem("theme");
  if (!theme || !isValidTheme(theme)) {
    return defaultTheme as Theme;
  }

  return theme as Theme;
}

function setTheme(theme: Theme) {
  localStorage.setItem("theme", theme);
  document.body.className = theme;
}

function setupTheme() {
  const theme = getTheme();
  setTheme(theme);
}

setupTheme();

function useTheme() {
  const theme = getTheme();

  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}

export default useTheme;
