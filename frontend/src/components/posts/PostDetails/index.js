import React from "react";
import "./PostDetails.scss";

function PostDetails({ post }) {
  return (
    <div className="post-detail-page">
      <h1 className="title">{post.title}</h1>
      <h2 className="subtitle">{post.subtitle}</h2>
      <p className="text">{post.text}</p>
      <div className="schedule">
        <h3 className="schedule-title">Schedule Post</h3>
        {/* <div className="schedule-search">
          <input type="text" placeholder="Search for people" />
        </div>
        <div className="schedule-segments">
          <h4 className="schedule-segments-title">Select Segments</h4>
          <select multiple>
            <option value="segment1">Segment 1</option>
            <option value="segment2">Segment 2</option>
            <option value="segment3">Segment 3</option>
          </select>
        </div> */}
      </div>
    </div>
  );
}

export default PostDetails;
