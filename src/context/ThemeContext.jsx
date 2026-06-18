import React, { createContext, useContext, useMemo, useCallback } from 'react';
// TODO: Exercice 2 - Importer useLocalStorage\
import useLocalStorage from '../hooks/useLocalStorage';

// Créer le contexte
const ThemeContext = createContext();

/**
 * Provider pour le contexte de thème
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Enfants du provider
 */
export function ThemeProvider({ children }) {
  // TODO: Exercice 3 - Utiliser useLocalStorage pour persister le thème
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  // TODO: Exercice 3 - Ajouter la fonction pour basculer entre les thèmes
  const toggleTheme = useCallback(() => {
  setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
}, [setTheme]);
  
  // Valeur fournie par le contexte
  const value = useMemo(() => ({
  theme,
  toggleTheme,
  isDark: theme === 'dark',
}), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === 'dark' ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte de thème
 * @returns {Object} Contexte de thème
 */
export function useTheme() {
  // TODO: Exercice 3 - Implémenter le hook useTheme
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  
  return context; // À modifier
}

export default ThemeContext;