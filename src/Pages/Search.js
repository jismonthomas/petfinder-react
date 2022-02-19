import { Fragment } from 'react';
import SearchForm from '../components/Search/SearchForm';
import SearchResults from '../components/Search/SearchResults';
import Navigation from '../components/UI/Navigation';

const Search = () => {
    return (
        <Fragment>
            <div className='bg-orange-500'>
                <Navigation />
                <div className='mt-16 px-10 md:px-16 lg:px-24'>
                    <SearchForm />
                </div>
            </div>
            <div className='mt-16 px-10 md:px-16 lg:px-24'>
                <SearchResults />
            </div>
        </Fragment>
    );
}

export default Search;
