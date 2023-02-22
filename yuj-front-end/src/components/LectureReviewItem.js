import { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const LectureReviewItem = (props) => {

    const item = props.item;
    const rating = props.item.rating;

    const loginUserInfo = useSelector(state => state.user);
    console.log('로그인 정보 : ', loginUserInfo.userId, typeof (loginUserInfo.userId));
    console.log('item 정보 : ', item, typeof (item.userId));
    console.log(loginUserInfo.userId === item.userId);

    function updateReview() {
        Swal.fire({
            icon: "info",
            iconColor: "#EBE8DF",
            title: "정비 중",
            text: "후기 삭제 후 다시 작성해주세요.",
            confirmButtonColor: "#90859A",
            confirmButtonText: "확인",
        })
    }

    async function deleteReview() {
        console.log('delete', item);
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/lectures/userLectures/review/${item.reviewId}`
            // `http://localhost:5000/lectures/userLectures/review/${item.reviewId}`
            // `https://i8a504.p.ssafy.io/api/lectures/userLectures/review?userId=${studio.studioDetail.userId}`
        );
        props.getReviews();
    }

    return (
        <>
            {console.log("item reviewId in render : ", item.reviewId)}
            <div id="review-item-container" className="px-8 py-5 hover:bg-success hover:bg-opacity-10" style={{ borderBottom: '1px solid rgb(144, 133, 154, 0.4)', opacity: '' }}>
                <Header className="" id="review-item-profile-container">
                    <img className="w-6 h-6 rounded-full mr-3" src={`${process.env.REACT_APP_IMAGE_URL}/${item.profileImage}`} />
                    <HeaderDetailsWrapper id="review-text-info-container" className={'justify-between'}>
                        <HeaderDetail className="truncate mr-3 text-xs font-bold">{item.userName}</HeaderDetail>
                        <HeaderDetail className="text-xs">{item.date}</HeaderDetail>
                        <HeaderDetail className="rating rating-xs flex justify-evenly w-16 ml-5">
                            <input type="radio" name={item.reviewId ? "review-rating" : ""} className="mask mask-star-2 bg-accent" defaultChecked={rating === 1} />
                            <input type="radio" name={item.reviewid ? "review-rating" : ""} className="mask mask-star-2 bg-accent" defaultChecked={rating === 2} />
                            <input type="radio" name={item.reviewid ? "review-rating" : ""} className="mask mask-star-2 bg-accent" defaultChecked={rating === 3} />
                            <input type="radio" name={item.reviewid ? "review-rating" : ""} className="mask mask-star-2 bg-accent" defaultChecked={rating === 4} />
                            <input type="radio" name={item.reviewid ? "review-rating" : ""} className="mask mask-star-2 bg-accent" defaultChecked={rating === 5} />
                        </HeaderDetail>
                        {/* {(loginUserInfo.userId*=1) === item.userId ? 
                        (<><EditIcon/><DeleteIcon/></>) : null} */}
                        {parseInt(loginUserInfo.userId) === item.userId ?
                            (<>
                                <span className='rounded-full p-1 hover:bg-success hover:bg-opacity-40 flex ml-5 mr-3 items-center' onClick={updateReview()}><EditIcon sx={{ fontSize: 15 }} />
                                    <p className="text-xs ml-1">수정</p>
                                </span>
                                <span className='rounded-full p-1 hover:bg-success hover:bg-opacity-40 flex items-center' onClick={deleteReview()}><DeleteIcon sx={{ fontSize: 15 }} />
                                    <p className="text-xs ml-1">삭제</p>
                                </span>
                            </>) : null}
                    </HeaderDetailsWrapper>
                </Header>
                <div className={"text-success my-3 text-xs text-accent"} id="review-item-lecture-title">
                    {item.lectureName}
                </div>
                <div id="review-item-ltecture-review" className={'text-sm'}>
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
`;

const HeaderDetailsWrapper = styled.div`
    display: flex;  
    &:nth-child(3){
        position: relative;
        bottom:1px;
    }

    *{
        cursor : initial !important;
    }import { Swal } from 'sweetalert2';

`;

const HeaderDetail = styled(HeaderDetailsWrapper)`
    align-items: center;
`;