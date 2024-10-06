import React, { useEffect, useState } from 'react';
import './App.css';
import { LineChart } from '@mui/x-charts/LineChart';
import DataLoader from './DataLoader';

interface DataSeries {
  range: number[];
  dataSeries: {
    data: (number | null)[];
  }[];
}

async function fetchStarshipSpend(): Promise<DataSeries> {
  return {
    range: [1, 2, 3, 4, 5, 6],
    dataSeries: [{
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    }],
  };
  // throw new Error('oops');
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [starshipSpend, setStarshipSpend] = useState<DataSeries | null>();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      setStarshipSpend(null);

      try {
        const results = await fetchStarshipSpend();
        setStarshipSpend(results);
      } catch (err) {
        // TODO: backoff retry?
        console.error('api error: ', err);
        setError('error fetching data');
      }

      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <DataLoader loading={loading} error={error}>
          <LineChart
            xAxis={[{ data: starshipSpend?.range, scaleType: 'point' }]}
            series={starshipSpend?.dataSeries || []}
            width={500}
            height={300}
          />
        </DataLoader>
      </header>
    </div>
  );
}

export default App;
