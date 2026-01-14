// ============================================
// HIS MAJESTY'S SERVICE
// An Interactive Naval Novel
// Royal Navy, 18th Century
// ============================================

// Game State - Full Career Tracking
const gameState = {
  // Personal Info
  playerName: '',
  background: null,

  // Core Stats (0-100)
  seamanship: 0,
  gunnery: 0,
  navigation: 0,
  discipline: 0,
  socialStanding: 0,

  // Career Progression
  rank: 'Midshipman',
  seaTime: 0, // Days at sea
  currentVessel: {
    name: '',
    class: '',
    guns: 0,
    condition: 100,
    crewMorale: 50
  },

  // Time Tracking
  date: {
    day: 15,
    month: 3, // March
    year: 1750
  },

  // Reputation & Standing
  admiraltyFavor: 50,
  crewLoyalty: 50,
  officerRespect: 50,

  // Story Progress
  currentScene: 'characterCreation',
  choices: {},
  flags: {},

  // Permadeath tracking
  alive: true,
  beached: false
};

// Scene Database - Novel-Length Content
const scenes = {

  characterCreation: {
    title: 'His Majesty\'s Service',
    subtitle: 'The Year of Our Lord, 1750',
    text: `The morning mist clings to the Thames like a shroud. From your window at the Three Crowns tavern in Portsmouth, you can see the forest of masts rising from the harbor—frigates, sloops, ships of the line. Somewhere among them waits your future.

    You are fifteen years old. In the world beyond these shores, empires clash and fortunes are won at the point of a cutlass. The Spanish hold the Caribbean. The French eye the Indies. The Royal Navy stands between Britain and oblivion, and you have secured a position as a midshipman—the lowest rung of the commissioned ladder, but a commissioned officer nonetheless.

    Your trunk is packed. Your dirk hangs at your side, the blade barely sixteen inches but marking you as a gentleman. Tomorrow you report aboard ship. Tonight, you consider the path that brought you here.

    Your father served in the Navy. That much is certain. But the circumstances of your appointment—the connections that secured your warrant—speak volumes about the man you will become.`,

    choices: [
      {
        text: 'The Yellow Admiral\'s Son: Your father retired a Rear-Admiral, though he never flew his flag at sea. You have wealth, connections, and the Admiralty\'s favor—but the common sailors will know you bought your way aboard.',
        action: () => {
          gameState.background = 'admiral';
          gameState.socialStanding = 70;
          gameState.admiraltyFavor = 70;
          gameState.seamanship = 20;
          gameState.gunnery = 20;
          gameState.navigation = 30;
          gameState.discipline = 40;
          gameState.officerRespect = 60;
          gameState.crewLoyalty = 20;
          return 'nameEntry';
        }
      },
      {
        text: 'The Tar-Born Midshipman: Your father was a sailing master who died at Cartagena. You were raised in the lower deck, promoted from able seaman. You know every rope and sail—but the wardroom sees you as common.',
        action: () => {
          gameState.background = 'tarborn';
          gameState.socialStanding = 20;
          gameState.admiraltyFavor = 30;
          gameState.seamanship = 70;
          gameState.gunnery = 50;
          gameState.navigation = 40;
          gameState.discipline = 40;
          gameState.officerRespect = 30;
          gameState.crewLoyalty = 70;
          return 'nameEntry';
        }
      },
      {
        text: 'The Mathematical Prodigy: Your father was a surveyor, and you inherited his gift for calculation. The Admiralty needs navigators desperately, and your skill with the sextant earned your warrant—but you\'ve never been to sea.',
        action: () => {
          gameState.background = 'mathematician';
          gameState.socialStanding = 40;
          gameState.admiraltyFavor = 50;
          gameState.seamanship = 20;
          gameState.gunnery = 15;
          gameState.navigation = 75;
          gameState.discipline = 50;
          gameState.officerRespect = 50;
          gameState.crewLoyalty = 40;
          return 'nameEntry';
        }
      }
    ]
  },

  nameEntry: {
    title: 'Your Name',
    subtitle: 'Identity',
    text: `The warrant in your trunk bears your name. What name did your mother give you?

    <div class="name-entry-container">
      <input type="text" id="player-name-input" placeholder="Enter your name (e.g., William Turner)" class="name-input" autocomplete="off" />
    </div>`,

    choices: [
      {
        text: 'Confirm Name and Continue',
        action: () => {
          const nameInput = document.getElementById('player-name-input');
          const name = nameInput ? nameInput.value.trim() : '';
          if (name && name.length > 0) {
            gameState.playerName = name;
            return 'shipAssignment';
          } else {
            showNotification('Name Required', 'Please enter your name before continuing');
            return 'nameEntry';
          }
        }
      }
    ]
  },

  shipAssignment: {
    title: 'Orders',
    subtitle: 'Portsmouth Harbor',
    text: `${gameState.playerName}.

    You speak it aloud, testing how it sounds with "Midshipman" before it. The innkeeper's daughter brings your breakfast—salt pork and ship's biscuit, to accustom your stomach to what's coming—and hands you a sealed letter.

    Your orders.

    The wax bears the Admiralty seal. Your hands shake slightly as you break it open. Inside, in a clerk's careful script:

    <em>"Mr. ${gameState.playerName} is hereby directed and required to repair aboard ${getShipAssignment()} at Portsmouth, there to serve as Midshipman under Captain ${getCaptainName()}. He is to conduct himself with diligence and sobriety befitting an Officer in His Majesty's Service, upon pain of Court Martial."</em>

    ${getShipDescription()}

    You have until tomorrow's first bell. Tonight, you could spend your final hours ashore in several ways—each will affect how you board tomorrow.`,

    choices: [
      {
        text: 'Study your Seamanship: Visit the chandlery and study knots, blocks, and tackle. Tomorrow you\'ll at least recognize the equipment. (+5 Seamanship)',
        action: () => {
          updateStats({ seamanship: 5 });
          return 'firstMorning';
        }
      },
      {
        text: 'Drink with the sailors: Find the taverns where the pressed men gather. Learn the songs, the slang, the complaints. You\'ll be one of them tomorrow. (+5 Crew Loyalty)',
        action: () => {
          updateStats({ crewLoyalty: 5 });
          return 'firstMorning';
        }
      },
      {
        text: 'Call on the Captain: Present yourself early at the Captain\'s lodgings. Bold, perhaps presumptuous—but he\'ll remember your name. (+5 Officer Respect)',
        action: () => {
          updateStats({ officerRespect: 5 });
          return 'firstMorning';
        }
      },
      {
        text: 'Rest and pray: Tomorrow begins a new life. Sleep, and prepare your soul for whatever Providence brings. (+5 Discipline)',
        action: () => {
          updateStats({ discipline: 5 });
          return 'firstMorning';
        }
      }
    ]
  },

  firstMorning: {
    title: 'First Morning',
    subtitle: `${gameState.currentVessel.name}, ${getDateString()}`,
    text: `The ship's boat makes its final approach. You sit stiffly in the stern sheets, your trunk between your knees, trying to look as if you've done this a thousand times. The watermen row with practiced efficiency, their oars dipping and rising in perfect unison.

    And then she rises before you.

    ${gameState.currentVessel.name}.

    Books and paintings fail to capture the sheer presence of a warship at anchor. She towers above the boat, her hull a wall of oak and tar, her gunports like dead eyes watching your approach. The bowsprit juts forward like a lance. Rigging climbs toward the sky in a web so complex you cannot trace a single line from deck to yardarm.

    Men move across her decks and climb her ratlines. From here they look like insects, but each is a specialist—able seaman, topman, waisters, idlers. Three hundred souls, and you must learn to command them.

    The boat hooks on. A boatswain's mate peers down.

    "Step lively, young sir. Mind your head on the gunwale."

    Your foot finds the entry port. Hands—whose, you cannot tell—steady your elbow. And then you are aboard, your shoes striking the holy deck of a ship of His Majesty's Navy for the first time as a commissioned officer.

    A lieutenant stands before you, his face weathered to leather, his eyes measuring you in an instant.

    "You'll be ${gameState.playerName}, then." It is not a question. "I am Mr. Hawthorne, First Lieutenant. The Captain is ashore until tomorrow. You'll berth in the cockpit with the other young gentlemen. Stow your dunnage and report to the quarterdeck in ten minutes."

    He pauses, and you see something in his expression—not quite sympathy, not quite contempt.

    "Welcome to the Service, Mr. ${gameState.playerName}. God help you."`,

    choices: [
      {
        text: 'Ask a question about your duties',
        action: () => {
          return 'firstQuestion';
        }
      },
      {
        text: 'Report immediately: "Aye aye, sir." Obey without question.',
        action: () => {
          updateStats({ discipline: 3 });
          advanceTime(0, 0, 0); // Same day, track it
          return 'cockpit';
        }
      }
    ]
  },

  firstQuestion: {
    title: 'First Impression',
    subtitle: `${gameState.currentVessel.name}`,
    text: `Mr. Hawthorne's eyebrow rises fractionally. Around you, work continues—holystoning the deck, coiling lines, checking the running rigging. A midshipman asking questions on his first day is either confident or foolish, and the First Lieutenant is deciding which.

    "Speak quickly, Mr. ${gameState.playerName}. I have a ship to prepare for sea."`,

    choices: [
      {
        text: '"What are my watch duties, sir?" - A practical question',
        action: () => {
          updateStats({ seamanship: 2 });
          return 'practicalAnswer';
        }
      },
      {
        text: '"When do we sail, sir?" - Eager for action',
        action: () => {
          updateStats({ gunnery: 2 });
          return 'eagerAnswer';
        }
      },
      {
        text: '"Beg pardon, sir. I\'ll report as ordered." - Withdraw the question',
        action: () => {
          updateStats({ discipline: 3 });
          return 'cockpit';
        }
      }
    ]
  },

  practicalAnswer: {
    title: 'The First Lieutenant',
    subtitle: `${gameState.currentVessel.name}`,
    text: `Something in Hawthorne's expression shifts—not quite approval, but a grudging acknowledgment.

    "You'll stand watch with Mr. Pelham, the Second Lieutenant. Four hours on, four hours off, except during the dog watches when we split them to rotate the sequence. You'll take noon sights when weather permits, keep the log, relay orders, and generally make yourself useful without being underfoot."

    He glances at the organized chaos of the deck.

    "A ${gameState.currentVessel.class} is not a pleasure yacht, Mr. ${gameState.playerName}. Every rope has a name, every man has a station, and God help you if you call a sheet a shroud within the Captain's hearing. Learn fast or wash out. We've no time for gentlemen's sons playing at sailors."

    The words should sting, but his tone lacks real malice. He's testing you.

    "Ten minutes. Cockpit is down the forward hatch, through the gundeck, past the galley. Ask for Mr. Pelham if you get lost. Dismissed."`,

    choices: [
      {
        text: 'Find the cockpit',
        action: () => {
          return 'cockpit';
        }
      }
    ]
  },

  eagerAnswer: {
    title: 'Ambition',
    subtitle: `${gameState.currentVessel.name}`,
    text: `Hawthorne's mouth twitches—amusement or annoyance, you cannot tell.

    "Eager for action, are we? Tomorrow on the morning tide, if the wind holds from the east. We're bound for the West Indies, Mr. ${gameState.playerName}. Spanish privateers, yellow fever, and hurricanes. You'll have action enough to satisfy any appetite, assuming you survive to taste it."

    He steps closer, voice dropping.

    "I've seen boys like you before. Well-born, full of fire, certain they'll be admirals by thirty. Some make captain. Some make post. Some go over the side in their first boarding action with their guts on the outside. The difference is not courage—courage is common. The difference is seamanship, discipline, and keeping your head when the iron starts flying."

    He straightens.

    "Ten minutes. Find your berth. Dismissed."`,

    choices: [
      {
        text: 'Find the cockpit',
        action: () => {
          return 'cockpit';
        }
      }
    ]
  },

  cockpit: {
    title: 'The Cockpit',
    subtitle: 'Midshipmen\'s Berth',
    text: `You descend into the belly of the ship, and the world transforms.

    On deck, all was light and air and the cry of gulls. Below, the gundeck is a cavern of shadows and hanging lanterns, the beams so low you must duck constantly. The smell hits you like a fist—tar, bilge water, unwashed men, salt pork, and something else, something organic and ancient that defies description.

    This is the smell of a ship. You will carry it in your clothes and hair for the rest of your life.

    Past the galley, where a one-legged cook stirs a massive pot. Past the marine quarters, where men in red coats check their Brown Bess muskets. Down, further down, to a space so dark you must feel your way.

    The cockpit.

    It is a triangle of space in the bow, perhaps twelve feet to a side, with a ceiling you cannot stand fully upright beneath. Three hammocks are already slung. A battered sea chest serves as a table. A single lantern provides light.

    A young man looks up from a book—astronomy, you note. He is perhaps seventeen, his face pockmarked but intelligent.

    "You must be the new fellow. Pelham. Second Lieutenant." He extends a hand. "Welcome to the cockpit, ${gameState.playerName}. Fair warning: it floods in heavy seas, rats consider it their ancestral home, and the smell never improves. But it's home."

    Another figure emerges from the shadows—younger, perhaps thirteen, with a cruel smile.

    "So the Navy's scraping the bottom of the barrel again." The voice is high-class, affected. "Tell me, new fish, can you even swim?"`,

    choices: [
      {
        text: 'Answer honestly about your swimming ability',
        action: () => {
          return 'cockpitIntro';
        }
      },
      {
        text: 'Ignore the insult and address Pelham directly',
        action: () => {
          updateStats({ discipline: 2 });
          return 'cockpitIntro';
        }
      },
      {
        text: 'Meet the challenge: "Well enough to fish you out when you go over the rail."',
        action: () => {
          updateStats({ crewLoyalty: 2, officerRespect: -2 });
          return 'cockpitChallenge';
        }
      }
    ]
  },

  cockpitIntro: {
    title: 'Welcome to the Service',
    subtitle: 'The Cockpit',
    text: `Pelham intervenes before the tension escalates.

    "Belay that, Carruthers. We were all new once." He turns to you. "The young gentleman with the sharp tongue is the Honorable Timothy Carruthers, third son of Lord Pemberton. He's been at sea six months and thinks that makes him Horatio Nelson."

    Carruthers flushes but says nothing.

    "Now then, ${gameState.playerName}, let me explain how this works. You're the sixth midshipman on this ship. Three of us berth here in the cockpit—you, me, and young Lord Timothy. The other three are in the gunroom with the master's mates. You'll stand watches, take sights, relay orders, and learn your trade."

    He pulls out a pocket watch—expensive, well-made.

    "It's three bells of the afternoon watch. The Captain comes aboard tomorrow morning, and when he does, this ship will come alive. We sail on the evening tide. That gives you tonight to settle in and perhaps learn where the important things are: the head, the galley, and the spirit room."

    "The spirit room?" you ask.

    Pelham grins. "Where they keep the rum. You're not allowed in there, of course. Which is why you should know exactly where it is—so you can avoid it properly."

    Even Carruthers cracks a smile at that.

    "Right then. Stow your gear, sling your hammock, and report topside in an hour. The First Lieutenant will want to see you about your watch duties. And ${gameState.playerName}—" he pauses at the ladder. "Welcome to the Service. You'll either love it or hate it, but either way, it'll change you."`,

    choices: [
      {
        text: 'Ask Pelham about the Captain',
        action: () => {
          return 'askAboutCaptain';
        }
      },
      {
        text: 'Ask Carruthers why he\'s so hostile',
        action: () => {
          updateStats({ socialStanding: -2, discipline: 3 });
          return 'confrontCarruthers';
        }
      },
      {
        text: 'Stow your gear and explore the ship',
        action: () => {
          updateStats({ seamanship: 3 });
          advanceTime(0, 0, 0);
          return 'exploreShip';
        }
      },
      {
        text: 'Rest in your hammock - tomorrow begins your career',
        action: () => {
          updateStats({ discipline: 2 });
          advanceTime(1, 0, 0);
          return 'firstWatch';
        }
      }
    ]
  },

  cockpitChallenge: {
    title: 'First Blood',
    subtitle: 'The Cockpit',
    text: `The words hang in the air.

    Carruthers' face darkens. For a moment you think he might strike you—and in this confined space, a fight would be brutal and brief.

    But Pelham laughs. A real laugh, not forced.

    "Oh, I like this one already! Fire and salt, Carruthers. The new fish has teeth." He claps you on the shoulder. "Mind you keep that spirit when the Spanish start throwing iron at us."

    Carruthers' expression shifts from anger to something more calculating. You've made an impression—whether good or bad remains to be seen.

    "We'll see how clever you are when you're aloft in a gale, new fish," Carruthers mutters, but the venom is gone. It's more of a challenge now than a threat.

    Pelham explains the routines: watches, duties, the pecking order. You'll stand with him, learning the trade. Carruthers will undoubtedly make things difficult, but you've earned a grudging respect.

    "Right then," Pelham says. "Stow your dunnage and report topside in an hour. The Captain comes aboard tomorrow, and when he does, this ship becomes a different beast. Sleep while you can, gentlemen. The sea doesn't care how tired you are."

    Your first test passed. You've shown you won't be pushed around. But the real tests—the ones that matter—still wait ahead.`,

    choices: [
      {
        text: 'Try to make peace with Carruthers',
        action: () => {
          updateStats({ socialStanding: 2, officerRespect: 3 });
          return 'makeAmends';
        }
      },
      {
        text: 'Stow your gear and explore the ship',
        action: () => {
          updateStats({ seamanship: 3 });
          return 'exploreShip';
        }
      },
      {
        text: 'Rest - you\'ll need your strength',
        action: () => {
          updateStats({ discipline: 2 });
          advanceTime(1, 0, 0);
          return 'firstWatch';
        }
      }
    ]
  },

  askAboutCaptain: {
    title: 'The Captain',
    subtitle: 'Know Your Commander',
    text: `Pelham's expression becomes more serious.

    "Captain James Cathcart. Forty-two years old, twenty-seven years in the Service. He made post at thirty—that's young, very young. Fought at Porto Bello under Vernon, took three prizes in the last year alone."

    He lowers his voice.

    "He's a fighting captain, ${gameState.playerName}. Not one of these political admirals who got their command through family connections. He earned his way up, and he expects his officers to do the same. Fair but exacting. He'll notice if you know your business, and he'll notice faster if you don't."

    Carruthers adds, grudgingly, "He flogged a midshipman last month for drunkenness. Twelve lashes. The boy couldn't sit for a week."

    "Aye," Pelham confirms. "The Captain holds his officers to a higher standard than the men. 'Privilege demands responsibility,' he says. You're gentry, so you get a berth in the cockpit and the right to walk the quarterdeck. But fail in your duty, and he'll make you wish you'd never been born."

    The weight of it settles on you. This is real. The Navy is not a gentleman's club or a path to easy advancement. It's a brotherhood forged in iron and salt, and you must prove yourself worthy.`,

    choices: [
      {
        text: 'Stow your gear and explore the ship',
        action: () => {
          updateStats({ seamanship: 3 });
          return 'exploreShip';
        }
      },
      {
        text: 'Rest in your hammock - you need to be sharp tomorrow',
        action: () => {
          updateStats({ discipline: 3 });
          advanceTime(1, 0, 0);
          return 'firstWatch';
        }
      }
    ]
  },

  confrontCarruthers: {
    title: 'Clearing the Air',
    subtitle: 'The Cockpit',
    text: `After Pelham climbs topside, you turn to Carruthers.

    "Why the hostility? We're shipmates. We should be allies, not enemies."

    Carruthers looks at you for a long moment. Then, surprisingly, his shoulders relax slightly.

    "You want honesty? Fine. I've been here six months. Six months of being the youngest, the greenest, the one they send aloft in the worst weather because I'm small and quick. I finally started earning some respect, and then you show up—another new midshipman for them to mock."

    He sits on his sea chest.

    "My father is Lord Pemberton. Third son means nothing—no inheritance, no estate. The Navy or the Church, those were my choices. So here I am, thirteen years old, trying to prove I'm not just another useless lordling." He meets your eyes. "Sound familiar?"

    You realize you may have more in common with Carruthers than you thought.

    "Truce?" you offer.

    He considers, then nods. "Truce. But only if you prove you're not dead weight. This ship can't carry passengers."

    Fair enough.`,

    choices: [
      {
        text: 'Explore the ship together',
        action: () => {
          updateStats({ seamanship: 3, socialStanding: 2 });
          return 'exploreShip';
        }
      },
      {
        text: 'Rest - tomorrow's a big day',
        action: () => {
          updateStats({ discipline: 2 });
          advanceTime(1, 0, 0);
          return 'firstWatch';
        }
      }
    ]
  },

  makeAmends: {
    title: 'Olive Branch',
    subtitle: 'The Cockpit',
    text: `You extend a hand to Carruthers.

    "We got off on the wrong foot. I'm ${gameState.playerName}, and I suspect we'll be living in this hole together for months or years. Might as well not be enemies."

    Carruthers looks at your hand as if it might be a trap. Then, grudgingly, he shakes it.

    "Timothy Carruthers. Third son of Lord Pemberton, which means absolutely nothing at sea." His tone is bitter. "Six months I've been here. Six months of proving I'm not just another useless aristocrat. And just when I start to earn respect, they send me another midshipman to nursemaid."

    You understand now. It's not personal—it's fear. Fear of being replaced, fear of losing status, fear of failure.

    "I don't need a nursemaid," you say. "And from what I've seen, neither do you. How about we just help each other stay alive?"

    A ghost of a smile crosses his face. "That might be the first sensible thing I've heard all day."

    Perhaps you've made your first real ally.`,

    choices: [
      {
        text: 'Explore the ship together',
        action: () => {
          updateStats({ seamanship: 3, officerRespect: 2 });
          return 'exploreShip';
        }
      },
      {
        text: 'Rest - you both need it',
        action: () => {
          updateStats({ discipline: 2 });
          advanceTime(1, 0, 0);
          return 'firstWatch';
        }
      }
    ]
  },

  exploreShip: {
    title: 'The Wooden World',
    subtitle: `${gameState.currentVessel.name}`,
    text: `You spend the next hour exploring your new home.

    The ${gameState.currentVessel.name} is a wooden world unto herself—300 feet from stem to stern, a forest of masts reaching toward heaven, and below decks, a labyrinth that would baffle a Cretan architect.

    You learn the geography of survival: The galley where the cook prepares meals for 300 men. The magazine where powder kegs sit in darkness, one spark from disaster. The orlop deck where the surgeon will work when battle comes—you don't linger there.

    On the gundeck, you run your hand along a 24-pounder cannon. Three tons of iron that can send a ball through oak at half a mile. ${gameState.currentVessel.guns} of these monsters line the ship, and you will learn to command them.

    A grizzled able seaman notices you examining the gun.

    "First time aboard a ship, sir?" No mockery in his voice, just curiosity.

    "First time on a warship," you admit.

    "She's a beauty, ain't she? Been aboard three years meself. Treat her right, and she'll bring you home. Treat her wrong—" he shrugs. "Well, the sea keeps her secrets, sir."

    Wisdom from the lower deck. You file it away.

    As evening falls, you return to the cockpit. Tomorrow, the Captain boards. Tomorrow, your career truly begins.`,

    choices: [
      {
        text: 'Sleep - the Captain boards at dawn',
        action: () => {
          advanceTime(1, 0, 0);
          return 'captainBoards';
        }
      }
    ]
  },

  firstWatch: {
    title: 'Standing Watch',
    subtitle: `First Night, ${getDateString()}`,
    text: `[SCENE IN PROGRESS - To Be Continued]

    Your first watch is uneventful but educational. Pelham talks you through the ropes—literally. Every line has a name, every sail a purpose.

    More scenes coming in next update...`,

    choices: [
      {
        text: 'Continue to Captain boarding scene',
        action: () => {
          advanceTime(1, 0, 0);
          return 'captainBoards';
        }
      }
    ]
  },

  captainBoards: {
    title: 'The Captain',
    subtitle: `Morning, ${getDateString()}`,
    text: `[SCENE IN PROGRESS - To Be Continued]

    The bosun's pipes shriek. "Captain aboard!"

    Captain James Cathcart comes over the rail like a force of nature...

    More scenes coming in next update. This completes the current available content.`,

    choices: [
      {
        text: 'More content coming soon!',
        action: () => {
          return 'captainBoards';
        }
      }
    ]
  }

};

