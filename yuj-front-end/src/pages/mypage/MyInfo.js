import React from "react";
import MypageSidebar from "../../components/mypage/MypageSidebar";

function MyInfo() {
    return (
        <div>
            <MypageSidebar>
                <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
                <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
                <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
                <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
            </MypageSidebar>
        </div>


    );
}

export default MyInfo;