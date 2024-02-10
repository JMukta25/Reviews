import React, { useState, useEffect } from 'react';
// Switch for going through colour of sentiment
const ReviewHighLighter=({sentiment,highLighterColour})=>{

        switch(sentiment){
            case 'Positive':
                highLighterColour='#D9F2DD'
                break;
            case 'Negative':
                highLighterColour='#F2DBD9'
                break;
            case 'Mixed':
                highLighterColour='#e8bd6d3d'
                break;  
            case 'Neutral':
                highLighterColour='#eaf09b6b'
                break;
            default:
                highLighterColour='#FFFFFF'
    
        }
        return highLighterColour;

    
}
export default ReviewHighLighter;