import { Fragment } from "react";
import Footer from "../components/UI/Footer";
import Header from "../components/UI/Header";
import { PET_IMAGES } from "../constants/constants";

const Home = () => {

    const availablePets = () => {
        let pets = [];
        for (const petnames in PET_IMAGES) {
            pets.push(PET_IMAGES[petnames]);
        }
        return pets;
    }


    return (<Fragment>
        <Header />
        <main className="bg-orange-50">
            <section className='pt-16 px-10 md:px-16 lg:px-24'>
                <span className="border-b-2 border-orange-600 text-gray-700 font-semibold">Find Your Pet</span>
                <h1 className="text-2xl my-5 lg:text-6xl font-black text-orange-600">Pets Available for Adoption Near You</h1>

                <div className="mt-1 pt-3 md:mt-5 md:pt-24">
                    <div className="flex flex-row flex-wrap justify-between">
                        {availablePets().map((imgurl) => {
                            return <div key={imgurl} className="basis-1/5 mt-2.5 mx-2.5 mb-16 text-center">
                                <div className="rounded-lg inline-block border-l-4 border-b-4 border-orange-500 shadow-lg mx-auto bg-white">
                                    <img src={imgurl} alt='pets' />
                                </div>
                            </div>
                        })
                        }
                    </div>
                </div>
            </section>
        </main>
        <Footer />
    </Fragment >)
}

export default Home;