import { useEffect, useRef } from 'react/cjs/react.development';
import ColorPicker from '../colorpicker';
import classNames from 'classnames';
import LittleDude from './battlemap/littledude';
import axios from 'axios';

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
  
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}

const changling = {
    displayName: 'Changling',
    characteristics: {
        brawn: 2,
        agility: 3,
        intellect: 2,
        cunning: 2,
        willpower: 2,
        presence: 2
    },
    initialWoundThreshold: 10,
    initialStrainThreshold: 10
};

const availableSpecies = [
    changling
];

function getName(species) {
    return 'Frank';
}

const skills = {
    general: {
        athletics: {
            key: 'athletics',
            characteristic: 'brawn',
            ranks: 0,
            isCareerSkill: false
        },
        charm: {
            key: 'charm',
            characteristic: 'presence',
            ranks: 0,
            isCareerSkill: false
        },
        coercion: {
            key: 'coercion',
            characteristic: 'willpower',
            ranks: 0,
            isCareerSkill: false
        },
        computers: {
            key: 'computers',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        cool: {
            key: 'cool',
            characteristic: 'presence',
            ranks: 0,
            isCareerSkill: false
        },
        coordination: {
            key: 'coordination',
            characteristic: 'agility',
            ranks: 0,
            isCareerSkill: false
        },
        deception: {
            key: 'deception',
            characteristic: 'cunning',
            ranks: 0,
            isCareerSkill: false
        },
        discipline: {
            key: 'discipline',
            characteristic: 'willpower',
            ranks: 0,
            isCareerSkill: false
        },
        leadership: {
            key: 'leadership',
            characteristic: 'presence',
            ranks: 0,
            isCareerSkill: false
        },
        mechanics: {
            key: 'mechanics',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        medicine: {
            key: 'medicine',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        negotiation: {
            key: 'negotiation',
            characteristic: 'presence',
            ranks: 0,
            isCareerSkill: false
        },
        perception: {
            key: 'perception',
            characteristic: 'cunning',
            ranks: 0,
            isCareerSkill: false
        },
        piloting: {
            key: 'piloting',
            characteristic: 'agility',
            ranks: 0,
            isCareerSkill: false
        },
        driving: {
            key: 'driving',
            characteristic: 'agility',
            ranks: 0,
            isCareerSkill: false
        },
        resilience: {
            key: 'resilience',
            characteristic: 'brawn',
            ranks: 0,
            isCareerSkill: false
        },
        skulduggery: {
            key: 'skulduggery',
            characteristic: 'cunning',
            ranks: 0,
            isCareerSkill: false
        },
        stealth: {
            key: 'stealth',
            characteristic: 'agility',
            ranks: 0,
            isCareerSkill: false
        },
        streetwise: {
            key: 'streetwise',
            characteristic: 'cunning',
            ranks: 0,
            isCareerSkill: false
        },
        survival: {
            key: 'survival',
            characteristic: 'cunning',
            ranks: 0,
            isCareerSkill: false
        },
        vigilance: {
            key: 'vigilance',
            characteristic: 'willpower',
            ranks: 0,
            isCareerSkill: false
        }
    },
    knowledge: {
        upperclass: {
            key: 'upperclass',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        commonplace: {
            key: 'commonplace',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        education: {
            key: 'education',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        lore: {
            key: 'lore',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        underworld: {
            key: 'underworld',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        },
        zoology: {
            key: 'zoology',
            characteristic: 'intellect',
            ranks: 0,
            isCareerSkill: false
        }
    },
    combat: {
        brawl: {
            key: 'brawl',
            characteristic: 'brawn',
            ranks: 0,
            isCareerSkill: false
        },
        gunnery: {
            key: 'gunnery',
            characteristic: 'agility',
            ranks: 0,
            isCareerSkill: false
        },
        melee: {
            key: 'melee',
            characteristic: 'brawn',
            ranks: 0,
            isCareerSkill: false
        },
        rangedLight: {
            key: 'rangedLight',
            characteristic: 'agility',
            ranks: 0,
            isCareerSkill: false
        },
        rangedHeavy: {
            key: 'rangedHeavy',
            characteristic: 'agility',
            ranks: 0,
            isCareerSkill: false
        }
    }
};

function upgradeCharacteristics(characteristics, xp) {
    let upgradingCharacteristics = true;
    while (upgradingCharacteristics) {
        const characteristicNames = Object.keys(characteristics);
        const characteristicName = characteristicNames[Math.floor(Math.random() * characteristicNames.length)];
        const currentValue = characteristics[characteristicName];
        const upgradeCost = (currentValue + 1) * 10;
        if (upgradeCost < xp) {
            xp = xp - upgradeCost;
            characteristics[characteristicName]++;
        }
        else {
            upgradingCharacteristics = false;
        }
    }
    return {
        characteristics: characteristics,
        remainingXp: xp
    };
}

function filterForBestCombatCharacteristic(characteristics, skill) {
    if (skill.characteristic === 'brawn') {
        return characteristics.brawn >= characteristics.agility;
    }
    if (skill.characteristic === 'agility') {
        return characteristics.agility >= characteristics.brawn;
    }
    return true; 
}

function getSkillUpgradeCost(skill) {
    return ((skill.ranks + 1) * 5) + (skill.isCareerSkill ? 5 : 0);
}

// returns the spent XP if succeeds, otherwise returns false. 
function attemptSkillUpgrade(skill, xp) {
    const skillUpgradeCost = getSkillUpgradeCost(skill);
    if (skillUpgradeCost < xp && skill.ranks < 5) {
        skill.ranks++;
        return skillUpgradeCost;
    }
    return false;
}

function getProficientSkills(characteristics) {
    const combatSkills = JSON.parse(JSON.stringify(skills.combat));
    const combatSkillNames = Object.keys(combatSkills);
    return combatSkillNames.filter((skill) => {
        return filterForBestCombatCharacteristic(characteristics, combatSkills[skill]); 
    });
}

function upgradeBestCombatSkills(characteristics, xp) {
    const proficientSKills = getProficientSkills(characteristics)
    const primarySkill = JSON.parse(JSON.stringify(skills.combat[proficientSKills[Math.floor(Math.random() * proficientSKills.length)]]));
    // secondary skill may be the same as primary skill, and that's okay. 
    const secondarySkill = JSON.parse(JSON.stringify(skills.combat[proficientSKills[Math.floor(Math.random() * proficientSKills.length)]]));

    let attemptingUpgrades = true;
    while (attemptingUpgrades) {
        const spentXp = attemptSkillUpgrade(primarySkill, xp);
        if (!spentXp) {
            attemptingUpgrades = false; 
        }
        xp = xp - spentXp;
    }
    return {
        primarySkill: primarySkill,
        secondarySkill: secondarySkill,
        remainingXp: xp
    }
}

function generateInitialCharacter(initialXp = 80, additionalXp = 0) {
    const species = JSON.parse(JSON.stringify(availableSpecies[Math.floor(Math.random() * availableSpecies.length)]));
    const name = getName(species);
    const { characteristics, remainingXp } = upgradeCharacteristics(species.characteristics, initialXp);

    const totalXp = remainingXp + additionalXp;

    const { primarySkill, secondarySkill } = upgradeBestCombatSkills(characteristics, totalXp);

    console.log(characteristics);
    console.log(primarySkill);


    return {
        name: name
    }
}
{/* <Button displayName={displayName} isCircle={true} buttonAction={() => {
    setIsDropdownVisible(true);
}} onFocus={() => {
    setIsDropdownVisible(true);
}}>
    <MenuIcon />
</Button> */}

function SettingsPage() {
    let littleDude;
    const canvasRef = useRef();

    useEffect(() => {
        littleDude = new LittleDude(5, 5, 50, 50, []);
        const intervalId = window.setInterval(() => { //requestAnimationFrame
            const ctx = canvasRef.current.getContext("2d");
            ctx.save();
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            littleDude.tick();
            littleDude.paint(canvasRef.current);
            ctx.restore();
        }, 30);

        return () => {
            clearInterval(intervalId);
        }
    });

    const intialCharacter = generateInitialCharacter();

    return (
        <div className="p-6 font-semibold">
            <div onClick={() => {
                littleDude = new LittleDude(5, 5, 50, 20, []);
            }}> 
                test
            </div>
            <ColorPicker />
            {navigator.languages}
            {/* {navigator.geolocation.getCurrentPosition((geolocationPosition) => {
                alert(geolocationPosition.coords.latitude+', '+geolocationPosition.coords.longitude);
            })} */}
            <button onClick={() => {
                axios.get('/test').then((response) => {
                    console.log(response.data)
                });
            }}>
                Send request
            </button>

            {/* <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
            onSignIn(googleUser) {
                var profile = googleUser.getBasicProfile();
                console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            }
            <button onClick={() => {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function() {
                    console.log('User signed out.');
                });
            }}>
                login maybe?
            </button>*/}

            <div>
                <canvas 
                    ref={canvasRef}
                    id="canvas" 
                    width="384" 
                    height="384" 
                    className={classNames('w-96 h-96 cursor-grab bg-white')}
                    onMouseMove={(event) => {
                        if (littleDude.grabbedPos) {
                            const canvas = event.target;
                            const pos = getMousePos(canvas, event);
                            littleDude.onMove(pos);
                        }
                    }}
                    onMouseDown={(event) => {
                        const canvas = event.target;
                        const pos = getMousePos(canvas, event);
                        if (littleDude.hitTest(pos.x, pos.y)) {
                            littleDude.onGrab(pos);
                        }
                    }}
                    onMouseUp={() => {
                        littleDude.onRelease();
                    }}
                />
            </div>
        </div>
    );
    
}

export default SettingsPage;