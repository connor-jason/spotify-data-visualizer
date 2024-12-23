import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Data type for the chart
interface ArtistData {
  artist: string;
  count: number;
}

// Props type for the chart
interface TopArtistsChartProps {
  data: ArtistData[];
}

const TopArtistsChart: React.FC<TopArtistsChartProps> = ({ data }) => {
  const labels = data.map(item => item.artist);
  const counts = data.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Plays',
        data: counts,
        backgroundColor: 'rgba(29,185,84,0.5)', // Spotify green with 50% opacity
      }
    ]
  };

  const options: any = {
    indexAxis: 'y', // horizontal bar
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#ddd' // Light gray for legend text
        }
      },
      title: {
        display: true,
        text: 'Top Artists',
        color: '#ddd', // Light gray for title
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ccc' // Light gray for x-axis ticks
        },
        grid: {
          color: '#555' // Darker gray for grid lines
        }
      },
      y: {
        ticks: {
          color: '#ccc' // Light gray for y-axis ticks
        },
        grid: {
          color: '#555' // Darker gray for grid lines
        }
      }
    }
  };

  return (
    <div className="bg-spotify-dark rounded p-4 shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopArtistsChart;
