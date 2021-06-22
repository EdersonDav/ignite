import RepositoryItem from '../RepositoruItem'

const repository = {
  name: 'Movies',
  description: 'Busque e veja os detalhes de seus filmes favoritos.',
  link: 'https://github.com/EdersonDav/Movies'
}

const ReposiroryList = () =>{
  return(
    <section>
      <h1>Lista de repositórios</h1>

      <ul>
        <RepositoryItem repository={repository}/>
        <RepositoryItem repository={repository}/>
        <RepositoryItem repository={repository}/>
        <RepositoryItem repository={repository}/>
        <RepositoryItem repository={repository}/>
      </ul>
    </section>
  )
}

export default ReposiroryList