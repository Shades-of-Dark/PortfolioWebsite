import projects from '../data/projects';
import './Work.css';

const Work = () => {
    return (
        <div className="container work">
            <h3>Work</h3>
            <p>Companies I have worked for.</p>

            <div className="workSection">
                <h4>Recent Work</h4>
                <p className="placeholder">Haven't worked anywhere yet.</p>
            </div>

            <div className="workSection">
                <h4>Side Projects</h4>
                <ul className="projectList">
                    {projects.map((project) => (
                        <li className="projectCard" key={project.name}>
                            <h3 className="projectName">{project.name}</h3>
                            <p>{project.description}</p>
                            <div className="projectMeta">
                                <span className="projectTech">{project.tech}</span>
                                {project.href && (
                                    <a className="pill" href={project.href} target="_blank" rel="noreferrer">Live</a>
                                )}
                                <a className="pill" href={project.repo} target="_blank" rel="noreferrer">Code</a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Work;
