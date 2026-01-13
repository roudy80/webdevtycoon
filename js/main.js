// ============================================
// FROM FREELANCER TO FOUNDER
// An Interactive Story
// ============================================

// Game State
const gameState = {
  money: 0,
  reputation: 50,
  happiness: 75,
  teamSize: 0,
  currentScene: 'start',
  choices: {},
  achievements: [],
  employees: {
    webDesigner: 0,
    webDeveloper: 0,
    seoSpecialist: 0,
    uiuxDesigner: 0,
    fullstackDeveloper: 0
  },
  contracts: [],
  building: 'none'
};

// Achievements
const achievements = {
  firstJob: { name: 'First Steps', desc: 'Completed your first job', icon: '💼' },
  firstHire: { name: 'Team Builder', desc: 'Hired your first employee', icon: '👥' },
  firstOffice: { name: 'Office Space', desc: 'Moved into your first office', icon: '🏢' },
  millionaire: { name: 'Success!', desc: 'Earned £10,000', icon: '💰' },
  happyEnding: { name: 'Work-Life Balance', desc: 'Maintained high happiness', icon: '😊' },
  empireBuilder: { name: 'Empire Builder', desc: 'Built a team of 10+', icon: '👑' }
};

// Story Scenes
const scenes = {
  start: {
    title: 'The Beginning',
    subtitle: 'Your journey starts here',
    text: `You stare at your laptop screen in your cramped studio apartment. The rent is due in two weeks, and your freelance career isn't exactly taking off.

    Your email inbox pings. Three new job opportunities. Each one different, each one a potential turning point.

    What kind of developer do you want to be?`,
    image: 'img/jobs/jobone.png',
    choices: [
      {
        text: 'Take the microbrewery landing page (£100, quick and easy)',
        action: () => {
          updateStats({ money: 100, reputation: 5 });
          unlockAchievement('firstJob');
          return 'firstJobEasy';
        }
      },
      {
        text: 'Take the hotel booking site (£500, challenging but rewarding)',
        action: () => {
          updateStats({ money: 500, reputation: 15, happiness: -5 });
          unlockAchievement('firstJob');
          return 'firstJobMedium';
        }
      },
      {
        text: 'Take the eCommerce project (£1200, risky but lucrative)',
        action: () => {
          updateStats({ money: 1200, reputation: 25, happiness: -15 });
          unlockAchievement('firstJob');
          return 'firstJobHard';
        }
      }
    ]
  },

  firstJobEasy: {
    title: 'Playing It Safe',
    subtitle: 'Building confidence',
    text: `The microbrewery landing page took you just a few hours. Simple HTML, CSS, and a contact form. The client was thrilled.

    "You made our beer look amazing!" they say, paying you £100 on the spot.

    It wasn't much, but it was honest work. You have options now...`,
    image: 'img/jobs/jobone.png',
    choices: [
      {
        text: 'Take on more small jobs to build a steady income',
        action: () => {
          updateStats({ money: 300, reputation: 10 });
          return 'steadyPath';
        }
      },
      {
        text: 'Use the money to invest in learning new skills',
        action: () => {
          updateStats({ money: -50, happiness: 10, reputation: 5 });
          return 'learningPath';
        }
      },
      {
        text: 'Start looking for someone to partner with',
        action: () => {
          return 'partnershipPath';
        }
      }
    ]
  },

  firstJobMedium: {
    title: 'Rising to the Challenge',
    subtitle: 'Proving yourself',
    text: `The hotel website was a marathon. Three sleepless nights, countless cups of coffee, and a booking system that finally worked.

    The hotel owner was impressed. "You've got talent," she says, handing you a check for £500. "We'll recommend you to others."

    You're exhausted but proud. What's your next move?`,
    image: 'img/jobs/jobtwo.png',
    choices: [
      {
        text: 'Take a break and recharge (preserve your happiness)',
        action: () => {
          updateStats({ happiness: 15 });
          return 'balancePath';
        }
      },
      {
        text: 'Strike while the iron is hot and take more projects',
        action: () => {
          updateStats({ money: 800, reputation: 20, happiness: -10 });
          return 'hustlePath';
        }
      },
      {
        text: 'Invest in an office space to look more professional',
        action: () => {
          if (gameState.money >= 250) {
            updateStats({ money: -250, reputation: 15 });
            gameState.building = 'shed';
            unlockAchievement('firstOffice');
            return 'officePathEarly';
          } else {
            return 'notEnoughMoney';
          }
        }
      }
    ]
  },

  firstJobHard: {
    title: 'Baptism by Fire',
    subtitle: 'Learning the hard way',
    text: `The jewelry eCommerce site nearly broke you. Payment integration, inventory management, responsive design...

    You worked 18-hour days for two weeks straight. Your friends stopped calling. But you delivered.

    The jeweler was ecstatic. £1,200 in your account. You're talented, but is this sustainable?`,
    image: 'img/jobs/jobthree.png',
    choices: [
      {
        text: 'This is unsustainable. Hire help immediately.',
        action: () => {
          if (gameState.money >= 200) {
            return 'hireFirstEmployee';
          } else {
            return 'notEnoughMoney';
          }
        }
      },
      {
        text: 'Keep grinding solo. You can handle it.',
        action: () => {
          updateStats({ money: 1500, reputation: 30, happiness: -20 });
          return 'soloGrindPath';
        }
      },
      {
        text: 'Take a week off to recover (you need it)',
        action: () => {
          updateStats({ happiness: 20 });
          return 'recoveryPath';
        }
      }
    ]
  },

  hireFirstEmployee: {
    title: 'Your First Hire',
    subtitle: 'Building a team',
    text: `You post a job ad. Three candidates respond:

    **Sarah** - A talented web designer, fresh out of design school. Hungry and creative. (£200 to hire, £200/month wage)

    **Marcus** - An experienced web developer, reliable but expensive. (£200 to hire, £300/month wage)

    **Priya** - An SEO specialist who promises to get you more clients. (£400 to hire, £400/month wage)

    Who do you hire?`,
    image: 'img/employees/webdes.png',
    choices: [
      {
        text: 'Hire Sarah the Web Designer',
        action: () => {
          if (gameState.money >= 200) {
            updateStats({ money: -200, teamSize: 1 });
            gameState.employees.webDesigner++;
            unlockAchievement('firstHire');
            return 'withSarah';
          }
          return 'notEnoughMoney';
        }
      },
      {
        text: 'Hire Marcus the Web Developer',
        action: () => {
          if (gameState.money >= 200) {
            updateStats({ money: -200, teamSize: 1 });
            gameState.employees.webDeveloper++;
            unlockAchievement('firstHire');
            return 'withMarcus';
          }
          return 'notEnoughMoney';
        }
      },
      {
        text: 'Hire Priya the SEO Specialist',
        action: () => {
          if (gameState.money >= 400) {
            updateStats({ money: -400, teamSize: 1 });
            gameState.employees.seoSpecialist++;
            unlockAchievement('firstHire');
            return 'withPriya';
          }
          return 'notEnoughMoney';
        }
      },
      {
        text: 'Actually, I can\'t afford this yet',
        action: () => {
          return 'steadyPath';
        }
      }
    ]
  },

  withSarah: {
    title: 'Creative Partnership',
    subtitle: 'Design meets code',
    text: `Sarah brings an energy you didn't know you needed. Her designs are stunning, and clients notice.

    "I love working with you," she says over coffee. "We make a great team."

    Within a month, you've landed three new contracts. Sarah handles design, you handle development. It's perfect.

    A local startup approaches you with an offer: "We need a full website redesign. £2,000. But we need it in two weeks."`,
    image: 'img/employees/webdes.png',
    choices: [
      {
        text: 'Accept the challenge. You and Sarah can do this.',
        action: () => {
          updateStats({ money: 2000, reputation: 25, happiness: -5 });
          return 'growingTeam';
        }
      },
      {
        text: 'Negotiate for three weeks and better terms',
        action: () => {
          updateStats({ money: 2500, reputation: 20, happiness: 5 });
          return 'growingTeam';
        }
      },
      {
        text: 'Decline. You want to maintain work-life balance.',
        action: () => {
          updateStats({ happiness: 10, reputation: -5 });
          return 'balancedGrowth';
        }
      }
    ]
  },

  withMarcus: {
    title: 'Professional Partnership',
    subtitle: 'Experience matters',
    text: `Marcus is a machine. Reliable, professional, efficient. He ships code faster than you ever could alone.

    "Listen," he says after your first month together. "We're good. Really good. We should formalize this. Register as a company. Get serious."

    He's right. You're making £3,000/month together. But incorporating means commitments, contracts, responsibilities.`,
    image: 'img/employees/webdev.png',
    choices: [
      {
        text: 'Register as a company. Let\'s build something real.',
        action: () => {
          updateStats({ money: -500, reputation: 30, happiness: 5 });
          return 'companyPath';
        }
      },
      {
        text: 'Stay freelance for now. Keep it flexible.',
        action: () => {
          updateStats({ happiness: 10 });
          return 'freelanceTeam';
        }
      },
      {
        text: 'Hire another person first, then formalize',
        action: () => {
          return 'expandFirst';
        }
      }
    ]
  },

  withPriya: {
    title: 'Marketing Magic',
    subtitle: 'Getting noticed',
    text: `Priya was worth every penny. Within two weeks, your website ranks on the first page for "web development services."

    Clients flood in. You're booking projects months in advance.

    "You need to scale," Priya says, showing you the analytics. "You're turning away £10,000 worth of work per month. Hire more people or burn out trying to do it all."

    She's right. You're at a crossroads.`,
    image: 'img/employees/seo.png',
    choices: [
      {
        text: 'Hire a development team immediately',
        action: () => {
          if (gameState.money >= 1000) {
            updateStats({ money: -1000, teamSize: 3 });
            gameState.employees.webDeveloper += 2;
            gameState.employees.webDesigner++;
            return 'rapidGrowth';
          }
          return 'notEnoughMoney';
        }
      },
      {
        text: 'Hire selectively and grow sustainably',
        action: () => {
          if (gameState.money >= 400) {
            updateStats({ money: -400, teamSize: 1 });
            gameState.employees.webDeveloper++;
            return 'sustainableGrowth';
          }
          return 'notEnoughMoney';
        }
      },
      {
        text: 'Raise prices instead of hiring more people',
        action: () => {
          updateStats({ reputation: -10, happiness: 10 });
          return 'premiumPath';
        }
      }
    ]
  },

  growingTeam: {
    title: 'Momentum Building',
    subtitle: 'Your reputation grows',
    text: `Word spreads. You're the team that delivers quality work on time.

    You now have ${gameState.teamSize} people and £${gameState.money} in the bank.

    A corporate client approaches with a massive contract: £5,000 upfront, £1,000/month ongoing. But they need:
    - 2 web designers
    - 2 web developers
    - 1 SEO specialist
    - Dedicated office space

    This could transform your business... or overwhelm it.`,
    image: 'img/contracts/contracttwo.png',
    choices: [
      {
        text: 'Accept and hire the team you need',
        action: () => {
          const hiringCost = 1200;
          const officeCost = 250;
          if (gameState.money >= hiringCost + officeCost) {
            updateStats({ money: -hiringCost - officeCost });
            gameState.building = 'office';
            gameState.contracts.push('corporate');
            unlockAchievement('empireBuilder');
            return 'corporateSuccess';
          }
          return 'notEnoughMoney';
        }
      },
      {
        text: 'Negotiate a smaller scope to match your current capacity',
        action: () => {
          updateStats({ money: 2500, reputation: 10 });
          return 'modestSuccess';
        }
      },
      {
        text: 'Decline. Focus on smaller clients you can serve well.',
        action: () => {
          updateStats({ happiness: 10, reputation: 5 });
          return 'boutiquePath';
        }
      }
    ]
  },

  corporateSuccess: {
    title: 'Corporate Player',
    subtitle: 'You made it',
    text: `Six months later, you're running a proper company. Team of ${gameState.teamSize + 5} people. Real office. Regular income of £${1000 + gameState.teamSize * 100}/month.

    £${gameState.money} in the bank. Reputation at ${gameState.reputation}%.

    Sarah asks you at the company dinner: "Are you happy? We've built something amazing, but you look exhausted."

    Are you?`,
    image: 'img/buildings/buildingthree.png',
    choices: [
      {
        text: 'This is exactly what I wanted. Let\'s keep growing!',
        action: () => {
          updateStats({ money: 5000, teamSize: 5, reputation: 20, happiness: -10 });
          return 'empireEnding';
        }
      },
      {
        text: 'I need to step back and delegate more',
        action: () => {
          updateStats({ happiness: 20, money: 3000 });
          return 'balancedEnding';
        }
      },
      {
        text: 'Actually, I miss the simple days. Let\'s downsize.',
        action: () => {
          updateStats({ happiness: 30, teamSize: -3, reputation: -10 });
          return 'simpleEnding';
        }
      }
    ]
  },

  // Endings
  empireEnding: {
    title: 'The Empire Builder',
    subtitle: 'ENDING',
    text: `Five years later, you're running a 50-person agency. £500K annual revenue. Industry awards. Speaking at conferences.

    **Final Stats:**
    - Money: £${gameState.money}
    - Reputation: ${gameState.reputation}%
    - Team: ${gameState.teamSize} people
    - Happiness: ${gameState.happiness}%

    You built an empire. But at what cost?

    ${gameState.happiness > 60 ? 'Somehow, you managed to stay happy through it all. That\'s the real achievement.' : 'You wonder sometimes if it was worth the sleepless nights and missed moments.'}

    **THE END**`,
    image: 'img/buildings/buildingfour.png',
    choices: [
      {
        text: 'Play Again',
        action: () => {
          restartStory();
          return 'start';
        }
      }
    ]
  },

  balancedEnding: {
    title: 'The Balanced Leader',
    subtitle: 'ENDING',
    text: `You learned to let go. Hired a COO. Delegated. Took vacations.

    **Final Stats:**
    - Money: £${gameState.money}
    - Reputation: ${gameState.reputation}%
    - Team: ${gameState.teamSize} people
    - Happiness: ${gameState.happiness}%

    The company still grows, but you're not killing yourself anymore. You work 30 hours a week. You have hobbies again.

    This is what success actually looks like.

    **THE END**`,
    image: 'img/buildings/buildingtwo.png',
    choices: [
      {
        text: 'Play Again',
        action: () => {
          restartStory();
          return 'start';
        }
      }
    ]
  },

  simpleEnding: {
    title: 'Back to Basics',
    subtitle: 'ENDING',
    text: `You scaled back to a team of 5. Turned down the big contracts. Focused on work you love.

    **Final Stats:**
    - Money: £${gameState.money}
    - Reputation: ${gameState.reputation}%
    - Team: ${gameState.teamSize} people
    - Happiness: ${gameState.happiness}%

    You're not rich, but you're happy. You know everyone on your team. You care about every project.

    Sometimes the best path isn't forward—it's finding where you belong.

    **THE END**`,
    image: 'img/jobs/jobone.png',
    choices: [
      {
        text: 'Play Again',
        action: () => {
          restartStory();
          return 'start';
        }
      }
    ]
  },

  notEnoughMoney: {
    title: 'Not Enough Funds',
    subtitle: 'Check your budget',
    text: `You check your bank account: £${gameState.money}. Not enough for this option right now.

    Maybe take on some more work first?`,
    image: 'img/jobs/jobone.png',
    choices: [
      {
        text: 'Go back and choose differently',
        action: () => {
          return gameState.lastScene || 'start';
        }
      }
    ]
  },

  // Additional paths for variety
  steadyPath: {
    title: 'Steady Progress',
    subtitle: 'Building your foundation',
    text: `You take on project after project. £100 here, £300 there. It's not glamorous, but it's working.

    After three months, you have £${gameState.money} saved up and a growing list of happy clients.

    Time to make your next move.`,
    image: 'img/jobs/jobtwo.png',
    choices: [
      {
        text: 'Hire your first employee',
        action: () => {
          return 'hireFirstEmployee';
        }
      },
      {
        text: 'Invest in better equipment and tools',
        action: () => {
          updateStats({ money: -200, reputation: 10, happiness: 5 });
          return 'soloSuccess';
        }
      },
      {
        text: 'Take on a bigger project to level up',
        action: () => {
          updateStats({ money: 1200, reputation: 15, happiness: -10 });
          return 'levelUp';
        }
      }
    ]
  },

  soloSuccess: {
    title: 'The Solo Success',
    subtitle: 'ENDING',
    text: `You never hired anyone. You stayed small, stayed nimble, stayed true to yourself.

    **Final Stats:**
    - Money: £${gameState.money}
    - Reputation: ${gameState.reputation}%
    - Team: Solo
    - Happiness: ${gameState.happiness}%

    You're a respected freelancer who gets to choose your projects. You make enough to live well. You answer to no one.

    Some people build empires. You built a life.

    **THE END**`,
    image: 'img/jobs/jobone.png',
    choices: [
      {
        text: 'Play Again',
        action: () => {
          restartStory();
          return 'start';
        }
      }
    ]
  },

  // Additional story paths
  hustlePath: {
    title: 'The Hustle',
    subtitle: 'Working hard',
    text: `You take on project after project. Your calendar is packed. You're making money hand over fist.

    £${gameState.money} in the bank and climbing. But you haven't slept properly in weeks.

    Your phone rings. It's a friend you haven't talked to in months. "You disappeared," they say. "Everything okay?"`,
    image: 'img/jobs/jobthree.png',
    choices: [
      {
        text: 'Keep hustling. Success requires sacrifice.',
        action: () => {
          updateStats({ money: 2000, reputation: 25, happiness: -20 });
          return 'burnoutPath';
        }
      },
      {
        text: 'Slow down and hire help',
        action: () => {
          return 'hireFirstEmployee';
        }
      },
      {
        text: 'Take a break and reassess',
        action: () => {
          updateStats({ happiness: 15 });
          return 'balancePath';
        }
      }
    ]
  },

  balancePath: {
    title: 'Finding Balance',
    subtitle: 'Taking care of yourself',
    text: `You take a week off. Actually off. No emails. No Slack. You read books, see friends, remember what life feels like.

    When you return, you're refreshed. Ideas flow easier. Code comes faster.

    Maybe there's something to this balance thing.`,
    image: 'img/jobs/jobone.png',
    choices: [
      {
        text: 'Maintain this balance going forward',
        action: () => {
          updateStats({ money: 500, reputation: 10, happiness: 10 });
          return 'balancedGrowth';
        }
      },
      {
        text: 'Build a sustainable business model',
        action: () => {
          return 'hireFirstEmployee';
        }
      }
    ]
  },

  burnoutPath: {
    title: 'Burning Out',
    subtitle: 'ENDING',
    text: `Six months of non-stop work. You hit £${gameState.money} in earnings.

    Then one morning, you can't get out of bed. Not won't. Can't.

    Burnout isn't a metaphor. It's a diagnosis.

    **Final Stats:**
    - Money: £${gameState.money}
    - Reputation: ${gameState.reputation}%
    - Happiness: ${gameState.happiness}%

    You made money. But you lost yourself.

    **THE END**`,
    image: 'img/jobs/jobfour.png',
    choices: [
      {
        text: 'Play Again',
        action: () => {
          restartStory();
          return 'start';
        }
      }
    ]
  },

  balancedGrowth: {
    title: 'Balanced Growth',
    subtitle: 'Smart progress',
    text: `You grow, but carefully. Good projects, not all projects. Time for life, not just work.

    A year passes. You've built something sustainable.

    £${gameState.money} saved. Reputation solid. And you're still happy.`,
    image: 'img/jobs/jobtwo.png',
    choices: [
      {
        text: 'Stay solo and keep this pace',
        action: () => {
          updateStats({ money: 1000, reputation: 15, happiness: 10 });
          return 'soloSuccess';
        }
      },
      {
        text: 'Hire someone to scale up',
        action: () => {
          return 'hireFirstEmployee';
        }
      }
    ]
  },

  officePathEarly: {
    title: 'Professional Image',
    subtitle: 'Investing in perception',
    text: `The shed isn't glamorous, but it's yours. A dedicated space. Clients are impressed.

    "You're serious about this," one says, signing a £1,500 contract.

    The office is paying for itself.`,
    image: 'img/buildings/buildingone.png',
    choices: [
      {
        text: 'Use this credibility to land bigger clients',
        action: () => {
          updateStats({ money: 1500, reputation: 20 });
          return 'growingTeam';
        }
      },
      {
        text: 'Hire your first employee now',
        action: () => {
          return 'hireFirstEmployee';
        }
      }
    ]
  },

  soloGrindPath: {
    title: 'The Solo Grind',
    subtitle: 'Pushing your limits',
    text: `You keep taking big projects solo. The money is incredible. The stress is unbearable.

    £${gameState.money} in the bank. But you're exhausted.

    How long can you keep this up?`,
    image: 'img/jobs/jobfour.png',
    choices: [
      {
        text: 'Finally hire help',
        action: () => {
          return 'hireFirstEmployee';
        }
      },
      {
        text: 'Push through. You can handle it.',
        action: () => {
          updateStats({ money: 2000, reputation: 30, happiness: -25 });
          return 'burnoutPath';
        }
      },
      {
        text: 'Downshift to smaller projects',
        action: () => {
          updateStats({ happiness: 20, reputation: -10 });
          return 'balancedGrowth';
        }
      }
    ]
  },

  recoveryPath: {
    title: 'Recovery',
    subtitle: 'Healing',
    text: `The week off does wonders. You sleep. You exercise. You remember who you were before code consumed your life.

    £${gameState.money} in savings gives you options.

    What kind of career do you actually want?`,
    image: 'img/jobs/jobone.png',
    choices: [
      {
        text: 'Build something sustainable',
        action: () => {
          return 'hireFirstEmployee';
        }
      },
      {
        text: 'Stay solo but work less',
        action: () => {
          updateStats({ happiness: 15 });
          return 'balancedGrowth';
        }
      }
    ]
  },

  learningPath: {
    title: 'Investing in Skills',
    subtitle: 'Level up',
    text: `You spend the money on courses. React. Node.js. Cloud architecture.

    Two months later, you're dangerous. Clients notice.

    "We need someone who knows this stack," a startup founder says. "£2,000 for the project."`,
    image: 'img/upgrades/webdev.png',
    choices: [
      {
        text: 'Take the project',
        action: () => {
          updateStats({ money: 2000, reputation: 20 });
          return 'growingTeam';
        }
      },
      {
        text: 'Use skills to raise your rates',
        action: () => {
          updateStats({ money: 1000, reputation: 15, happiness: 10 });
          return 'premiumPath';
        }
      }
    ]
  },

  partnershipPath: {
    title: 'Looking for Partners',
    subtitle: 'Finding your people',
    text: `You start networking. Coffee meetings. Local tech meetups. Online communities.

    Three people catch your attention as potential partners...`,
    image: 'img/employees/webdes.png',
    choices: [
      {
        text: 'Actually, let me hire employees instead',
        action: () => {
          return 'hireFirstEmployee';
        }
      },
      {
        text: 'Keep working solo for now',
        action: () => {
          updateStats({ money: 400, reputation: 10 });
          return 'steadyPath';
        }
      }
    ]
  },

  companyPath: {
    title: 'Incorporating',
    subtitle: 'Making it official',
    text: `You file the paperwork. Register the company. Set up proper accounting.

    It feels real now. This isn't a side hustle anymore. This is a business.

    Marcus raises his coffee. "To the company," he says.

    "To the company," you echo.`,
    image: 'img/buildings/buildingone.png',
    choices: [
      {
        text: 'Grow aggressively',
        action: () => {
          updateStats({ money: 2000, reputation: 25 });
          return 'growingTeam';
        }
      },
      {
        text: 'Grow sustainably',
        action: () => {
          updateStats({ money: 1500, reputation: 20, happiness: 10 });
          return 'balancedGrowth';
        }
      }
    ]
  },

  freelanceTeam: {
    title: 'Freelance Collective',
    subtitle: 'Flexible collaboration',
    text: `You and Marcus stay freelance but work together regularly. The flexibility is amazing.

    Projects come and go. You collaborate when it makes sense. Otherwise, you do your own thing.

    It's working.`,
    image: 'img/employees/webdev.png',
    choices: [
      {
        text: 'Eventually formalize into a company',
        action: () => {
          updateStats({ money: 1000, reputation: 15 });
          return 'companyPath';
        }
      },
      {
        text: 'Keep this flexible arrangement',
        action: () => {
          updateStats({ money: 1500, happiness: 15 });
          return 'soloSuccess';
        }
      }
    ]
  },

  expandFirst: {
    title: 'Building the Team',
    subtitle: 'Growing before formalizing',
    text: `You hire a designer to complement you and Marcus. The three of you work beautifully together.

    "Now we formalize?" Marcus asks.

    You have £${gameState.money} and a team that works. Time to make it official?`,
    image: 'img/employees/webdes.png',
    choices: [
      {
        text: 'Yes, incorporate now',
        action: () => {
          updateStats({ money: -500, reputation: 25, teamSize: 2 });
          gameState.employees.webDesigner++;
          gameState.employees.webDeveloper++;
          return 'companyPath';
        }
      },
      {
        text: 'Stay informal a bit longer',
        action: () => {
          updateStats({ money: 1000, happiness: 10, teamSize: 2 });
          return 'freelanceTeam';
        }
      }
    ]
  },

  rapidGrowth: {
    title: 'Rapid Expansion',
    subtitle: 'Scaling fast',
    text: `You hire three people in one month. The office is buzzing. Projects are flowing.

    You're managing people now, not just code. It's exhilarating and terrifying.

    Team of ${gameState.teamSize}. £${gameState.money} in the bank. This is happening.`,
    image: 'img/buildings/buildingtwo.png',
    choices: [
      {
        text: 'Keep growing aggressively',
        action: () => {
          updateStats({ money: 3000, teamSize: 3, reputation: 30, happiness: -15 });
          return 'corporateSuccess';
        }
      },
      {
        text: 'Stabilize before growing more',
        action: () => {
          updateStats({ money: 2000, happiness: 5 });
          return 'balancedGrowth';
        }
      }
    ]
  },

  sustainableGrowth: {
    title: 'Sustainable Growth',
    subtitle: 'Building carefully',
    text: `You hire one person at a time. Train them properly. Integrate them into the culture.

    It's slower, but it feels right. Team of ${gameState.teamSize} people who all know what they're doing.

    Quality over quantity.`,
    image: 'img/employees/webdev.png',
    choices: [
      {
        text: 'Continue this measured approach',
        action: () => {
          updateStats({ money: 1500, reputation: 20, happiness: 10 });
          return 'balancedEnding';
        }
      },
      {
        text: 'Speed up the hiring',
        action: () => {
          updateStats({ money: 2000, teamSize: 2 });
          return 'rapidGrowth';
        }
      }
    ]
  },

  premiumPath: {
    title: 'Premium Positioning',
    subtitle: 'Raising your value',
    text: `You double your rates. Half the clients ghost. The other half pay without blinking.

    You're working less and earning more. £${gameState.money} and counting.

    This is the dream, isn't it?`,
    image: 'img/jobs/jobthree.png',
    choices: [
      {
        text: 'Keep this high-value solo practice',
        action: () => {
          updateStats({ money: 2000, reputation: 20, happiness: 15 });
          return 'soloSuccess';
        }
      },
      {
        text: 'Build a premium agency',
        action: () => {
          return 'hireFirstEmployee';
        }
      }
    ]
  },

  modestSuccess: {
    title: 'Modest Success',
    subtitle: 'Finding your level',
    text: `The negotiated contract is perfect. £2,500 for work you can handle with your current team.

    No stress. Good money. Happy clients.

    Sometimes the best move is knowing your limits.`,
    image: 'img/contracts/contractone.png',
    choices: [
      {
        text: 'Stay at this comfortable level',
        action: () => {
          updateStats({ money: 1500, happiness: 15 });
          return 'balancedEnding';
        }
      },
      {
        text: 'Slowly expand capabilities',
        action: () => {
          updateStats({ money: 1000, teamSize: 1 });
          return 'sustainableGrowth';
        }
      }
    ]
  },

  boutiquePath: {
    title: 'Boutique Agency',
    subtitle: 'Small and excellent',
    text: `You focus on being the best, not the biggest. Small team. Great work. Happy clients.

    Team of ${gameState.teamSize}. Everyone knows everyone. Every project matters.

    You've built something special.`,
    image: 'img/buildings/buildingone.png',
    choices: [
      {
        text: 'This is perfect. Stay here.',
        action: () => {
          updateStats({ money: 2000, happiness: 20 });
          return 'balancedEnding';
        }
      },
      {
        text: 'Actually, let\'s grow bigger',
        action: () => {
          updateStats({ money: 1000, teamSize: 2 });
          return 'corporateSuccess';
        }
      }
    ]
  },

  levelUp: {
    title: 'Leveling Up',
    subtitle: 'New challenges',
    text: `The big project pushes you. You learn new skills. Solve hard problems. Ship something you're proud of.

    £${gameState.money} in the bank and newfound confidence.

    You're ready for what's next.`,
    image: 'img/jobs/jobthree.png',
    choices: [
      {
        text: 'Hire a team to do bigger projects',
        action: () => {
          return 'hireFirstEmployee';
        }
      },
      {
        text: 'Stay solo but charge premium rates',
        action: () => {
          updateStats({ reputation: 20 });
          return 'premiumPath';
        }
      }
    ]
  }
};

// ============================================
// CORE FUNCTIONS
// ============================================

function updateStats(changes) {
  if (changes.money !== undefined) gameState.money += changes.money;
  if (changes.reputation !== undefined) {
    gameState.reputation = Math.max(0, Math.min(100, gameState.reputation + changes.reputation));
  }
  if (changes.happiness !== undefined) {
    gameState.happiness = Math.max(0, Math.min(100, gameState.happiness + changes.happiness));
  }
  if (changes.teamSize !== undefined) gameState.teamSize += changes.teamSize;

  // Check for achievements
  if (gameState.money >= 10000 && !gameState.achievements.includes('millionaire')) {
    unlockAchievement('millionaire');
  }
  if (gameState.teamSize >= 10 && !gameState.achievements.includes('empireBuilder')) {
    unlockAchievement('empireBuilder');
  }

  updateUI();
}

function unlockAchievement(key) {
  if (!gameState.achievements.includes(key)) {
    gameState.achievements.push(key);
    const achievement = achievements[key];
    showNotification(`🏆 Achievement Unlocked: ${achievement.name}`, achievement.desc);
    updateAchievementsDisplay();
  }
}

function showNotification(title, message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `<strong>${title}</strong><br>${message}`;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function updateUI() {
  document.getElementById('money').textContent = gameState.money;
  document.getElementById('reputation').textContent = gameState.reputation;
  document.getElementById('happiness').textContent = gameState.happiness;
  document.getElementById('workerNum').textContent = gameState.teamSize;
}

function updateAchievementsDisplay() {
  const achievementsList = document.getElementById('achievements-list');
  achievementsList.innerHTML = gameState.achievements.map(key => {
    const achievement = achievements[key];
    return `<div class="achievement">${achievement.icon} ${achievement.name}</div>`;
  }).join('');
}

function renderScene(sceneKey) {
  gameState.lastScene = gameState.currentScene;
  gameState.currentScene = sceneKey;
  const scene = scenes[sceneKey];

  if (!scene) {
    console.error('Scene not found:', sceneKey);
    return;
  }

  // Update header
  document.getElementById('chapter-title').textContent = scene.title;
  document.getElementById('chapter-subtitle').textContent = scene.subtitle;

  // Update story text
  const storyText = document.getElementById('story-text');
  storyText.innerHTML = `<p>${scene.text.replace(/\n\n/g, '</p><p>')}</p>`;

  // Update image
  const storyImage = document.getElementById('story-image');
  if (scene.image) {
    storyImage.innerHTML = `<img src="${scene.image}" alt="${scene.title}">`;
    storyImage.style.display = 'block';
  } else {
    storyImage.style.display = 'none';
  }

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
  localStorage.setItem('storyGameState', JSON.stringify(gameState));
  showNotification('💾 Progress Saved', 'Your story has been saved');
}

function loadStory() {
  const saved = localStorage.getItem('storyGameState');
  if (saved) {
    const loadedState = JSON.parse(saved);
    Object.assign(gameState, loadedState);
    updateUI();
    updateAchievementsDisplay();
    renderScene(gameState.currentScene);
    return true;
  }
  return false;
}

function restartStory() {
  if (confirm('Are you sure you want to start a new story? Your current progress will be lost.')) {
    localStorage.removeItem('storyGameState');
    location.reload();
  }
}

// Initialize game on load
window.onload = function() {
  if (!loadStory()) {
    renderScene('start');
    updateUI();
  }
};
