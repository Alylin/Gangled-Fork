import React, {useState, useRef, useEffect} from 'react';
import { MdArrowRight, MdArrowLeft } from 'react-icons/md';

const ScrollArea = ({ children }) => {
    const [positionPercent, setPositionPercent] = useState({x: 0, y: 0});
    const scrollingArea = useRef();
    const [hasScrollHorizontal, setHasScrollHorizontal] = useState(false);

    useEffect(() => {
        const currentScrollingArea = scrollingArea.current;
        function onScroll() {
            setPositionPercent({
                x: (currentScrollingArea.scrollLeft) / (currentScrollingArea.scrollWidth - currentScrollingArea.getBoundingClientRect().width), 
                y: (currentScrollingArea.scrollTop) / (currentScrollingArea.scrollHeight - currentScrollingArea.getBoundingClientRect().height)
            });
        }
        currentScrollingArea.addEventListener('scroll', onScroll);
        return () => {
            currentScrollingArea.removeEventListener('scroll', onScroll);
        }
    });

    useEffect(() => {
        const onResize = () => {
            if (scrollingArea.current) {
                setHasScrollHorizontal((scrollingArea.current.scrollWidth - scrollingArea.current.getBoundingClientRect().width) > 10);
            }
        };
        onResize();
        const resizeObserver = new ResizeObserver(onResize);
    
        resizeObserver.observe(scrollingArea.current);

        return () => {
            resizeObserver.disconnect();
        }
    }, [positionPercent, children]);

    return (
        <div className="relative overflow-hidden">
            {!!hasScrollHorizontal && positionPercent.x !== 0 &&
                <span className={'absolute h-full pb-[16px] lg:w-5 z-20 left-0 top-0'}>
                    <div 
                        className="from-primary bg-gradient-to-r h-full w-full" 
                    />
                    <button
                        className="absolute top-1/3 -left-3 bg-primary/60 rounded-lg blurThing"
                        onClick={() => {
                            scrollingArea.current.scrollLeft -= 400;
                        }}
                    >
                        <MdArrowLeft className="fill-primary h-8 w-8" />
                    </button>
                </span> 
            }
            <div className="flex">
                <div 
                    ref={scrollingArea}
                    className="flex flex-1 flex-col lg:flex-row overflow-auto max-h-80 customscrollbar snap-both scroll-smooth"
                >
                    {children}
                </div>
            </div>
            {!!hasScrollHorizontal && positionPercent.x < 0.999 &&
                <span className={'absolute h-full pb-[16px] mb-10 lg:w-5 z-20 right-0 top-0'}>
                    <div 
                        className="from-primary bg-gradient-to-l h-full w-full" 
                    />
                    <button
                        className="absolute top-1/3 -right-3 bg-primary/60 rounded-lg blurThing"
                        onClick={() => {
                            scrollingArea.current.scrollLeft += 400;
                        }}
                    >
                        <MdArrowRight className="fill-primary h-8 w-8" />
                    </button>
                </span>
            }
        </div>
    )
}

export default ScrollArea;