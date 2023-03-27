import { Path3D, type Vector3 } from '@babylonjs/core';

const naivePathArray = (points: Array<Vector3>, lineWidth: number) => {
	const path = new Path3D(points);
	const halfWidth = lineWidth / 2;

	const right = path
		.getNormals()
		.map((normal: Vector3, index: number) => points[index].add(normal.scale(halfWidth)));
	const left = path
		.getNormals()
		.map((normal: Vector3, index: number) => points[index].add(normal.scale(-halfWidth)));

	return [left, points, right];
};

export { naivePathArray };
