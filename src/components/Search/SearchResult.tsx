import './SearchResult.css';

export type SearchResultProps = {
  result: {title:string, parent: string};
  onClick: () => void;
}

export const SearchResult  = ({result, onClick} : SearchResultProps ) => {
  return (
    <div className='SearchResult' onClick={() => onClick()}>
      <div className='SearchResult-name'>{result.title}</div>
      <div className='SearchResult-parent'>{result.parent}</div>
    </div>
  )
}

export default SearchResult
