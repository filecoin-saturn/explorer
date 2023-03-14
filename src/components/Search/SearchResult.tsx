import './SearchResult.css';

export type SearchResultProps = {
  result: {id: string, title:string, parent: string};
  onClick: (id: string) => void;
}

export const SearchResult  = ({result, onClick} : SearchResultProps ) => {
  return (
    <div className='SearchResult' onClick={() => {console.log("click"); onClick(result.id)}}>
      <div className='SearchResult-name'>{result.title}</div>
      <div className='SearchResult-parent'>{result.parent}</div>
    </div>
  )
}

export default SearchResult
