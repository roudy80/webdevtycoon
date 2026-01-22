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
  ship: 'HMS Indefatigable',

  // Skills
  seamanship: 0,
  gunnery: 0,
  navigation: 0,
  discipline: 0,
  social: 0,

  // Reputation (affects story branches)
  crewReputation: 50,      // 0-100, affects morale and loyalty
  officerReputation: 50,   // 0-100, affects promotions and assignments

  // Resources
  prizeMoney: 0,           // Earnings from captured ships

  // Ship status
  morale: 50,              // 0-100, crew morale

  // Key relationships (-10 to +10)
  relationships: {
    jenkins: 0,      // Captain of foretop
    rodgers: 0,      // Friendly midshipman
    caruthers: 0,    // Aristocratic rival
    blake: 0,        // Your watch officer
    harrow: 0,       // First Lieutenant
    thornton: 0      // The Captain
  },

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
        text: "Confirm and continue",
        next: 'personalityChoice',
        effects: {},
        requireName: true
      }
    ]
  },

  personalityChoice: {
    title: "Your Character",
    subtitle: "Temperament",
    text: `
      <p>As you prepare to join your ship, you reflect on what kind of officer you want to be. The Navy needs all types—from by-the-book disciplinarians to natural leaders who inspire loyalty.</p>

      <p>What drives you?</p>
    `,
    choices: [
      {
        text: "Ambition - You're determined to rise through the ranks, no matter what it takes",
        next: 'motivationChoice',
        effects: { discipline: 1, social: 1 }
      },
      {
        text: "Duty - You believe in serving King and Country with honor and integrity",
        next: 'motivationChoice',
        effects: { discipline: 2 }
      },
      {
        text: "Brotherhood - You care most about the men you serve alongside",
        next: 'motivationChoice',
        effects: { social: 2 }
      },
      {
        text: "Curiosity - The sea itself fascinates you—navigation, weather, the natural world",
        next: 'motivationChoice',
        effects: { navigation: 1, seamanship: 1 }
      }
    ]
  },

  motivationChoice: {
    title: "Preparation",
    subtitle: "Skills",
    text: `
      <p>Before joining the ship, you had time to prepare. What did you focus on learning?</p>
    `,
    choices: [
      {
        text: "Practiced sword drill and studied tactics - you want to be ready for combat",
        next: 'finalPrep',
        effects: { gunnery: 1, discipline: 1 }
      },
      {
        text: "Learned knots, splices, and rigging from an old sailor",
        next: 'finalPrep',
        effects: { seamanship: 2 }
      },
      {
        text: "Studied navigation tables and practiced with a sextant",
        next: 'finalPrep',
        effects: { navigation: 2 }
      },
      {
        text: "Talked to officers and learned about leadership and command",
        next: 'finalPrep',
        effects: { social: 1, discipline: 1 }
      }
    ]
  },

  finalPrep: {
    title: "One Last Thing",
    subtitle: "Final Preparation",
    text: `
      <p>The morning you leave for Portsmouth, you have time for one last thing.</p>
    `,
    choices: [
      {
        text: "Visit the dockyards and watch ships being built—learn how they're put together",
        next: 'firstBoarding',
        effects: { seamanship: 1 }
      },
      {
        text: "Attend a navigation lecture at the Royal Society",
        next: 'firstBoarding',
        effects: { navigation: 1 }
      },
      {
        text: "Watch marines drilling—study their discipline and precision",
        next: 'firstBoarding',
        effects: { discipline: 1 }
      },
      {
        text: "Spend time with family—they remind you why you're doing this",
        next: 'firstBoarding',
        effects: { social: 1 }
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
        text: "Scramble up to the deck with the others",
        next: 'allHandsDrill',
        effects: { discipline: 1 }
      }
    ]
  },

  allHandsDrill: {
    title: "All Hands",
    subtitle: "First Drill",
    text: `
      <p>You follow the midshipmen up the ladder, emerging into daylight and chaos. The deck is alive with men running to their stations. The bosun's mates are shouting, their pipes shrilling. "Hands to make sail! Look alive, you lubbers!"</p>

      <p>Rodgers grabs your arm. "Stay with me until you learn the ropes—literally." He positions you at a belaying pin. "When they call to loose the tops'ls, we'll tail onto this line. Just follow my lead and heave when I heave."</p>

      <p>Above you, men are racing up the ratlines—climbing the shrouds with a speed that makes your stomach lurch just watching. They spread out along the yards, tiny figures against the sky, working to loose the sails from their gaskets.</p>

      <p>"Loose tops'ls!" comes the cry. The petty officer at your station roars, "Haul away!" You grab the rope alongside Rodgers and pull. The line is rough hemp, tar-sticky, and burns your soft hands even through your gloves. Around you, twenty men are heaving in unison, and slowly the great sail yard rises up the mast.</p>

      <p>It takes twenty minutes of exhausting work. When it's done, you're breathing hard and your arms ache. Rodgers grins at you. "Welcome to the Navy, new fish. Hope you're ready for months of this."</p>
    `,
    choices: [
      {
        text: "Ask Rodgers to teach you more about the ship's operation",
        next: 'learnFromRodgers',
        effects: { seamanship: 1 }
      },
      {
        text: "Report to the first lieutenant as ordered",
        next: 'reportToHarrow',
        effects: { discipline: 1 }
      }
    ]
  },

  learnFromRodgers: {
    title: "Learning the Ropes",
    subtitle: "Seamanship Lessons",
    text: `
      <p>"What's all this for?" you ask Rodgers, gesturing at the maze of ropes. "There must be hundreds of them."</p>

      <p>"Thousands," Rodgers says cheerfully. "And every man jack aboard needs to know which is which, in daylight or darkness, in calm or storm. That's the halyard—raises the yard. That's the brace—swings it round. The sheet controls the lower corner of the sail, the clew line the upper."</p>

      <p>He points aloft. "Three masts—foremast forward, mainmast center, mizzenmast aft. Each carries squares'ls—courses, tops'ls, t'gallants. Plus the jibs forward and the spanker aft." He rattles it off with the ease of long practice.</p>

      <p>You try to memorize it all, but it's overwhelming. Rodgers sees your expression and laughs. "Don't worry. You'll learn it or you'll get beaten for giving the wrong order. Nothing motivates quite like a rope's end across the shoulders."</p>

      <p>A voice cuts through the noise: "Mr. {playerName}! The first lieutenant is waiting!"</p>

      <p>Rodgers winces. "You're late. Better run."</p>
    `,
    choices: [
      {
        text: "Hurry below to report to Lieutenant Harrow",
        next: 'reportToHarrowLate',
        effects: {}
      }
    ]
  },

  reportToHarrow: {
    title: "Orders",
    subtitle: "The First Lieutenant",
    text: `
      <p>You find Lieutenant Harrow on the quarterdeck, speaking with the sailing master—an older man with graying hair and a weathered face. Harrow acknowledges you with a nod.</p>

      <p>"Mr. {playerName}. You're assigned to Lieutenant Blake's watch—the larboard watch. You'll stand watch and watch: four hours on duty, four hours off. During your watch, you'll assist Mr. Blake with whatever he requires. When off watch, you'll study navigation with Mr. Dalton here"—he indicates the sailing master—"and gunnery with the master gunner. Clear?"</p>

      <p>"Yes, sir."</p>

      <p>"We sail on tomorrow's tide. The captain comes aboard at eight bells. You will be on deck, in proper uniform, with your hat fresh-brushed and your shoes blacked. The captain is a hard man but a fair one. Do your duty and you'll prosper. Fail, and you'll wish you'd never been born. Dismissed."</p>

      <p>You touch your hat and turn to go. This is real now. Tomorrow, HMS <em>Indefatigable</em> weighs anchor and you begin your life at sea.</p>
    `,
    choices: [
      {
        text: "Return to the gunroom to prepare for tomorrow",
        next: 'gunroomEvening',
        effects: {}
      }
    ]
  },

  reportToHarrowLate: {
    title: "A Reprimand",
    subtitle: "Discipline",
    text: `
      <p>You arrive at the quarterdeck breathing hard. Lieutenant Harrow is in conversation with another officer, and you wait, trying not to fidget. When he finally notices you, his expression is cold.</p>

      <p>"Mr. {playerName}. When I send for you, I expect you to appear immediately. Not when it's convenient."</p>

      <p>"I apologize, sir. I was—"</p>

      <p>"I don't want explanations. I want obedience." His voice is quiet, which somehow makes it worse. "In action, a delayed order can cost lives. Remember that."</p>

      <p>He gives you your orders: you're assigned to Lieutenant Blake's larboard watch, four hours on and four off. You'll study navigation and gunnery when off watch. The captain boards tomorrow at eight bells and you'd better be in perfect order.</p>

      <p>As you're dismissed, you make a mental note: aboard ship, punctuality isn't just courtesy—it's survival.</p>
    `,
    choices: [
      {
        text: "Return to the gunroom",
        next: 'gunroomEvening',
        effects: { discipline: -1 }
      }
    ]
  },

  gunroomEvening: {
    title: "The Gunroom",
    subtitle: "First Evening",
    text: `
      <p>The gunroom at supper time is cramped and dim, lit by a single swaying lantern. Five midshipmen are crammed around the small table. You've met Rodgers, Caruthers, and young Pembrook. Now you meet the other two: Morrison, a quiet boy of sixteen, and Walsh, eighteen and sharp-faced.</p>

      <p>The meal is salt pork, ship's biscuit, and small beer. The biscuit is rock-hard and you spot a weevil crawling out of one piece. Rodgers sees you staring and grins. "Knock it on the table first. The weevils fall out. Mostly."</p>

      <p>Caruthers dabs his mouth with a napkin—somehow he's produced a napkin in this squalid hole. "So, Mr. {playerName}, where did you receive your education? I attended Eton, myself."</p>

      <p>The question is casual, but there's a challenge in it. He's establishing the pecking order.</p>
    `,
    choices: [
      {
        text: "Answer honestly about your background",
        next: 'gunroomHonest',
        effects: { social: 1 }
      },
      {
        text: "Turn the conversation to naval matters",
        next: 'gunroomDeflect',
        effects: { discipline: 1 }
      },
      {
        text: "Challenge Caruthers' superiority",
        next: 'gunroomChallenge',
        effects: { social: -1, discipline: 1 }
      }
    ]
  },

  gunroomHonest: {
    title: "Honest Answer",
    subtitle: "Social Standing",
    text: `
      <p>You answer truthfully about your education and background. Caruthers listens, his expression carefully neutral. When you finish, he merely nods.</p>

      <p>"I see. Well, breeding will tell in the end, won't it?" It's ambiguous—could be an insult or simple observation.</p>

      <p>Rodgers breaks the tension. "What matters is whether you can do your duty when the guns start firing. I've seen lords' sons weep like babies at their first broadside, and coalmen's brats stand steady as rocks. The sea doesn't care about your father."</p>

      <p>Walsh speaks up for the first time, his voice sharp. "The Admiralty cares, though. Connections get you posted. Connections get you a ship. Skill matters, but so does knowing the right people."</p>

      <p>It's an uncomfortable truth, and the table falls silent. Young Pembrook looks at his plate. Morrison stares into his beer. The Navy is supposed to be a meritocracy, but everyone knows that patronage opens doors.</p>

      <p>The conversation moves on, but you've learned something: the gunroom is its own small world, with its own politics and resentments.</p>
    `,
    choices: [
      {
        text: "Get some rest before tomorrow's big day",
        next: 'firstNight',
        effects: {}
      }
    ]
  },

  gunroomDeflect: {
    title: "Professional Focus",
    subtitle: "Avoiding Conflict",
    text: `
      <p>"What I'm more concerned about," you say, "is learning to be a proper officer. Can anyone tell me what to expect when the captain boards tomorrow?"</p>

      <p>It's a deflection, but a reasonable one. Morrison speaks up—the first time you've heard him talk. "Captain Thornton is old school. Thirty years in the service. He expects absolute obedience, spotless uniform, and he won't tolerate excuses. But he's fair. Treats the men decent, doesn't flog except when necessary."</p>

      <p>"Unlike some captains," Walsh adds darkly. "I served under Captain Blythe on my last ship. The man flogged three men a week, for any excuse. Blood on the deck every Wednesday like clockwork."</p>

      <p>Rodgers shudders. "Captain Thornton's a saint compared to that. Just keep your head down, do your duty, and stay out of the first lieutenant's bad books. Harrow runs a tight ship."</p>

      <p>The conversation continues—war stories, complaints about the food, speculation about where the ship is bound. You listen and learn. This is your world now.</p>
    `,
    choices: [
      {
        text: "Get some rest before tomorrow",
        next: 'firstNight',
        effects: {}
      }
    ]
  },

  gunroomChallenge: {
    title: "Standing Your Ground",
    subtitle: "Challenge",
    text: `
      <p>"With respect, Caruthers, I didn't come here to discuss my education. I came to serve. If that's a problem for you, perhaps we should settle it now."</p>

      <p>The table goes silent. Caruthers' eyes narrow. For a moment you think he might actually take up the challenge—midshipmen have fought duels over less. But then he smiles, coldly.</p>

      <p>"How admirably direct. No, Mr. {playerName}, I have no desire to 'settle' anything. I merely observe that this service has standards, and I should like to know what sort of men I'm serving alongside."</p>

      <p>"Then observe this," you say. "Judge me by my conduct, not my connections."</p>

      <p>Rodgers whistles softly. "Well, new fish has teeth." He raises his mug. "To judging men by their conduct. And to surviving whatever the sea throws at us."</p>

      <p>The toast is drunk, but you've made an enemy. Caruthers will be watching for any mistake, any weakness. You'll have to prove yourself the hard way.</p>
    `,
    choices: [
      {
        text: "Get some rest before tomorrow",
        next: 'firstNight',
        effects: {}
      }
    ]
  },

  firstNight: {
    title: "First Night Aboard",
    subtitle: "Rest",
    text: `
      <p>You sling your hammock alongside the others. It takes three tries—the thing keeps flipping you out onto the deck, to Rodgers' great amusement. Finally you manage to stay in, swaying with the ship's gentle motion.</p>

      <p>The gunroom is never fully dark. The lantern burns all night, turned low. You can hear the ship's sounds: the creak of timber, the slap of water against the hull, footsteps on the deck above, the distant call of the watch. Somewhere a man is singing, the tune sad and slow.</p>

      <p>You think about home. Your family. The life you've left behind. Tomorrow the captain boards, and the day after, you sail. Into what? War? Storm? Glory or an unmarked grave at the bottom of the sea?</p>

      <p>Eventually, rocked by the ship's motion, you sleep.</p>
    `,
    choices: [
      {
        text: "Wake to your first full day aboard",
        next: 'captainBoards',
        effects: {}
      }
    ]
  },

  captainBoards: {
    title: "The Captain",
    subtitle: "First Impressions",
    text: `
      <p>At eight bells of the morning watch, Captain Thornton comes aboard. You're on deck with the other midshipmen, hat brushed, shoes blacked, trying not to fidget. The marines are drawn up in scarlet ranks. The bosun's pipes trill the salute.</p>

      <p>Captain Thornton is a lean man in his fifties, his face carved by decades of wind and sun. He wears his uniform with casual authority, and his eyes—pale blue—miss nothing. He returns the first lieutenant's salute and surveys the deck with a single sweeping glance.</p>

      <p>"Ship's company assembled, sir," Lieutenant Harrow reports.</p>

      <p>"Very good, Mr. Harrow." Thornton's voice is dry, clipped. "We weigh anchor on tomorrow's tide. Destination: Caribbean station. We're to join Admiral Boscawen's squadron at Antigua. The voyage will take six weeks if the weather holds."</p>

      <p>Six weeks. Six weeks at sea. Your stomach flutters with excitement and fear.</p>

      <p>The captain's eyes sweep across the midshipmen. They linger on you for a moment—new face. Then he nods. "Carry on, Mr. Harrow. I'll inspect the ship at four bells."</p>

      <p>He disappears below to his cabin. The tension on deck releases like a held breath.</p>
    `,
    choices: [
      {
        text: "Continue your first day of duties",
        next: 'firstWatch',
        effects: {}
      }
    ]
  },

  firstWatch: {
    title: "First Watch",
    subtitle: "On Duty",
    text: `
      <p>Your first watch begins at noon. Lieutenant Blake is the officer of the watch—a young man of twenty-five with a competent air. "Stay by me, Mr. {playerName}, and keep your eyes open. Your job is to learn, and to relay my orders to the hands when required."</p>

      <p>The ship is still at anchor, but there's work aplenty. Stores are being loaded—barrels of salt pork and beef, sacks of dried peas, wheels of hard cheese, casks of fresh water. The ship is taking on provisions for six hundred men for two months. It's a staggering amount.</p>

      <p>You watch the working parties, supervised by petty officers. The men move with practiced efficiency, though there's grumbling. "Make fast that barrel properly, damn your eyes!" a bosun's mate roars. "You want it breaking loose in a storm and staving in someone's head?"</p>

      <p>Lieutenant Blake notices your attention. "A ship is only as good as her crew, Mr. {playerName}. Officers give the orders, but the hands do the work. Remember that. Treat them fair but firm, and they'll follow you into hell. Treat them cruel or stupid, and they'll dance when you go overboard."</p>

      <p>It's a lesson worth remembering.</p>
    `,
    choices: [
      {
        text: "Continue learning your duties",
        next: 'navigationLesson',
        effects: { discipline: 1 }
      }
    ]
  },

  navigationLesson: {
    title: "The Art of Navigation",
    subtitle: "Study",
    text: `
      <p>When your watch ends, you report to Mr. Dalton, the sailing master, in his tiny cabin. Charts are spread across every surface, held down by paperweights and instruments. A sextant gleams in a felt-lined case.</p>

      <p>"Navigation," Dalton says without preamble, "is what separates a sailor from a corpse. Can you use a sextant?"</p>

      <p>You answer honestly about your level of skill. Dalton nods. "We'll start with the basics. The sun rises in the east, sets in the west. At noon, it's due south—in these latitudes. You measure its angle above the horizon with the sextant, check your tables, and that gives you your latitude. Longitude is trickier—requires an accurate chronometer and precise timing. Follow?"</p>

      <p>He spends an hour drilling you on the principles. It's fascinating, like mathematics made physical. The idea that you can find your position on a featureless ocean using only the stars and instruments—it's almost magical.</p>

      <p>"You've a good head for it," Dalton says finally. "Keep studying. Navigation is the skill that'll get you promoted, if you live long enough. Every captain needs officers who can find their way home."</p>
    `,
    choices: [
      {
        text: "Continue your education",
        next: 'gunneryLesson',
        effects: { navigation: 2 }
      }
    ]
  },

  gunneryLesson: {
    title: "The Great Guns",
    subtitle: "Gunnery",
    text: `
      <p>The master gunner is a grizzled warrant officer named Hawkins. He's missing two fingers on his left hand—the price of a misfire years ago. He takes you down to the gun deck, where thirty-two 24-pounder cannons squat like iron beasts.</p>

      <p>"This," Hawkins says, slapping a cannon affectionately, "is how battles are won. A well-trained crew can fire three broadsides in five minutes. A poorly-trained crew will kill themselves before they hurt the enemy."</p>

      <p>He walks you through the drill: the gun is run out, loaded with cartridge and ball, primed, aimed, and fired. Then the whole process again, as fast as possible, in choking smoke and deafening noise. "Every man has his job. Muzzle, sponge, cartridge, ram, prime, fire. Like a machine. And your job, Mr. {playerName}, is to make sure they do it right under fire, when the enemy is shooting back and men are dying beside them."</p>

      <p>"How do you keep them steady?" you ask.</p>

      <p>Hawkins grins with his remaining teeth. "Example, sir. They see you steady, they stay steady. You panic, they panic. Simple as that."</p>
    `,
    choices: [
      {
        text: "The ship prepares to sail",
        next: 'weighAnchor',
        effects: { gunnery: 2 }
      }
    ]
  },

  weighAnchor: {
    title: "Weighing Anchor",
    subtitle: "Departure",
    text: `
      <p>Dawn. The tide is high and the wind is fair. All hands are called. You take your station on the quarterdeck, heart pounding. This is it. You're going to sea.</p>

      <p>"Man the capstan!" The cry goes up. A hundred men lean into the capstan bars, and the great wheel begins to turn. Click, click, click. The anchor cable comes up, dripping with harbor mud. A sailor perches on the cathead, calling out the cable's direction. "Up and down, sir!"</p>

      <p>"Loose tops'ls!" The topmen race aloft. The sails drop and fill with wind. The ship shudders, like a horse feeling spurs.</p>

      <p>"Anchor's aweigh!"</p>

      <p>HMS <em>Indefatigable</em> begins to move. Slowly at first, then faster as more sail is set. Portsmouth harbor slides past. Other ships. The dockyard. The town. England. You watch it recede, and something in your chest tightens. Will you ever see it again?</p>

      <p>"Steady as she goes," Captain Thornton says calmly from the quarterdeck. "Set course southwest, Mr. Dalton. We're for the Caribbean."</p>

      <p>And you're at sea.</p>
    `,
    choices: [
      {
        text: "Your first days at sea",
        next: 'daysAtSea',
        effects: { seamanship: 1 }
      }
    ]
  },

  daysAtSea: {
    title: "Life at Sea",
    subtitle: "First Week",
    text: `
      <p>The first week is a blur of watch-keeping, drills, and sea-sickness. You discover that you have good sea legs—the motion doesn't bother you much. Pembrook is not so lucky. He spends three days hanging over the rail, green-faced and miserable.</p>

      <p>The routine is unchanging: four hours on watch, four hours off. During your watch, you assist Lieutenant Blake. Off watch, you eat, sleep, study, and drill. Gun drill, boat drill, fire drill, repelling boarders drill. Everything is practiced until it's instinct.</p>

      <p>The crew begins to take shape as individuals. Jenkins, the captain of the foretop you met on your first day, nods to you now when you pass. The cook, a one-legged man named Murphy, saves you the least weevil-infested biscuits. Slowly, you're being accepted.</p>

      <p>Or mostly accepted. Caruthers remains coolly hostile, and Walsh watches you with sharp, calculating eyes. But Rodgers is a good friend, and Morrison warms to you over shared study sessions.</p>

      <p>Then, on the eighth day out, the weather changes.</p>
    `,
    choices: [
      {
        text: "The storm arrives",
        next: 'storm',
        effects: { seamanship: 1 }
      }
    ]
  },

  storm: {
    title: "Storm",
    subtitle: "Test by Sea",
    text: `
      <p>It starts with a change in the wind. The sky to the west turns the color of a bruise, and the barometer drops. Captain Thornton orders the ship prepared for heavy weather. "Secure the guns! Double-lash everything! Reef tops'ls!"</p>

      <p>By afternoon, the storm hits. The wind shrieks through the rigging like something alive and angry. Waves thirty feet high crash over the bow. The ship pitches and rolls, her timbers groaning. You're sent aloft with a party to secure a loose sail, and the climb is terrifying—the mast whips back and forth, trying to throw you off. Below, the deck looks tiny and far away.</p>

      <p>You reach the yard and edge out along it, feet on the footrope, arms wrapped around the canvas. The wind tears at you. Rain lashes your face. But you get the sail secured, fumbling with numb fingers at the gaskets. "Well done, lads!" Lieutenant Blake shouts from below. "Get down now, smartly!"</p>

      <p>The descent is worse than the climb. Your hands are slippery, your arms shaking with exhaustion. But you make it. Safe on deck, you look up at what you've just done and can't quite believe it.</p>

      <p>Rodgers claps you on the shoulder, rain streaming down his face. "Now you're a sailor, new fish!"</p>
    `,
    choices: [
      {
        text: "The storm worsens",
        next: 'stormCrisis',
        effects: { seamanship: 2 }
      }
    ]
  },

  stormCrisis: {
    title: "Man Overboard",
    subtitle: "Crisis",
    text: `
      <p>The storm rages for two days. On the second night, exhausted and soaked, you're on watch when you hear the cry that freezes every sailor's blood: "Man overboard!"</p>

      <p>A seaman swept off the foredeck by a wave. You can see him in the water, barely visible in the darkness and spray, his arms flailing. The ship is moving fast, already past him. In minutes he'll be lost in the darkness.</p>

      <p>Lieutenant Blake doesn't hesitate. "Cut away that grating! Rope through the becket!" He turns to you. "Mr. {playerName}, can you swim?"</p>

      <p>Your heart hammers. This is insane. The sea is chaos, the water cold enough to kill in minutes. But that's a man out there, drowning.</p>
    `,
    choices: [
      {
        text: "Volunteer to go in after him",
        next: 'rescueAttempt',
        effects: { discipline: 2, seamanship: 1 }
      },
      {
        text: "Suggest throwing him a line instead",
        next: 'throwLine',
        effects: { discipline: 1 }
      }
    ]
  },

  rescueAttempt: {
    title: "Into the Sea",
    subtitle: "Heroism",
    text: `
      <p>"I can swim, sir." Your voice is steadier than you feel.</p>

      <p>"Good man." Blake ties a line around your chest. "We'll pay out the rope as you go. Reach him, get the line around him, and we'll haul you both back. Don't be a hero—if you can't reach him, signal and we'll pull you back. Clear?"</p>

      <p>You nod. Then you climb to the rail and jump.</p>

      <p>The water is shockingly cold. It drives the breath from your lungs. A wave crashes over you and you go under, the rope pulling tight around your chest. You surface, gasping, and strike out toward where you saw the man.</p>

      <p>The sea is chaos. You can't see anything but walls of dark water. Then you spot him—ten yards away, barely conscious. You swim hard, fighting the waves. Your hand closes on his shirt. "I've got you!" you shout.</p>

      <p>You get the rope around him and signal. The line goes taut. Slowly, agonizingly, you're hauled back toward the ship. Hands reach down and drag you both aboard. You lie on the deck, vomiting seawater, shaking with cold and exhaustion.</p>

      <p>But the man is alive. Jenkins, it turns out—your friend from the foretop. He grips your hand, too breathless to speak, his eyes saying everything.</p>

      <p>Captain Thornton himself appears. "Well done, Mr. {playerName}. That was bravely done." Coming from him, it's the highest praise imaginable.</p>
    `,
    choices: [
      {
        text: "Recover and continue",
        next: 'afterStorm',
        effects: { social: 2, crewReputation: 15, officerReputation: 10, jenkins: 5, blake: 2, thornton: 2, morale: 5 }
      }
    ]
  },

  throwLine: {
    title: "The Line",
    subtitle: "Quick Thinking",
    text: `
      <p>"We'll never reach him in time swimming, sir," you say rapidly. "But if we throw him a line with the grating attached—it'll float. He can grab on and we can haul him back."</p>

      <p>Blake nods sharply. "Do it! Smartly now!"</p>

      <p>You grab a coil of rope and tie it to the wooden grating. The ship is already past the man, but you race to the stern. You can just barely see him in the darkness. You swing the rope, once, twice, and throw with all your strength.</p>

      <p>The grating splashes down near him. "Grab it!" you scream into the wind. "Grab the grating!"</p>

      <p>For a terrible moment you think he hasn't heard. Then you see him lunge for it. His hands close on the wood. "Haul away!" Blake roars, and twenty men tail onto the line. Hand over hand, they drag the grating and its clinging human cargo back to the ship.</p>

      <p>They haul him aboard. It's Jenkins—the topman who was kind to you on your first day. He's half-drowned but alive, coughing up seawater. He looks at you and manages a nod.</p>

      <p>"Quick thinking, Mr. {playerName}," Lieutenant Blake says. "You may have just saved his life."</p>
    `,
    choices: [
      {
        text: "The storm passes",
        next: 'afterStorm',
        effects: { social: 1, seamanship: 1, crewReputation: 10, officerReputation: 5, jenkins: 3, blake: 2, morale: 3 }
      }
    ]
  },

  afterStorm: {
    title: "After the Storm",
    subtitle: "Consequences",
    text: `
      <p>The storm blows itself out by dawn. The ship is battered but intact. The crew works to repair damage—a split spar, torn sails, rigging that needs re-splicing. Everyone is exhausted, but there's a new feeling aboard. You survived. Together.</p>

      <p>Jenkins finds you during the afternoon watch. His face is still pale, but he's back on duty. "Mr. {playerName}," he says formally. "I owe you my life. Won't forget it, sir."</p>

      <p>"Just doing my duty," you say, embarrassed.</p>

      <p>"More than duty, sir. You risked your neck for a common seaman. The lads notice things like that." He touches his forelock and moves off, but you can feel eyes on you from around the deck. Respectful eyes.</p>

      <p>That evening in the gunroom, even Caruthers unbends slightly. "That was well done," he admits grudgingly. "Whatever else you may be, you're no coward."</p>

      <p>It's not quite friendship, but it's a start.</p>

      <p>The ship sails on, south and west, toward the Caribbean and whatever awaits you there.</p>
    `,
    choices: [
      {
        text: "Continue the voyage",
        next: 'sailingOn',
        effects: {}
      }
    ]
  },

  sailingOn: {
    title: "Fair Winds",
    subtitle: "Weeks at Sea",
    text: `
      <p>Weeks pass. The ship settles into routine. You stand your watches, study navigation and gunnery, and slowly grow more competent. Your hands develop calluses. Your balance on a moving deck becomes instinctive. You can name every sail and rope without thinking.</p>

      <p>The weather warms as you sail south. Men work stripped to the waist. Flying fish leap from the bow wave. At night, the stars are brilliant—different constellations now, the southern cross visible above the horizon.</p>

      <p>You're studying navigation with Mr. Dalton one afternoon when a cry comes from the masthead: "Sail ho! Two points off the starboard bow!"</p>

      <p>Instantly, the ship changes. Men run to their stations. Officers appear on deck. Captain Thornton climbs to the quarterdeck with his telescope. You hold your breath. Is it friend or enemy? Merchant or warship?</p>

      <p>The captain studies the distant sail for long minutes. Then he closes his telescope with a snap. "French frigate," he says calmly. "Beat to quarters, Mr. Harrow. We're going into action."</p>

      <p>Your first battle. Your stomach drops, but your feet are already moving. This is what you trained for. This is what you're here for.</p>

      <p>This is war.</p>
    `,
    choices: [
      {
        text: "Race to your battle station",
        next: 'beatToQuarters',
        effects: { discipline: 1 }
      }
    ]
  },

  beatToQuarters: {
    title: "Beat to Quarters",
    subtitle: "Preparing for Action",
    text: `
      <p>The marine drummer begins the rapid tattoo. <em>Rat-tat-tat, rat-tat-tat, rat-tat-tat.</em> Beat to quarters. Every man runs to his station. The gun deck explodes with activity.</p>

      <p>You're assigned to the forward guns on the starboard side—six 24-pounders, each crewed by eight men. Your job is to supervise them, relay orders, and keep them fighting even under fire. You check each gun: the powder cartridges stored safely, the shot racked ready, the slow-match burning in its tub, every tool in place.</p>

      <p>The gun crews look at you—some eager, some afraid, all waiting for orders. These are your men now. You're responsible for them.</p>

      <p>"Load!" you order, your voice sounding strange to your own ears. "Cartridge and ball! Run out!"</p>

      <p>They move through the drill you've practiced a hundred times. The guns are loaded, primed, and run out through the ports. Below you, the sea slides past. Above, you can hear Captain Thornton calling orders. The enemy frigate is closing—you can see her now, white sails against blue sky, the French tricolor streaming from her mizzen.</p>

      <p>This is real. In minutes, those guns will fire at you. And you'll fire back.</p>
    `,
    choices: [
      {
        text: "Wait for the order to fire",
        next: 'firstBroadside',
        effects: { gunnery: 1 }
      }
    ]
  },

  firstBroadside: {
    title: "First Broadside",
    subtitle: "Action",
    text: `
      <p>The two ships close. Five hundred yards. Four hundred. Three hundred. You can see men on the French frigate's deck, tiny figures running to their guns. A flag runs up her halyard—a signal, or perhaps a challenge.</p>

      <p>"As you bear!" Captain Thornton's voice carries down from the quarterdeck. "Fire!"</p>

      <p>"Fire!" you scream to your gun crews. Six fingers jerk six lanyards. The guns roar.</p>

      <p>The noise is indescribable—like being inside a thunderstorm. Smoke billows back through the gun ports, acrid and choking. The deck shudders under your feet. You can't see anything, can't hear anything but ringing in your ears.</p>

      <p>"Reload!" you shout, though you can barely hear yourself. "Sponge! Cartridge! Ram!"</p>

      <p>The crews move like automatons. They've drilled this a thousand times. Load, run out, fire. Load, run out, fire. The wind clears some of the smoke and you see the French frigate. Your broadside struck home—there are holes in her hull, a tangle of rigging fallen on her deck. But she's firing back.</p>

      <p>You hear the scream of incoming shot. Wood explodes somewhere aft. A man screams—high and terrible. But you keep your eyes on your guns. Load. Run out. Fire. This is your world now. Do your job. Keep your men working. Stay alive.</p>
    `,
    choices: [
      {
        text: "Continue the action",
        next: 'battleContinues',
        effects: { gunnery: 2, discipline: 1 }
      }
    ]
  },

  battleContinues: {
    title: "The Fight Continues",
    subtitle: "Under Fire",
    text: `
      <p>The two ships pound each other. Broadside after broadside. The noise, the smoke, the chaos—it's like hell itself. One of your guns takes a direct hit from enemy shot. The carriage disintegrates, and two men go down, screaming. You force yourself to look away. There's nothing you can do for them—the surgeon will handle it, or they'll die. Your job is the five guns still firing.</p>

      <p>"Keep at it, lads!" you shout. "You're doing well! Faster! Give them hell!"</p>

      <p>Through the smoke you see the French frigate. She's badly mauled—her main topmast is gone, sails dragging in the water. But she's still fighting. Respect for an enemy who won't quit rises in you despite everything.</p>

      <p>Then Captain Thornton's voice, calm as ever: "Cease fire! She's struck! She's struck her colors!"</p>

      <p>Gradually the noise dies. The smoke clears. The French frigate is dead in the water, her flag pulled down. She's surrendering. The battle is over.</p>

      <p>You've won. You're alive. You've been in combat and you didn't run. You did your duty.</p>

      <p>Around you, men are slumping against the guns, exhausted. Some are praying. Others are laughing with the hysteria of survival. You realize you're shaking, but whether from fear or exhilaration you can't tell.</p>
    `,
    choices: [
      {
        text: "Survey the damage and casualties",
        next: 'afterBattle',
        effects: {}
      }
    ]
  },

  afterBattle: {
    title: "After the Battle",
    subtitle: "Victory's Price",
    text: `
      <p>The butcher's bill: seven dead, fourteen wounded. Not heavy, for a naval action, but each one is a man who woke up this morning and will never wake again. You help carry the wounded to the surgeon. The gun deck smells of blood and burnt powder.</p>

      <p>The French frigate—the <em>Téméraire</em>, thirty-eight guns—is taken as a prize. A prize crew is sent across, led by Lieutenant Blake. "Well done, Mr. {playerName}," he says before he goes. "Your guns kept firing. That's what wins battles—steady fire, faster than the enemy. Remember that."</p>

      <p>That evening, Captain Thornton addresses the ship's company. "The prize will be sold when we reach port. A 38-gun frigate in good condition—that's eight thousand pounds, perhaps more. Every man shares in it. Even a midshipman's portion should be forty pounds or thereabouts." Your eyes widen. Forty pounds! That's more money than you've ever had.</p>

      <p>In the gunroom that night, the mood is subdued. You've seen combat now. Caruthers raises his glass. "To absent friends," he says quietly.</p>

      <p>"Absent friends," you all echo.</p>

      <p>The ship sails on, toward the Caribbean. You're a different person than the boy who came aboard in Portsmouth. The sea has begun to make you into something new.</p>
    `,
    choices: [
      {
        text: "Continue your naval career",
        next: 'arriveAntigua',
        effects: { prizeMoney: 42, gunnery: 1, officerReputation: 5, blake: 3, thornton: 2, rodgers: 1 }
      }
    ]
  },

  arriveAntigua: {
    title: "Antigua",
    subtitle: "Caribbean Station",
    text: `
      <p>Five weeks after the battle, you sight Antigua. The island rises green from turquoise water, rimmed with white beaches. After weeks at sea, land—any land—looks like paradise.</p>

      <p>English Harbour is crowded with warships: ships of the line, frigates, sloops. The squadron assembled to protect British interests in the Caribbean and prey on French and Spanish shipping. Admiral Boscawen's flag flies from a three-decker at the head of the anchorage.</p>

      <p>The moment the ship anchors, a boat comes alongside. You watch as a post-captain climbs aboard—senior to Captain Thornton, here on the Admiral's business. They speak briefly, then Thornton calls, "Mr. Harrow! Mr. {playerName}! Attend me."</p>

      <p>In his cabin, Thornton looks tired but satisfied. "Gentlemen, the Admiral desires an officer from this ship for a particular service. Mr. {playerName}, you're to report aboard HMS <em>Swift</em>, Captain Morrison commanding. She's a 16-gun brig—fast, handy, perfect for independent cruising. This is a good opportunity. Take it."</p>

      <p>A new ship. A smaller vessel where you'll have more responsibility. It's both exciting and terrifying.</p>
    `,
    choices: [
      {
        text: "Accept the transfer eagerly",
        next: 'moreTocome',
        effects: { discipline: 1, officerReputation: 3 }
      },
      {
        text: "Accept, but express reluctance to leave your shipmates",
        next: 'moreTocome',
        effects: { social: 1, rodgers: 1, jenkins: 1 }
      }
    ]
  },

  moreTocome: {
    title: "HMS Swift",
    subtitle: "New Assignment",
    text: `
      <p>You say your farewells in <em>Indefatigable</em>'s gunroom. Rodgers grips your hand. "Lucky bastard. Independent cruising on a brig—that's the life. Just try not to get your head blown off." Even Caruthers nods coolly. "Good hunting, {playerName}."</p>

      <p>HMS <em>Swift</em> is tiny compared to <em>Indefatigable</em>—just 90 feet long, 16 guns, and 65 souls aboard. But she's fast and handy, perfect for chasing down smugglers and privateers in the islands. Captain Morrison is a hard-eyed man of thirty, a commander waiting for his post-captain promotion. He wastes no time on pleasantries.</p>

      <p>"You're senior midshipman, Mr. {playerName}. When I'm ashore or incapacitated, the ship is yours. We cruise independently—no fleet, no admirals watching. That means prize money, but also risk. Questions?"</p>

      <p>"No, sir."</p>

      <p>"Good. We sail at dawn. We're hunting a French privateer that's been taking British merchantmen off Guadeloupe. Find her, take her, and we all get rich. Fail, and we all hang. Simple enough."</p>

      <p>Your new life begins.</p>
    `,
    choices: [
      {
        text: "Get to work preparing the ship",
        next: 'swiftCruising',
        effects: { discipline: 1 }
      }
    ]
  },

  swiftCruising: {
    title: "Hunting",
    subtitle: "Three Weeks Later",
    text: `
      <p>Three weeks of cruising the Leeward Islands. The work is endless—standing watch, drilling guns, managing stores. The heat is crushing. Men collapse from sun-stroke. The water tastes foul, and weevils infest everything.</p>

      <p>But you're learning. On a small ship, every officer must do everything. You navigate by the stars, command gun drills, settle disputes between the crew. Morrison watches you constantly, judging.</p>

      <p>Then, at dawn on a Tuesday, the lookout calls: "Sail ho! Three points to larboard!"</p>

      <p>Through the glass, you see her—a schooner, low and fast, with too many guns for honest trade. Morrison grins like a wolf. "That's our privateer. Beat to quarters, Mr. {playerName}. Let's see if she'll run or fight."</p>

      <p>The chase lasts four hours. <em>Swift</em> is fast, but the schooner is faster. You're closing, but barely. Morrison turns to you. "We could crowd on more sail—risk carrying away a mast—or we could fire the bow chasers, try to cripple her rigging."</p>
    `,
    choices: [
      {
        text: "Crowd on more sail—risk it for speed",
        next: 'privateerTaken',
        effects: { seamanship: 1, morale: -3 }
      },
      {
        text: "Fire the bow chasers—precision over speed",
        next: 'privateerTaken',
        effects: { gunnery: 1, discipline: 1 }
      }
    ]
  },

  privateerTaken: {
    title: "First Prize",
    subtitle: "Victory",
    text: `
      <p>Your choice works. The privateer's foremast comes down in a tangle of canvas and rope. <em>Swift</em> closes the distance and fires a broadside. The privateer strikes her colors—surrenders—before you can board her.</p>

      <p>She's the <em>Renard</em>, 12 guns, with a hold full of stolen cargo: sugar, rum, tobacco. Morrison is delighted. "A fine prize! Worth three thousand pounds at least. Your share, Mr. {playerName}, will be forty pounds or so." He pauses. "I'm putting you in command of the prize crew. Sail her to Antigua and turn her over to the prize court. It's four days' sailing, and you'll have just eight men. Think you can manage?"</p>

      <p>Eight men to sail a damaged ship across open water, with the possibility of French warships, storms, or mutiny. This is both terrifying and thrilling.</p>

      <p>"Yes, sir. I can manage."</p>

      <p>"Good man. Here's hoping I see you in Antigua. If not—well, the sea claims us all eventually."</p>
    `,
    choices: [
      {
        text: "Take command of your first ship",
        next: 'prizeCommand',
        effects: { discipline: 1, officerReputation: 5, morale: 5 }
      }
    ]
  },

  prizeCommand: {
    title: "Prize Command",
    subtitle: "Alone at Sea",
    text: `
      <p>Four days alone at sea with eight men, sailing a damaged schooner to port. This is what you trained for, but the reality is harder than you imagined.</p>

      <p>The men are suspicious—half of them are former <em>Swift</em> hands, the other half are French prisoners who agreed to work rather than be locked in the hold. You sleep in two-hour intervals, never fully at rest. Navigation by dead reckoning and sun sights. Constant vigilance for sails on the horizon.</p>

      <p>On the third day, one of the Frenchmen—a wiry man named Dubois—approaches you. "Monsieur," he says quietly, "there is gold hidden aboard. The captain's secret cache. If you help me retrieve it, we split it. Two hundred pounds each. No one needs to know."</p>

      <p>You could use two hundred pounds. But it's theft, and if you're caught, you'll be court-martialed. What Morrison doesn't know won't hurt him... or will it?</p>
    `,
    choices: [
      {
        text: "Take the gold—you earned it with the risk you're taking",
        next: 'arriveAntigua2',
        effects: { prizeMoney: 200, social: -2, officerReputation: -5, discipline: -2 }
      },
      {
        text: "Refuse—you're an officer, not a thief",
        next: 'arriveAntigua2',
        effects: { discipline: 2, officerReputation: 5, social: 1 }
      },
      {
        text: "Report it to Morrison when you arrive—let him decide",
        next: 'arriveAntigua2',
        effects: { discipline: 1, officerReputation: 3, prizeMoney: 50 }
      }
    ]
  },

  arriveAntigua2: {
    title: "Safe Arrival",
    subtitle: "Antigua Harbor",
    text: `
      <p>You bring the <em>Renard</em> safely into English Harbour. Morrison greets you at the dock, genuinely pleased. "Well done, {playerName}. I wasn't sure you'd make it."</p>

      <p>The prize is condemned and sold. Your share: £38 from the sale, plus whatever choice you made about the gold. You're richer than you've ever been, but the question is: what do you do with it?</p>

      <p>In the harbor chandleries, you see options: a beautiful telescope (£30, would help your navigation), a fine sword (£25, might save your life in boarding actions), navigation books (£20, help you study for lieutenant). Or you could save it all, invest it in merchant cargo for speculation, or spend it on rum for <em>Swift</em>'s crew to boost morale.</p>

      <p>What you choose now might matter later.</p>
    `,
    choices: [
      {
        text: "Buy the telescope—invest in your skills",
        next: 'swiftReturns',
        effects: { prizeMoney: -30, navigation: 2 }
      },
      {
        text: "Buy the sword and look like a proper officer",
        next: 'swiftReturns',
        effects: { prizeMoney: -25, social: 1, discipline: 1 }
      },
      {
        text: "Buy navigation books to study for lieutenant",
        next: 'swiftReturns',
        effects: { prizeMoney: -20, navigation: 1, discipline: 1 }
      },
      {
        text: "Spend £15 on rum for the crew—they've earned it",
        next: 'swiftReturns',
        effects: { prizeMoney: -15, crewReputation: 10, morale: 10 }
      },
      {
        text: "Save every penny—you'll need it for advancement",
        next: 'swiftReturns',
        effects: { discipline: 1 }
      }
    ]
  },

  swiftReturns: {
    title: "Back to Sea",
    subtitle: "Two Months Later",
    text: `
      <p>Two months of cruising. You take three more prizes—small ones, fishing boats and a Spanish coaster. Your share adds another £30 to your purse. The crew knows you now, respects you. Morrison gives you more responsibility.</p>

      <p>Then one morning, Morrison calls you to his cabin. He looks troubled. "We have orders. Admiral wants us to rejoin the squadron off Martinique in three days. But..." He taps the chart. "I received intelligence. A Spanish merchantman, heavily loaded, is making for Havana. She's fat, slow, and worth ten thousand pounds. We could intercept her—but it means disobeying the Admiral's direct order."</p>

      <p>He looks at you. "What would you do, Mr. {playerName}? Follow orders like a good officer, or chase the prize and claim we had navigational difficulties? Your opinion matters."</p>

      <p>This is a test. What you say will define you.</p>
    `,
    choices: [
      {
        text: "\"Chase the prize, sir. Fortune favors the bold.\"",
        next: 'chasePrize',
        effects: { social: 1, officerReputation: -5 }
      },
      {
        text: "\"Follow orders, sir. Duty before profit.\"",
        next: 'followOrders',
        effects: { discipline: 2, officerReputation: 10 }
      },
      {
        text: "\"Split the difference—chase briefly, then rejoin if we don't find her quickly.\"",
        next: 'compromise',
        effects: { discipline: 1, social: 1 }
      }
    ]
  },

  chasePrize: {
    title: "The Chase",
    subtitle: "Greed and Glory",
    text: `
      <p>Morrison grins. "I like your spirit." He orders the course changed. The crew cheers—they know what a ten-thousand-pound prize means. You hunt for two days.</p>

      <p>You find the merchantman. She's everything Morrison promised—huge, wallowing, helpless. <em>Swift</em> fires a warning shot and she strikes immediately. The hold is stuffed with silver ingots from the Mexican mines. Your share will be £150 at least.</p>

      <p>But when you return to the squadron, you're five days late. The Admiral is furious. Morrison is reprimanded in front of the entire fleet. His career takes a blow. He doesn't blame you—you only advised—but you see the cost of greed.</p>

      <p>The money is real. So is the stain on Morrison's record.</p>
    `,
    choices: [
      {
        text: "Reflect on the choice",
        next: 'hurricaneWarning',
        effects: { prizeMoney: 150, officerReputation: -5, morale: 10 }
      }
    ]
  },

  followOrders: {
    title: "Duty First",
    subtitle: "The Right Choice?",
    text: `
      <p>Morrison nods slowly. "You're right, of course. Orders are orders." He sounds disappointed but not surprised. <em>Swift</em> turns toward Martinique.</p>

      <p>You rejoin the squadron precisely on time. The Admiral personally commends Morrison for punctuality and discipline. You get no prize money, but you've earned a reputation: reliable, trustworthy, the kind of officer who can be counted on.</p>

      <p>Later, you hear the Spanish merchantman was taken by a French privateer. Ten thousand pounds, gone to the enemy. Morrison doesn't say anything, but you can see him wondering: what if?</p>

      <p>You chose duty over wealth. Time will tell if it was wise.</p>
    `,
    choices: [
      {
        text: "Continue serving",
        next: 'hurricaneWarning',
        effects: { officerReputation: 15, discipline: 2 }
      }
    ]
  },

  compromise: {
    title: "The Middle Path",
    subtitle: "Splitting the Difference",
    text: `
      <p>Morrison considers. "One day's chase. If we don't sight her, we make for Martinique." It's a reasonable compromise.</p>

      <p>You hunt for a day, but the Spanish ship is nowhere to be found—bad intelligence, or she changed course. Morrison turns back toward the squadron. You arrive one day late, not five. The Admiral frowns but accepts Morrison's explanation of contrary winds.</p>

      <p>No prize, but no disgrace either. Morrison respects your judgment—cautious but not cowardly. You've avoided both extremes and maintained your reputation.</p>

      <p>Sometimes the middle path is wisest.</p>
    `,
    choices: [
      {
        text: "Return to the squadron",
        next: 'hurricaneWarning',
        effects: { officerReputation: 5, discipline: 1 }
      }
    ]
  },

  hurricaneWarning: {
    title: "Storm Season",
    subtitle: "August 1752",
    text: `
      <p>August in the Caribbean. Hurricane season. The air feels heavy, oppressive. The barometer drops steadily. Veteran sailors watch the sky and mutter.</p>

      <p>You're at sea when you see it: a wall of black clouds to the east, moving fast. The wind shifts, then dies completely. An eerie calm settles over the water. Every man aboard knows what this means.</p>

      <p>Morrison's face is grim. "Hurricane. Coming right at us." He turns to you. "We can run before it—try to outrace the storm south. Or we can find shelter—there's a bay on the leeward side of Dominica, thirty miles north. Shelter means we might get caught on a lee shore if we can't anchor properly. Running means we face the open ocean in a hurricane."</p>

      <p>Both options are terrible. Men will die either way. The choice is yours.</p>
    `,
    choices: [
      {
        text: "\"Run south, sir—open water is safer than a lee shore.\"",
        next: 'hurricane',
        effects: { seamanship: 1, flags: { hurricaneChoice: 'run' } }
      },
      {
        text: "\"Make for shelter, sir—we can ride it out at anchor.\"",
        next: 'hurricane',
        effects: { navigation: 1, flags: { hurricaneChoice: 'shelter' } }
      }
    ]
  },

  hurricane: {
    title: "The Hurricane",
    subtitle: "Survival",
    text: `
      <p>The hurricane hits like the wrath of God.</p>

      <p>Wind that screams. Waves forty feet high. Rain so thick you can't breathe. The ship pitches and rolls, timbers groaning. Men lash themselves to the deck to avoid being swept overboard. You can't see ten feet in any direction.</p>

      <p>For eighteen hours, you fight. Every man does his duty or dies. Your skills matter now—seamanship to handle the sails, discipline to keep the crew from panicking, navigation to know where you are in the chaos.</p>

      <p>The mast cracks. A wave carries away two men—you hear their screams for half a second before the wind drowns them. The pumps work constantly, but water pours in faster. If the crew loves you, they'll work until they drop. If they don't, they'll give up.</p>

      <p>You survive because you're skilled, or lucky, or both. When the storm finally passes, the sun rises on a different world.</p>
    `,
    choices: [
      {
        text: "Assess the damage",
        next: 'afterHurricane',
        effects: { seamanship: 2 }
      }
    ]
  },

  afterHurricane: {
    title: "Aftermath",
    subtitle: "The Cost",
    text: `
      <p><em>Swift</em> is a wreck. The mainmast is cracked, sails torn, rigging in tangles. You lost six men—swept overboard or crushed by falling spars. The survivors are exhausted, traumatized.</p>

      <p>Morrison is alive, but barely. A falling block struck his head. He's conscious but dazed, unable to command. The ship is yours now.</p>

      <p>You limp into Antigua three days later, jury-rigged and barely floating. The harbor is full of wrecks—the hurricane destroyed a dozen ships. You're one of the lucky ones.</p>

      <p>The Admiral summons you. In his cabin, he looks at you with new eyes. "Mr. {playerName}, Captain Morrison speaks highly of you. He's being invalided home—that head injury is serious. I'm giving you an acting promotion to Lieutenant and assigning you to HMS <em>Valiant</em>, a 74-gun ship of the line. You've earned it."</p>

      <p>Lieutenant. You've done it. And it only cost six men's lives.</p>
    `,
    choices: [
      {
        text: "Accept the promotion",
        next: 'endAct1',
        effects: { rank: 'Lieutenant', officerReputation: 10, discipline: 2, ship: 'HMS Valiant' }
      }
    ]
  },

  endAct1: {
    title: "Act One Complete",
    subtitle: "The Young Gentleman",
    text: `
      <p><strong>1750-1752: Your Journey So Far</strong></p>

      <p>You joined the Navy as a fifteen-year-old midshipman. You survived your first storm, fought your first battle, and commanded your first ship. You've earned prize money and a reputation—good or bad—with officers and crew alike.</p>

      <p>You've been promoted to Lieutenant through a combination of skill, courage, and survival. Six men died in the hurricane. Some of your decisions were wise. Others, you'll question for the rest of your life.</p>

      <p>Now you stand on the threshold of the next chapter: HMS <em>Valiant</em>, a mighty ship of the line. Bigger responsibilities. Higher stakes. The road to post-captain—and your own command—begins here.</p>

      <p><strong>Act Two awaits...</strong></p>

      <p><em>Check your stats in the sidebar to see how your choices shaped you.</em></p>
    `,
    choices: [
      {
        text: "Continue to Act Two (Coming soon...)",
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
      if (key === 'background' || key === 'rank' || key === 'ship') {
        // Direct assignment for string values
        gameState[key] = choice.effects[key];
        console.log(`${key} set to: ${choice.effects[key]}`);
      } else if (gameState.relationships.hasOwnProperty(key)) {
        // Handle relationship changes (numeric)
        gameState.relationships[key] += choice.effects[key];
        console.log(`Relationship with ${key} changed by ${choice.effects[key]}, now ${gameState.relationships[key]}`);
      } else if (gameState.hasOwnProperty(key)) {
        // Handle numeric stats
        gameState[key] += choice.effects[key];
        console.log(`${key} changed by ${choice.effects[key]}, now ${gameState[key]}`);
      } else {
        // Everything else goes to flags
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
  document.getElementById('prize').textContent = '£' + gameState.prizeMoney;
  document.getElementById('seamanship').textContent = gameState.seamanship;
  document.getElementById('gunnery').textContent = gameState.gunnery;
  document.getElementById('navigation').textContent = gameState.navigation;
  document.getElementById('discipline').textContent = gameState.discipline;
  document.getElementById('social').textContent = gameState.social;
  document.getElementById('crew-rep').textContent = gameState.crewReputation;
  document.getElementById('officer-rep').textContent = gameState.officerReputation;
  document.getElementById('morale').textContent = gameState.morale;
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
    gameState.ship = 'HMS Indefatigable';
    gameState.seamanship = 0;
    gameState.gunnery = 0;
    gameState.navigation = 0;
    gameState.discipline = 0;
    gameState.social = 0;
    gameState.crewReputation = 50;
    gameState.officerReputation = 50;
    gameState.prizeMoney = 0;
    gameState.morale = 50;
    gameState.relationships = {
      jenkins: 0,
      rodgers: 0,
      caruthers: 0,
      blake: 0,
      harrow: 0,
      thornton: 0
    };
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
  document.getElementById('load-btn').addEventListener('click', function() {
    if (loadStory()) {
      renderScene(gameState.currentScene);
      showNotification('Progress Loaded');
    } else {
      showNotification('No saved game found');
    }
  });
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
