import React from "react";

const StudioMainBanner = (props) => {
    
    const {studioBannerImage} = props;

    return (
        <>
        <div className="flex">
            <div className={'w-full flex h-60 overflow-hidden items-center justify-center'}>
                <img className={''} src={`${process.env.REACT_APP_IMAGE_URL}/${studioBannerImage}`} />
            </div>
        </div>
        </>
    )
}

export default StudioMainBanner;