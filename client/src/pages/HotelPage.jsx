import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MailingList from "../components/MailingList";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reservation from "../components/Reservation";

export default function HotelPage() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slide, setSlide] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const {data, loading, error} = useFetch(`http://localhost:5000/api/hotels/find/${id}`)

    const {dates, options} = useContext(SearchContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const mlspd = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const dayDiff = Math.ceil(timeDiff / mlspd);
        return dayDiff;
    }

    const dayVacay = dayDifference(dates[0].endDate, dates[0].startDate)

    const handleOpen = (i) => {
        setSlide(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideIndex;
        if (direction === 'l') {
            newSlideIndex = slide === 0 ? 5 : slide - 1
        }else{
            newSlideIndex = slide === 5 ? 0 : slide + 1
        }
        setSlide(newSlideIndex)
    };

    const handleAuth = () => {
        if(user) {
            setOpenModal(true)            
        }else{
            navigate("/login")
        }
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            
            {loading ? ("Loading, please wait...") : (<div className="flex justify-center m-2">            
                <div className="w-full flex flex-col gap-4 text-primary relative border-2 border-primary rounded-2xl p-2">
                <button onClick={handleAuth} className="primary absolute top-10 right-2 hover:border-primary">Reserve</button>
                    <h1 className="primary ">{data.name}</h1>
                    <div className="text-sm flex items-center gap-2 text-primary font-semibold ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        <span>{data.address}</span>
                    </div>
                    <span className="font-bold">{data.title}</span>
                    <span className="font-semibold text-blue-600">
                        Book a stay over ${data.cheapestPrice + 50} and get free transportation!
                    </span>
                    {open && <div className="w-full h-full p-2 flex items-center justify-center bg-primary rounded-xl text-white">
                        <button onClick={() => handleMove("l")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </button>
                        <button onClick={() => setOpen(false)} className="absolute top-52 right-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </button>            
                        <div className="flex items-center justify-center">
                            <img className="w-4/5 h-4/5" src={data.photos[slide]} alt="carousel item" />
                        </div>
                        <button onClick={() => handleMove("r")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </button>            
                    </div>}
                    <div className="flex flex-wrap gap-2 justify-between">
                        {data.photos && (data.photos?.map((photo, i) => (
                            <div key={i} className="w-56 h-56 overflow-hidden hover:scale-105 cursor-pointer">
                            <img onClick={() => handleOpen(i)} src={photo.src} className="w-full object-cover" alt="property image" />
                            </div>
                        )))}
                    </div>
                    
                    <div className="flex justify-between gap-2 mb-2 px-2">
                        <div className="w-4/6 border-2 border-primary rounded-2xl p-2">
                            <h1 className="text-xl font-mono font-bold">Stay in the heart of {data.city}, {data.distance}m from center!</h1>
                            <p>{data.description}</p>
                        </div>
                        <div className="w-2/4 border-2 border-primary rounded-2xl p-2">
                            <h1 className="text-xl font-mono font-bold">Perfect for a {dayVacay}-day trip at ${dayVacay * data.cheapestPrice * options.room}!</h1>
                            {data.rating ? (<span>See the heart of {data.city} and relax at this luxury hotel with a score of <strong>{data.rating}</strong></span>) : (<span>See the heart of {data.city} and relax at this luxury hotel with a score of <strong>0.0</strong></span>)}
                            <h2 className="pt-2"><b>Starting from ${data.cheapestPrice}</b> (1 night)</h2>
                            <button onClick={handleAuth} className="primary hover:border-primary">Book Now!</button>
                        </div>
                    </div>                    
                </div>
                {openModal && <Reservation setOpen={setOpenModal} hotelId={id} />}
            </div>)}
            <MailingList />
            <Footer />            
        </div>
    )
}