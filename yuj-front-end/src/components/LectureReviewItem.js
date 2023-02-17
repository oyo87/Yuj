import { useEffect, useState } from "react";
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

const LectureReviewItem = (props) => {

    const item = props.item;
    const rating = props.item.rating;

    const loginUserInfo = useSelector(state => state.user);
    
    return(
        <>
            <div id="review-item-container" className="p-8 hover:bg-success hover:bg-opacity-10" style={{ 'border-bottom': '2px solid rgb(144, 133, 154, 0.4)', opacity:''}}>
                <Header className="" id="review-item-profile-container">
                    <img className="w-12 rounded-full" src={`${process.env.REACT_APP_IMAGE_URL}/${item.profileImage}`}/>
                    <HeaderDetailsWrapper id="review-text-info-container">
                        <HeaderDetail className="w-20 truncate">{item.userName}</HeaderDetail>
                        <HeaderDetail>{item.date}</HeaderDetail>
                        <HeaderDetail className="rating rating-sm flex justify-evenly w-24 ml-8">
                            <input type="radio" name={item.reviewId} className="mask mask-star-2 bg-accent" readOnly checked={rating === 1}/>
                            <input type="radio" name={item.reviewid} className="mask mask-star-2 bg-accent" readOnly checked={rating === 2}/>
                            <input type="radio" name={item.reviewid} className="mask mask-star-2 bg-accent" readOnly checked={rating === 3}/>
                            <input type="radio" name={item.reviewid} className="mask mask-star-2 bg-accent" readOnly checked={rating === 4}/>
                            <input type="radio" name={item.reviewid} className="mask mask-star-2 bg-accent" readOnly checked={rating === 5} />
                        </HeaderDetail>
                        {/* {loginUserInfo.userInfo.id === item.userId ? 
                        (<div><EditIcon/><DeleteIcon/></div>) : null} */}
                    </HeaderDetailsWrapper>
                </Header>
                <div className="text-success" id="review-item-lecture-title">
                    {item.lectureName}
                </div>
                <div id="review-item-ltecture-review">
                    {item.review}
                </div>
            </div>
        </>
    );

}

export default LectureReviewItem;

const Header = styled.div`
    display: flex;
    align-items:center;
    gap : 30px;
`;

const HeaderDetailsWrapper = styled.div`
    display: flex;  
    &:nth-child(3){
        position: relative;
        bottom:1px;
    }

    *{
        cursor : initial !important;
    }
`;

const HeaderDetail = styled(HeaderDetailsWrapper)`
    align-items: center;
`;