// Helper Functions
function getShipAssignment() {
  const ships = {
    admiral: 'HMS Indefatigable, a thirty-two gun frigate',
    tarborn: 'HMS Tremendous, a seventy-four gun ship of the line',
    mathematician: 'HMS Swift, a twelve-gun schooner on surveying duties'
  };

  const shipNames = {
    admiral: 'HMS Indefatigable',
    tarborn: 'HMS Tremendous',
    mathematician: 'HMS Swift'
  };

  const shipClasses = {
    admiral: 'Frigate',
    tarborn: 'Ship of the Line',
    mathematician: 'Schooner'
  };

  const shipGuns = {
    admiral: 32,
    tarborn: 74,
    mathematician: 12
  };

  gameState.currentVessel = {
    name: shipNames[gameState.background],
    class: shipClasses[gameState.background],
    guns: shipGuns[gameState.background],
    condition: 100,
    crewMorale: 50
  };

  return ships[gameState.background];
}

function getCaptainName() {
  const names = ['Sir Edmund Blackwood', 'James Cathcart', 'Thomas Pellew'];
  return names[Math.floor(Math.random() * names.length)];
}

function getShipDescription() {
  const descriptions = {
    admiral: `The <em>Indefatigable</em> is a fifth-rate frigate, thirty-two guns, fast and deadly. She hunts alone, ranging ahead of the fleet, taking prizes and carrying dispatches. Her captain has a reputation for aggressive action and expects his officers to match his zeal.`,

    tarborn: `The <em>Tremendous</em> is a third-rate ship of the line, seventy-four guns. When she fires a broadside, the world shakes. You will learn your trade in the fleet, in formation sailing and line-of-battle tactics. When England goes to war—and war is coming—ships like this will decide the outcome.`,

    mathematician: `The <em>Swift</em> is a schooner, twelve guns, built for speed and surveying work. She charts coasts, updates maps, and avoids major engagements. You will learn navigation, pilotage, and the art of keeping a small vessel alive in dangerous waters.`
  };

  return descriptions[gameState.background];
}

