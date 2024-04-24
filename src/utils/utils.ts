function getLocation(dx: number, dy: number) {
  const tanV = dx / dy;
  const directSign = Math.abs(tanV) < 1;
  const t = directSign ? tanV : 1 / tanV;

  const sign1 = t > 0 ? 1 : -1;
  const sign2 = dx > 0 ? 1 : -1;
  const sign = directSign ? sign1 * sign2 : sign2;

  const group1 = [0.5 - sign * t / 2, 0.5 + sign * t / 2];
  const group2 = sign > 0 ? [0, 1] : [1, 0];
  const group = [...group1, ...group2];
  const keys = directSign ? ['x', 'x2', 'y', 'y2'] : ['y', 'y2', 'x', 'x2'];

  const res: Record<string, number> = {};
  keys.forEach((k, idx) => {
    res[k] = group[idx];
  });
  return res;
}

function getCoordinates(startArc: number, endArc: number) {
  const position = [
    Math.sin(startArc),
    -Math.cos(startArc),
    Math.sin(endArc),
    -Math.cos(endArc),
  ];
  const dx = position[2] - position[0];
  const dy = position[3] - position[1];

  return getLocation(dx, dy);
}



export function getLinearGradientLayout(data: { x: string, y: number }[]) {
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  const totalValue = data.reduce((sum, d) => sum + d.y, 0);
  let currentAngle = startAngle;
  const layout: Record<string, number>[] = [];
  data.forEach((d) => {
    const ratio = d.y / totalValue;
    const deltaAngle = (endAngle - startAngle) * ratio;
    const coord = getCoordinates(currentAngle, currentAngle + deltaAngle);
    layout.push(coord);
    currentAngle += deltaAngle;
  });

  return layout;
}

