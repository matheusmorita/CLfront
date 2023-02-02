import React from 'react'

interface progressBarInterface {
    bgColor: string;
    progress: string;
    height: number;
}
  
const ProgressBar = ({bgColor,progress,height}: progressBarInterface) => {
     
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#262626',
        borderRadius: 40,
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
        
    return (
    <div style={Parentdiv}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgColor,
        borderRadius:40,
        textAlign: 'right'
        }}>
        <span style={progresstext}></span>
      </div>
    </div>
    )
}
  
export default ProgressBar;