import Navigation from "./Navigation";
import headerImage from '../../assets/petfinder-dog.jpg';
import SearchForm from "../Search/SearchForm";

function Header() {
    return (
        <header className='bg-orange-500 relative'>
            <Navigation />
            <div className="px-10 md:px-16 lg:px-24 flex flex-col md:flex-row items-center text-slate-50">
                <div className="w-full mt-4 lg:mt-0 lg:basis-1/2">
                    <h1 className="text-4xl lg:text-7xl font-black">
                        Find the right pet for you.
                    </h1>
                    <p className="text-orange-100 mt-4 text-lg">An online platform to search for animals who need homes. A directory of nearly 11,000 animal shelters and adoption organizations across the U.S., Canada and Mexico</p>
                </div>
                <div className="w-100 lg:basis-1/2">
                    <img className="mx-auto max-w-[75%] sm:max-w-[auto]" src={headerImage} alt='A dog looking up' />
                </div>
            </div>
            <div className='bg-indigo-600 min-h-[50%] w-full rounded-t-[2rem] border-t-2 border-indigo-100 px-10 md:px-16 lg:px-24 py-28'>
                <SearchForm />
            </div>

        </header>
    );
}

export default Header;
