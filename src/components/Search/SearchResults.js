import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useHttp from "../../hooks/use-http";
import AnimalCard from '../AnimalCard/AnimalCard';
import Pagination from '../Pagination/Pagination';
import NoPetImage from '../../assets/no-pet-image.png'


function SearchResults() {
    const { pet, location } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, error, fetchData, result } = useHttp();

    const currentPage = searchParams.get('page');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData(`https://api.petfinder.com/v2/animals?sort=distance&type=${pet}&location=${location}&page=${currentPage}&distance=150`);

    }, [fetchData, pet, location, currentPage]);


    const totalPages = result?.pagination.total_pages;

    const getNextPage = (page) => {
        setSearchParams({ page: page });
    }

    return (
        <div>
            {error &&
                <p className="py-2 px-4 rounded-sm text-gray-50 text-sm bg-amber-600 shadow-lg left-1/2 -translate-x-2/4 text-center 
                d-block -mt-10 absolute capitalize">
                    {error}
                </p>
            }
            {result &&
                <>
                    <h1 className='font-bold text-center text-xl mb-4 lg:text-4xl text-slate-800 capitalize'>Search {pet.split('-').join(' ')}</h1>
                    <p className='text-center text-gray-500 mb-10'>Results for {pet.split('-').join(' ')} near
                        <span className='uppercase'> {location}</span>
                    </p>
                </>
            }
            {result &&
                <div className='flex flex-row flex-wrap justify-between gap-1'>
                    {result.animals.map(animal => {
                        const breeds = `${animal.breeds.primary ? animal.breeds.primary : ''} ${animal.breeds.secondary ? '& ' + animal.breeds.secondary + ' mix' : ''}`;

                        const image = animal.primary_photo_cropped?.small || NoPetImage;
                        return (
                            <AnimalCard
                                key={animal.id}
                                loading={isLoading}
                                pet={pet}
                                petId={animal.id}
                                image={image}
                                name={animal.name}
                                breeds={breeds}
                                age={animal.age}
                                gender={animal.gender}
                                distance={(animal.distance * 1.6).toFixed(2)}
                            />)
                    })}
                </div>
            }
            {result && <Pagination currentPage={currentPage} totalPages={totalPages} getNextPage={getNextPage} />}
        </div>);
}

export default SearchResults;
