import { Vector3 } from '@babylonjs/core/Maths/math.vector';

const direction = (fromPoint: Vector3, toPoint: Vector3) => {
	return toPoint.subtract(fromPoint);
};

const miter = (points: Array<Vector3>, width: number) => {
	const halfWidth = width * 0.5;
	const directions: Array<Vector3> = [];
	const trends: Array<Vector3> = [];
	const miters: Array<Vector3> = [];
	const normals: Array<Vector3> = [];
	const halfLengths: Array<number> = [];
	const rightLengths: Array<number> = [];
	const leftLengths: Array<number> = [];

	points.forEach((_, idx: number) => {
		directions.push(
			points[idx + 1] != null
				? direction(points[idx], points[idx + 1]).normalize()
				: direction(points[idx], points[idx - 1])
						.negate()
						.normalize()
		);

		const prevDirection =
			directions[idx - 1] ??
			direction(points[idx + 1], points[idx])
				.negate()
				.normalize();

		trends.push(directions[idx].add(prevDirection).normalize());
		miters.push(new Vector3(-trends[idx].z, trends[idx].y, trends[idx].x));
		normals.push(new Vector3(-directions[idx].z, directions[idx].y, directions[idx].x));

		halfLengths.push(halfWidth / Vector3.Dot(miters[idx], normals[idx]));
	});
	return {
		trends,
		miters,
		halfLengths,
		normals,
		rightLengths,
		leftLengths
	};
};

const miteredPathArray = (points: Array<Vector3>, pathWidth: number, details?: MiterDetails) => {
	const { miters, halfLengths } = details ?? miter(points, pathWidth);
	const pathArray: Array<Array<Vector3>> = [[], [], []];

	points.forEach((_, idx: number) => {
		pathArray[0].push(points[idx].add(miters[idx].scale(halfLengths[idx])));
		pathArray[1].push(points[idx]);
		pathArray[2].push(points[idx].add(miters[idx].scale(-halfLengths[idx])));
	});
	return pathArray;
};

type MiterDetails = ReturnType<typeof miter>;

export { miter, miteredPathArray };
export type { MiterDetails };
