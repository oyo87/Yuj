import React from 'react';

const StudioLectureDetailLectureRegistCancelModal = ({title, content, buttons=[]}) => {

  return (
    <>
        <input type="checkbox" id="lecture-regist-cancel-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{content}</p>
                <div className="modal-action">
                {
                    buttons.map((btn, idx) => 
                        <StudioLectureDetailLectureRegistCancelModalBtn 
                            key={idx}
                            text={btn.text}
                            className={btn.className}
                            style={btn.style}
                            onClickEvent={btn.onClickEvent}
                        />
                    )
                }
                </div>
            </div>
        </div>
    </>
  );
}

const StudioLectureDetailLectureRegistCancelModalBtn = ({text, className, style, onClickEvent}) => {
    return (
        <>
            <label htmlFor="lecture-regist-cancel-modal" onClick={() => onClickEvent ? onClickEvent() : null} style={style} className={"btn "+className}>{text}</label>
        </>
    )
}

export { StudioLectureDetailLectureRegistCancelModal, StudioLectureDetailLectureRegistCancelModalBtn };