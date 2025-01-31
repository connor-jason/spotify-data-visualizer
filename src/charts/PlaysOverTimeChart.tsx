import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { largestTriangleThreeBuckets } from '../utils/downsample';

interface DayCount {
  day: string;    // e.g. "YYYY-MM-DD"
  count: number;  // total plays
}

interface PlaysOverTimeChartProps {
    data: DayCount[];
    threshold?: number;
}

const PlaysOverTimeChart: React.FC<PlaysOverTimeChartProps> = ({ data, threshold = 1000 }) => {
    // Convert DayCount data to [timestamp, count] tuples
    const formattedData: [number, number][] = useMemo(() => {
        return data.map(item => [new Date(item.day).getTime(), item.count]);
    }, [data]);

    // Apply LTTB downsampling
    const downsampledData = useMemo(() => {
        return largestTriangleThreeBuckets(formattedData, threshold);
    }, [formattedData, threshold]);

    // Prepare data for ECharts
    const chartData = useMemo(() => {
        const xAxisData = downsampledData.map(point => {
            const date = new Date(point[0]);
            // Format date as 'YYYY-MM-DD'
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        });
        const seriesData = downsampledData.map(point => point[1]);

        return {
            xAxisData,
            seriesData,
        };
    }, [downsampledData]);

    // ECharts option configuration
    const option = useMemo(() => ({
        backgroundColor: '#212121',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
            backgroundColor: 'rgba(50,50,50,0.7)',
            textStyle: {
                color: '#fff',
            },
        },
        legend: {
            data: ['Daily Plays'],
            textStyle: {
                color: '#ddd',
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    title: 'Save as Image',
                },
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartData.xAxisData,
            axisLabel: {
                color: '#ccc',
                rotate: 45, // Rotate labels for better readability
            },
            axisLine: {
                lineStyle: {
                color: '#555',
                },
            },
            splitLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#ccc',
            },
            axisLine: {
                lineStyle: {
                    color: '#555',
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#555',
                },
            },
        },
        series: [
        {
            name: 'Daily Plays',
            type: 'line',
            data: chartData.seriesData,
            smooth: true,
            symbol: 'none', // Hide symbols for performance
            lineStyle: {
                color: '#1DB954', // Spotify Green
                width: 2,
            },
            areaStyle: {
                color: 'rgba(29, 185, 84, 0.3)', // Semi-transparent Spotify Green
            },
            emphasis: {
                focus: 'series',
            },
        },
        ],
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: 100,
                handleIcon: 'M8.2,13.8v-3.6h-1.6v3.6h1.6z M13.8,13.8v-3.6h-1.6v3.6h1.6z',
                handleSize: '80%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                fillerColor: 'rgba(29,185,84,0.3)',
                borderColor: '#1DB954',
            },
            {
                type: 'inside',
                start: 0,
                end: 100,
            },
        ],
    }), [chartData]);

    return (
        <div className="rounded p-4">
            <ReactECharts
                option={option}
                style={{ height: '400px', width: '100%' }}
                notMerge={true}
                lazyUpdate={true}
                theme={"dark"}
            />
        </div>
    );
};

export default PlaysOverTimeChart;
