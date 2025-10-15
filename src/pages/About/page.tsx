import { useState } from "react"
import { Link } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/component";

const About = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const componentID: string = "about-page";


    if (isLoading) return <LoadingSpinner />

    return (
        <div className="h-full m-auto w-full">

            <div className="flex justify-end p-5 top-0 w-full" id={`${componentID}-nav-bar`}>
                <Link to="/" onClick={() => setIsLoading(true)}>
                    <i className="align-middle fa-2xl fa-solid fa-house my-auto"></i>
                </Link>
            </div>

            <div
                className="m-auto my-[10%] text-l w-[90%]"
                id={`${componentID}-project-background-div`}
            >

                <h1 className="text-3xl" id={`${componentID}-project-background-header`}>
                    Project Inspiration
                </h1>

                <br />

                <p className="text-left text-s" id={`${componentID}-project-background-p1`}>
                    My favorite sport to watch has long been College Football, and for years I've participated
                    in College Football Pickem games with friends to enhance the enjoyment.
                </p>

                <br />

                <p className="text-left text-s" id={`${componentID}-project-background-p2`}>
                    Through the years I've experimented with various pickem games on a myriad of sites. The biggest
                    obstacle with all of them is that the game modes were always limited to either the top matchups
                    of the weekend, or a random assortment of 10-15 games. Being a College Football nerd, I wanted
                    the option to pick <i>all</i> FBS games. Additionally, I'd always desired for varying pick
                    weights, depending on the matchup. Why should picking a heavy-favorite count the same as carefully
                    evaluating and calling a big upset?
                </p>

                <br />

                <p className="text-left text-s" id={`${componentID}-project-background-p3`}>
                    This was the inspiration to develop my own Pickem web app including the features I most valued.
                </p>

                <br />


                <h1 className="text-2xl" id={`${componentID}-project-architecture-header`}>
                    Project Architecture
                </h1>

                <br />

                <div className="mx-auto">
                    <ul className="inline-block text-left text-medium" id={`${componentID}-project-architecute-stack-list`}>
                        <li id="database-bull">
                            Database: <a href="https://dev.mysql.com/doc/refman/9.2/en/">MySQL 9.2</a>
                        </li>
                        <li id="backend-bullet">
                            API: <a href="https://flask.palletsprojects.com/en/stable/">Flask 3.1</a>
                        </li>
                        <li id="authentication-bullet">
                            Authorization: <a href="https://www.jwt.io/introduction#what-is-json-web-token">JSON Web Tokens (JWT)</a>
                        </li>
                        <li id="frontend-bullet">
                            Client: React TypeScript Application bundled with <a href="https://vite.dev/">Vite</a>
                        </li>
                    </ul>
                </div>
                

            </div>

        </div>
    );
}


export default About;