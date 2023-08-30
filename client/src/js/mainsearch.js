import axios from 'axios';

const tags = {
    mythical: 'mythical',
    gaming: 'gaming',
    cute: 'cute'
}

const searchableThings = [
    {
        id: 1,
        displayName: 'Cerberus',
        description: 'a three headed dog, pet of Hades.',
        imagePath: '../examplebackground1.jpg',
        tags: [
            tags.mythical,
            tags.cute
        ]
    }, 
    {
        id: 2,
        displayName: 'Cyclopes',
        description: 'one-eyed giants.',
        imagePath: '../examplebackground2.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 3,
        displayName: 'Gigantes',
        description: 'were a race of great strength and aggression. Archaic and Classical representations show Gigantes as human in form. Later representations show Gigantes with snakes for legs.',
        imagePath: '../examplebackground3.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 4,
        displayName: 'Gorgons',
        description: 'female monsters depicted as having snakes on their head instead of hair, and sometimes described as having tusks, wings and brazen claws.',
        imagePath: '../examplebackground4.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 5,
        displayName: 'Manticore',
        description: 'having the body of a red lion and a human head with three rows of sharp teeth. The manticore can shoot spikes out of its tail, making it a deadly foe.',
        imagePath: '../examplebackground5.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 6,
        displayName: 'Merpeople',
        description: 'humans with fish tail after torso (Mermaid as female, Merman as male). They lure adventurers to drown them.',
        imagePath: '../examplebackground6.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 7,
        displayName: 'Ouroboros',
        description: 'an immortal self-eating, circular being. The being is a serpent or a dragon curled into a circle or hoop, biting its own tail.',
        imagePath: '../examplebackground7.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 8,
        displayName: 'Philinnion',
        description: 'unwed maiden who died prematurely and returned from the tomb as the living dead to consort with a handsome youth named Makhates. When her mother discovered the girl she collapsed back into death and was burned by the terrified townsfolk beyond the town boundaries.',
        imagePath: '../examplebackground8.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 9,
        displayName: 'Phoenix',
        description: 'a golden-red fire bird of which only one could live at a time, but would burst into flames to rebirth from ashes as a new phoenix.',
        imagePath: '../examplebackground9.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 10,
        displayName: 'Sirens',
        description: 'bird-like women whose irresistible song lured sailors to their deaths.',
        imagePath: '../examplebackground10.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 11,
        displayName: 'Sphinx',
        description: 'Androsphinx or simply Sphinx, a creature with the head of a human and the body of a lion.',
        imagePath: '../examplebackground11.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 12,
        displayName: 'Pegasus',
        description: 'a divine winged stallion that is pure white, son of Medusa and Poseidon, brother of Chrysaor and father of winged horses.',
        imagePath: '../examplebackground12.jpg',
        tags: [
            tags.mythical,
            tags.cute
        ]
    }, 
    {
        id: 13,
        displayName: 'Amphisbaena',
        description: 'a serpent with a head at each end.',
        imagePath: '../examplebackground13.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 14,
        displayName: 'Chimera',
        description: 'a fire-breathing, three-headed monster with one head of a lion, one of a snake, and another of a goat, lion claws in front and goat legs behind, and a long snake tail.',
        imagePath: '../examplebackground14.jpg',
        tags: [
            tags.mythical
        ]
    }, 
    {
        id: 15,
        displayName: 'Mario',
        description: 'Super Mario Brothers',
        imagePath: '../examplebackground15.jpg',
        tags: [
            tags.gaming
        ]
    }, 
    {
        id: 16,
        displayName: 'Link',
        description: 'The Legend of Zelda',
        imagePath: '../examplebackground16.jpg',
        tags: [
            tags.gaming,
            tags.cute
        ]
    },
    {
        id: 17,
        displayName: 'Kirby',
        description: 'Kirby\'s Dreamland',
        imagePath: '../examplebackground19.jpg',
        tags: [
            tags.mythical,
            tags.gaming,
            tags.cute
        ]
    }, 
    {
        id: 18,
        displayName: 'Samus',
        description: 'Metroid',
        imagePath: '../examplebackground20.jpg',
        tags: [
            tags.gaming,
            tags.cute
        ]
    },
    {
        id: 19,
        displayName: 'King Dedede',
        description: 'Kirby\'s Dreamland',
        imagePath: '../examplebackground22.jpg',
        tags: [
            tags.gaming
        ]
    }, 
    {
        id: 20,
        displayName: 'Villager',
        description: 'Animal Crossing',
        imagePath: '../examplebackground23.jpg',
        tags: [
            tags.gaming,
            tags.cute
        ]
    }, 
    {
        id: 21,
        displayName: 'Pichu',
        description: 'Pokemon',
        imagePath: '../examplebackground24.jpg',
        tags: [
            tags.gaming,
            tags.cute
        ]
    }, 
    {
        id: 22,
        displayName: 'Yoshi',
        description: 'Super Mario World',
        imagePath: '../examplebackground26.jpg',
        tags: [
            tags.gaming,
            tags.cute
        ]
    }, 
    {
        id: 23,
        displayName: 'Zelda',
        description: 'The Legend of Zelda',
        imagePath: '../examplebackground27.jpg',
        tags: [
            tags.gaming,
            tags.cute
        ]
    }, 
    {
        id: 24,
        displayName: 'Fox',
        description: 'Star Fox',
        imagePath: '../examplebackground28.jpg',
        tags: [
            tags.gaming
        ]
    }, 
    {
        id: 25,
        displayName: 'Mewtwo',
        description: 'Pokemon',
        imagePath: '../examplebackground29.jpg',
        tags: [
            tags.gaming
        ]
    }, 
    {
        id: 26,
        displayName: 'Olimar',
        description: 'Pikmin',
        imagePath: '../examplebackground30.jpg',
        tags: [
            tags.gaming
        ]
    }, 
    {
        id: 27,
        displayName: 'R.O.B.',
        description: 'Peripheral for the NES',
        imagePath: '../examplebackground31.jpg',
        tags: [
            tags.gaming
        ]
    }, 
    {
        id: 28,
        displayName: 'Ryu',
        description: 'Street Figher',
        imagePath: '../examplebackground32.jpg',
        tags: [
            tags.gaming
        ]
    }, 
    {
        id: 29,
        displayName: 'Pit',
        description: 'Kid Icarus',
        imagePath: '../examplebackground33.jpg',
        tags: [
            tags.mythical,
            tags.gaming,
            tags.cute
        ]
    }
];

