// src/components/BarChart.tsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register the components used by Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  values: number[];
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch new data from Flask API
  const fetchChartData = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/chart-data')
      .then(response => {
        setChartData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the chart data:', error);
        setLoading(false);
      });
  };

  // Initial fetch when component mounts (optional, can remove this to load on button click)
  React.useEffect(() => {
    fetchChartData();
  }, []);

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

  // Prepare data for the chart
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Values',
        data: chartData.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={data} options={{ responsive: true }} />
      <button onClick={fetchChartData} disabled={loading}>
        {loading ? 'Loading...' : 'Generate New Baseline'}
      </button>
    </div>
  );
};

export default BarChart;
