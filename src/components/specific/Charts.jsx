import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, plugins, PointElement, scales, Tooltip } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { orange } from '../../constants/colors';
import { getLast7Days } from '../../lib/features';

ChartJS.register(CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins, scales);

const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {

        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
}

export const LineChart = ({ value = [] }) => {

    const data = {
        labels,
        datasets: [{
            data: value,
            label: "Revenue",
            fill: true,
            backgroundColor: "rgba(75,12,192,0.1)",
            borderColor: "rgba(75,192,192,1)",
        }]

    }

    return (
        <Line data={data} options={lineChartOptions} />
    )
}

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    cutout: 120,
}

export const DoughnutChart = ({ value = [], labels = [] }) => {

    const data = {
        labels,
        datasets: [{
            data: value,
            label: "Total Chats Vs Group Chats",
            fill: true,
            backgroundColor: ["rgba(75,12,192,0.1)", orange],
            borderColor: ["rgba(75,192,192,1)", orange],
            offset: 40
        }]

    }
    return (
        <Doughnut style={{ zIndex: 10 }} data={data} options={doughnutChartOptions} />
    )
}

