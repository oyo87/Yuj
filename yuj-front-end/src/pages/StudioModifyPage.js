import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudioDetail, getStudioLectureList, getStudioLiveLecture } from '../stores/studioSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import StudioSidebar from '../components/StudioSidebar';
import StudioMainBanner from '../components/StudioMainBanner';
import BannerFileInput from '../components/BannerFileInput';
import { CommonModal, CommonModalBtn } from '../components/CommonModal';
import axios from 'axios';


const StudioModifyPage = () => {
    
    const user = useSelector(state => state.user);
    const studio = useSelector(state => state.studio);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [bannerImg, setBannerImg] = useState('');
    const [bannerFile, setBannerFile] = useState('');
    const [description, setDiscription] = useState('');
    
    useEffect(() => {
        if(bannerFile){
            let reader = new FileReader();
            reader.onload = () => {
                setBannerImg(reader.result);
            };
            reader.readAsDataURL(bannerFile);
        }
    },[bannerFile])

    useEffect(() => {
        if(studio.studioDetail.description) {
            setDiscription(studio.studioDetail.description);
        }
    },[])

    const modifyClicked = async() => {
        console.log('modify clicked!');
        console.log("bannerFile : ",bannerFile);
        console.log("description : ",description);


        const formSendData = new FormData();

        formSendData.append("files", bannerFile);
        formSendData.append("description", description);
        formSendData.append("userId", user.userId);

        const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
        };


        await axios
            .put(
                `${process.env.REACT_APP_API_URL}/studio/${user.userId}`,
                formSendData,
                config
            )
            .then((response) => {
                console.log("OK!!!!");
                console.log(response);
                alert("수정이 완료되었습니다.");
                navigate("/studio",{state:{teacherId:user.userId}, replace:true});
            })
            .catch((error) => {
                console.log("Error!!!!!!!!!!!!!");
                console.error(error);
            });
    }

    const moveToStudioMain = () => {
        console.log('move to list!');
        navigate('/studio');
    }


    return (
        <>
            <CommonModal 
                // title={'Congratulations random Internet user!'} // 모달에 띄워질 제목
                content={`수정하시겠습니까?`} // 모달에 띄워질 내용
                buttons={[
                  {
                    text: "수정하기",
                    className: "btn-accent text-white",
                    onClickEvent: () => modifyClicked()
                  },
                  {
                    text: "취소하기",
                    className: "btn-primary text-black"
                  }
                ]}
                modalId={'studio-modify'}
            />            
            <div className={'flex'}>
                <StudioSidebar studioDetail={studio.studioDetail} userId={user.userId} studioLiveLecture={studio.studioLiveLecture}/>
                <div>
                    <div className={'px-40'}>
                        <div className={'flex mt-20 mb-5'}>
                            <p className={'text-xl font-bold text-accent mr-3'}>배너 이미지</p>
                        </div>
                        {/* <StudioMainBanner studioBannerImage={bannerImg ? bannerImg : `${process.env.REACT_APP_IMAGE_URL}/${studio.studioDetail.bannerImage}`}/> */}
                        <div className="flex">
                            <div className={'w-full flex h-60 overflow-hidden items-center justify-center'}>
                                <img className={''} src={bannerImg ? bannerImg : `${process.env.REACT_APP_IMAGE_URL}/${studio.studioDetail.bannerImage}`} />
                            </div>
                        </div>
                        <div className={'w-full mt-5'}>
                            <BannerFileInput onChangeEvent={setBannerFile} initialLabelText={"'확장자: png, jp,g jpeg / 용량 100MB 이하'"}/>
                        </div>
                        <div className={'mt-28'}>
                            <p className={'text-xl font-bold text-accent mr-3'}>스튜디오 소개글</p>
                        </div>
                        <div className={'mt-5 flex justify-evenly'}>
                            <textarea className="textarea textarea-bordered w-full h-48" value={description} onChange={(e) => setDiscription(e.target.value)} placeholder="소개글을 입력해주세요."></textarea>
                            <hr />
                        </div>

                        <hr className={'my-10'}/>

                        <div className={'mb-32 flex justify-end'}>
                            <CommonModalBtn text={'수정하기'} className={'border-none w-32 btn-accent text-white'} modalId={'studio-modify'}/>
                            <button onClick={() => moveToStudioMain()} className={'btn border-none w-32 btn-primary ml-5'}>목록으로</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudioModifyPage;