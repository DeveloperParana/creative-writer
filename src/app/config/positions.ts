export const getPositions = (size: number, tiles = 6) => {
  const base = size / 6

  const width = size
  const height = size

  const grid = {
    x: 0,
    y: 0,
    w: size,
    h: size,
    tiles,
    active: false,
  }

  const background = {
    x: 0,
    y: 0,
    w: size,
    h: size,
  }

  const logo = {
    x: base / 4.5,
    y: base / 4.5,
    w: base + base / 4.5,
    h: base + base / 4.5,
  }

  const title = {
    x: logo.x + logo.w,
    y: base / 3,
    w: size - base,
    h: base,
  }

  const presentation = {
    x: 0,
    y: base,
    w: size,
    h: base * 3,
  }

  const date = {
    x: 0,
    y: size - base * 2,
    w: base * 1.5,
    h: base,
  }

  const time = {
    x: date.x + date.w,
    y: date.y,
    w: base,
    h: date.h,
  }

  const location = {
    x: time.x + time.w,
    y: time.y,
    w: size - time.x - time.w,
    h: time.h,
  }

  const details = {
    x: base / 4.5,
    y: size - base * 2,
    w: size,
    h: base,
  }

  const sponsor = {
    x: base / 4.5,
    y: size - base,
    w: base * 2,
    h: base,
  }

  const devParana = {
    x: size - 250,
    y: size - 90,
    w: 200,
    h: 50,
  }

  return {
    width,
    height,
    base,
    grid,
    background,
    logo,
    title,
    presentation,
    date,
    time,
    location,
    details,
    sponsor,
    devParana,
  }
}
