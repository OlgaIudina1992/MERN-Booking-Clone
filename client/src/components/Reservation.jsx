import { useContext, useState } from "react"
import useFetch from "../hooks/useFetch"
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

export default function Reservation({setOpen, hotelId}) {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`http://localhost:5000/api/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
  
    const getDatesInRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const date = new Date(start.getTime());
  
      const dates = [];
  
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
  
      return dates;
    };
  
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  
    const isAvailable = (roomNumber) => {
      const isFound = roomNumber.unavailableDates.some((date) =>
        alldates.includes(new Date(date).getTime())
      );  
      return !isFound;
    };
  
    const handleSelect = (e) => {
      const checked = e.target.checked;
      const value = e.target.value;
      setSelectedRooms(
        checked
          ? [...selectedRooms, value]
          : selectedRooms.filter((item) => item !== value)
      );
    };
  
    const navigate = useNavigate();
  
    const handleClick = async () => {
      try {
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`, {
              dates: alldates,
            });
            return res.data;
          })
        );
        setOpen(false);
        navigate("/");
      } catch (err) {}
    };

    return (
        <div className="w-1/3 h-1/3 border-white border-2 bg-primary flex items-center justify-center rounded-2xl mx-12 my-2">
            <div>
            <button onClick={() => setOpen(false)} className="text-white hover:scale-105 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <h1 className="primary text-white mb-2">Select your rooms: </h1>
            {data.map(item => (
                <div key={item._id} className="text-white">
                    <div>
                        <div className="flex border-2 border-white rounded-2xl p-2">
                            <h2 className="text-xl font-bold">{item.title}</h2>
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">Description: </h2>
                            <div>{item.description}</div>
                        </div>
                        <div className="bg-white text-primary rounded-xl p-2">Maximum guests: {item.maxGuests}</div>
                        <div className="font-bold">Price: {item.price}</div>
                    </div>
                    <div>
                        <h2>Available Rooms:</h2>
                        <div>{item.roomNumbers.map((roomNumber) => (
                            <div>
                                <label>{roomNumber.number}</label>
                                <input onChange={handleSelect} disabled={!isAvailable(roomNumber)} type="checkbox" value={roomNumber._id}/>
                            </div>
                        ))}</div>
                    </div>
                </div>
            ))}
            <button className="primary hover:border-primary" onClick={handleClick}>Click to book</button>
            </div>
        </div>
    )
}