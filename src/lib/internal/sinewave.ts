import { Vector3 } from '@babylonjs/core';
import { TWO_PI } from '$lib/internal/numbers';
const sineWave = (amplitude: number, period: number, stepSize = 0.5, numSteps = 50) => {
	const points = [];
	for (let idx = 0; idx < numSteps; idx++) {
		const x = idx * stepSize;
		points.push(new Vector3(x, 0, Math.abs(amplitude) * Math.sin(x * (TWO_PI / Math.abs(period)))));
	}
	return points;
};
type SineWaveOptions = {
	amplitude: number;
	period: number;
	stepSize: number;
};

export { sineWave };
export type { SineWaveOptions };
