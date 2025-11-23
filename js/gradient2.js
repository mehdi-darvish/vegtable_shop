import { NeatGradient } from "https://esm.sh/@firecms/neat";

const config = {
    
    colors: [
        {
            color: '#FF5772',
            enabled: true,
        },
        {
            color: '#17A5AF',
            enabled: true,
        },
        {
            color: '#0A5B2F',
            enabled: true,
        },
        {
            color: '#7758CE',
            enabled: true,
        },
        {
            color: '#2E0EC7',
            enabled: true,
        },
    ],
    speed: 2.5,
    horizontalPressure: 3,
    verticalPressure: 4,
    waveFrequencyX: 2,
    waveFrequencyY: 3,
    waveAmplitude: 5,
    shadows: 1,
    highlights: 5,
    colorBrightness: 1,
    colorSaturation: 7,
    wireframe: false,
    colorBlending: 8,
    backgroundColor: '#003FFF',
    backgroundAlpha: 1,
    grainScale: 3,
    grainSparsity: 0.02,
    grainIntensity: 0.3,
    grainSpeed: 1,
    resolution: 1,
    yOffset: 0,
};

const neat = new NeatGradient({
    ref: document.getElementById("gradient"),
    ...config
});