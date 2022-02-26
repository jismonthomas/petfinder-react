import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimalCard from "../components/AnimalCard/AnimalCard";
import Navigation from "../components/UI/Navigation";
import { uiActions } from "../store/ui-slice";

const Favourites = () => {
    const userFavourites = useSelector(state => state.user.userFavourites);
    const userLoggedIn = useSelector(state => state.user.userIsLoggedIn);
    const dispatch = useDispatch();

    const toggleLoginPopup = () => {
        dispatch(uiActions.toggleLogin());
    }

    return (<Fragment>
        <div className='bg-orange-500'>
            <Navigation />
        </div>
        <div className='mt-16 px-4 md:px-16 xl:px-24'>
            {userLoggedIn &&
                userFavourites?.length < 1 && <p className="text-center text-slate-700">Your haven't added any pets to your list.</p>}
            {!userLoggedIn &&
                <div className="text-center rounded-sm bg-white shadow-lg p-5 w-[450px] max-w-[80%] mx-auto text-slate-700 border-2 border-orange-400">
                    <h1 className="font-semibold text-lg sm:text-[2rem] mb-2 sm:mb-5">Please Login To Continue</h1>
                    <button className="rounded py-2 shadow-sm px-3 mt-2 sm:mt-4 bg-orange-400 text-white" onClick={toggleLoginPopup}>
                        Login Now
                    </button>
                </div>
            }
            {userLoggedIn &&
                <div className='flex flex-row flex-wrap justify-center md:justify-between'>
                    {[...userFavourites]?.reverse()?.map(animal => {
                        return (
                            <AnimalCard
                                key={animal.petId}
                                pet={animal.pet}
                                petId={animal.petId}
                                image={animal.image}
                                name={animal.name}
                                breeds={animal.breeds}
                                age={animal.age}
                                gender={animal.gender}
                                distance={(animal.distance * 1.6).toFixed(2)}
                            />
                        );
                    })
                    }
                </div>
            }
        </div>
    </Fragment>)
}

export default Favourites;