function getDateString() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return `${gameState.date.day} ${months[gameState.date.month]} ${gameState.date.year}`;
}

function advanceTime(days, months, years) {
  gameState.date.day += days;
  gameState.date.month += months;
  gameState.date.year += years;
  gameState.seaTime += days;

  // Handle month overflow
  while (gameState.date.day > 30) {
    gameState.date.day -= 30;
    gameState.date.month += 1;
  }

  while (gameState.date.month > 11) {
    gameState.date.month -= 12;
    gameState.date.year += 1;
  }
}

function updateStats(changes) {
  if (changes.seamanship !== undefined) {
    gameState.seamanship = Math.max(0, Math.min(100, gameState.seamanship + changes.seamanship));
  }
  if (changes.gunnery !== undefined) {
    gameState.gunnery = Math.max(0, Math.min(100, gameState.gunnery + changes.gunnery));
  }
  if (changes.navigation !== undefined) {
    gameState.navigation = Math.max(0, Math.min(100, gameState.navigation + changes.navigation));
  }
  if (changes.discipline !== undefined) {
    gameState.discipline = Math.max(0, Math.min(100, gameState.discipline + changes.discipline));
  }
  if (changes.socialStanding !== undefined) {
    gameState.socialStanding = Math.max(0, Math.min(100, gameState.socialStanding + changes.socialStanding));
  }
  if (changes.crewLoyalty !== undefined) {
    gameState.crewLoyalty = Math.max(0, Math.min(100, gameState.crewLoyalty + changes.crewLoyalty));
  }
  if (changes.officerRespect !== undefined) {
    gameState.officerRespect = Math.max(0, Math.min(100, gameState.officerRespect + changes.officerRespect));
  }
  if (changes.admiraltyFavor !== undefined) {
    gameState.admiraltyFavor = Math.max(0, Math.min(100, gameState.admiraltyFavor + changes.admiraltyFavor));
  }

  updateUI();
}

