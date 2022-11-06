import React from 'react';

const randomTitles = [
    'this is',
    'some random',
    'titles',
    'bigwordsnow',
    'and some longer titles for variation',
    'all for variation',
    'Cheese God lol',
    'idk why this was about cheese',
    'pizza time',
    'and Lasagna'
]

const randomDescriptions = [
    'This is the loading description if that makes any sense. Hopefully you can\'t read this',
    'but if you can read this, please ignore it.',
    'because you should NOT be readin it, this is just for when something is loading',
    'just an abstract text thing, you know?',
    'Now let us go fucking wild you know? like blah blab aweohuitghoiaerghoi if you know what I mean',
    'a long time ago the three nations of cheese were all but destroyed',
    'but then, in a brilliant light, a fourth cheese nation was created that was able to unite them into a delicious lasagna',
    'you see, the leader of the fourth cheese nation was an expert diplomate, being able to know when to compromise and when to hold his ground',
    'so with his advisors as his side',
    'he was able to talk to each of the cheese leaders individually and figure out the cause of the strife',
    'but even with his expert diplomacy the nations began to war again.',
    'so he pleaded and begged the cheese god to come down and grant them eternal cheesy peace.',
    'but the cheese god simply melted them and made pizza',
    'the end'
]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function Panel(props) {
    const {
        displayName,
        description, 
        imagePath,
        isLoading
    } = props;

    if (isLoading) {
        return (
            <div className="lg:inline-block lg:h-52 lg:w-48 lg:min-w-48 w-full block h-24 rounded-lg shadow-md cursor-pointer relative overflow-hidden" tabIndex="0">
                <div className="bg-opacity-50 rounded-lg h-full w-full bg-black z-10 absolute p-2 hover:bg-opacity-60 font-abstract">
                    <div className="text-white text-xl pb-2 overflow-hidden overflow-ellipsis animate-pulse" title={displayName}>
                        {randomTitles[getRandomInt(0, randomTitles.length)]}
                    </div>
                    <div className="text-white italic text-sm overflow-hidden overflow-ellipsis animate-pulse">
                        {randomDescriptions[getRandomInt(0, randomDescriptions.length)]}
                    </div>
                </div>
                <div className="bg-gray-500 h-full w-full inline-block rounded-lg" />
            </div>
        );
    }

    return (
        <div className="lg:inline-block lg:h-52 lg:w-48 lg:min-w-48 w-full block h-24 rounded-lg shadow-md cursor-pointer relative overflow-hidden" tabIndex="0">
            <div className="bg-opacity-50 rounded-lg h-full w-full bg-black z-10 absolute p-2 hover:bg-opacity-60">
                <div className="font-medium text-white pb-2 overflow-hidden overflow-ellipsis" title={displayName}>
                    {displayName}
                </div>
                <div className="text-white italic text-sm overflow-hidden overflow-ellipsis">
                    {description}
                </div>
            </div>
            <div className="bg-green-800 h-full w-full inline-block rounded-lg" style={{
                background: `center / cover no-repeat url(${imagePath})`
            }} />
        </div>
    );
}

export default Panel;