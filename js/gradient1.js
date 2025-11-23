import { NeatGradient } from "https://esm.sh/@firecms/neat";

const config = {
    colors: [
        { color: '#4B7311', enabled: true },
        { color: '#0A5412', enabled: true },
        { color: '#17671D', enabled: true },
        { color: '#032950', enabled: true },
        { color: '#000E01', enabled: true },
    ],
    speed: 4,
    horizontalPressure: 5,
    verticalPressure: 6,
    waveFrequencyX: 2,
    waveFrequencyY: 4,
    waveAmplitude: 6,
    shadows: 10,
    highlights: 4,
    colorBrightness: 0.95,
    colorSaturation: 3,
    wireframe: false,
    colorBlending: 5,
    backgroundColor: '#003BFF',
    backgroundAlpha: 1,
    resolution: 0.9,
    yOffset: 0,
};

const neat = new NeatGradient({
    ref: document.getElementById("gradient"),
    ...config
});