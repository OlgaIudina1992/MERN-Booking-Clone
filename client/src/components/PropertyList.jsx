import useFetch from "../hooks/useFetch"

export default function PropertyList() {
    const {data, loading, error} = useFetch("http://localhost:5000/api/hotels/countByType")
    const images = [
        "https://images.pexels.com/photos/2844474/pexels-photo-2844474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ]

    return (
        <div className="w-full flex justify-between gap-4 border-4 border-white">
        {loading ? ("Loading, please wait") : (<>
            {data && images.map((image, i) => (<div key={i} className="flex-1 overflow-hidden border-4 border-white cursor-pointer hover:scale-105">
                <img className="w-full h-36 object-cover" src={image} alt="property" />
            
            <div className="p-2 border-primary border-x-2 border-b-2 border-t-transparent rounded-b-xl">
                <h1 className="text-xl font-bold text-primary shadow-2xl">{data[i]?.type.toUpperCase()}S</h1>
                <h2 className="text-lg text-primary shadow-2xl">{data[i]?.count} {data[i]?.type}s</h2>
            </div>
        </div>))
        }                 
        </>)}
        </div>
    )
}