// SweekAI Character Selector JavaScript
class CharacterSelector {
    constructor() {
        this.characters = [];
        this.currentCharacter = null;
        this.selectedCategory = 'all';
        this.searchQuery = '';
        this.favorites = this.loadFavorites();
        
        this.init();
    }

    async init() {
        await this.loadCharacters();
        this.setupEventListeners();
        this.renderCharacters();
        this.updateCurrentCharacter();
    }

    async loadCharacters() {
        try {
            const response = await fetch('../../characters/characters.json');
            const data = await response.json();
            this.characters = data.characters;
            console.log('Loaded characters:', this.characters.length);
        } catch (error) {
            console.error('Failed to load characters:', error);
            // Fallback to hardcoded characters if file can't be loaded
            this.characters = this.getFallbackCharacters();
        }
    }

    getFallbackCharacters() {
        return [
            {
                id: 'einstein',
                name: 'Albert Einstein',
                category: 'Scientists & Thinkers',
                avatar: '🧑‍🔬',
                description: 'Theoretical physicist who developed the theory of relativity',
                personality: {
                    traits: {
                        curiosity: 0.95,
                        humor: 0.7,
                        patience: 0.85,
                        formality: 0.6
                    },
                    quirks: [
                        'Uses thought experiments to explain concepts',
                        'Makes physics analogies',
                        'Occasionally speaks German phrases'
                    ],
                    catchphrases: [
                        'Imagination is more important than knowledge',
                        'God does not play dice with the universe',
                        'It\'s all relative!'
                    ]
                }
            },
            {
                id: 'minecraft-steve',
                name: 'Steve',
                category: 'Gaming Characters',
                avatar: '⛏️',
                description: 'The iconic character from Minecraft',
                personality: {
                    traits: {
                        enthusiasm: 0.9,
                        creativity: 0.95,
                        friendliness: 0.85,
                        technical: 0.6
                    },
                    quirks: [
                        'References blocks and crafting constantly',
                        'Makes mining sound effects',
                        'Talks about building projects'
                    ],
                    catchphrases: [
                        'Let\'s mine and craft!',
                        'Time to build something awesome!',
                        'Watch out for creepers!'
                    ]
                }
            }
        ];
    }

