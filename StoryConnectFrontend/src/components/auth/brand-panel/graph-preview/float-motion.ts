export type FloatConfig = {
  duration: number;
  delay: number;
  x: number;
  y: number;
};

export const EASE_IN_SECONDS = 1.5;

const TWO_PI = Math.PI * 2;

function easeIn(seconds: number) {
  const t = Math.min(Math.max(seconds / EASE_IN_SECONDS, 0), 1);
  return 1 - (1 - t) * (1 - t);
}

function phase(config: FloatConfig, seconds: number) {
  return TWO_PI * ((seconds + config.delay) / config.duration);
}

export function floatX(config: FloatConfig, seconds: number) {
  return config.x * Math.sin(phase(config, seconds) * 0.7 + 1) * easeIn(seconds);
}

export function floatY(config: FloatConfig, seconds: number) {
  return config.y * Math.sin(phase(config, seconds)) * easeIn(seconds);
}
