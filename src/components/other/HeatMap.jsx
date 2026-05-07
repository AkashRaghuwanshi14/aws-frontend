import React from 'react'

import { useState, useEffect } from 'react'

import ReactHeatmap from '@uiw/react-heat-map';
import { useActionData } from 'react-router-dom';

//enerate a dummy data
const generatedata = (StartDate, EndDate) => {

    const data = [];

    const currdate = new Date(StartDate);
    const enddate = new Date(EndDate);

    while (currdate <= enddate) {
        const count = Math.floor(Math.random() * 50);
        data.push({
            count: count,
            date: currdate.toISOString().split("T")[0]
        })
          currdate.setDate(currdate.getDate() + 1);
    }

  

    return data;

}

const colorpanel = (maxcount) => {

    const colors = {};

    for (let i = 0; i <= maxcount; i++) {

        const greenvalue = Math.floor((i / maxcount) * 255);

        colors[i] = `rgb(0,${greenvalue},0)`;


    }

    return colors;

}

const HeatMap = () => {

    const [activitydata, setactivitydata] = useState([]);

    const [color, setcolor] = useState({});

    useEffect(() => {

        const fetchdata=async () => {
            const startdate = "2004-01-01";
            const enddate = "2004-01-31";
          
            const data=generatedata(startdate,enddate);
            setactivitydata(data);

            const maxcount=Math.max(...data.map((d)=>d.count));
            setcolor(colorpanel(maxcount));

        }

        fetchdata();

    }, [])

    return (

        <div className='mt-6 ml-6'>
        <h1  className='text-lg font-bold '>Recent Contributations</h1>
         <ReactHeatmap
          
          style={{ color: 'white' }}
          value={activitydata}
          weekLabels={["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]}
          startDate={new Date("2004-01-01")}
          rectSize={15}
          space={3}
          rectProps={{
            rx:4
          }}
          panelColors={color}
         />
            
        </div>
    )
}

export default HeatMap
