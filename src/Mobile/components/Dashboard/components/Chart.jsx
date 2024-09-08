import React, { useEffect, useState } from 'react';
import { getChartData } from '../../../../Service/API/Dashboard/service_dashboard';
import ApexCharts from 'react-apexcharts';
import LoadingGlobal from '../../LoadingGlobal';

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('bar');
 const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getChartData();
        let data = response.data;

        // Jika data adalah objek, ubah menjadi array dengan key-value pairs
        if (!Array.isArray(data)) {
          data = [data];
        }

        // Set chart type berdasarkan jumlah data
        if (data.length > 1) {
          setChartType('line');
        } else {
          setChartType('bar');
        }

        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pastikan chartData adalah array sebelum menggunakan map
  const categories = Array.isArray(chartData) ? chartData.map(item => item.tahun) : [];
  const seriesData = Array.isArray(chartData) ? chartData.map(item => item.totalPengeluaran) : [];

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  const chartOptions = {
    chart: {
      type: chartType,
    },
    xaxis: {
      categories,
    },
    yaxis: {
     
      labels: {
        formatter: (value) => formatRupiah(value),
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatRupiah(value),
      },
    },
    title: {
      text: 'Pengeluaran Belanja Barang',
      align: 'center',
    },
    colors: ['#018A8C'],
  };

  const chartSeries = [
    {
      name: 'Pengeluaran',
      data: seriesData,
    },
  ];
 if (loading) {
   return <LoadingGlobal />;
 }
  return (
    <div className='mt-12 md:mt-24'>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type={chartType}
        height={350}
      />
    </div>
  );
};

export default Chart;
