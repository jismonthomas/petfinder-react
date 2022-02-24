import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/UI/Navigation';
import Footer from '../components/UI/Footer';
import { useNavigate } from "react-router-dom";
import useHttp from '../hooks/use-http';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ClipboardIcon, ExternalLinkIcon, InformationCircleIcon, LocationMarkerIcon, MailIcon, MenuAlt1Icon, PhoneIcon, RefreshIcon } from '@heroicons/react/solid';

function PetDetails() {
    const { isLoading, error, fetchData, result } = useHttp();
    const { petId } = useParams();
    const navigation = useNavigate();
    let petAttributes = [];
    let petImages = [];

    useEffect(() => {
        petAttributes = [];
        console.log('FETCH DATA WITH ', petId);
        window.scrollTo(0, 0);
        fetchData(`https://api.petfinder.com/v2/animals/${petId}`);

    }, [fetchData, petId]);

    const goBack = () => {
        navigation(-1);
    }

    for (const key in result?.animal.attributes) {
        petAttributes.push({ key, value: result?.animal.attributes[key] });
    }

    console.log('Pet Details: ', result);

    const breeds = `${result?.animal.breeds.primary ? result?.animal.breeds.primary : ''} ${result?.animal.breeds.secondary ? '& ' + result?.animal.breeds.secondary + ' mix' : ''}`;

    if (result) {
        result.animal.photos?.map(photo => {
            petImages.push({
                original: photo.full,
                thumbnail: photo.small
            });
        })
    }

    return (<Fragment>
        <div className='bg-orange-500'>
            <Navigation />
        </div>
        <div className='min-h-[100vh]'>
            <div className='mt-16 px-10 md:px-16 lg:px-24'>
                <button onClick={goBack} className='bg-white rounded py-2 px-3 mb-4'>Back</button>
                <div className='bg-white rounded-lg flex flex-col-reverse lg:flex-row p-5 lg:p-10'>
                    {isLoading &&
                        <p className='flex bg-white justify-center py-3 text-orange-500'>
                            <RefreshIcon className={`fill-orange-500 h-6 animate-spin mr-2`} />
                            Loading...
                        </p>
                    }
                    {!isLoading &&
                        <>
                            <div className='rounded-lg'>
                                {result?.animal.primary_photo_cropped.medium && <img src={result.animal.primary_photo_cropped.medium} className='md:max-w-[320px] rounded-lg mx-auto mt-10 lg:mt-0' />}
                            </div>
                            <div className='ml-0 lg:ml-10'>
                                <div className='flex flex-col justify-between h-full'>
                                    <div>
                                        {result?.animal.name &&
                                            <h1 className='font-semibold text-[3rem] text-stone-700 flex items-center'>
                                                {result?.animal.name}
                                                <span className='pl-2 text-sm font-normal text-gray-500'>({result?.animal.species})</span>
                                            </h1>
                                        }

                                        <div className='flex flex-col md:flex-row mb-7 mt-5'>
                                            {breeds &&
                                                <span className='bg-cyan-200 font-medium text-cyan-700 text-sm px-3 py-1 rounded-sm'>{breeds}</span>
                                            }
                                            {result?.animal.age &&
                                                <span className='bg-green-200 font-medium text-green-700 text-sm px-3 py-1 rounded-sm mt-1 lg:mt-0 ml-0 md:ml-4'>{result?.animal.age}</span>
                                            }
                                            {result?.animal.gender &&
                                                <span className='bg-orange-200 font-medium text-orange-700 text-sm px-3 py-1 rounded-sm mt-1 lg:mt-0 ml-0 md:ml-4'>{result?.animal.gender}</span>
                                            }
                                            {result?.animal.size &&
                                                <span className='bg-purple-200 font-medium text-purple-700 text-sm px-3 py-1 rounded-sm mt-1 lg:mt-0 ml-0 md:ml-4'>{result?.animal.size} Size</span>
                                            }
                                        </div>
                                        {result?.animal.colors.primary &&
                                            <div className='text-gray-700 mb-5 capitalize' >
                                                Colors:
                                                {result?.animal.colors.primary ? ` ${result?.animal.colors.primary}` : ''}
                                                {result?.animal.colors.secondary ? `, ${result?.animal.colors.secondary}` : ''}
                                                {result?.animal.colors.tertiary ? ` , ${result?.animal.colors.tertiary}` : ''}
                                            </div>
                                        }
                                        {result?.animal.contact.address.city &&
                                            <div className='flex items-center text-gray-700 mb-5'>
                                                <LocationMarkerIcon className='h-6 mr-2 fill-orange-500' />
                                                {result?.animal.contact.address.city}
                                                {result?.animal.contact.address.state ? `, ${result?.animal.contact.address.state}` : ''}
                                                {result?.animal.contact.address.country ? `, ${result?.animal.contact.address.country}` : ''}
                                                {result?.animal.contact.address.postcode ? `, ${result?.animal.contact.address.postcode.toUpperCase()}` : ''}
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        {result?.animal.url &&
                                            <a
                                                href={result?.animal.url}
                                                target='_blank'
                                                className='py-3 px-3 bg-[#6504b5] text-white rounded-md drop-shadow-sm inline-block font-medium hover:bg-[#2e0152] hover:drop-shadow-md transition-all'>
                                                <div className='flex'>
                                                    See Details On Petfinder
                                                    <ExternalLinkIcon className='h-6 fill-white inline-block pl-2' />
                                                </div>
                                            </a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>

                    }
                </div>
            </div>
            {!isLoading &&
                <div className='mt-6 px-10 md:px-16 lg:px-24'>
                    <h1 className='font-semibold text-[2rem] text-stone-800 border border-b-stone-300 mb-6'>Details</h1>
                    <div className='flex flex-col lg:flex-row pb-6'>
                        <div className='lg:basis-3/12 md:min-w-[375px]'>
                            <ImageGallery items={petImages} showPlayButton={false} />
                        </div>
                        <div className='ml-0 lg:ml-5 mt-10 lg:mt-0'>
                            {result?.animal.status &&
                                <div className='flex items-center mb-4 capitalize'>
                                    <InformationCircleIcon className='h-6 mr-2 fill-stone-700' />
                                    <p className='text-stone-700'>
                                        <span className={` font-medium`}>Status: </span>
                                        <span className={`${result?.animal.status && 'bg-green-500 text-white px-3 py-1 rounded-sm'}`}>{result?.animal.status}</span>
                                    </p>
                                </div>
                            }
                            {result?.animal.contact.address.city &&
                                <div className='flex items-center mb-4'>
                                    <LocationMarkerIcon className='h-7 mr-2 fill-stone-700' />
                                    <p className='text-stone-700'>
                                        <span className='font-medium'>Address: </span>
                                        {result?.animal.contact.address.city}
                                        {result?.animal.contact.address.state ? `, ${result?.animal.contact.address.state}` : ''}
                                        {result?.animal.contact.address.country ? `, ${result?.animal.contact.address.country}` : ''}
                                        {result?.animal.contact.address.postcode ? `, ${result?.animal.contact.address.postcode.toUpperCase()}` : ''}
                                    </p>
                                </div>
                            }
                            {result?.animal.contact.email &&
                                <div className='flex items-center mb-4'>
                                    <MailIcon className='h-6 mr-2 fill-stone-700' />
                                    <p className='text-stone-700'>
                                        <span className='font-medium'>Email: </span>
                                        {result?.animal.contact.email}
                                    </p>
                                </div>
                            }
                            {result?.animal.contact.phone &&
                                <div className='flex items-center mb-4'>
                                    <PhoneIcon className='h-6 mr-2 fill-stone-700' />
                                    <p className='text-stone-700'>
                                        <span className='font-medium'>Phone: </span>
                                        {result?.animal.contact.phone}
                                    </p>
                                </div>
                            }
                            {result?.animal.attributes &&
                                <>
                                    <div className='flex items-center mb-1'>
                                        <MenuAlt1Icon className='h-6 mr-2 fill-stone-700' />
                                        <p className='text-stone-700'>
                                            <span className='font-medium'>Other Details: </span>
                                        </p>
                                    </div>
                                    <div>
                                        <ul className='mb-4 ml-8'>
                                            {petAttributes &&
                                                petAttributes.map((attribute) => {
                                                    if (attribute.value != null)
                                                        return (
                                                            <li
                                                                key={attribute.key}
                                                                className='text-stone-700 capitalize'>
                                                                <span className='font-medium'>{attribute.key.split('_').join(' ')}</span>{
                                                                    `: ${attribute.value ? 'Yes' : 'No'}`}
                                                            </li>
                                                        )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </>
                            }
                            {result?.animal.description &&
                                <div className='flex items-center mb-4'>
                                    <ClipboardIcon className='h-6 mr-2 fill-stone-700' />
                                    <p className='text-stone-700'>
                                        <span className='font-medium'>Description: </span>
                                        {result?.animal.description}
                                    </p>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>

        <Footer />
    </Fragment>)
}

export default PetDetails;
