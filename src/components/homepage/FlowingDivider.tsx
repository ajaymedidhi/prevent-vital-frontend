/**
 * Decorative flowing line-art divider used between sections for a softer,
 * less "SaaS dashboard" transition than a hard color-block edge.
 */
const LINE_COUNT = 16;
const WIDTH = 1440;
const HEIGHT = 140;

const buildPath = (amplitude: number, phase: number, yOffset: number) => {
    const points: string[] = [];
    const steps = 48;
    for (let i = 0; i <= steps; i++) {
        const x = (WIDTH / steps) * i;
        const y = yOffset + Math.sin((i / steps) * Math.PI * 2 + phase) * amplitude;
        points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
};

const FlowingDivider = ({ className = '' }: { className?: string }) => {
    const lines = Array.from({ length: LINE_COUNT }, (_, i) => {
        const amplitude = 22 + (i % 5) * 4;
        const phase = (i / LINE_COUNT) * Math.PI * 0.9;
        const yOffset = HEIGHT / 2 + (i - LINE_COUNT / 2) * 2.2;
        return { d: buildPath(amplitude, phase, yOffset), key: i };
    });

    return (
        <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
            <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                preserveAspectRatio="none"
                className="w-full h-[90px] md:h-[130px]"
            >
                {lines.map((line) => (
                    <path
                        key={line.key}
                        d={line.d}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                        opacity={0.06 + (line.key % 5) * 0.015}
                    />
                ))}
            </svg>
        </div>
    );
};

export default FlowingDivider;
