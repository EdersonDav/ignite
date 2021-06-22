const RepositoruItem = ({repository}) =>{
  return(
    <li>
      <strong>{repository.name ?? 'NAN'}</strong>
      <p>{repository.description}</p>

      <a href={repository.link} target="_blank">
        Acessar repositório
      </a>
    </li>
  )
}

export default RepositoruItem