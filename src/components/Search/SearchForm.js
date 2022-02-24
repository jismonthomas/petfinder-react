import { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import { SearchIcon, ChevronDownIcon, RefreshIcon, ExclamationIcon } from '@heroicons/react/solid';
import { PET_IMAGES } from "../../constants/constants";


const SearchForm = () => {
    const { isLoading, error, fetchData, result } = useHttp();
    const [pageInFocus, setPageInFocus] = useState(true);
    const [formError, setFormError] = useState('');
    const [showList, setShowList] = useState(false);
    const [selectedPet, setSelectedPet] = useState({
        name: '',
        friendlyName: '',
        image: ''
    });
    const locationRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData('https://api.petfinder.com/v2/types');

        return () => {
            setPageInFocus(false);
        }
    }, [fetchData]);

    const togglePetList = () => {
        setShowList(state => {
            return !state;
        })
    }

    const checkZipCode = (zip) => {
        const regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]\d[ABCEGHJ-NPRSTV-Z]\d$/i;
        return regex.test(zip);
    }


    const clickedPetHandlder = (e) => {
        const selectedPet = e.target.getAttribute('data-pet');
        const selectedPetName = e.target.getAttribute('data-name');
        const selectedPetImage = e.target.getAttribute('data-image');
        if (selectedPet) {
            togglePetList();
            setSelectedPet({
                name: selectedPet,
                friendlyName: selectedPetName,
                image: selectedPetImage
            });
        }
    }

    const searchPetHandler = (e) => {
        e.preventDefault();
        const location = locationRef.current.value;
        const locationValidity = checkZipCode(location);
        if (selectedPet.friendlyName && location && locationValidity) {
            setFormError(``);
            navigate(`/search/${selectedPet.name}/${location}?page=1`);
        }
        else {
            setFormError(`Please Enter valid location & select a pet`);
        }
    }

    return (
        <div className="relative text-center">
            <div className="shadow-xl mx-auto border-slate-50 rounded border-8 w-full lg:w-[70%]">
                {isLoading &&
                    <p className='flex bg-white justify-center py-3 text-orange-500'>
                        <RefreshIcon className={`fill-orange-500 h-6 animate-spin mr-2`} />
                        Loading...
                    </p>
                }
                {error &&
                    <p className='flex bg-red-500 justify-center py-3 text-white capitalize'>
                        <ExclamationIcon className={`fill-yellow-300 h-6 mr-2`} />
                        {error}
                    </p>
                }
                {!isLoading && !error &&
                    <form className="items-center flex flex-col bg-zinc-200 md:flex-row" onSubmit={searchPetHandler}>
                        <input
                            type='text'
                            placeholder="Enter your Canadian location zip code, example: V3S 0X6"
                            className="w-full p-3 outline-none uppercase min-w-[100%] md:min-w-[60%]"
                            ref={locationRef}
                            name='location'
                            required
                        />
                        <div className="relative w-full md:min-w-[20%] py-4 md:py-0">
                            {result && pageInFocus &&
                                <p onClick={togglePetList} className="capitalize pr-3 font-medium flex items-center cursor-pointer">
                                    {PET_IMAGES[selectedPet.image] && <img src={`${PET_IMAGES[selectedPet.image]}`} className='h-[48px] pr-3' />}

                                    {selectedPet.friendlyName && selectedPet.friendlyName}
                                    {
                                        !selectedPet.name &&
                                        <span className="flex pl-3">Select Pet
                                            {< ChevronDownIcon className={`h-6 transition ${showList && 'rotate-180'}`} />}
                                        </span>
                                    }
                                </p>
                            }
                            {result && showList && pageInFocus &&
                                <ul className="absolute top-[100%] z-10 w-full shadow-xl rounded-lg overflow-hidden">
                                    {result.types.map(type => {
                                        const pet = type._links.self.href.split("/").pop();
                                        const petName = type.name;
                                        const petImage = pet.split('-').join('');
                                        return <li
                                            key={type.name}
                                            onClick={clickedPetHandlder}
                                            data-name={petName.toLowerCase()}
                                            data-pet={pet}
                                            data-image={petImage}
                                            className={`${petName.toLowerCase() == selectedPet.friendlyName ? 'text-white font-medium bg-orange-500 hover:text-white' : 'text-gray-500 odd:bg-zinc-50 even:bg-orange-50 hover:text-orange-600'} 
                                    flex items-center  cursor-pointer `}>
                                            <img src={`${PET_IMAGES[petImage] ? PET_IMAGES[petImage] : ''}`} className='h-[50px] pr-3' />
                                            {petName}
                                        </li>
                                    })
                                    }
                                </ul>
                            }
                        </div>
                        <button type="submit" className="p-3 flex bg-orange-600 text-white items-center w-full md:w-auto hover:bg-orange-700">
                            <SearchIcon className="h-5 w-5 inline-block mr-3" />
                            <span>Search</span>
                        </button>
                    </form>}
            </div>
            {formError &&
                <p className="py-2 px-4 rounded-sm text-gray-50 text-sm bg-amber-600 shadow-lg left-1/2 -translate-x-2/4 text-center d-block mt-5 absolute capitalize">
                    {formError}
                </p>}
        </div>

    )
}

export default SearchForm;