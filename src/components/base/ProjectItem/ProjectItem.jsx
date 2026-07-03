import React from 'react';
import { z } from 'zod';

import { GitHubIcon } from '../../../assets/svgIcons';

import FadeUpWrapper from '../../layout/FadeUpWrapper/FadeUpWrapper';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import LinkBtnLike from '../LinkBtnLike/LinkBtnLike';

import './ProjectItem.scss';

const ProjectItem = ({
    projectName,
    projectDescription,
    projectImgs,
    projectTechnologies,
    projectSummary,
    projectDemoLink,
    projectSrcLink,
}) => {
    return (
        <section className="projectItemWrapper">
            <FadeUpWrapper className={'projectItemHeadingWrapper'} delay={0.3} duration={0.9}>
                <h2 className="projectItemHeading">{projectName}</h2>
                <h4 className="projectItemSubHeading">{projectDescription}</h4>
            </FadeUpWrapper>

            <FadeUpWrapper className={'projectItemImages'} delay={0.3} duration={0.9}>
                <ImageCarousel imageList={projectImgs}></ImageCarousel>
            </FadeUpWrapper>

            <FadeUpWrapper className={'projectItemTechnologies'} delay={0.3} duration={0.9}>
                <h3 className="projectItemSmallHeading">Technologies</h3>
                <p className="projectItemText">{projectTechnologies}</p>
            </FadeUpWrapper>

            <FadeUpWrapper className={'projectItemSummary'} delay={0.3} duration={0.9}>
                <h3 className="projectItemSmallHeading">Summary</h3>
                <p className="projectItemText">{projectSummary}</p>
            </FadeUpWrapper>

            <FadeUpWrapper className={'projectItemBottomBtns'} delay={0.3} duration={0.9}>
                <LinkBtnLike
                    toDestination={projectDemoLink}
                    linkBtnClassName={'projectBottomBtn'}
                    isOpenInNewTab={true}
                    isDisplayArrowIcon={true}
                >
                    🚀 Live demo
                </LinkBtnLike>

                <LinkBtnLike
                    toDestination={projectSrcLink}
                    linkBtnClassName={'projectBottomBtn'}
                    isOpenInNewTab={true}
                    isDisplayArrowIcon={true}
                >
                    <GitHubIcon iconClassName={'gitHubIcon'}></GitHubIcon>
                    Learn more
                </LinkBtnLike>
            </FadeUpWrapper>
        </section>
    );
};

export default ProjectItem;
