import React from "react";
import { useSelector } from 'react-redux';

const StudioLectureListCategorySelectBox = () => {

  const yogaCategory = useSelector(state => state.common.yogaCategory)

  return (
    <>
      <select
        className="select w-40 max-w-xs select-sm text-accent"
        defaultValue="0"
      >
        <option value="0">Select Category</option>
        {yogaCategory.map((menu) => {
          return (
            <option key={menu}>{menu}</option>
          )
        })}
      </select>
    </>
  );
};

export default StudioLectureListCategorySelectBox;
