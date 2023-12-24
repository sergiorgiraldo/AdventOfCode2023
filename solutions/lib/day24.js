function getIntersections(lines, lowerBound, upperBound) {
    const charts = buildChart(lines);
	let intersects = 0;

	for (let i = 0; i < charts.length; i++) {
		for (let j = i + 1; j < charts.length; j++) {
            let hailstone1 = charts[i];
            let hailstone2 = charts[j];

			let x1 = parseInt(hailstone1[0], 10);
			let x2 = parseInt(hailstone1[3], 10) + x1;
			let x3 = parseInt(hailstone2[0], 10);
			let x4 = parseInt(hailstone2[3], 10) + x3;
			let y1 = parseInt(hailstone1[1], 10);
			let y2 = parseInt(hailstone1[4], 10) + y1;
			let y3 = parseInt(hailstone2[1], 10);
			let y4 = parseInt(hailstone2[4], 10) + y3;

			let intersection = getIntersectPoint(
				x1,
				y1,
				x2,
				y2,
				x3,
				y3,
				x4,
				y4
			);

			if (intersection) {
				const x = intersection["x"];
				const y = intersection["y"];
				//check intersect in the future: point of intersection (x) must be be greater than starting point (x1)[test x > x1] and
                //final point (x2) greater than starting point (x1) [test x1 == x2 - x1 > 0]
                //same applies for other coordinates  
				if (
					x > x1 == x2 - x1 > 0 &&
					y > y1 == y2 - y1 > 0 &&
					x > x3 == x4 - x3 > 0 &&
					y > y3 == y4 - y3 > 0 &&
					//check intersection is in bound
					x >= lowerBound &&
					x <= upperBound &&
					y >= lowerBound &&
					y <= upperBound
				)
					intersects += 1;
			}
		}
	}

    return intersects;
}

function obliterateHailstonesWithRock(lines){
    return 0;
}

function buildChart(lines){
    const chart = [];

    lines.map(line =>{
        const pieces = line.split(/@/); 
        
        let position = pieces[0].split(/,/).map((v) => Number(v.trim()));
        let velocity = pieces[1].split(/,/).map((v) => Number(v.trim()));
        
        chart.push([...position, ...velocity]);
    });

    return chart;
}

// we have 2 line segments, one with points {[x1, y1], [x2, y2]} and other {[x3, y3], [x4, y4]}
// i can find the equation of the line using the 2 points, and the slope m
// y = y1 + m(x - x1)
// m = (y2-y1)/(x2 -x1) 
//we can generalize and say that a given point P is equal to a point P1 plus a multiple of the slope, so...
// P12_Intercept = P1 + offset_12 * (P2 - P1)
//if the lines intercept, this is true for other line
// P34_Intercept = P3 + offset_34 * (P4 - P3)
// Solve this for P12_Intercept = P34_Intercept 

function getIntersectPoint(x1, y1, x2, y2, x3, y3, x4, y4) {
	let offset_12;

	const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

	if (denominator == 0) return null;
	
    offset_12 = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
	
    return {
		x: x1 + offset_12 * (x2 - x1),
		y: y1 + offset_12 * (y2 - y1)
	};
}

module.exports = { getIntersections, obliterateHailstonesWithRock };
