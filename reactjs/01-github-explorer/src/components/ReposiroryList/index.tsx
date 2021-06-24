import { useEffect, useState } from 'react';

import RepositoryItem from '../RepositoruItem';
import './repositories.scss';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const ReposiroryList = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/EdersonDav/repos')
      .then(response => response.json())
      .then(data => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.length &&
          repositories.map(repo => (
            <RepositoryItem key={repo.id} repository={repo} />
          ))}
      </ul>
    </section>
  );
};

export default ReposiroryList;
