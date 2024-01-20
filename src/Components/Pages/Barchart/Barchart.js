import "./Barchart.css"
import { Chart as Chartjs ,CategoryScale,BarElement,LinearScale,Tooltip,Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

Chartjs.register (
    CategoryScale,
    BarElement,
    LinearScale,
    Tooltip,
    Legend
);

function Barchart (props) {

    const data =  {
        labels :props.labels,
        datasets : [{
             label : 'Leave Days Per Month ',
             data : props.data,
             borderColor :'grey',
             backgroundColor : ['green','blue','yellow','pink'],
             borderWidth : 1,

        }]
    };
    const options = {

    };
      return (
        <div className="bar-chart-container">
            <Bar
                data ={data}
                options = {options}
                >
            </Bar>
        </div>
      ) 
}
export default Barchart;