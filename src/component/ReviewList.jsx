
import React, { useState, useEffect } from 'react';
import ToolTip from './ToolTip';
import ReviewHighLighter from './ReviewHighLighter';

const ReviewList = () => {
const url='http://localhost:8000/reviews';
const [reviews, setReviews] = useState([]);
let highLighterColour='#FFFFF';
let indicesArray=[];




// Hook to fetch data from json
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data from JSON server', error);
    }
  };
  fetchData();
  return () => {
  };
},[]); 
// function to give starRating 
const starRating=(rating)=>{

    const filledStars=Math.floor(rating/2);
    const filledStarArray =Array.from({length:filledStars},(_,index)=>index+1 );
    return (
        <div className="star-rating">
          {filledStarArray.map((star) => (
            <span key={star} role="img" aria-label="star" style = {{border: "none"}}>
              ⭐
            </span>
          ))}
        </div>
    );
}

const getStartandEndIndex=(item)=>{
    let indicesArray = [];
  if (item.analytics && item.analytics.length > 0) {
    item.analytics.forEach((analyticsItem) => {
      if (analyticsItem.highlight_indices && analyticsItem.highlight_indices.length > 0) {
        const highlightIndices = analyticsItem.highlight_indices[0];
        if (highlightIndices.length === 3) {
          // Assuming the structure is [start, end, sentiment]
          const [start, end, sentiment] = highlightIndices;
          indicesArray.push({ start, end, sentiment });
        }
      }
    });
  }

  return indicesArray;
}
return (    
  <div className="ReviewsList">
    {reviews.map((item) => ( // mapping over json data
    
    <div className="reviews-preview" key={item.review_id}>
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
    <img
     src={item.source.icon}
     alt={`${item.source.name} icon`}
     style={{ width: '30px', height: '30px', marginRight: '10px' }}
    />
    <div>
    <h4>
      <span style={{ fontWeight: 'bold' }}>{item.reviewer_name}</span><span style={{color:'gray'}}> wrote a review at </span>{' '}
      <span style={{ fontWeight: 'bold' }}>{item.source.name}</span>{' '}
      <span style={{ display: 'flex', marginLeft: '10px',color:'gray' }}>
      {starRating(item.rating_review_score)} on {item.date}
      </span>
    </h4>
    </div>
    </div>
    <div>
    {getStartandEndIndex(item).map((indexData, index) => (
     <p className="Main-Text" title={item.topic} style={{ textAlign: 'left', marginLeft: '60px' }}>
     {/* { console.log(indexData.start)} */}
     {indexData.start >= 0 ? (
      
       <>
       {console.log(indexData.start+" inside")}
         {item.content.substring(0, indexData.start)}
         <span style={{ backgroundColor: ReviewHighLighter({ sentiment: indexData.sentiment }) }}>
           {item.content.substring(indexData.start, indexData.end)}
         </span>
         {item.content.substring(indexData.end)}
       </>
     ) : (
      <>
       {(item.content)}
      </>
       
     )}
   </p>
    ))}
  
      {/* Used Component Tooltip */}
      <ToolTip topic={item.topic} style={{ textAlign: 'left' }} />
      
  </div>
</div>
))}   
       </div>);
}
export default ReviewList;