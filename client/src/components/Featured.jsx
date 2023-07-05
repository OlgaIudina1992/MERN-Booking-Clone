import useFetch from "../hooks/useFetch"

export default function Featured() {
    const {data, loading, error} = useFetch("http://localhost:5000/api/hotels/countByCity?cities=Paris,London,Sydney");

    return (
        <div className="flex justify-between gap-2 w-full z-0">
            {loading ? ("Loading, please wait...") : (<>
            <div className="relative overflow-hidden border-8 border-white h-96 hover:scale-105">
                <img className="w-full object-cover cursor-pointer" src="https://images.pexels.com/photos/7245330/pexels-photo-7245330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="London properties" />
                <div className=" absolute bottom-12 left-5 text-white">
                    <h1 className="primary" >London</h1>
                    <h2 className="text-xl font-bold shadow-xl">{data[1]} properties</h2>
                </div>
            </div>            
            <div className="relative overflow-hidden border-8 border-white h-96 hover:scale-105">
                <img className="w-full object-cover cursor-pointer" src="https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <div className=" absolute bottom-12 left-5 text-white">
                    <h1 className="primary">Sydney</h1>
                    <h2 className="text-xl font-bold shadow-xl">{data[2]} properties</h2>
                </div>                
            </div>
            <div className="relative overflow-hidden border-8 border-white h-96 hover:scale-105">
                <img className="w-full object-cover cursor-pointer" src="https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <div className=" absolute bottom-12 left-5 text-white">
                    <h1 className="primary">Paris</h1>
                    <h2 className="text-xl font-bold shadow-xl">{data[0]} properties</h2>
                </div>                
            </div>
            </>)}
        </div>
    )
    }