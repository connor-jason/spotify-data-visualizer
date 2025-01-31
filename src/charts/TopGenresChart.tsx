import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface GenreData {
    genre: string;
    count: number;
}

interface TopGenresChartProps {
    data: GenreData[];
}

/**
 * Pie chart for Top Genres
 */
const TopGenresChart: React.FC<TopGenresChartProps> = ({ data }) => {
    // Prepare data for ECharts
    const pieData = useMemo(() => {
        return data.map(item => ({
            name: item.genre,
            value: item.count,
        }));
    }, [data]);

    // ECharts option configuration
    const option = useMemo(() => ({
        title: {
            text: 'Top Genres',
            left: 'center',
            textStyle: {
                color: '#ddd',
            },
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(50,50,50,0.8)',
            textStyle: {
                color: '#fff',
            },
        },
        legend: {
            orient: 'horizontal',
            bottom: '5%',
            textStyle: {
                color: '#ddd',
            },
        },
        series: [
        {
            name: 'Plays',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: pieData,
            label: {
                color: '#ccc',
            },
            labelLine: {
                lineStyle: {
                    color: '#555',
                },
            },
            itemStyle: {
                color: (params: any) => {
                    const colorPalette = [
                    '#1DB954',
                    '#535353',
                    '#121212',
                    '#b3b3b3',
                    '#212121',
                    ];
                    return colorPalette[params.dataIndex % colorPalette.length];
                },
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
        ],
    }), [pieData]);

    return (
        <div className="bg-[#212121] rounded p-4 shadow">
            <ReactECharts
                option={option}
                style={{ height: '400px', width: '100%' }}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
    );
};

export default TopGenresChart;
