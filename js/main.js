// ============================================
// HIS MAJESTY'S SERVICE - Interactive Naval Novel
// Game Engine
// ============================================

console.log('=== GAME.JS LOADING ===');

// ============================================
// GAME STATE
// ============================================
const gameState = {
  playerName: '',
  background: null,
  currentScene: 'start',

  // Career stats
  rank: 'Midshipman',
  ship: '-',

  // Skills
  seamanship: 0,
  gunnery: 0,
  navigation: 0,
  discipline: 0,
  social: 0,

  // Story flags for branching
  flags: {}
};

// ============================================
// STORY SCENES DATABASE
// ============================================
const scenes = {

  start: {
    title: "His Majesty's Service",
    subtitle: "Your Journey Begins",
    text: `
      <p>The year is 1750. The age of sail is at its zenith, and His Majesty's Royal Navy rules the waves from the sugar islands of the Caribbean to the spice routes of the East Indies. For a young gentleman of fifteen, there is no finer calling than to serve King and Country upon the quarterdeck of a ship of the line.</p>

      <p>You stand at the threshold of a career that may last decades—if you survive the perils of storm, disease, and enemy action. Your warrant as a Midshipman awaits, but first, you must choose the path that brings you to the service.</p>

      <p>Who are you?</p>
    `,
    choices: [
      {
        text: "The Admiral's Son - Born to wealth and connection, your father's influence secured this position. The crew will know you bought your way aboard.",
        next: 'admiralSon',
        effects: { background: 'admiral', social: 3, discipline: 1 }
      },
      {
        text: "The Tar-Born Midshipman - You rose from the lower deck, promoted for exceptional seamanship. You know every rope and sail, but lack the manners of a gentleman.",
        next: 'tarBorn',
        effects: { background: 'tar', seamanship: 3, social: -1 }
      },
      {
        text: "The Mathematical Prodigy - Your brilliance with sextant and chart earned you this warrant. Navigation is second nature, but you've never been to sea.",
        next: 'mathematician',
        effects: { background: 'math', navigation: 3, seamanship: -1 }
      }
    ]
  },

  admiralSon: {
    title: "Blood and Privilege",
    subtitle: "The Admiral's Son",
    text: `
      <p>Your father is Rear Admiral Sir William Hawthorne, a hero of the last war and a man whose name opens doors throughout the Admiralty. The portrait of him in full dress uniform hangs in your family's London townhouse, and you've spent your childhood hearing tales of his victories against the French.</p>

      <p>Your education has been that of a gentleman: Latin, French, dancing, and swordplay. Your tutors have been the finest money could buy. You can quote Virgil and discuss philosophy, but you've never climbed a ratline or felt a deck pitch beneath your feet in a true gale.</p>

      <p>The older midshipmen will resent you. The common seamen will see you as just another pampered lordling. Your father's name will get you this berth, but it won't earn you respect—that, you must win yourself.</p>

      <p>Your mother embraces you one last time in the entrance hall, pressing a small leather-bound book of prayers into your hands. "Come back to us," she whispers. Your father merely nods, his face stern. "Do your duty, and do it well. The name of Hawthorne has never been associated with cowardice."</p>

      <p>The carriage awaits to take you to Portsmouth, where HMS <em>Indefatigable</em>, a 64-gun ship of the line, lies at anchor.</p>
    `,
    choices: [
      {
        text: "Enter your name to begin your naval career",
        next: 'nameEntry',
        effects: {}
      }
    ]
  },

  tarBorn: {
    title: "From the Lower Deck",
    subtitle: "The Tar-Born Midshipman",
    text: `
      <p>You were born in the shadow of the dockyards, the son of a shipwright who died when a scaffold collapsed during a refit. Your mother took in washing to feed you and your sisters, and by the age of eight, you were running messages for the ropemakers, earning pennies to help keep the family fed.</p>

      <p>At ten, you signed aboard a merchant vessel as a ship's boy. The work was brutal—holystoning decks until your hands bled, climbing to the maintop in howling gales, eating weevil-ridden biscuit and rancid pork. But you learned. You learned the language of the sea, the names of every rope and sail, the way a ship speaks to those who know how to listen.</p>

      <p>When war broke out, you were pressed into the Navy. You were fourteen. Within a year, you'd been promoted to able seaman for your skill aloft. The first lieutenant noticed you—noticed how you could hand, reef, and steer better than men twice your age, how you kept your head when others panicked. He recommended you for midshipman.</p>

      <p>Now you wear a blue coat and carry a dirk, but your hands are still callused, your speech still rough. The other midshipmen—boys from good families with Latin and dancing masters—will look down on you. But when the weather turns foul and the ship's in danger, you'll be the one who knows what to do.</p>

      <p>You say goodbye to your mother at the dockyard gate. She grips your hands, tears streaming down her weathered face. "Your father would be so proud," she says. "Come back safe, my boy."</p>
    `,
    choices: [
      {
        text: "Enter your name to begin your naval career",
        next: 'nameEntry',
        effects: {}
      }
    ]
  },

  mathematician: {
    title: "The Scholar at Sea",
    subtitle: "The Mathematical Prodigy",
    text: `
      <p>Numbers have always made sense to you in a way that people never quite have. While other boys played at soldiers, you worked through Euclid's <em>Elements</em>. While they learned to dance, you mastered spherical trigonometry. By thirteen, you could calculate a ship's position from celestial observations faster than men three times your age.</p>

      <p>Your father, a vicar in a small coastal parish, recognized your gift and used his meager savings to send you to the Royal Naval Academy at Portsmouth. Your instructors were astonished. One of them, a captain on half-pay, wrote directly to the Admiralty recommending you for a midshipman's warrant.</p>

      <p>You can navigate by the stars, calculate the angle of a gun for maximum range, and determine the precise moment of high tide from tables and mathematics alone. What you cannot do is splice a rope, reef a sail, or tell a top-gallant from a topgallant. The sea, to you, has been an abstraction—a problem to be solved on paper.</p>

      <p>That is about to change.</p>

      <p>Your father walks you to the coach that will carry you to Portsmouth. He places a hand on your shoulder, his face a mixture of pride and worry. "You have a rare gift," he says quietly. "But remember—a ship is not a theorem. Men are not equations. Learn from them, as well as from your books."</p>

      <p>He presses a leather satchel into your hands. Inside are your sextant, your charts, and your precious books. "God keep you safe, my son."</p>
    `,
    choices: [
      {
        text: "Enter your name to begin your naval career",
        next: 'nameEntry',
        effects: {}
      }
    ]
  },

  nameEntry: {
    title: "Your Name",
    subtitle: "Identity",
    text: `
      <p>Before you step aboard His Majesty's ship, the ship's clerk must record your name in the muster book. This name will follow you throughout your career—appearing in every log entry, every dispatch, every report to the Admiralty.</p>

      <p>What is your name?</p>

      <div class="name-entry-container">
        <input type="text" id="player-name-input" class="name-input" placeholder="Enter your surname (e.g., Hawthorne)" maxlength="30">
      </div>
    `,
    choices: [
      {
        text: "Confirm and board the ship",
        next: 'firstBoarding',
        effects: {},
        requireName: true
      }
    ]
  },

  firstBoarding: {
    title: "HMS Indefatigable",
    subtitle: "First Boarding",
    text: `
      <p>The smell hits you first—a mixture of tar, hemp, salt water, and something less definable. Humanity, packed close. Sweat and unwashed bodies. The ship is a city of wood and canvas, home to six hundred men.</p>

      <p>HMS <em>Indefatigable</em> is a third-rate ship of the line, mounting 64 guns on two decks. She's not the largest ship in the Navy—the great first-rates like <em>Victory</em> dwarf her—but she's a formidable weapon of war. Her sides are thick oak, her guns are iron, and her crew are the hardest men you've ever seen.</p>

      <p>You scramble up the side using the battens, trying not to look down at the water below. At the top, you tumble awkwardly through the entry port onto the deck. A marine in scarlet coat and white crossbelts snaps to attention. An officer in a blue coat approaches—the officer of the watch.</p>

      <p>"Midshipman {playerName}, reporting for duty, sir," you manage, trying to keep your voice steady.</p>

      <p>The officer looks you up and down with an expression that reveals nothing. "Welcome aboard, Mr. {playerName}. Report to the first lieutenant in the wardroom. Mind your head on the deck beams—we've sent more than one new midshipman to the surgeon with a cracked skull."</p>

      <p>You touch your hat in salute and turn toward the companionway, trying to remember everything you've been told about the layout of a warship. Around you, the deck is organized chaos—men hauling on ropes, others sluicing the deck with buckets of seawater, the marine sentry at the quarterdeck, the great guns lashed securely against the ship's side.</p>

      <p>Your new life begins here.</p>
    `,
    choices: [
      {
        text: "Find the first lieutenant immediately, as ordered",
        next: 'meetFirstLieutenant',
        effects: { discipline: 1 }
      },
      {
        text: "Take a moment to observe the deck and learn the layout",
        next: 'observeDeck',
        effects: { seamanship: 1 }
      },
      {
        text: "Introduce yourself to some of the crew members nearby",
        next: 'meetCrew',
        effects: { social: 1 }
      }
    ]
  },

  meetFirstLieutenant: {
    title: "The First Lieutenant",
    subtitle: "Duty First",
    text: `
      <p>You find the companionway and descend into the gloom between decks. The ceiling is so low you have to duck, even at fifteen. You can hear the officer's warning about cracked skulls ringing in your ears.</p>

      <p>The wardroom is a narrow space lit by lanterns, with a table down the center and cabins partitioned off on either side. Several officers are present—you can tell their rank by the amount of gold lace on their coats. A man in his thirties with a weathered face and keen eyes looks up from a stack of papers.</p>

      <p>"Mr. {playerName}?" he asks. His voice is crisp, efficient.</p>

      <p>"Yes, sir. Reporting for duty, sir."</p>

      <p>"Lieutenant Harrow, first of this ship. You're assigned to the larboard watch under Lieutenant Blake." He gestures to a younger officer. "You'll berth in the midshipmen's mess—the gunroom, forward. Stow your dunnage and report back here in one hour. We sail on the morning tide."</p>

      <p>He returns to his papers, and you understand you've been dismissed. It was efficient, professional, and utterly without warmth. In the Navy, you realize, you are simply a cog in a vast machine.</p>

      <p>But at least you made a good first impression by following orders promptly.</p>
    `,
    choices: [
      {
        text: "Find the gunroom and meet your fellow midshipmen",
        next: 'gunroom',
        effects: {}
      }
    ]
  },

  observeDeck: {
    title: "Learning the Ropes",
    subtitle: "Observation",
    text: `
      <p>You pause on the deck, taking in the organized chaos around you. A ship is a complex thing—hundreds of ropes, each with its own name and purpose. You watch a working party hauling on a line, the petty officer calling the rhythm. You see the quartermaster at the wheel, his practiced hands making minute adjustments. You note the marine sentries, the position of the boats, the arrangement of the guns.</p>

      <p>A grizzled seaman notices you watching and grins, showing missing teeth. "First day aboard, young gentleman?"</p>

      <p>"Yes," you admit.</p>

      <p>"That there's the main tack," he says, pointing. "And that's the fore sheet. You'll learn 'em all soon enough—or you'll get a rope's end across your backside when you call for the wrong one." He chuckles, but not unkindly.</p>

      <p>After a few minutes, you remember you were ordered to report to the first lieutenant. You'd better find the wardroom before your absence is noted.</p>
    `,
    choices: [
      {
        text: "Head below to find the first lieutenant",
        next: 'meetFirstLieutenantLate',
        effects: {}
      }
    ]
  },

  meetCrew: {
    title: "A Friendly Face",
    subtitle: "Making Connections",
    text: `
      <p>You approach a group of sailors working nearby, coiling ropes with practiced efficiency. They glance up as you approach, their expressions guarded.</p>

      <p>"Good morning," you say, trying to sound confident. "I'm Midshipman {playerName}, just come aboard."</p>

      <p>There's a moment of silence. Then one of them, an older man with a gray beard, nods. "Welcome aboard, Mr. {playerName}. I'm Jenkins, captain of the foretop."</p>

      <p>The others relax slightly. One of them, younger, grins. "Fresh from shore, sir? You'll find the sea's a different world. But Jenkins here will set you right if you ask him nice."</p>

      <p>Jenkins waves him quiet. "You'll learn fast enough, sir. Just remember—the men respect an officer who listens and don't put on airs. And mind you're not late reporting to the first lieutenant, or he'll have your guts for garters."</p>

      <p>With that friendly warning, you excuse yourself and hurry below to find the wardroom. You've made a good first impression with the crew, but you'd better not be late for the officers.</p>
    `,
    choices: [
      {
        text: "Report to the first lieutenant",
        next: 'meetFirstLieutenantLate',
        effects: {}
      }
    ]
  },

  meetFirstLieutenantLate: {
    title: "The First Lieutenant",
    subtitle: "A Minor Delay",
    text: `
      <p>You find the wardroom and present yourself to Lieutenant Harrow. His expression is cool as he looks up from his papers.</p>

      <p>"Mr. {playerName}. I gave the officer of the watch instructions to send you here immediately. That was ten minutes ago."</p>

      <p>"I apologize, sir. I was—"</p>

      <p>"I don't require explanations, Mr. {playerName}. I require obedience. On this ship, when an officer gives you an order, you execute it at once. Is that clear?"</p>

      <p>"Yes, sir. Perfectly clear, sir."</p>

      <p>"Good." His tone softens slightly. "You're young and new to the service. You'll make mistakes. But make each mistake only once. You're assigned to the larboard watch under Lieutenant Blake. Stow your dunnage in the gunroom and report back here in one hour. Dismissed."</p>

      <p>You've been reprimanded, but mildly. You make a mental note: in the Navy, orders are absolute.</p>
    `,
    choices: [
      {
        text: "Find the gunroom and meet your fellow midshipmen",
        next: 'gunroom',
        effects: {}
      }
    ]
  },

  gunroom: {
    title: "The Gunroom",
    subtitle: "Your New Home",
    text: `
      <p>The gunroom is forward, in the dimmest part of the ship. It's a narrow space with hammocks slung overhead and a table down the center. This is where the midshipmen live—young men like yourself, ranging from twelve to twenty years old, all learning the profession of naval officer.</p>

      <p>Three midshipmen are present when you enter. One, a tall boy about your age with an aristocratic face, looks up with cool appraisal. Another, younger and smaller, barely glances at you before returning to a book. The third, a stocky youth with a friendly expression, grins.</p>

      <p>"Fresh meat!" the friendly one says cheerfully. "I'm Rodgers. That's Caruthers"—he indicates the aristocratic one—"and that's little Pembrook. Welcome to the lowest circle of hell, new fish."</p>

      <p>Caruthers sets down his teacup. "The gunroom," he says precisely, "is where gentlemen are made into officers. Pay attention, do your duty, and you'll survive. Cross the wrong people, and you'll wish you'd taken up farming."</p>

      <p>You're about to respond when a whistle sounds on deck—the bosun's call. All three midshipmen immediately scramble for the ladder. "All hands!" Rodgers shouts. "Come on, new fish—time to earn your keep!"</p>
    `,
    choices: [
      {
        text: "Continue the story (more scenes to be written)",
        next: 'endOfDemo',
        effects: {}
      }
    ]
  },

  endOfDemo: {
    title: "To Be Continued",
    subtitle: "End of Current Content",
    text: `
      <p>This is where the current story content ends. The framework is in place for a full novel-length interactive experience, with:</p>

      <ul style="text-align: left; color: #e8dcc4;">
        <li>Character creation with three distinct backgrounds</li>
        <li>Stat tracking and skill progression</li>
        <li>Meaningful choices with consequences</li>
        <li>Novel-length prose (600-1000 words per scene)</li>
        <li>Save/load functionality</li>
        <li>Mobile-optimized interface</li>
      </ul>

      <p><strong>To add more story content:</strong> Open <code>game.js</code> and add new scene objects to the <code>scenes</code> database. Each scene needs:</p>

      <ul style="text-align: left; color: #e8dcc4;">
        <li><code>title</code>: Chapter/scene title</li>
        <li><code>subtitle</code>: Subtitle for context</li>
        <li><code>text</code>: The prose (use HTML for formatting)</li>
        <li><code>choices</code>: Array of choice objects with text, next scene, and stat effects</li>
      </ul>

      <p>The engine handles everything else automatically—rendering, stats, saves, and navigation.</p>

      <p><em>Your naval career awaits further adventures...</em></p>
    `,
    choices: [
      {
        text: "Return to the beginning",
        next: 'start',
        effects: {}
      }
    ]
  }
};

