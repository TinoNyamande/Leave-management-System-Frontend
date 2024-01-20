import { Chart as ChartJS ,ArcElement,Tooltip,Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import "./Piechart.css"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function Piechart(props) {

    const data = {
        labels : props.labels,
        datasets : [{
            label : "Leave days",
            data : props.data,
            borderColor : "grey",
            backgroundColor: ["red","blue","aqua","pink","purple"]
        }]
    };
    const options = {

    };
   return (
    <div className="pie-chart-container">
            <Pie data={data} options={options}></Pie>
    </div>
   )
}
export default Piechart