    setupEventListeners() {
        // Current character display
        const currentDisplay = document.getElementById('currentCharacterDisplay');
        if (currentDisplay) {
            currentDisplay.addEventListener('click', () => this.togglePanel());
        }

        // Search input
        const searchInput = document.getElementById('characterSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.renderCharacters();
            });
        }

        // Category tabs
        const categoryTabs = document.querySelectorAll('.category-tab');
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.selectedCategory = tab.dataset.category;
                this.updateCategoryTabs();
                this.renderCharacters();
            });
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('characterPanel');
            const currentBar = document.querySelector('.current-character-bar');
            if (panel && !panel.contains(e.target) && !currentBar.contains(e.target)) {
                if (panel.style.display !== 'none') {
                    this.togglePanel();
                }
            }
        });
    }

    updateCategoryTabs() {
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            if (tab.dataset.category === this.selectedCategory) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    togglePanel() {
        const panel = document.getElementById('characterPanel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    }

    filterCharacters() {
        let filtered = this.characters;

        // Filter by category
        if (this.selectedCategory === 'favorites') {
            filtered = filtered.filter(char => this.favorites.includes(char.id));
        } else if (this.selectedCategory !== 'all') {
            filtered = filtered.filter(char => char.category === this.selectedCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(char => 
                char.name.toLowerCase().includes(this.searchQuery) ||
                char.description.toLowerCase().includes(this.searchQuery) ||
                char.category.toLowerCase().includes(this.searchQuery)
            );
        }

        return filtered;
    }

    renderCharacters() {
        const grid = document.getElementById('characterGrid');
        const noResults = document.getElementById('noResults');
        
        if (!grid) return;

        const filtered = this.filterCharacters();
        
        // Clear grid
        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';

        // Render character cards
        filtered.forEach(character => {
            const card = this.createCharacterCard(character);
            grid.appendChild(card);
        });
    }

    createCharacterCard(character) {
        const template = document.getElementById('characterCardTemplate');
        if (!template) return document.createElement('div');

        const card = template.content.cloneNode(true);
        const cardElement = card.querySelector('.character-card');
        
        // Set character ID
        cardElement.dataset.characterId = character.id;
        
        // Set avatar
        const avatar = card.querySelector('.avatar-emoji');
        if (avatar) avatar.textContent = character.avatar;
        
        // Set badge if needed
        const badge = card.querySelector('.character-badge');
        if (badge && character.badge) {
            badge.textContent = character.badge;
        } else if (badge) {
            badge.style.display = 'none';
        }
        
        // Set favorite button
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (favoriteBtn) {
            if (this.favorites.includes(character.id)) {
                favoriteBtn.classList.add('active');
            }
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(character.id);
            });
        }
        
        // Set character details
        const title = card.querySelector('.character-title');
        if (title) title.textContent = character.name;
        
        const description = card.querySelector('.character-description');
        if (description) description.textContent = character.description;
        
        // Add personality traits
        const traitsContainer = card.querySelector('.personality-traits');
        if (traitsContainer && character.personality && character.personality.traits) {
            this.renderTraits(traitsContainer, character.personality.traits);
        }
        
        // Add quirks
        const quirksContainer = card.querySelector('.character-quirks');
        if (quirksContainer && character.personality && character.personality.quirks) {
            character.personality.quirks.slice(0, 3).forEach(quirk => {
                const tag = document.createElement('span');
                tag.className = 'quirk-tag';
                tag.textContent = quirk.split(' ').slice(0, 3).join(' ') + '...';
                quirksContainer.appendChild(tag);
            });
        }
        
        // Set stats
        const stats = card.querySelectorAll('.stat-value');
        if (stats.length >= 2) {
            stats[0].textContent = Math.floor(Math.random() * 100) + ' chats';
            stats[1].textContent = '4.' + Math.floor(Math.random() * 10);
        }
        
        // Set select button
        const selectBtn = card.querySelector('.select-btn');
        const selectBtnName = card.querySelector('.select-btn-name');
        if (selectBtn) {
            if (selectBtnName) selectBtnName.textContent = character.name;
            
            if (this.currentCharacter && this.currentCharacter.id === character.id) {
                cardElement.classList.add('selected');
                selectBtn.textContent = 'Currently Selected';
            }
            
            selectBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectCharacter(character);
            });
        }
        
        // Card click handler
        cardElement.addEventListener('click', () => {
            this.selectCharacter(character);
        });
        
        return card;
    }

    renderTraits(container, traits) {
        const traitTemplate = document.getElementById('traitBarTemplate');
        if (!traitTemplate) return;

        const traitIcons = {
            curiosity: '🔬',
            humor: '😄',
            patience: '⏰',
            formality: '👔',
            enthusiasm: '⚡',
            creativity: '🎨',
            friendliness: '👋',
            technical: '💻',
            determination: '💪',
            analytical: '🧠',
            clarity: '💡',
            encouragement: '🌟',
            supportive: '❤️',
            organized: '📋',
            eloquence: '🎭',
            dramatic: '🎬',
            imagination: '✨',
            descriptive: '📝',
            playful: '🎲',
            encouraging: '👍'
        };

        Object.entries(traits).slice(0, 4).forEach(([trait, value]) => {
            const traitElement = traitTemplate.content.cloneNode(true);
            
            const icon = traitElement.querySelector('.trait-icon');
            if (icon) icon.textContent = traitIcons[trait] || '•';
            
            const name = traitElement.querySelector('.trait-name');
            if (name) name.textContent = trait;
            
            const fill = traitElement.querySelector('.trait-fill');
            if (fill) fill.style.width = (value * 100) + '%';
            
            container.appendChild(traitElement);
        });
    }

    selectCharacter(character) {
        // Ensure we have the full character object with systemPrompt
        const fullCharacter = this.characters.find(c => c.id === character.id) || character;
        
        this.currentCharacter = fullCharacter;
        this.saveCurrentCharacter(fullCharacter);
        this.updateCurrentCharacter();
        
        // Update all cards to reflect selection
        const cards = document.querySelectorAll('.character-card');
        cards.forEach(card => {
            if (card.dataset.characterId === fullCharacter.id) {
                card.classList.add('selected');
                const btn = card.querySelector('.select-btn');
                if (btn) btn.textContent = 'Currently Selected';
            } else {
                card.classList.remove('selected');
                const btn = card.querySelector('.select-btn');
                const name = card.querySelector('.select-btn-name');
                if (btn && name) {
                    btn.innerHTML = '<span>Chat with </span><span class="select-btn-name">' + name.textContent + '</span>';
                }
            }
        });
        
        // Close panel after selection
        setTimeout(() => this.togglePanel(), 300);
        
        // Notify parent window if in iframe
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'character-selected',
                character: fullCharacter
            }, '*');
        }
        
        // Log selection for debugging
        console.log('[Character Selected]', fullCharacter.name);
        if (fullCharacter.systemPrompt) {
            console.log('[System Prompt]', fullCharacter.systemPrompt);
        }
    }

    updateCurrentCharacter() {
        const current = this.currentCharacter || this.loadCurrentCharacter();
        
        const avatar = document.getElementById('currentAvatar');
        const name = document.getElementById('currentName');
        const status = document.getElementById('currentStatus');
        
        if (current) {
            if (avatar) avatar.textContent = current.avatar;
            if (name) name.textContent = current.name;
            if (status) status.textContent = 'Active';
            this.currentCharacter = current;
        } else {
            if (avatar) avatar.textContent = '🤖';
            if (name) name.textContent = 'Select a Character';
            if (status) status.textContent = 'Ready to chat';
        }
    }

    toggleFavorite(characterId) {
        const index = this.favorites.indexOf(characterId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(characterId);
        }
        
        this.saveFavorites();
        
        // Update UI
        const btns = document.querySelectorAll(`.character-card[data-character-id="${characterId}"] .favorite-btn`);
        btns.forEach(btn => {
            btn.classList.toggle('active');
        });
        
        // Re-render if viewing favorites
        if (this.selectedCategory === 'favorites') {
            this.renderCharacters();
        }
    }

    // Local Storage Methods
    loadFavorites() {
        try {
            const saved = localStorage.getItem('sweek-favorites');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem('sweek-favorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    }

    loadCurrentCharacter() {
        try {
            const saved = localStorage.getItem('sweek-current-character');
            if (saved) {
                const character = JSON.parse(saved);
                return this.characters.find(c => c.id === character.id) || character;
            }
        } catch {
            return null;
        }
        return null;
    }

    saveCurrentCharacter(character) {
        try {
            localStorage.setItem('sweek-current-character', JSON.stringify(character));
        } catch (error) {
            console.error('Failed to save current character:', error);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.characterSelector = new CharacterSelector();
    });
} else {
    window.characterSelector = new CharacterSelector();
}