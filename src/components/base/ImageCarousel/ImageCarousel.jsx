import { useState, useRef } from 'react';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import {
    PrevImgCarouselHoverIcon,
    PrevImgCarouselIcon,
    NextImgCarouselIcon,
    NextImgCarouselHoverIcon,
} from '../../../assets/svgIcons';

import './ImageCarousel.scss';

const imageCarouselSchema = z.object({
    imageList: z.array(z.looseObject({})),
});

const ImageCarousel = ({ imageList }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const [pendingIndex, setPendingIndex] = useState(null);
    const [transitionToggle, setTransitionToggle] = useState(false);

    // prevent multiple click while animating
    const isAnimating = useRef(false);

    const [carouselBtnLeftHover, setCarouselBtnLeftHover] = useState(false);
    const [carouselBtnRightHover, setCarouselBtnRightHover] = useState(false);
    const touchStartX = useRef(0);

    const imgChangeHandler = (direction) => {
        if (isAnimating.current) return;

        isAnimating.current = true;

        const nextIndex = (activeImgIndex + direction + imageList.length) % imageList.length;

        setPendingIndex({ index: nextIndex, direction });

        // Two nested frames, same reason as before: frame 1 lets the
        // incoming image actually paint at its off-screen starting spot;
        // frame 2 is when we flip `sliding` on, so the transition applies
        // to the MOVE, not to the initial placement.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTransitionToggle(true);
            });
        });

        // when transition completed, reset everything and set currentIndex to be next index.
        setTimeout(() => {
            setActiveImgIndex(nextIndex);
            setPendingIndex(null);
            setTransitionToggle(false);
            isAnimating.current = false;
        }, 660);
    };

    // 1 = next; -1 = prev
    const prevImgHandler = () => imgChangeHandler(-1);
    const nextImgHandler = () => imgChangeHandler(1);

    // Position math (percentage-based)
    // translateX(N%) on an absolutely-positioned, width:100% image always
    // means "N% of THIS image's own box" — which equals one container
    // width, no matter what the real image dimensions are.
    //
    // direction = 1 (next): incoming starts at +100% (off-screen right),
    //   slides to 0%. Current image slides from 0% to -100% (exits left).
    // direction = -1 (prev): mirrored — incoming starts at -100% (left),
    //   current exits to +100% (right).

    const currentImageOffset = pendingIndex ? (transitionToggle ? -pendingIndex.direction * 100 : 0) : 0;

    const incomingImageOffset = pendingIndex ? (transitionToggle ? 0 : pendingIndex.direction * 100) : null;

    const transition = transitionToggle ? 'transform 660ms ease-in-out' : 'none';

    return (
        <div className="carouselWrapper">
            {imageList.length > 0 && (
                <>
                    <button
                        className="carouselBtn carouselBtnLeft"
                        onMouseEnter={() => setCarouselBtnLeftHover(true)}
                        onMouseLeave={() => setCarouselBtnLeftHover(false)}
                        onClick={prevImgHandler}
                    >
                        {carouselBtnLeftHover ? (
                            <PrevImgCarouselHoverIcon></PrevImgCarouselHoverIcon>
                        ) : (
                            <PrevImgCarouselIcon></PrevImgCarouselIcon>
                        )}
                    </button>

                    <div
                        className="imagesWrapper"
                        onTouchStart={(e) => {
                            touchStartX.current = e.touches[0].clientX;
                        }}
                        onTouchEnd={(e) => {
                            const touchDistance = e.changedTouches[0].clientX - touchStartX.current;

                            if (touchDistance < -30) nextImgHandler();
                            if (touchDistance > 30) prevImgHandler();
                        }}
                    >
                        <img
                            key={`currentPrjImg${imageList[activeImgIndex].name}`}
                            src={imageList[activeImgIndex].src}
                            alt={`project ${imageList[activeImgIndex].name} image ${imageList[activeImgIndex].id + 1}`}
                            className="projectImage"
                            style={{
                                transform: `translateX(${currentImageOffset}%)`,
                                transition,
                            }}
                        />

                        {/* Next image - only exist if transition is currently happening */}
                        {pendingIndex && (
                            <img
                                key={`nextPrjImg${imageList[pendingIndex.index].name}`}
                                src={imageList[pendingIndex.index].src}
                                alt={`project ${imageList[pendingIndex.index].name} image ${imageList[pendingIndex.index].id + 1}`}
                                className="projectImage"
                                style={{
                                    transform: `translateX(${incomingImageOffset}%)`,
                                    transition,
                                }}
                            />
                        )}
                    </div>

                    <button
                        className="carouselBtn carouselBtnRight"
                        onMouseEnter={() => setCarouselBtnRightHover(true)}
                        onMouseLeave={() => setCarouselBtnRightHover(false)}
                        onClick={nextImgHandler}
                    >
                        {carouselBtnRightHover ? (
                            <NextImgCarouselHoverIcon></NextImgCarouselHoverIcon>
                        ) : (
                            <NextImgCarouselIcon></NextImgCarouselIcon>
                        )}
                    </button>

                    <div className="carouselNavigationWrapper">
                        {[...Array(imageList.length)].map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`carouselNavigate ${activeImgIndex === index ? 'active' : ''}`}
                                    onClick={() => setActiveImgIndex(index)}
                                ></div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default ValidatedComponent(ImageCarousel, imageCarouselSchema);
