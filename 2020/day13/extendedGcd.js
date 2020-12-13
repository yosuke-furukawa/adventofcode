function combinePhasedRotations(aPeriod, aPhase, bPeriod, bPhase) {
  const [gcd, s, t] = extendedGcd(aPeriod, bPeriod);
  const phaseDifference =  aPhase - bPhase;
  const pdMulti = parseInt(phaseDifference / gcd);
  const pdReminder = phaseDifference % gcd;

  const combinedPeriod = parseInt(aPeriod / gcd) * bPeriod;
  const combinedPhase = (aPhase - s * pdMulti * aPeriod) % combinedPeriod;
  return [combinedPeriod, combinedPhase];
}

function arrowAllignment(redLen, greenLen, advantage) {
  const [period, phase] = combinePhasedRotations(redLen, 0, greenLen, -advantage % greenLen);
  return -phase % period;
}

function extendedGcd(a, b) {
  var [oldR, r] = [a, b];
  var [oldS, s] = [1, 0];
  var [oldT, t] = [0, 1];

  while (r !== 0) {
    var q = parseInt(oldR / r);
    [oldR, r] = [r, oldR % r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }

  return [oldR, oldS, oldT];
}

console.log(arrowAllignment(7, 13, 1));
console.log(arrowAllignment(13, 59, 4));
console.log(arrowAllignment(509, 643, 31));