function updateUI() {
  // Update stat displays
  document.getElementById('seamanship').textContent = Math.round(gameState.seamanship);
  document.getElementById('gunnery').textContent = Math.round(gameState.gunnery);
  document.getElementById('navigation').textContent = Math.round(gameState.navigation);
  document.getElementById('discipline').textContent = Math.round(gameState.discipline);
  document.getElementById('social').textContent = Math.round(gameState.socialStanding);

  // Update career info
  document.getElementById('rank').textContent = gameState.rank;
  document.getElementById('ship').textContent = gameState.currentVessel.name;
  document.getElementById('date').textContent = getDateString();
  document.getElementById('seatime').textContent = gameState.seaTime;
}

function renderScene(sceneKey) {
  const scene = scenes[sceneKey];
  if (!scene) {
    console.error('Scene not found:', sceneKey);
    return;
  }

  gameState.currentScene = sceneKey;

  // Update header
  document.getElementById('chapter-title').textContent = scene.title;
  document.getElementById('chapter-subtitle').textContent = scene.subtitle;

  // Update story text - preserve formatting
  const storyText = document.getElementById('story-text');
  storyText.innerHTML = scene.text;

  // Hide image for now (we'll add naval imagery later)
  document.getElementById('story-image').style.display = 'none';

  // Update choices
  const choicesContainer = document.getElementById('story-choices');
  choicesContainer.innerHTML = scene.choices.map((choice, index) => {
    return `<button class="choice-button" onclick="makeChoice(${index})">${choice.text}</button>`;
  }).join('');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function makeChoice(choiceIndex) {
  const currentScene = scenes[gameState.currentScene];
  const choice = currentScene.choices[choiceIndex];

  if (choice.action) {
    const nextScene = choice.action();
    if (nextScene) {
      renderScene(nextScene);
    }
  }
}

function saveStory() {
  localStorage.setItem('navalGameState', JSON.stringify(gameState));
  showNotification('Game Saved', 'Your progress has been recorded');
}

function loadStory() {
  const saved = localStorage.getItem('navalGameState');
  if (saved) {
    const loadedState = JSON.parse(saved);
    Object.assign(gameState, loadedState);
    updateUI();
    renderScene(gameState.currentScene);
    return true;
  }
  return false;
}

function restartStory() {
  if (confirm('Start a new career? Your current progress will be lost.')) {
    localStorage.removeItem('navalGameState');
    location.reload();
  }
}

function showNotification(title, message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `<strong>${title}</strong><br>${message}`;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize
window.onload = function() {
  if (!loadStory()) {
    renderScene('characterCreation');
    updateUI();
  }
};
