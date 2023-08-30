import { MdOpenInNew } from 'react-icons/md';

const getRelativeUrl = () => {
    const baseUrl = window.location.origin;
    const currentUrl = window.location.href;
    const relativeUrl = currentUrl.replace(baseUrl, '');

    return relativeUrl;
};

export default function LeftBar() {
    return (
        <div className="w-1/6 min-w-48 pl-5 relative">
            <div className="font-semibold sticky top-14 h-40 z-10 text-lg">
                <div className="border-b-2 border-secondary mx-1">
                    Page Settings
                </div>
                <button
                    className="flex items-center text-sm my-2 p-1 hover:bg-hover rounded-md w-full"
                    onClick={() => {
                        window.open(`${getRelativeUrl()}/micro`, 'test', 'popup');
                    }}
                >
                    <MdOpenInNew className="w-5 h-5 mr-1" />
                    <span className="pr-0.5"> Open in Popup</span>
                </button>
            </div>
        </div>
    );
}