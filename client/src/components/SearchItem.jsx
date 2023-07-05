import { Link } from 'react-router-dom';

let cancellation = Math.random()

export default function SearchItem({item}) {
    return (
        <div className="border-4 border-red-400 rounded-xl p-4 m-2 flex justify-between gap-2 overflow-hidden">
            <div>
                {item.photos[0] ? (<img className="w-52 h-52 object-cover" src={item.photos[0]} alt="search result" />) : (<img className="w-52 h-52 object-cover" src="https://images.pexels.com/photos/1198828/pexels-photo-1198828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="search result" />) } 
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="primary">{item.name}</h1>
                <span className="text-sm">{item.distance}m from center</span>
                <span className="text-sm bg-primary rounded-xl text-white p-2 w-2/3">Free transportation</span>
                <span className="text-sm font-bold">{item.title}</span>
                <span>{item.description}</span>
                {cancellation < 0.5 ? <span className="border-2 p-1 w-2/3 border-primary rounded-xl font-bold text-sm">Free cancellation</span> : <span className="border-2 p-1 w-2/3 border-primary rounded-xl font-bold text-sm">Cancel 2 days in advance</span>}
                <span className="text-blue-600 font-bold">Don't miss the discount, book today!</span>
            </div>
            <div className="w-52">
                {item.rating ? (<div className="flex justify-between flex-col">                
                {item.rating >= 7 && <span className="font-semibold"> Very </span>}
                {item.rating > 4 ? <span className="font-semibold"> Good</span> : <span className="font-semibold"> Poor</span>}
                    <button className="primary w-12 hover:border-primary">{item.rating}</button>
                </div>) : (<div className="flex justify-between flex-col">                
                    <span className="font-semibold">Unrated</span>
                    <button className="primary w-12 hover:border-primary">0.0</button>
                </div>)}
                <div className="flex flex-col gap-4">
                    <span className="font-bold text-lg border-2 p-1 border-primary rounded-full w-16">${item.cheapestPrice}</span>
                    <span className="font-semibold">Taxes and fees included</span>
                    <Link to={`/hotels/${item._id}`} >
                    <button className="primary mt-4 hover:border-primary">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}