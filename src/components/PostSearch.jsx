import React, { useState, useCallback } from 'react';
// TODO: Exercice 3 - Importer useTheme
import {useTheme}from '../context/ThemeContext';

/**
 * Composant de recherche de posts
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSearch - Fonction appelée lors de la saisie
 * @param {Function} props.onTagSelect - Fonction appelée lors de la sélection d'un tag
 * @param {Array} props.availableTags - Liste des tags disponibles
 * @param {string} props.selectedTag - Tag actuellement sélectionné
 */
function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = ''
}) {
  const [searchInput, setSearchInput] = useState('');

  // TODO: Exercice 3 - Utiliser le hook useTheme
  const {theme} = useTheme;


  // TODO: Exercice 3 - Utiliser useCallback pour optimiser le gestionnaire
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);

  // TODO: Exercice 3 - Appliquer les classes CSS en fonction du thème
  // eslint-disable-next-line no-unused-vars
  const themeClasses = theme === 'dark'
    ? 'bg-dark text-light'
    : 'bg-light text-dark';

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {/* TODO: Exercice 1 - Ajouter le bouton pour effacer la recherche */
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSearchInput('');
                  onSearch('');
                }}
              >
                Effacer
              </button>
            }

          </div>
        </div>

        {/* TODO: Exercice 4 - Ajouter le sélecteur de tags */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedTag}
            onChange={(e) => onTagSelect(e.target.value)}
          >
            <option value="">Tous les tags</option>

            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostSearch);