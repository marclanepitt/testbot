var HTTPS = require('https');

var botID = process.env.BOT_ID;

var beers = ['Bud Light', 'Platinums', "Bud Heavy", "Blue Moon","Nattys","Corona","Miller","Coors"];

var restaurants = ["Carolina Brewery", "Spicy 9", "Bandidos","IP3","Mellow Mushroom","Lucha Tigre","Moes","Chipotle", "Rams"];

var insults = ["You're an inspiration for birth control.", 'You should let your chair play, at least it knows how to support.', " \t I don't have the time or the crayons to explain this to you.", "I'd call you cancer, but cancer gets kills.", 'Friendly fire was invented because of you', "I'd call all of you cancer, but at LEAST cancer kills.", 'Stephen Hawking has better hand-eye coordination than you.', "Too bad you weren't in control of the Titanic. You would have missed the Iceberg.", 'I bet your club penguin pets killed themselves', 'Did you know sharks only kill 5 people each year? Looks like you got some competition', "Why don't you check between your chair and your keyboard for the problem?", "You're the type of player to get 3rd place in a 1v1 match", 'I see you gained a new hobby, Collecting Bullets.', "Only thing you're carrying is an extra chromosome.", "It's just a joke not a dick, don't take it so hard.", 'The guy who played CSGO with a wheel is better than you', 'At least your ping knows how to high score.', 'I would unplug your life support to charge my phone.', "Why don't you slip into something more comefortable? Like a coma?", "You must have been born on a highway because that's where most accidents happen.", "I'm not saying I hate you, but I would unplug your life support to charge my phone.", "I'd ask you to shoot yourself, but you'd probably still miss.", " \t I bet you guys are going to single-handedly keep the porn industry alive for the next 30 years the way you're fucking us.", 'The only problem with your PC is that thing between your keyboard and your chair', "I'd tell you to kill yourself, but I'm pretty sure you'd miss.", "You know what they say, whatever doesn't kill you is just a surprise to the rest of us.", 'Ah yes, the Dead Sea, the second saltiest thing on Earth next to your bitch ass.', "I'm surprised that you were able hit the 'Install' button", 'Your birth certificate is an apology letter from the condom factory.', 'Are your parents siblings?', "It's a joke, not a cock, don't take it so hard.", "Don't beat yourself up. We already did that for you.", "You're lucky your dad's dick had better aim than you. ", 'You could shoot at the ground and still miss', 'Calling you a retard is a compliment in comparison to how stupid you actually are.', "Wow, this game should really be R-rated. I'm looking at the killfeed and all it shows is our team getting fucked. ", 'You are the reason why abortion is legal.', "imagine going through 9 months of pregnancy to give birth to a child who doesn't push the fucking payload.", "I was anti-abortion before I started this match but now I'm reconsidering.", 'Why is it acceptable for you to be terrible, but not for me to point it out?', "Fighting on the internet is like participating in the paralympics. Even if you win, you're still retarded.", 'i bet the last time u felt a breast was in a kfc bucket', 'You might help your future win-rate by uninstalling.', 'You have some big balls on you. Too bad they belong to the guy fucking you from behind. ', "I don't know what your problem is, but I bet its hard to pronounce ", 'Guys, can we put the bots on a higher difficulty?', '31.5 N, 35,5 E, the coordinates of the Dead Sea, the saltiest place on earth next to your bitch ass.', 'The killcam ran out of film thanks to you.', "It's quick, it's easy, and it's free: Trying.", 'Its a shame you werent the pilot of 9/11, you would have missed the building.', 'Does your ass ever get jealous of the amount of shit that comes out of your mouth', 'You should turn the game off. Just walk outside and find the nearest tree, then apologise to it for wasting so much oxygen.', 'Safest place for us to stand is in front of your gun', 'Perhaps your strategy should include trying.', 'With aim like that, I pity whoever has to clean the floor around your toilet', "Shut up, you'll never be the man your mother is.", "You're living proof that God has a sense of humour", 'Your Tinder profile has seen more lefts than a Nascar track', 'You make stormtroopers look good.', "If you were any more inbred you'd be a sandwich", "You're about as useful as a snowshovel in Hawaii.", 'How are you this bad at support? Do you work for Comcast?', 'Out of any animal you identify with, you chose a bitch.', 'To which foundation do I need to donate to help you?', 'Your years of practice on easy bots clearly paid off.', 'Did your parents try to get a refund?', "It's a joke, not a cock. Stop taking it hard.", "I'd tell you to blow me but you've been sucking dick all game", 'Abraham Lincoln can dodge bullets better than you.', 'There are about 37 trillion cells working together in your body right now, and you are disappointing every single one of them.', "I'm jealous of all the people who have never met you.", "You're as useful as a white crayon", "Do you believe in God ? cause he dosn't believe in you.", 'You could be the only person in the game and still manage to die.', 'I have neither the time, nor the crayons, to explain this to you.', 'Your aim is so poor that people held a fundraiser for it', 'Christopher Columbus has better map awareness than you', 'You know what man, blind gamers deserve a chance too. I support you.', 'Good job keeping your learning curve perfectly horizontal. ', "You're worth less than a Steam trading card", 'Some babies were dropped on their heads but you were clearly thrown at a wall', 'How the fuck were you the fastest sperm???!', 'If only you could hit an enemy as much as your dad hits you.', 'If I wanted to kill myself I would jump from your ego down to your IQ', "I'd like to see things form your point of view, but I can't get my head that far up my ass.", 'Does your ass ever get jealous of the amount of shit that comes out of your mouth?', 'Maybe God made you a bit too special.', "I'm pretty sure you've typed more sentences than landed shots.", 'Do you lose when you play against yourself too?', "I would tell you to shoot yourself, but you'd miss.", 'Does your ass get jealous of the shit that comes out of your mouth?', "You can't upload footage of this match to PornHub, because they don't allow rape.", 'Would you like some fries with that salt?', 'Oh look, Hitler missed one', "If you'd been the terrorist piloting the jet in 9/11, the towers would probably still be there", "If this was pay-to-win, you'd go bankrupt before you got your first kill.", 'Who set the bots to passive?', 'That crosshair is for aiming at enemies, you know.', 'I would insult you but nature did a better job.', 'You are a walking condom advertisment.', "I'd try to see things from your point of view but I couldn't get my head that far up my ass.", "Fuck yourself. You'll finally get some pussy that way. ", 'Are you always this stupid or is today a special occasion?', 'Legend has it that the number 0 was first invented after scientists calculated your chance of doing something useful.', "You know this isn't turn based combat right? When they shoot at you feel free to shoot back.", 'Stairs has killed more people than you have. ', 'Players like you are why Easy mode is a difficulty option.', 'only thing u carry is an extra chromosome', 'You are probably the only person that will miss with an aimbot.', "You're the reason they need to put instructions on Bleach bottles ", "This isn't golf dude.  You don't get a handicap.", "I can't wait till I have dementia so I can forget that ever happened.", "I'd call you an ape, but that'd give them more of a reason to shoot Harambe again.", 'It must be difficult for you, exhausting your entire vocabulary in one sentence.', "I'm sure your bodypillow is very proud of you.", "Stephen Hawking did great with his disability. Why can't you?", 'Is your huge death count compensating for something?', 'Yes, we know, you have a penis. Please remove it from the keyboard and play. ', 'If your face was a Counter Strike map, it would be de_formed.', 'Go down to the nearest drugstore and buy a little thing called viagra. It will help you go fuck yourself.', "Hitler knew when to kill-himself. Why can't you do the same?", 'The ocean must be jealous from the amount of salt you hold.', 'With a score as low as that, you must be amazing at golf.', "Don't worry guys, I am a trash man IRL. I am used to carry garbage like you", "I'm not questioning your intelligence, merely denying its existence", "I'm surprised you even hit the power button on your computer.", 'Does your ass get jealous of all the shit that comes out of your mouth?', "When I die, I'd like you to lower my coffin, so you can let me down one last time. ", 'I bet your brain feels as good as new, seeing that you never use it.', 'Your existence is the reason for scientists to rethink the plausibility of evolution.', 'I could swallow bullets and shit out a better spray than that', "'Three-second burst' should be your rate-of-fire, not your life expectancy", 'I have neither the time nor the crayons to explain this to you.', 'John Lennon is better at dodging bullets than you', 'Your existence is the best argument against intelligent design.', 'Try not to trip on your skill level on the way out.', 'Your parents need to get a very late term abortion', 'I could eat alphabet soup and still shit out a better argument than you.', "I'm not trash talking, I'm talking to trash", "If I wanted to kill myself I'd jump from your ego down to your IQ.", "You're that one guy that would actually get his dick stuck in a ceiling fan for not following instructions.", "I'd tell you where the uninstall button is but you'd miss that one too", "Imagine going through 9 months of pregnancy to give birth to a child who doesn't do the fucking objective.", 'Aiming can increase your accuracy.', 'If ignorance is bliss you must be the happiest person alive.', "You're like an onion. On the outside you're shit, but peel away a layer and underneath is another layer of shit", 'I suggest turning your monitor on for improved gaming performance.', "With that aim, I'm impressed you could even hit the queue button.", "How'd you get through the tutorial?", 'A million years of evolution and we get you.', "If I wanted to listen to an asshole, I'd fart", 'The game wants to uninstall you.', 'I would ask if you were new, but that would imply you can actually get better', "I can't carry you with all those extra chromosomes weighing you down.", "I'm jealous of people that don't know you.", 'If we learn from our mistakes, your parents must be geniuses now', 'Why is there an enemy team when I have my own shit teammates to deal with.', "I'd tell you to just end it and shoot yourself, but you'd probably miss.", "Whoever told you to just be yourself couldn't have given you worse advice", 'Your birth certificate is an apology from the condom factory.', 'You would make a perfect stormtrooper.', 'Is your ass jealous of the amount of shit that just came out of your mouth?', " You're the reason they need to put instructions on shampoo bottles.", 'If you listen closely, you can actually hear the salt crystals forming', 'I used to think everyone had the potential to be great, then I discovered you.', 'A fucking flight of stairs has killed more people than you have', 'If only you could hit an enemy as much as your dad hits you.', 'I think you dropped a pair of chromosomes right there', 'I used to be an athiest but only divine intervention could create something as miserable as you.', "Imagine going through a nine month pregnancy only to give birth to someone who can't push the fucking cart.", "I'd call you cancer but at least cancer can kill things", 'If laughter is the best medicine, your face must be curing the world.', 'I could eat a bowl of alphabet soup and shit out a smarter statement than that.', "Your mother should've spent the money on an abortion rather than the booze she drank during the pregnancy.", "I would ask you how old you are but I know you can't count that high.", 'You paid $1500 just to get destroyed in 4k. Good Investment.', "You're a prime example of why the gene pool needs a whole lot of bleach", 'please look at the screen when you are playing', 'Sorry, I lied. I called you cancer, but then I remembered that cancer acually kills people..', 'I appreciate you letting us win a few rounds to make it fair, but you can start trying now.', "What's higher, your IQ or your age?", "You're the reason the gene pool needs a lifeguard.", "Don't worry guys, I'm a garbage collector. I'm used to carrying trash.", "I'd tell you to commit suicide, but then you'd have a kill.", 'Some people get paid to suck, you do it for free. ', 'Mistakes were made, the worst one was by your parents.', 'You must really like that respawn timer', "I would mentally duel with you, but I can see you're unarmed", "I've never touched a cigarette. I feel a sense of regret for not doing it, because you gave me cancer anyway.", 'Remember, riding dick is not a mode of transportation.', "have you ever had a conversation where the other person wasn't just shaking their head in disappointment?", "i don't know what gets less hits... your aim or your online dating profile", 'Try playing the game normally, instead of just repeatedly slamming your forehead into the keyboard.', 'If you stopped jerking off, maybe the blood would go to your brain instead.', "If I wanted an excuse, I would've asked your mother why you werent aborted.", "Play with a blindfold on, at least you'll have a valid reason for missing all those shots.", 'I have bowel movements that move faster than your thought process', "It's dangerous to use your entire vocabulary in a single sentence!!!", 'When I die I want you to to lower me in my grave so you can let me down one more time.', 'I regret not smoking my entire life, because watching you still gave me cancer.', 'If you got cancer, I would feel bad for the cancer.', 'When your mother took you to school for the first time she was fined for littering', 'Imagine going through 9 months of pregnancy only to give birth to someone who decides to be the fucking fourth spy on the team.', 'ergkirhrjrl;asewi    shit, sorry, my cat walked on my keyboard and somehow it still played better than you.', "Were you always this shitty or you're trying really hard today?", "No this isn't Pay-To-Win, all you have to do is pay attention", "You're the reason your parents fight", "Are you constipated? 'cause you ain't doin' shit.", 'The only thing lower than your k/d ratio is your I.Q.', 'If you were the person controlling the plane, you wouldve missed the Twin Towers.', 'players like you should come with a handicap sticker', "aww, you're just like Jesus, always respawning and never hurting anyone :)", "I'm still not convinved God exists, but if he does you prove he has a sense of humor.", 'I think I broke the weightlifting record by carrying this team.', 'You can start trying now.', "With an aim like that, I'm surprised you were able to turn your PC on.", "It's a joke, not a cock, don't take it so hard", "I'd call you cancer, but at least cancer kills.", 'You can turn on your monitor now.', 'The Earth is 75% salt water, still less than the amount coming from your mouth', "It's incredible how you can bring so many people so much joy just by leaving the game!", 'You might as well start hacking, that way you could finally achieve something; a ban.', 'Your aim is so poor Bono is holding a charity concert for it.', "You don't have to worry about friends talking shit behind your back, seeing you have none.", "I'm sure you exist only because the other sperm felt bad.", 'I would slap you, but that would be animal abuse', "I've seen better reflexes from Bethesda NPCs", 'Friendly fire was invented because of you.', ' Your parents deserve more than this.', 'Might I suggest you beat the tutorial first', "I'd call my team cancer, but at least cancer kills.", 'Try switching your router off, that might help.', "I bet you're that guy that dies in the tutorial.", "I'd call you a tool, but that would imply you were useful in at least one way.", "You're as useful as Stephen Hawking's home gym", 'Only thing you carry is an extra chromosome.', 'Your idea of a comeback is jerking off into a fan', "You couldn't even support a drug addiction", "Wait, don't go. I still need more salt on my food.", 'Maybe you should try something more your speed.. like stopping', 'Which is lower, your score or your IQ?', 'Your ass must be jealous of all that shit coming out of your mouth', 'Your skill is like John Cena, nobody can see it', "If you ever win a match screencap and send to the church. Pretty sure that'll count as a miracle.", "I'd insult you, but my mother told me not to insult the handicapped. ", 'I guess the abortion clinic forgot one', 'You should apologize to every tree you see for wasting their oxygen', "If you keep crying, we're going to need to build another Ark.", 'If you were to shoot yourself, your K/D ratio would improve by 100%.', 'I`d call you cancer, but cancer actually gets kills', 'The only thing you are carrying is an extra chromosome', 'You are a living contradiction to evolution.', "You're the kind of guy who could lose to the maze on the back of a cereal box.", "Correct! I am a tool, because unlike you, I'm actually useful.", 'If I wanted to kill myself, I would climb up to your ego, and jump down to your IQ level.', "What's the biggest difference between you and Hitler? At least Hitler managed to kill himself.", "it was a joke, not a dick, don't take it so hard..", "I'm jealous of people that didnt know you.", 'Can a medic take a look at my back? It hurts from carrying this team.', 'Are you collecting bullets?', 'Letting you live was medical malpractice', "I'd tell you to shoot yourself, but I bet you'd miss", "Your existance is proof people don't know how to pull out.", 'I need an apology letter. Can I borrow your birth certificate?', 'if you open up enough crates, one might contain the chromosome you left inside your mom. ', 'Next round, you should try looking at the monitor.', "I'd call you cancer, but it kills.", 'You guys answered the age-old question of whether God could create a team of people so dense that even he could not carry them', 'Your aim is proof that excessive masturbation causes blindness', "It's sad that your IQ matches your shoe size.", 'You look like someone pressed the randomize button in the Oblivion character creator.', 'Warmup ended several rounds ago.', 'Two men walk into a bar. You walk into a fucking pole.', "If it wasn't for gravity you couldn't even hit the fucking ground", "You're the reason abortion was legalized", "You'll never be the man your mother is.", "Shouldn't you be trying to put a round block in a square hole somewhere?", 'You have a face that would make onions cry', "I'm actually a dump truck driver because i carry trash like you all day", 'I bet you would blame it on the lag at a LAN party too.', 'Your asshole must be jealous of all the shit that comes out of your mouth.', 'You remind me of the son I never wanted', "i'm just impressed you're still trying to play with a trackball", "I'm more worried about Gandhi attacking me than you.", 'You remind me of the last batch of scrambled eggs I made: beaten, over-salted, and burned.', 'Stevie Wonder can see how shit you are', "By the time this match ends you'll have as many deaths as chromosomes. ", "Do you ever wonder what life would be like if you'd had enough oxygen at birth?", "I bet you blame the lag even when you're playing with bots.", "There's a good game for you to practice. It's called Cookie Clicker.", "Do your parents cry every day or just on the days they realize they didn't get the abortion?", "My shoes have more support than you've given me.", 'You are like Forrest Gump but without the running thing.', 'Maybe if you spent as much effort on the game as do bitching, you might actually kill something other than my will to live.', "Let's just let natural selection take it's course", "You're the reason negatives numbers exist", 'Your family tree is a cactus, because everybody on it is a prick.', "The only thing you've killed this game is my faith in you.", 'Your reaction time is on par with the time it takes for plastic to decompose.', 'You are as useless as a white crayon', "I'd call you cancer, but at least cancer gets kills.", 'ethiopia could eat a year the way you are feeding ', "I wish we'd met years ago, I would have repressed the memory by now", 'Internet Explorer could run faster than you', "I'd agree with you, but then we'd both be wrong", "You're the human equivalent of a participation award.", 'Are you aiming for a pacifist walkthrough?', 'I noticed your sister got all the good genes from the family.', "You're living testament to the idea that people only use 10% of their brains", "I've had more engaging arguments with my dog", "You couldn't even hit puberty.", "WOW! imagine if your parents weren't siblings.", 'Feminists get more trigger time than you.', 'You probably think the light in the refrigerator never turns off.', "Two wrongs don't make a right, take your parents for instance", "Were you born on the highway, cause that's where all the accidents happen.", "I'd agree with you, but then we'd both be wrong.", "I think you should just go afk. You'd get better results.", "I'm okay with this team. I work in the city as a garbage collector. I'm used to carrying trash.", "Keep rolling your eyes, maybe you'll find a brain back there", "You must have been born on a highway, because that's where most accidents happen", "Rick Astley gave you up 'cause you let him down.", 'How about you stop carrying the other team?', "I'm Sorry I Can't Hear you From the Bottom of the Scoreboard", "I wonder if you last as long in bed as you do in this game.  I'd ask your girlfriend, but hands can't talk.", 'Your kill list is shorter than a list of french war heroes ', 'You know that if you plug the screen in you can actually see the enemies.', "I'd call you a piece of shit but that at least has use as fertilizer", 'A woman at a urinal has better spray control than you', "You're the reason why no religion has a god that stays on Earth.", 'What you lack in brain cells, you make up for in chromosome count.', "I'd tell you to go play in traffic, but you'd probably suck at that too.", 'I would call you cancer, but cancer actually kills people.', 'The only thing you carry is an extra chromosome', 'You should try your luck at russian roulette, at least you might kill something', "It's kinda sad watching you attempt to fit your entire vocabulary into one sentence.", 'I wish my HIV-Test would be as negative as your score ', "you're topping the scoreboard in chromosome count", 'Your reaction time is as fast as coastal erosion. ', 'Have you considered pointing that gun the other way around?', "Imagine going through 9 months of pregnancy just to give birth to a child who doesn't push the fucking payload", 'At least your immune system tries to stop you from dying.', "You're more fucked than a Ditto in day-care. ", "Even Noah can't carry these animals", 'stop hogging all the deaths', "I've been to daycares more threatening than you", "This game has a wide variety of playable characters and playstyles, and I'd appreciate it if you'd learn one.", '404: Skill not found', 'If you were a real terrorist, the world would be a much safer place.', 'You know your team is trying to win right?', "Two wrongs don't make a right, like your parents.", "Why don't you ever get out of the basement? Did you break the stairs while trying?", "You didn't make a mistake. Your parents did.", 'Team Fortress 2 is also Free-To-Uninstall,', 'I would tell you a joke, but your entire existance makes a better job at that than me.', 'Maybe you should just stick to playing singleplayer games.', 'It is dangerous to use your whole vocabulary in one sentence.', 'All of these flavors and you choose to be salty', 'Can you please check if your mouse is plugged in?', "What's the difference between you and a bench? The bench can actually support an entire team.", "I'd insult your mother, but I'd hurt your sister's feelings.", "I'd call your aim cancer, but at least cancer can kill people.", 'What language are you speaking? Cause it sounds like bullshit.', 'I would call you cancer but cancer actually gets kills', 'I would insult you, but my parents always told me not to abuse the profoundly handicapped.', 'Could you imagine what it would have been like if you had more oxygen at birth', "Your parents aren't the only ones who regret knowing you", 'Oh wait, this is not a bot game?', "You  have an inferiority complex, and it's completely justified", "I'm trying to see this from your perspective, but I can't seem to get my head that far up my own ass.", 'Your aim is so poor Obama made a plan for it.', 'Salt may be a solid but damn do you make it flow', "Holy shit! You're not just useless, you're harmless too!", '95% of lag occurs between the player and the computer', "You're baiting so hard you could probably catch a fucking shark", 'If I got a dollar every time you missed a shot i could buy you the glasses you so desperately need.', "If you honestly call that trying, you're not even a candidate for the participation award.", 'I doubt you can even count to your score.', "Two wrongs don't make a right, take your parents as an example.", 'At least your ping score is higher than mine', "Are you trying to beat the sea in a salt contest? That's probably the only thing you're winning right now.", "I've avoided smoking my entire life to prevent cancer, but with a play like that it seems I've missed out on cigars for nothing.", "I'd tell you to kill yourself but you probably couldn't even manage that", '**PROTIP** Your crosshair generally assists you in aiming.', 'Maybe you should try something more on your level, like rock-paper-scissors.', "Even the game's client-side prediction has no idea what you're trying to do.", "Your aim is so shit you couldn't hit the ground if you fell", 'The only thing you can hit is your dignity', "The way you're feeding, you could end world hunger.", 'I believed in the good and potential of humanity. And then you came along.', "I'm surprised you even managed to get out of bed without hurting yourself", "Do you have parkinson's or do you just aim like shit?", 'I was pro-life until I met you.', 'God ran out of clay, so he slapped a bunch of dog shit together to make you', 'I bet you have alot of participation awards...', 'Hey, give me a shoutout to your 2 Twitch viewers', "Just because you have the ability to click play doesn't mean you should.", "I'd make a joke, but you're already here", "Can't hear you from the bottom of the scoreboard", 'When your parents said shoot for the stars, this is not what they meant.', "If I wanted to kill myself I'd climb your ego and jump to your IQ.", "The way you're feeding, Africa may finally have a chance.", "I'm not saying you're useless, but I'd unplug your router to charge my phone. ", 'If you want to hear about mistakes, ask your parents.', "If you're going to be two-faced, at least make one of them pretty.", 'If ugliness was measured in bricks, you would make the great wall of china.', 'Kennedy dodges bullets better than you do.', 'Are you AFK? Good, we finally have a chance of winning.', "I'm calling this team 'Your dad.' Because it gives no support and keeps vanishing.", "video games bring new experiences and right now I'm experiencing what it's like to be a special needs caretaker", 'If you were any dumber I would have to water you twice a day', "Were you born on a freeway? Because that's where most accidents happen.", "Imagine what your life would be if your parents weren't siblings.", 'even the steam support is more useful than you', "You're the reason your dad drinks", 'At least terminal cancer gets kills.', 'Team Fortress 2 is also Free-To-Uninstall', "Believe in yourself, because the rest of us think you're an idiot.", 'Maybe you should try a single-player game.', 'Unplug the Ethernet cable. That gets rid of the lag.', 'Stephen Hawkings probably runs better than your game', "don't trip on your way into respawn", 'When I die, I want you to put my casket into my grave, so that you can let me down one last time.', 'I see your hobbies include lag, friendly fire and caps lock. Good for you.', 'How many tries did it take for you to click the install button?', 'Why are you still here? I thought trash day was yesterday.', 'It seems you and the kill cam have become well acquainted', 'If you really want to know about mistakes, you should ask your parents.', 'Oops, I must have chosen easy bots by accident', 'you could season a meal with all that salt from your tears', 'You make the dead sea seem like spring water', 'When you go to a family reunion, who brings the condoms?', 'I think you need to talk to your doctor about Type 2 Diabetes. You seem to be consuming a lot of salt.', 'Could you please play with both hands?', "I love a good sale, but ain't nobody buying your bullshit.", "If you killed as much people as made excuses, you would've topped the scoreboard by now.", "I'd tell you to kill yourself, but chances are you'd fuck that up too", 'Are you playing on pacifist mode?', "I know you're trying your best, but I wish your best was actually trying.", "Did Marvel buy the rights to your mouse?  Because you can't seem to actually kill anybody off.", 'You bring down the property value just being here.', '***PROTIP*** use your mouse to look around', 'Does your mouse have recoil or something?', 'You could win an oscar for how sad your life is.', "Can you just place your cat on the keyboard and leave? We've a better chance of winning that way. ", "This is why people talk about you when you're not around.", 'Shutting-the-fuck-up is also gluten free, why not add that to your diet?', 'Pro Tip: You can uninstall any game you play.', "You couldn't hit water if you fell out of a boat.", 'Imagine how much better you would be if your monitor was on.', "Remember that it's better to try and fail than to not try at all, so don't be afraid to start trying any time now", 'is your family tree a cactus? cause your all a bunch of pricks', 'I feel like you are the type of person to go negative against bots', 'If you want to reduce the number of times you lose, you could try uninstalling', 'You have worse map awareness than Christopher fucking Columbus.', "I didn't know dying was a special ability.", "You couldn't pour water out of a boot if the instructions were on the heel", "You aim like a hamster with parkinson's who's high on cocaine on the top floor of the World Trade Center during an earthquake", "You failed, just like your dad's condom", 'Your aim is so poor, even African countries feel the need to donate to you.', 'My vacuum cleaner is sucking less than you.', "I'm sorry, you'll have to be louder- sound doesn't travel all the way up the scoreboard.", "You should make a team and call it 'soup kitchen' cause you're feeding everyone", "Isn't your time running out on the library computer?", 'Your mother is so ugly people break into your house just to close the curtains', 'I think you should press the power button in order to contribute to the game.', "Mentally challenged people don't want to be referred as 'Retarded' becuase they don't want to be compared with you.", 'This team could lose at Farmville. ', 'You are more ignored than Terms and Services.', "I'd like to see things from your prespective, but I can't seem to get my head that far up your ass.", "I wonder if you'd be able to play better if your parents were second cousins instead of first.", "You lost the game for us? Don't worry, everyone makes mistakes, even God does, we have you to show for it!", "Give your parents my sympathy. I know it's hard raising an autistic child.", "Well I would agree with you but then we'd both be wrong", "I'd rather masturbate to tentacle porn with a toaster than to be matched with you again.", 'How many tries did it take for you to click on the button that launches the game?', "Just because you can act like a dumbass doesn't mean you should.", "I'd love to see things from your perspective, but I don't think I could shove my head that far up my ass.", "It'd be an insult to compare a stormtrooper to you. At least they know what they're trying to shoot at.", "You shouldn't play hide and seek, no one would look for you.", "You're a walking autism awareness poster", "I was going to make a joke about your kills but I couldn't find any.", "I've seen obese Mexican food vendors push carts better than this team.", "I'd suggest you to uninstall the game but I bet it's too complex for you", 'If I was your dad I would run away too.', "I've seen more support for North Korea than I've seen all game from you.", "Why don't you slip into something more comfortable...like a coma.", "I'd trade you for a park bench, at least it could support the team", 'Wow, do you kiss your cousin with that mouth?', "If I wanted to kill myself, I'd climb your ego and jump to your IQ.", 'The only thing you should be throwing is yourself out of a 4th story window', 'Did you get enough oxygen at birth?', 'The way you feed, you could stop world hunger.', 'If only all terrorists were like you... the world would be much safer.', 'Your ass must be jealous of all the shit that comes out of your mouth mouth', "I've killed spiders that put up more of a fight than you fucks.", 'Retards are just impersonating you', 'You demented sparrow!'];


function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      sOTD = /^\/scum of the day$/;
      beer = /^\/beer$/;
      dinner = /^\/dinner$/;
      smallFry = /^\/smallfry$/;
      bored = /^\/bored$/;

  this.res.writeHead(200);

  if((request.name.indexOf("Marc") !== -1 || request.name.indexOf("Jake") !== -1) && request.text.indexOf("Scumguy roast") !==-1) {
      var roastedPerson = request.text.substring(13,request.text.length);
      var index = Math.random() * insults.length;
      var insult = insults[index];
      postMessage(roastedPerson+"," + insult);
  }

  // if(request.text && sOTD.test(request.text)) {
  //   postMessage("Text: " + JSON.stringify(request) + "\nName: " + request.name);
  // }
  // if(beer.test(request.text)) {
  //   postMessage("You guys should be drinking " + beers[Math.floor(Math.random()*beers.length)] + " tonight");
  // }
  // if(dinner.test(request.text)) {
  //   postMessage("Let's get " + restaurants[Math.floor(Math.random()*restaurants.length)] + " tonight");
  // }
  // if(request.text.indexOf("What did Andrew buy?") !== -1) {
  //   postMessage("The Blue Moons");
  // }
  // if(smallFry.test(request.text)) {
  //   postMessage("When you get screwed out of a small fry", "https://i.groupme.com/540x960.jpeg.829fb06a5d94408895a6e7d59562a1ab");
  // }
  // if(request.text.indexOf("Push me to the edge") !== -1) {
  //   postMessage("","https://i.groupme.com/750x1334.jpeg.4e0db5f28b65414fb43e322cd9146a91")
  // }
  // if(request.name.indexOf("Andre") !== -1 ) {
  //   postMessage("I'm pretty spiritually aware and religious. It adds a layer to my life that does assist me greatly.");
  // }
  // if(request.text.indexOf("$") !== -1) {
  //   postMessage("Money is the root of all evil " + request.name + "!");
  // }
  
  // if(bored.test(request.text)) {
  //   postMessage("Copy and Paste the message below and send it with your first move to start");
  //   postMessage("Tic Tac Toe                              \
  //                                                   - - - \
  //                                                                - - - \
  //                                                                - - -")
  // }
  // if(request.text.indexOf("Tic Tac Toe") !== -1 && request.name != "Scum Guy") {
  //   var tic = request.text;
  //   var tac;
  //   postMessage(tic.length);
  // }

  this.res.end();
}

function postMessage(message, image_url) {
  var botResponse, options, body, botReq;

  botResponse = message;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };
  if(image_url != null) {
    body = {
      "bot_id" : botID,
      "text" : botResponse,
      "attachments" : [
         {
           "type"  : "image",
           "url"   : image_url
          }
      ]
    }
  } else {
    body = {
      "bot_id" : botID,
      "text" : botResponse
    };
  }
  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
