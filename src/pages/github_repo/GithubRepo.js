import React, {Component} from 'react';
import './GithubRepo.scss';
import RepoForm from "./components/RepoForm/RepoForm";
import githubBig from './img/github_big.png';
import githubSmall from './img/github_small.jpg';

class GithubRepo extends Component {
    render() {
        return (
            <div className="GithubRepo" data-cy='main'>
                <h1>Скачать репозиторий Github</h1>
                <RepoForm>
                    <div className='mediaTags'>
                        <picture>
                            <source srcSet={githubBig} media='(min-width: 800px)'/>
                            <img src={githubSmall} alt='лого'/>
                        </picture>
                        <video controls width='350px' autoPlay>
                            <source src='/media/Nextcloud.mp4' type="video/mp4"/>
                            Your browser doesn't support HTML5 video tag.
                        </video>
                    </div>
                    <audio autoPlay>
                        <source src="/media/salut.mp3" type='audio/mp3'/>
                        Ваш браузер не поддерживает HTML5 аудио.
                    </audio>
                </RepoForm>
            </div>
        )
    }
}

export default GithubRepo;
