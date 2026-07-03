import { useEffect } from 'react';

import {
    gamioImages,
    yookImages,
    cvifyImages,
    battleShipImages,
    weatherAppImages,
    shopifyImages,
} from '../../../utils/projectImages';

import PageLayout from '../../layout/PageLayout/PageLayout';
import ProjectItem from '../../base/ProjectItem/ProjectItem';
import FadeUpWrapper from '../../layout/FadeUpWrapper/FadeUpWrapper';

import './ProjectsPages.scss';

const ProjectsPages = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    return (
        <PageLayout pageType={'normalPage'}>
            <div className="projectsPageWrapper">
                <FadeUpWrapper className={'projectPageHeadingWrapper'}>
                    <h1 className="projectsPageHeading">Welcome to my projects</h1>
                </FadeUpWrapper>

                <div className="projectWrapper">
                    <ProjectItem
                        projectName={'Gamio'}
                        projectDescription={'Game marketplace web application'}
                        projectImgs={gamioImages}
                        projectTechnologies={'React JS; SCSS; Node.js; Express.js; Passport.js; PostgreSQL'}
                        projectSummary={
                            'A full-stack game marketplace web application powered by the RAWG API — browse thousands of real games, manage a cart, save favorites, and experience a simulated game store with a sleek, fully responsive UI.'
                        }
                        projectDemoLink={'https://gamio-game-market-one.vercel.app/'}
                        projectSrcLink={'https://github.com/YueMoon3773/gamio_game_market'}
                    ></ProjectItem>

                    <ProjectItem
                        projectName={'Yook'}
                        projectDescription={'A social network web application'}
                        projectImgs={yookImages}
                        projectTechnologies={'React JS; SCSS; Node.js; Express.js; Passport.js PostgreSQL'}
                        projectSummary={
                            "A full-stack social network web application where users can share their thoughts, read others' stories, and engage through comments — all in a clean, themeable interface."
                        }
                        projectDemoLink={'https://yook-social-network-app.vercel.app/'}
                        projectSrcLink={'https://github.com/YueMoon3773/yook_social_network_app'}
                    ></ProjectItem>

                    <ProjectItem
                        projectName={'CVify'}
                        projectDescription={'Resume generator application'}
                        projectImgs={cvifyImages}
                        projectTechnologies={'React JS; SCSS; JavaScript'}
                        projectSummary={`CVify is a web-based application designed to help users quickly build professional resumes without hassle.

                        It offers real-time resume preview, multiple styling options, and instant downloads – making the resume-building process simple, elegant, and efficient.`}
                        projectDemoLink={'https://cvifyresumegenerator.vercel.app/'}
                        projectSrcLink={'https://github.com/YueMoon3773/resume_generator'}
                    ></ProjectItem>

                    <ProjectItem
                        projectName={'Battleship'}
                        projectDescription={'Battleship game'}
                        projectImgs={battleShipImages}
                        projectTechnologies={'HTML; CSS; JavaScript'}
                        projectSummary={`This project is a web-based Battleship game where players command their fleet against a computer opponent in a turn-based naval battle. The game provides an interactive setup phase, smooth gameplay, and playful dialogues for an engaging experience.

                        Inspired by the classic Battleship board game, this web version combines strategic placement with modern interactive UI/UX design.`}
                        projectDemoLink={'https://yuemoon3773.github.io/battleship_game/'}
                        projectSrcLink={'https://github.com/YueMoon3773/battleship_game'}
                    ></ProjectItem>

                    <ProjectItem
                        projectName={'Weather App'}
                        projectDescription={'Weather forecast application'}
                        projectImgs={weatherAppImages}
                        projectTechnologies={'HTML; CSS; JavaScript'}
                        projectSummary={`The weather app, a sleek, responsive web application that delivers real‑time weather information for any city. Simply type in your location, and you’ll instantly see current conditions, hourly forecasts, and weekly outlooks—all wrapped in a dynamic background and theme that adapt to the sky above.`}
                        projectDemoLink={'https://yuemoon3773.github.io/the_weather_app/'}
                        projectSrcLink={'https://github.com/YueMoon3773/the_weather_app'}
                    ></ProjectItem>

                    <ProjectItem
                        projectName={'Shopify'}
                        projectDescription={'An interactive and responsive shopping cart web application'}
                        projectImgs={shopifyImages}
                        projectTechnologies={'React JS; SCSS; JavaScript'}
                        projectSummary={`A minimalist e-commerce demo that demonstrates dynamic cart management, API integration, and an intuitive user interface. Users can explore a product list, add or remove items from their cart, and review total costs — all within a seamless and engaging experience.`}
                        projectDemoLink={'https://shopify-tau-rosy.vercel.app/shop'}
                        projectSrcLink={'https://github.com/YueMoon3773/shopify'}
                    ></ProjectItem>
                </div>
            </div>
        </PageLayout>
    );
};

export default ProjectsPages;
