import useFetch from "../hooks/useFetch"

export default function Favorites() {
    const {data, loading, error} = useFetch("http://localhost:5000/api/hotels?featured=true")
   

    return (
        <div className="flex justify-between gap-2 w-full p-2">
            {loading ? ("Loading, please wait...") : (<>
            {data.map((item) => (<div key={item._id} className="overflow-hidden border-4 border-primary rounded-xl cursor-pointer p-4 flex-1 hover:scale-105">
                {item.photos[0] ? (<img className="w-full h-56 object-cover" src={item.photos[0]} />)
                 : (<img className="w-full h-56 object-cover" src="https://images.pexels.com/photos/1198828/pexels-photo-1198828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />)}
                <div className="flex flex-col text-primary">
                <span className="font-bold">{item.name}</span>
                <span>{item.city}</span>
                <span className="font-semibold">Starting from ${item.cheapestPrice}</span>
                {item.rating ? (<div>
                    <button className="bg-primary text-white rounded-2xl p-2">{item.rating}</button>
                    {item.rating >= 7 && <span> Very </span>}
                    {item.rating > 4 ? <span> Good</span> : <span> Poor</span>}
                    
                </div>) : (<div>
                <button className="bg-primary text-white rounded-2xl p-2">0.0</button>
                    <span>Unrated</span>
                    </div>)}
                </div>
            </div>))}
            </>)}
       </div>
    )
}