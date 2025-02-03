import { Link } from "react-router-dom";

const Essentails = ({gender}) => {
    return ( 
        <div className="w-full px-4">
        {/** Header section */}
        <h2 className="text-lg font-bold mb-5">The Essentials</h2>

        {/** Card */}
        <div className="flex flex-wrap justify-between gap-3">
            {gender.map((genderItem) => (
                <div className="relative w-96 h-96"> {/* Set a relative container for positioning */}
                    <img
                        src={genderItem?.ImageURL}
                        alt={genderItem?.GenderID}
                        className="h-full w-full object-cover" // Make the image fill the container
                    />
                    <Link
                        className="absolute bottom-2 left-2 btn btn-neutral btn-active  text-center"
                    >
                        {genderItem?.Gender} {/* Button inside the image */}
                    </Link>
                </div>
            ))}
        </div>
    </div>

     );
}
 
export default Essentails;