import english from './en-us';
import japanese from './ja-jp';

const getMessage = (messageKey) => {
    const language = navigator?.languages.find((language) => {
        language = language.toLowerCase();
        return language === 'en-us' || language === 'en' || language === 'ja' || language === 'ja-jp';
    }).toLowerCase();
    if (language === 'en-us' || language === 'en') {
        return english[messageKey];
    }
    else if (language === 'ja-jp' || language === 'ja') {
        return japanese[messageKey];
    }
    else {
        return english[messageKey];
    }
} ;

const messages = {
    favourites: () => {
        return getMessage('favourites');
    },
    comingSoon: () => {
        return getMessage('comingSoon');
    },
    search: () => {
        return getMessage('search');
    },
    new: () => {
        return getMessage('new');
    },
    discover: () => {
        return getMessage('discover');
    },
    personalInformation: () => {
        return getMessage('personalInformation');
    },
    themes: () => {
        return getMessage('themes');
    },
    notifications: () => {
        return getMessage('notifications');
    },
    security: () => {
        return getMessage('security');
    },
    profile: () => {
        return getMessage('profile');
    },
    settings: () => {
        return getMessage('settings');
    },
    home: () => {
        return getMessage('home');
    },
    noResultsFound: () => {
        return getMessage('noResultsFound');
    },
    system: () => {
        return getMessage('system');
    },
    dark: () => {
        return getMessage('dark');
    },
    light: () => {
        return getMessage('light');
    },
    highContrast: () => {
        return getMessage('highContrast');
    },
    debug: () => {
        return getMessage('debug');
    },
    generalSearchPlaceholder: () => {
        return getMessage('generalSearchPlaceholder');
    }
};

export default messages;