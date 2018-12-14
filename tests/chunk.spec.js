const Chunk = require('../src/Chunk')

beforeAll(() => this.chunk = new Chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));

test('Test chunk count', () => {
    expect(this.chunk.count()).toEqual(13)
});

test('Test chunk is empty', () => {
    expect(this.chunk.empty()).toEqual(false)
});

test('Test chunk is not empty', () => {
    expect(this.chunk.notEmpty()).toEqual(true)
});

test('Test first element', () => {
    expect(this.chunk.first()).toEqual(1)
});

test('Test last element', () => {
    expect(this.chunk.last()).toEqual(13)
});

test('Test nth element', () => {
    expect(this.chunk.nth(9)).toEqual(10)
});

test('Test contains value', () => {
    expect(this.chunk.contains(9)).toEqual(true)
});

test('Test toArray method', () => {
    expect(this.chunk.toArray()).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]))
});

afterAll(() => this.chunk = null);