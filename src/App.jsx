import React, { useState, useCallback } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
import usePosts from './hooks/usePosts';

// TODO: Exercice 3 - Importer ThemeToggle
import ThemeToggle from './components/ThemeToggle';
// TODO: Exercice 3 - Importer ThemeProvider et useTheme
// TODO: Exercice 1 - Importer le hook usePosts
// TODO: Exercice 2 - Importer le hook useLocalStorage
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  // TODO: Exercice 4 - Ajouter l'état pour le tag sélectionné

  // TODO: Exercice 1 - Utiliser le hook usePosts pour récupérer les posts
  // Exemple: const { posts, loading, error } = usePosts();
  const { posts, loading, error } = usePosts({ searchTerm });
  // TODO: Exercice 2 - Utiliser useLocalStorage pour le mode de défilement
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage('infiniteScroll', true);
  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements

  // Gestionnaire pour la recherche
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleScrollModeChange = useCallback(() => {
    setInfiniteScroll((prev) => !prev);
  }, [setInfiniteScroll]);

  

  // TODO: Exercice 4 - Ajouter le gestionnaire pour la sélection de tag

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-5 fw-bold">Blog</h1>

          {/* TODO: Exercice 2 - Utiliser useLocalStorage pour changer le mode de défilement */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={infiniteScroll}
             onChange={handleScrollModeChange}
              id="scrollMode"
            />
            <label className="form-check-label" htmlFor="scrollMode">
              Défilement infini
            </label>
          </div>

          {/* TODO: Exercice 3 - Ajouter le ThemeToggle */}
          <ThemeToggle />
        </div>
      </header>

      <main>
        <PostSearch onSearch={handleSearchChange} />

        {/* TODO: Exercice 1 - Afficher un message d'erreur si nécessaire */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* TODO: Exercice 4 - Ajouter le composant PostDetails */}

        {/* TODO: Exercice 1 - Passer les props nécessaires à PostList */}
        <PostList
          posts={posts}
          loading={loading}
          infiniteScroll={infiniteScroll}
        />
      </main>

      <footer className="pt-3 mt-4 text-center border-top">
        <p>
          TP React Hooks - Blog &middot; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
