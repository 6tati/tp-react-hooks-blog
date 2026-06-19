import { useState, useEffect, useCallback, useMemo } from 'react';
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

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  // TODO: Exercice 1 - Ajouter les états nécessaires pour la pagination

  // TODO: Exercice 4 - Ajouter l'état pour le post sélectionné
  const hasMore = posts.length < total;
  // TODO: Exercice 2 - Utiliser useDebounce pour le terme de recherche

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // TODO: Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = useCallback((skipValue = 0) => {
    if (debouncedSearchTerm.trim() !== '') {
      return `https://dummyjson.com/posts/search?q=${encodeURIComponent(
        debouncedSearchTerm
      )}&limit=${limit}&skip=${skipValue}`;
    }

    if (tag.trim() !== '') {
      return `https://dummyjson.com/posts/tag/${encodeURIComponent(
        tag
      )}?limit=${limit}&skip=${skipValue}`;
    }

    return `https://dummyjson.com/posts?limit=${limit}&skip=${skipValue}`;
  }, [debouncedSearchTerm, tag, limit]);

  // TODO: Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = useCallback(async (reset = false) => {
  try {
    setLoading(true);
    setError(null);

    const currentSkip = reset ? 0 : skip;
    const url = buildApiUrl(currentSkip);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();

    setPosts((prevPosts) =>
      reset ? data.posts : [...prevPosts, ...data.posts]
    );

    setTotal(data.total);
    setSkip(currentSkip + limit);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, [buildApiUrl, skip, limit]);

  // TODO: Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
  setSkip(0);
  fetchPosts(true);
}, [debouncedSearchTerm, tag]);
  // TODO: Exercice 4 - Implémenter la fonction pour charger plus de posts
  const loadMore = useCallback(() => {
    if (!loading && posts.length < total) {
      fetchPosts(false);
    }
  }, [loading, posts.length, total, fetchPosts]);
  // TODO: Exercice 3 - Utiliser useMemo pour calculer les tags uniques
  const uniqueTags = useMemo(() => {
    const tags = posts.flatMap((post) => post.tags || []);
    return [...new Set(tags)];
  }, [posts]);
  // TODO: Exercice 4 - Implémenter la fonction pour charger un post par son ID

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    uniqueTags,
  };
}

export default usePosts;