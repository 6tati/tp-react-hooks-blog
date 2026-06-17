import { useState, useEffect } from 'react';
// TODO: Exercice 2 - Importer useDebounce
import useDebounce from './useDebounce';

/**
 * Hook personnalisé pour gérer les posts du blog
 * @param {Object} options - Options de configuration
 * @param {string} options.searchTerm - Terme de recherche
 * @param {string} options.tag - Tag à filtrer
 * @param {number} options.limit - Nombre d'éléments par page
 * @param {boolean} options.infinite - Mode de chargement infini vs pagination
 * @returns {Object} État et fonctions pour gérer les posts
 */
function usePosts({ searchTerm = '', tag = '', limit = 10, infinite = true } = {}) {
  // État local pour les posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Exercice 1 - Ajouter les états nécessaires pour la pagination

  // TODO: Exercice 4 - Ajouter l'état pour le post sélectionné

  // TODO: Exercice 2 - Utiliser useDebounce pour le terme de recherche

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // TODO: Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = (skip = 0) => {
    // Construire l'URL en fonction des filtres
    if (debouncedSearchTerm.trim() !== '') {
      return `https://dummyjson.com/posts/search?q=${encodeURIComponent(debouncedSearchTerm)}`;
    }

    return 'https://dummyjson.com/posts';
  };

  // TODO: Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      // Appeler l'API et mettre à jour les états
      const response = await fetch(buildApiUrl());
      const data = await response.json();

      setPosts(data.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
    fetchPosts();
  }, [debouncedSearchTerm]);
  // TODO: Exercice 4 - Implémenter la fonction pour charger plus de posts

  // TODO: Exercice 3 - Utiliser useMemo pour calculer les tags uniques

  // TODO: Exercice 4 - Implémenter la fonction pour charger un post par son ID

  return {
    posts,
    loading,
    error,
    // Retourner les autres états et fonctions
  };
}

export default usePosts;