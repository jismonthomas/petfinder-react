import githubLogo from '../../assets/GitHub-Mark-Light-64px.png';
import petfinderLogo from '../../assets/PetFinder-Logo.png';
import jismonthomasLogo from '../../assets/Jismon-Thomas-Logo.png';

const Footer = () => {
    return (
        <footer className="bg-orange-50">
            <div className='pt-16 px-10 md:px-16 lg:px-24'>
                <div className="bg-indigo-600 rounded-t-2xl p-16">
                    <div className="flex text-indigo-50 items-center flex-col justify-evenly lg:flex-row">
                        <a href="https://www.petfinder.com/" target='_blank' rel="noreferrer" className="mb-8 lg:mb-0 flex flex-col items-center text-center pt-1 lg:pr-4 hover:text-white">
                            <img src={petfinderLogo} alt="Petfinder Logo" className='max-w-[126px] mb-2' />
                            Made in love with Petfinder
                        </a>

                        <a href="https://github.com/jismonthomas/petfinder-react" target='_blank' rel="noreferrer" className="mb-8 lg:mb-0 flex flex-col items-center text-center pt-1 hover:text-white">
                            <img src={githubLogo} alt="GitHub Logo" className='max-w-[64px] mb-2' />
                            <span>GitHub Reopsitory</span>
                        </a>

                        <a href="https://jismonthomas.com/" target='_blank' rel="noreferrer" className="flex flex-col items-center text-center pt-1 hover:text-white">
                            <img src={jismonthomasLogo} alt="GitHub Logo" className='max-w-[64px] mb-2' />
                            <span>A Project by Jismon Thomas</span>
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer