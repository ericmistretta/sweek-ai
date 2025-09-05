// Character System Debug Helper
console.log('[SweekAI Debug] Character Debug Helper Loading...');

// Function to check current character
window.checkCharacter = function() {
    const saved = localStorage.getItem('sweek-current-character');
    if (saved) {
        const character = JSON.parse(saved);
        console.log('✅ Current Character:', character.name);
        console.log('Has Knowledge:', !!character.knowledge);
        if (character.knowledge) {
            console.log('Knowledge Keys:', Object.keys(character.knowledge));
        }
        return character;
    } else {
        console.log('❌ No character selected');
        return null;
    }
};

// Function to manually select Einstein
window.selectEinstein = function() {
    const einstein = {
        id: 'einstein',
        name: 'Albert Einstein',
        avatar: '🧑‍🔬',
        systemPrompt: 'You are Albert Einstein...',
        knowledge: {
            identity: 'Albert Einstein, theoretical physicist',
            birthDate: 'March 14, 1879',
            birthPlace: 'Ulm, Germany'
        }
    };
    localStorage.setItem('sweek-current-character', JSON.stringify(einstein));
    console.log('✅ Einstein selected');
    location.reload();
};

// Function to force update badge position
window.fixBadgePosition = function() {
    const badge = document.querySelector('.sweek-character-badge');
    if (badge) {
        badge.style.position = 'fixed';
        badge.style.top = '15px';
        badge.style.right = '350px';
        badge.style.bottom = 'auto';
        console.log('✅ Badge position fixed');
    } else {
        console.log('❌ Badge not found');
    }
};

// Auto-fix on load
setTimeout(() => {
    window.fixBadgePosition();
    window.checkCharacter();
}, 2000);

console.log('[SweekAI Debug] Commands available:');
console.log('- checkCharacter() - Check current character');
console.log('- selectEinstein() - Manually select Einstein');
console.log('- fixBadgePosition() - Force fix badge position');