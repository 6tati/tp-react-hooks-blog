import React,{useMemo} from 'react';
import { useTheme } from '../context/ThemeContext';
// TODO: Exercice 3 - Importer useTheme

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  // TODO: Exercice 3 - Utiliser le hook useTheme
  const { isDark } = useTheme();
  // TODO: Exercice 3 - Utiliser useMemo pour calculer les classes CSS
  const themeClasses = useMemo(() => ({
  card: isDark ? 'bg-dark text-light border-secondary' : '',
  badge: isDark ? 'bg-secondary' : 'bg-primary',
  button: isDark ? 'btn-outline-light' : 'btn-outline-secondary'
}), [isDark]);
  
  if (!post) return null;
  
  return (
    <div className={`card mb-4 ${themeClasses.card}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button 
          className="btn btn-sm"
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      
      <div className="card-body">
        {/* TODO: Exercice 4 - Afficher le contenu du post */}
        <p className="card-text">{post.body}</p>

        <div className="mb-3">
          <small>
            👍 {post.reactions?.likes ?? 0} &nbsp;
            👎 {post.reactions?.dislikes ?? 0} &nbsp;
            👤 User #{post.userId}
          </small>
        </div>

        
        {/* TODO: Exercice 4 - Afficher les tags */}
        <div>
          {post.tags?.map((tag) => (
            <button
              key={tag}
              className={`badge border-0 me-2 ${themeClasses.badge}`}
              onClick={() => onTagClick(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostDetails);