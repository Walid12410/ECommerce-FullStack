const BannerCard = ({banners}) => {
    return ( 
        <div className="w-full overflow-hidden">
        <div className="w-full h-[300px] sm:h-[500px] md:h-[700px] lg:h-[700px] xl:h-[700px]">
            <img src={banners?.ImageURL} alt={banners[0]?.Title}
                className="object-fill h-full w-full"
            />
        </div>

        <div className="p-4 text-center">
            <div className="text-5xl font-bold">{banners?.Title}</div>
            <div className="text-xl mt-5 mr-64 ml-64">{banners?.Description}</div>
            <div className="btn btn-active btn-neutral mt-5 w-32">Shop Now</div>
        </div>

    </div>
);
}
 
export default BannerCard;