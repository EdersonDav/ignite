import {useEffect, useState} from 'react';
import axios from 'axios';

import RepositoryItem from '../RepositoruItem';
import './repositories.scss';

const ReposiroryList = () =>{
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    //const getRepositories = async () =>{
    //  const repos = await axios.get('https://api.github.com/users/EdersonDav/repos');

    //setRepositories(repos)
    //}
    //getRepositories();
    fetch('https://api.github.com/users/EdersonDav/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
  },[]);

  return(
    <section className='repository-list'>
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.length && (
          repositories.map((repo) =>(
            <RepositoryItem key={repo.id} repository={repo}/>
          ))
        )}
      </ul>
    </section>
  )
}

export default ReposiroryList