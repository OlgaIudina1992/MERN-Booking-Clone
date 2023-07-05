import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { format } from 'date-fns';
import { DateRange } from "react-date-range";
import SearchItem from "../components/SearchItem";
import useFetch from "../hooks/useFetch";

export default function ListingPage() {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const {data, loading, error, reFetch} = useFetch(`http://localhost:5000/api/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)

    const handleClick = () => {
        reFetch();
      };

    return (
        <div>
            <Navbar />
            <Header type="list" />            
                <div className="w-full flex gap-4 p-2 relative">
                    <div className="w-3/12 bg-primary rounded-2xl text-white p-4 border-white border-2 sticky top-2 h-max">
                        <h1 className="text-xl font-serif font-bold">Search</h1>
                        <div className="flex flex-col gap-1 mb-1">
                            <label>Destination:</label>
                            <input placeholder={destination} type="text" />
                            <label>Check-in Date: </label>
                            <span onClick={() => setOpenDate(!openDate)} className="my-1 py-2 px-3 rounded-xl w-full bg-white text-gray-400 cursor-pointer">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                            {openDate && <DateRange 
                                className='rounded-xl overflow-hidden'
                                onChange={item => setDates([item.selection])}
                                ranges={dates} 
                                minDate={new Date()} />}
                            <div>
                            <label>Options:</label>
                            <div>
                                <span className="text-sm">Min Price <small>per night</small></span>
                                <input onChange={(event) => setMin(event.target.value)} min={0} type="number" />
                            </div>                            
                            <div>
                                <span className="text-sm">Max Price <small>per night</small></span>
                                <input onChange={(event) => setMax(event.target.value)} min={0} type="number" />
                            </div>                            
                            <div>
                                <span className="text-sm">Adults</span>
                                <input type="number" min={1} placeholder={options.adult} />
                            </div>                            
                            <div>
                                <span className="text-sm">Children</span>
                                <input type="number" min={0} placeholder={options.child} />
                            </div>                            
                            <div>
                                <span className="text-sm">Rooms</span>
                                <input type="number" min={1} placeholder={options.room} />
                            </div>
                            </div>
                        </div>
                        <button onClick={handleClick} className="primary w-2/4">Check</button>
                    </div>
                    </div>
                    <div className="ml-8 absolute top-48 left-96 w-4/6 border-2 border-primary rounded-xl p-4 text-primary">
                        <h1 className="text-xl font-semibold">Results</h1>
                        <div>
                        {loading ? ("Loading, please wait...") : (<>
                        {data.map((item) => (<SearchItem item={item} key={item._id} />))}
                        
                        </>)}                            
                        </div>
                    </div>                
            </div>
     
    )
}