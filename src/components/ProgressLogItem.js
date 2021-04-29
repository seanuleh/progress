import React from 'react';

function ProgressLogItem(props) {
    const { weight, units, date } = props;
  
    return (<>
        <div className={`log-item`}>
            <div className="date">{date}</div>
            <div className="weight"><span className="weight">{weight}</span> <span className="units">{units}</span></div>
        </div>
    </>)
  }

export default ProgressLogItem;
