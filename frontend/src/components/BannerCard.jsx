const BannerCard = ({ banners }) => {
    return (
        <div className="w-full flex-col px-4">
            <div className="w-full h-[300px] sm:h-[500px] md:h-[700px] lg:h-[700px] xl:h-[700px]">
                <img src={banners?.ImageURL} alt={banners[0]?.Title}
                    className="object-fill h-full w-full"
                />
            </div>

            <div className="p-4 mt-1 text-center">
                <div className="text-4xl font-bold">{banners?.Title}</div>
                
                {/* Centering the description */}
                <div className="w-full md:w-96 mx-auto mt-5 text-center align-middle">
                    <div className="text-xs">{banners?.Description}</div>
                </div>

                <div className="btn btn-active btn-neutral mt-5 w-28">Shop Now</div>
            </div>
        </div>
    );
}

export default BannerCard;
