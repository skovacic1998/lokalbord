// Poster slots include the space around each poster.
export const CELL_WIDTH = 190;
export const CELL_HEIGHT = 260;
export const BOARD_COLUMNS = 10;
export const BOARD_ROWS = 8;
// The board has 80 fixed slots, centred within this visual canvas.
export const BOARD_WIDTH = 2100;
export const BOARD_HEIGHT = 2300;
export const MAX_SCALE = 2;
export const INITIAL_SCALE = 0.1;
const VIEW_PADDING = 24;

export type BoardView = { x: number; y: number; scale: number };
export type ViewportSize = { width: number; height: number };
type Spot = { col: number; row: number };

export function toBoardPixels({ col, row }: Spot) {
  return {
    x: (col - (BOARD_COLUMNS - 1) / 2) * CELL_WIDTH,
    y: (row - (BOARD_ROWS - 1) / 2) * CELL_HEIGHT,
  };
}

export function fitScale({ width, height }: ViewportSize) {
  return Math.min(
    MAX_SCALE,
    Math.max(1, width - VIEW_PADDING * 2) / BOARD_WIDTH,
    Math.max(1, height - VIEW_PADDING * 2) / BOARD_HEIGHT,
  );
}

export function fitBoard(size: ViewportSize): BoardView {
  return { x: 0, y: 0, scale: fitScale(size) };
}

export function initialBoardView(size: ViewportSize): BoardView {
  return constrainView({ x: 0, y: 0, scale: Math.max(fitScale(size), INITIAL_SCALE) }, size);
}

export function constrainView(view: BoardView, size: ViewportSize): BoardView {
  const scale = Math.min(MAX_SCALE, Math.max(fitScale(size), view.scale));
  // Keep a small margin at the edges; centre axes that already fit in full.
  const limitX = Math.max(0, (BOARD_WIDTH * scale - size.width) / 2 + VIEW_PADDING);
  const limitY = Math.max(0, (BOARD_HEIGHT * scale - size.height) / 2 + VIEW_PADDING);
  return {
    scale,
    x: limitX ? Math.min(limitX, Math.max(-limitX, view.x)) : 0,
    y: limitY ? Math.min(limitY, Math.max(-limitY, view.y)) : 0,
  };
}

// Place new posters from the centre outwards, stopping after all 80 slots are used.
export function findFreeSpot(events: readonly Spot[]): Spot | null {
  const occupied = new Set(events.map((event) => `${event.col},${event.row}`));
  const candidates: Spot[] = [];
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLUMNS; col++) {
      candidates.push({ col, row });
    }
  }
  candidates.sort((a, b) =>
    (a.col - 4.5) ** 2 + (a.row - 3.5) ** 2 - ((b.col - 4.5) ** 2 + (b.row - 3.5) ** 2)
      || a.row - b.row || a.col - b.col,
  );
  return candidates.find(({ col, row }) => !occupied.has(`${col},${row}`)) ?? null;
}
