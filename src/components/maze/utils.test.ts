import {getCellType, neighborExists, getNeighborPosition, isMovementAllowedForType} from './utils';

const grid = [
  [3,3,3,3,3,3,3,3,3,1],
  [6,6,5,6,6,6,5,6,6,2],
  [6,6,6,5,6,6,6,5,6,2],
  [5,5,5,5,6,5,5,5,6,2],
  [5,5,6,5,6,5,5,6,6,2],
  [5,6,5,6,6,5,6,5,6,2],
  [5,5,6,5,6,5,6,6,6,2],
  [6,6,6,6,5,5,6,6,5,2],
  [5,6,6,5,6,6,5,5,6,2],
  [6,6,5,5,6,5,6,5,5,2]
];

describe('getCellType', () => {
  it('getCellType 0 0', () => {
    expect(getCellType(grid, 0, 0)).toBe(3);
  })

  it('getCellType 9, 0', () => {
    expect(getCellType(grid, 9, 0)).toBe(6);
  })

  it('getCellType 4, 4', () => {
    expect(getCellType(grid, 4, 4)).toBe(6);
  })

  it('getCellType 10, 10', () => {
    expect(getCellType(grid, 10, 10)).toBe(-1);
  })
});

describe('getNeighborPosition', () => {
  it('getNeighborPosition NORTH 0 0', () => {
    expect(getNeighborPosition('NORTH', 0, 0)).toEqual(expect.arrayContaining([-1, 0]))
  });

  it('getNeighborPosition EAST 0 0', () => {
    expect(getNeighborPosition('EAST', 0, 0)).toEqual(expect.arrayContaining([0, 1]))
  });

  it('getNeighborPosition SOUTH 0 0', () => {
    expect(getNeighborPosition('SOUTH', 0, 0)).toEqual(expect.arrayContaining([1, 0]))
  });

  it('getNeighborPosition WEST 0 0', () => {
    expect(getNeighborPosition('WEST', 0, 0)).toEqual(expect.arrayContaining([0, -1]))
  });

  it('getNeighborPosition NORTH 4 4', () => {
    expect(getNeighborPosition('NORTH', 4, 4)).toEqual(expect.arrayContaining([3, 4]));
  });

  it('getNeighborPosition EAST 4 4', () => {
    expect(getNeighborPosition('EAST', 4, 4)).toEqual(expect.arrayContaining([4, 5]));
  });

  it('getNeighborPosition SOUTH 4 4', () => {
    expect(getNeighborPosition('SOUTH', 4, 4)).toEqual(expect.arrayContaining([5, 4]));
  });

  it('getNeighborPosition WEST 4 4', () => {
    expect(getNeighborPosition('WEST', 4, 4)).toEqual(expect.arrayContaining([4, 3]));
  });
});

describe('neighborExists', () => {
  it('neighborExists NORTH 0 0', () => {
    expect(neighborExists('NORTH', grid, 0, 0)).toBe(-1);
  });

  it('neighborExists SOUTH 0 0', () => {
    expect(neighborExists('SOUTH', grid, 0, 0)).toBe(6);
  });

  it('neighborExists WEST 0 0', () => {
    expect(neighborExists('WEST', grid, 0, 0)).toBe(-1);
  })

  it('neighborExists EAST 0 0', () => {
    expect(neighborExists('EAST', grid, 0, 0)).toBe(3);
  })

  it('neighborExists NORTH 4 4', () => {
    expect(neighborExists('NORTH', grid, 4, 4)).toBe(6);
  })

  it('neighborExists EAST 4 4', () => {
    expect(neighborExists('EAST', grid, 4, 4)).toBe(5);
  })

  it('neighborExists SOUTH 4 4', () => {
    expect(neighborExists('SOUTH', grid, 4, 4)).toBe(6);
  })

  it('neighborExists WEST 4 4', () => {
    expect(neighborExists('WEST', grid, 4, 4)).toBe(5);
  })
});

describe('isMovementAllowedForType', () => {
  it('isMovementAllowedForType NORTH 2', () => {
    expect(isMovementAllowedForType('NORTH', 2)).toBe(true);
  });

  it('isMovementAllowedForType NORTH 5', () => {
    expect(isMovementAllowedForType('NORTH', 5)).toBe(true);
  });

  it('isMovementAllowedForType EAST', () => {
    expect(isMovementAllowedForType('EAST', 3)).toBe(true);
  });

  it('isMovementAllowedForType EAST', () => {
    expect(isMovementAllowedForType('EAST', 6)).toBe(true);
  });

  it('isMovementAllowedForType SOUTH 2', () => {
    expect(isMovementAllowedForType('SOUTH', 2)).toBe(true);
  });

  it('isMovementAllowedForType SOUTH 5', () => {
    expect(isMovementAllowedForType('SOUTH', 5)).toBe(true);
  });

  it('isMovementAllowedForType WEST', () => {
    expect(isMovementAllowedForType('WEST', 3)).toBe(true);
  });

  it('isMovementAllowedForType WEST', () => {
    expect(isMovementAllowedForType('WEST', 6)).toBe(true);
  });

  it('isMovementAllowedForType WEST', () => {
    expect(isMovementAllowedForType('WEST', 5)).toBe(false);
  });
})
