/**
 * Largest Triangle Three Buckets (LTTB) Downsampling Algorithm
 * Reference: https://github.com/sveinn-steinarsson/flot-downsample
 */
export const largestTriangleThreeBuckets = (data: [number, number][], threshold: number): [number, number][] => {
    const dataLength = data.length;
    if (threshold >= dataLength || threshold === 0) {
        return data; // Nothing to do
    }

    const sampled: [number, number][] = [];
    let sampledIndex = 0;

    // Bucket size. Leave room for start and end data points
    const every = (dataLength - 2) / (threshold - 2);

    let a = 0; // Initially a is the first point in the triangle
    sampled[sampledIndex++] = data[a]; // Always add the first point

    for (let i = 0; i < threshold - 2; i++) {
        // Calculate range for this bucket
        const rangeStart = Math.floor((i + 1) * every) + 1;
        const rangeEnd = Math.floor((i + 2) * every) + 1;
        const range = data.slice(rangeStart, rangeEnd);

        // Point a
        const pointA = data[a];

        // Calculate average for next bucket (used for calculating the triangle area)
        const avgRangeStart = Math.floor((i + 2) * every) + 1;
        const avgRangeEnd = Math.floor((i + 3) * every) + 1;
        const avgRange = data.slice(avgRangeStart, avgRangeEnd);
        const avgX = avgRange.reduce((sum, point) => sum + point[0], 0) / avgRange.length || 0;
        const avgY = avgRange.reduce((sum, point) => sum + point[1], 0) / avgRange.length || 0;

        // Find the point in the current bucket that forms the largest triangle with point a and the average point
        let maxArea = -1;
        let maxAreaPoint: [number, number] = [0, 0];
        let maxAreaIndex = 0;

        for (let j = 0; j < range.length; j++) {
            const point = range[j];
            const area = Math.abs((pointA[0] - avgX) * (point[1] - pointA[1]) - (pointA[0] - point[0]) * (avgY - pointA[1])) / 2;

            if (area > maxArea) {
                maxArea = area;
                maxAreaPoint = point;
                maxAreaIndex = j;
            }
        }

        sampled[sampledIndex++] = maxAreaPoint; // Pick this point from the bucket
        a = rangeStart + maxAreaIndex; // This point becomes the a for the next bucket
    }

    sampled[sampledIndex++] = data[dataLength - 1]; // Always add the last point

    return sampled;
}
  