// ============================================
// SCENE RENDERING
// ============================================
function renderScene(sceneId) {
  console.log(`=== RENDERING SCENE: ${sceneId} ===`);

  const scene = scenes[sceneId];
  if (!scene) {
    console.error(`Scene not found: ${sceneId}`);
    document.getElementById('story-text').innerHTML = '<p>Error: Scene not found. Please restart.</p>';
    return;
  }

  gameState.currentScene = sceneId;

  // Update header
  document.getElementById('chapter-title').textContent = scene.title;
  document.getElementById('chapter-subtitle').textContent = scene.subtitle;

  // Replace placeholder with player name
  let storyText = scene.text;
  if (gameState.playerName) {
    storyText = storyText.replace(/{playerName}/g, gameState.playerName);
  }

  // Update story text
  document.getElementById('story-text').innerHTML = storyText;

  // Render choices
  const choicesContainer = document.getElementById('story-choices');
  choicesContainer.innerHTML = '';

  scene.choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.textContent = choice.text;
    button.onclick = () => makeChoice(choice);
    choicesContainer.appendChild(button);
  });

  // Update stats display
  updateUI();

  // Scroll to top
  document.querySelector('.story-main').scrollTop = 0;
}

// ============================================
// CHOICE HANDLING
// ============================================
function makeChoice(choice) {
  console.log(`=== CHOICE MADE: ${choice.text} ===`);

  // Check if name is required
  if (choice.requireName) {
    const nameInput = document.getElementById('player-name-input');
    if (nameInput) {
      const name = nameInput.value.trim();
      if (!name) {
        showNotification('Please enter your name');
        return;
      }
      gameState.playerName = name;
      console.log(`Player name set to: ${name}`);
    }
  }

  // Apply stat effects
  if (choice.effects) {
    for (let key in choice.effects) {
      if (key === 'background') {
        gameState.background = choice.effects[key];
      } else if (gameState.hasOwnProperty(key)) {
        gameState[key] += choice.effects[key];
        console.log(`${key} changed by ${choice.effects[key]}, now ${gameState[key]}`);
      } else {
        gameState.flags[key] = choice.effects[key];
      }
    }
  }

  // Move to next scene
  if (choice.next) {
    renderScene(choice.next);
    saveStory(); // Auto-save after each choice
  }
}

