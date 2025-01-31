import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface ArtistData {
    artist: string;
    count: number;
}

interface TopArtistsChartProps {
    data: ArtistData[];
}

/**
 * Horizontal bar chart of Top Artists
 */
const TopArtistsChart: React.FC<TopArtistsChartProps> = ({ data }) => {
    // Prepare data for ECharts
    const artists = data.map(item => item.artist).reverse();
    const counts = data.map(item => item.count).reverse();

    // ECharts option configuration
    const option = useMemo(() => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(50,50,50,0.8)',
                textStyle: {
                    color: '#fff',
                },
            },
            title: {
                text: 'Top Artists',
                left: 'center',
                textStyle: {
                    color: '#ddd',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
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
            yAxis: {
                type: 'category',
                data: artists,
                axisLabel: {
                    color: '#ccc',
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
            series: [
                {
                    name: 'Plays',
                    type: 'bar',
                    data: counts,
                    itemStyle: {
                        color: 'rgba(29,185,84,0.5)',
                    },
                    emphasis: {
                        itemStyle: {
                            color: 'rgba(29,185,84,0.8)',
                        },
                    },
                },
            ],
        };
}, [artists, counts]);

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

export default TopArtistsChart;
