import { useEffect } from 'react';

import {
    HtmlIcon,
    CssIcon,
    ScssIcon,
    JavascriptIcon,
    ReactJsIcon,
    NodeJsIcon,
    PostgreSqlIcon,
    GitIcon,
    GitHubBigIcon,
    GitLabIcon,
    ShellIcon,
    CIcon,
    YamlIcon,
    PythonIcon,
} from '../../../assets/svgIcons';

import profileImg from '../../../assets/img/personal/profile_img.jpg';
import PageLayout from '../../layout/PageLayout/PageLayout';
import PopSpinWrapper from '../../layout/PopSpinWrapper/PopSpinWrapper';
import FadeUpWrapper from '../../layout/FadeUpWrapper/FadeUpWrapper';
import ExternalLinkWithIcon from '../../base/ExternalLinkWithIcon/ExternalLinkWithIcon';

import './ProfilePage.scss';

const ProfilePage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    return (
        <PageLayout pageType="normalPage">
            <div className="profilePageWrapper">
                <PopSpinWrapper className={'profileHeadingWrapper'} delay={0} duration={1.6}>
                    <h1 className="profileHeading">Hi, nice to meet you</h1>
                </PopSpinWrapper>

                <PopSpinWrapper className={'profileImgWrapper'} delay={0.6} duration={2}>
                    <img src={profileImg} alt="Profile image" className="profileImg" />
                </PopSpinWrapper>

                <div className="profileContentWrapper">
                    <FadeUpWrapper className={'profileTextWrapper'} delay={1.4}>
                        <p className="profileText">
                            Hello, my name is Gia Bao - a dynamic and motivated individual who is passionate about
                            technology in general and Software Engineering in particular. The unique blending of
                            creativity, logic, technology, and endless opportunities for discovery fuels my love for web
                            development.
                        </p>
                    </FadeUpWrapper>

                    <FadeUpWrapper className={'profileTextWrapper'} delay={1.6}>
                        <p className="profileText">
                            I strongly believe in life-long learning and the power of hard work, and I try to bring both
                            to everything I do — whether that's building out personal projects or collaborating with
                            colleagues on a team.
                        </p>
                    </FadeUpWrapper>

                    <FadeUpWrapper className={'profileTextWrapper'} delay={0.3}>
                        <p className="profileText">
                            In my previous role, I had the privilege of working alongside some genuinely talented
                            people, and together, we won bronze awards in{' '}
                            <ExternalLinkWithIcon toLink="https://drive.google.com/file/d/1ZwoT6Pb-4jy83NF2f9CZnLdREb0FWKHk/view">
                                2022 (pdf)
                            </ExternalLinkWithIcon>{' '}
                            and{' '}
                            <ExternalLinkWithIcon toLink="https://drive.google.com/file/d/1VUelorIT6k37670_pyBVaUwHtswhLFle/view">
                                2023 (pdf)
                            </ExternalLinkWithIcon>
                            , and a silver award in 2024 (
                            <ExternalLinkWithIcon toLink="https://drive.google.com/file/d/1eWlaBBKFePYj3eMjO3J68ch4DCh638uK/view">
                                eml
                            </ExternalLinkWithIcon>
                            ,{' '}
                            <ExternalLinkWithIcon toLink="https://drive.google.com/file/d/1z4-ZXNE4xiK7yLTb5bVaXnNhq1K9Q4re/view">
                                pdf
                            </ExternalLinkWithIcon>
                            ) for best project in the company's annual awards. Those experiences have taught me the
                            value of communication, persistence, and collaboration. They're not only lessons for me to
                            continue learning and growing as a professional, but they've also influenced me to be a
                            better version of myself.
                        </p>
                    </FadeUpWrapper>

                    <FadeUpWrapper className={'profileTextWrapper'}>
                        <p className="profileText">
                            Whether you're here to check out my background, see what I've built, or just say hi, I'm
                            glad that you've stopped by. My websites are reflections of who I am and what I care about,
                            and I hope it gives you something useful or inspiring. Thanks for visiting — I'd love to
                            connect.
                        </p>
                    </FadeUpWrapper>
                </div>

                <div className="profileSkillsWrapper">
                    <FadeUpWrapper className={'profileSkillHeadingWrapper'}>
                        <h2 className="profileSkillHeading">Skills</h2>
                    </FadeUpWrapper>

                    <FadeUpWrapper className={'skillsWrapper'}>
                        <div className="skillItem">
                            <HtmlIcon></HtmlIcon>
                            <span>HTML</span>
                        </div>

                        <div className="skillItem">
                            <CssIcon></CssIcon>
                            <span>CSS</span>
                        </div>

                        <div className="skillItem">
                            <ScssIcon></ScssIcon>
                            <span>SCSS</span>
                        </div>

                        <div className="skillItem">
                            <JavascriptIcon></JavascriptIcon>
                            <span>JavaScript</span>
                        </div>

                        <div className="skillItem">
                            <ReactJsIcon></ReactJsIcon>
                            <span>React JS</span>
                        </div>
                    </FadeUpWrapper>

                    <FadeUpWrapper className={'skillsWrapper'}>
                        <div className="skillItem">
                            <NodeJsIcon></NodeJsIcon>
                            <span>Node JS</span>
                        </div>

                        <div className="skillItem">
                            <PostgreSqlIcon></PostgreSqlIcon>
                            <span>PostgreSQL</span>
                        </div>
                    </FadeUpWrapper>

                    <FadeUpWrapper className={'skillsWrapper'}>
                        <div className="skillItem">
                            <GitIcon></GitIcon>
                            <span>Git</span>
                        </div>

                        <div className="skillItem">
                            <GitHubBigIcon></GitHubBigIcon>
                            <span>Github</span>
                        </div>

                        <div className="skillItem">
                            <GitLabIcon></GitLabIcon>
                            <span>Gitlab</span>
                        </div>
                    </FadeUpWrapper>

                    <FadeUpWrapper className={'skillsWrapper'}>
                        <div className="skillItem">
                            <ShellIcon></ShellIcon>
                            <span>Shell</span>
                        </div>

                        <div className="skillItem">
                            <CIcon></CIcon>
                            <span>C</span>
                        </div>

                        <div className="skillItem">
                            <YamlIcon></YamlIcon>
                            <span>YAML</span>
                        </div>

                        <div className="skillItem">
                            <PythonIcon></PythonIcon>
                            <span>Python</span>
                        </div>
                    </FadeUpWrapper>
                </div>
            </div>
        </PageLayout>
    );
};

export default ProfilePage;
