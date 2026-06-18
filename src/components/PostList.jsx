import React, { useCallback, useEffect } from 'react';
// TODO: Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';

// TODO: Exercice 4 - Importer useIntersectionObserver
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';

/**
 * Composant d'affichage de la liste des posts
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.posts - Liste des posts à afficher
 * @param {boolean} props.loading - Indicateur de chargement
 * @param {boolean} props.hasMore - Indique s'il y a plus de posts à charger
 * @param {Function} props.onLoadMore - Fonction pour charger plus de posts
 * @param {Function} props.onPostClick - Fonction appelée au clic sur un post
 * @param {Function} props.onTagClick - Fonction appelée au clic sur un tag
 * @param {boolean} props.infiniteScroll - Mode de défilement infini activé ou non
 */
function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true
}) {
  // TODO: Exercice 3 - Utiliser le hook useTheme
  const { isDark } = useTheme();

  const [loadMoreRef, isIntersecting] = useIntersectionObserver({
    enabled: infiniteScroll && hasMore && !loading,
    threshold: 0.1,
  });

  useEffect(() => {
    if (
      isIntersecting &&
      infiniteScroll &&
      hasMore &&
      !loading &&
      onLoadMore
    ) {
      onLoadMore();
    }
  }, [
    isIntersecting,
    infiniteScroll,
    hasMore,
    loading,
    onLoadMore
  ]);

  // TODO: Exercice 4 - Utiliser useIntersectionObserver pour le défilement infini

  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handlePostClick = useCallback((post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  }, [onPostClick]);

  const handleTagClick = useCallback((e, tag) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  }, [onTagClick]);

  // TODO: Exercice 1 - Gérer le cas où il n'y a pas de posts

  return (
    <div className="post-list">
      {/* TODO: Exercice 1 - Afficher la liste des posts */
        //see if there is Posts 
        posts.length === 0 && !loading && (
          <div className="alert alert-info">
            Aucun article trouvé.
          </div>
        )

      }
      {//display the List of the Posts
        posts.map((post) => (
          <div
            key={post.id}
            className={`card mb-3 ${isDark ? 'bg-dark text-light border-secondary' : ''}`}
            onClick={() => handlePostClick(post)}
          >
            <div className="card-body">

              {/* Titre du post */}
              <h5 className="card-title">{post.title}</h5>

              {/* Contenu du post */}
              <p className="card-text">{post.body}</p>

              {/* Liste des tags */}
              <div>
                {post.tags?.map((tag) => (
                  <button
                    key={tag}
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={(e) => handleTagClick(e, tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

            </div>
          </div>
        ))}
      {/* Afficher le spinner de chargement */}
      {loading && <LoadingSpinner />}

      {/* TODO: Exercice 4 - Ajouter la référence pour le défilement infini */}
      {infiniteScroll && hasMore && (
        <div ref={loadMoreRef} style={{ height: '20px' }} />
      )}

      

      {/* TODO: Exercice 1 - Ajouter le bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && !loading && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={onLoadMore}>
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostList);