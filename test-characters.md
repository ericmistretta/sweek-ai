# Character System Test Guide

## Setup
1. Open browser console (F12)
2. Visit http://localhost:3000
3. Check character badge is visible in top-right (not blocking audio)

## Test 1: Einstein Character

### Select Einstein
1. Click character badge
2. Select "Albert Einstein" 
3. Close selector

### Identity Questions
Ask these questions and verify responses:

1. **"What is your name?"**
   - Expected: "I am Albert Einstein" or "My name is Albert Einstein"

2. **"When were you born?"**
   - Expected: "I was born on March 14, 1879"

3. **"Where were you born?"**
   - Expected: "Ulm, Kingdom of Württemberg, German Empire"

4. **"Tell me about your Nobel Prize"**
   - Expected: Mention of 1921 Nobel Prize for photoelectric effect

5. **"What is your most famous equation?"**
   - Expected: "E=mc²" with explanation

6. **"Tell me about yourself"**
   - Expected: Should include biographical details from knowledge base

### Console Verification
Check browser console for:
- `[SweekAI] Injecting character: Albert Einstein`
- `[SweekAI] Character has knowledge: true`
- `[SweekAI] System prompt preview:` (should show Einstein's prompt)

## Test 2: Steve Character

### Select Steve
1. Click character badge
2. Select "Steve (Minecraft)"
3. Close selector

### Identity Questions
Ask these questions and verify responses:

1. **"Who are you?"**
   - Expected: "I'm Steve from Minecraft"

2. **"Who created you?"**
   - Expected: "Markus Persson, also known as Notch"

3. **"What game are you from?"**
   - Expected: "Minecraft"

4. **"What are Creepers?"**
   - Expected: Description of green hostile mobs that explode

5. **"What tools do you use?"**
   - Expected: List including pickaxe, axe, sword, shovel, etc.

6. **"How do I survive the first night?"**
   - Expected: Minecraft survival tips in character

### Console Verification
Check browser console for:
- `[SweekAI] Injecting character: Steve (Minecraft)`
- `[SweekAI] Character has knowledge: true`
- System prompt should include Steve's knowledge

## Test 3: Character Persistence

1. Select Einstein
2. Refresh the page
3. Character should still be Einstein
4. Check localStorage: `localStorage.getItem('sweek-current-character')`

## Debugging Tips

### If characters don't respond correctly:
1. Open Console (F12)
2. Run: `JSON.parse(localStorage.getItem('sweek-current-character'))`
3. Should show current character with knowledge object

### To manually test injection:
```javascript
// In browser console:
testCharacterInjection()
```

### To verify knowledge is loaded:
```javascript
// Check current character
const char = JSON.parse(localStorage.getItem('sweek-current-character'));
console.log('Character:', char.name);
console.log('Has knowledge:', !!char.knowledge);
console.log('Knowledge keys:', Object.keys(char.knowledge || {}));
```

## Success Criteria
✅ Badge positioned at top, not blocking audio
✅ Einstein knows his birthdate, achievements, Nobel Prize
✅ Steve knows Minecraft lore, creator, game mechanics
✅ Characters respond in first person
✅ Knowledge is included in responses
✅ Character persists across page reloads