function scoreResult(result, searchTerm) { // test108 break apart the result for things too. Arabic worries, define more breakers. 
    const displayName = result.toLowerCase().trim()
    if (displayName === searchTerm) {
        return 100;
    }
    if (displayName.startsWith(searchTerm)) {
        return 50;
    }
    const nameParts = displayName.split(' ')
    for (let i = 0; i < nameParts.length; i++) {
        let namePart = nameParts[i];
        if (namePart === searchTerm) {
            return 30;
        }
        if (namePart.startsWith(searchTerm)) {
            return 20;
        }
    }
    return 0;
}

export function genericSearch(searchTerm, searchableList) {
    searchTerm = searchTerm?.toLowerCase()?.trim() || '';
    return searchableList.filter((listItem) => {
        return listItem.toLowerCase().trim().includes(searchTerm);
    }).sort((a, b) => {
        return scoreResult(b, searchTerm) - scoreResult(a, searchTerm);
    });
}

class MainSearch{
    constructor(resultsLimit) {
        this.resultsLimit = resultsLimit;
    }

    search(searchTerm, tags) {
        searchTerm = searchTerm?.toLowerCase()?.trim() || '';
        const searchResults = searchableThings.filter((listItem) => {
            if (!tags?.length) {
                return true;
            }
            let hasAllTags = true;
            tags.every((tag) => {
                if (!listItem.tags.includes(tag)) {
                    hasAllTags = false;
                    return false;
                }
                return true;
            });
            return hasAllTags;
        }).filter((listItem) => {
            return listItem.displayName.toLowerCase().trim().includes(searchTerm);
        }).sort((a, b) => {
            return scoreResult(b.displayName, searchTerm) - scoreResult(a.displayName, searchTerm);
        }).slice(0, this.resultsLimit);
        
        return searchResults;
    }

    realSearch(searchTerm, tags, resultsLimit) {
        return axios.post('/search', {
            searchTerm: searchTerm, 
            tags: tags,
            resultsLimit: resultsLimit
        });
    }

    getTags() {
        return axios.get('/getTags');
    }
}


export default MainSearch;