// ============================================
// UI UPDATE
// ============================================
function updateUI() {
  document.getElementById('rank').textContent = gameState.rank;
  document.getElementById('ship').textContent = gameState.ship;
  document.getElementById('seamanship').textContent = gameState.seamanship;
  document.getElementById('gunnery').textContent = gameState.gunnery;
  document.getElementById('navigation').textContent = gameState.navigation;
  document.getElementById('discipline').textContent = gameState.discipline;
  document.getElementById('social').textContent = gameState.social;
}

// ============================================
// SAVE/LOAD SYSTEM
// ============================================
function saveStory() {
  console.log('=== SAVING GAME ===');
  try {
    localStorage.setItem('navalNovelSave', JSON.stringify(gameState));
    showNotification('Progress Saved');
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    showNotification('Save Failed');
    return false;
  }
}

function loadStory() {
  console.log('=== LOADING GAME ===');
  try {
    const saved = localStorage.getItem('navalNovelSave');
    if (saved) {
      const loaded = JSON.parse(saved);
      Object.assign(gameState, loaded);
      console.log('Loaded game state:', gameState);
      return true;
    }
  } catch (e) {
    console.error('Load failed:', e);
  }
  return false;
}

function restartStory() {
  console.log('=== RESTARTING GAME ===');
  if (confirm('Start a new career? Your current progress will be lost.')) {
    localStorage.removeItem('navalNovelSave');

    // Reset game state
    gameState.playerName = '';
    gameState.background = null;
    gameState.currentScene = 'start';
    gameState.rank = 'Midshipman';
    gameState.ship = '-';
    gameState.seamanship = 0;
    gameState.gunnery = 0;
    gameState.navigation = 0;
    gameState.discipline = 0;
    gameState.social = 0;
    gameState.flags = {};

    renderScene('start');
    showNotification('New Career Started');
  }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `<strong>${message}</strong>`;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ============================================
// INITIALIZATION
// ============================================
console.log('=== SETTING UP EVENT LISTENERS ===');

document.addEventListener('DOMContentLoaded', function() {
  console.log('=== DOM CONTENT LOADED ===');

  // Set up button listeners
  document.getElementById('save-btn').addEventListener('click', saveStory);
  document.getElementById('restart-btn').addEventListener('click', restartStory);

  // Try to load saved game, or start new
  if (loadStory()) {
    console.log('Loading saved game at scene:', gameState.currentScene);
    renderScene(gameState.currentScene);
  } else {
    console.log('No saved game found, starting new story');
    renderScene('start');
  }

  console.log('=== INITIALIZATION COMPLETE ===');
});

console.log('=== GAME.JS LOADED ===');
