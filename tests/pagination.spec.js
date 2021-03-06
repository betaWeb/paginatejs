const Pagination = require('../src/Pagination')

beforeAll(() => this.pagination = new Pagination([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 3));

test('Test expects to have 5 pages', () => {
    expect(this.pagination.nbPages).toEqual(5)
});

test('Test returns the right number of results', () => {
    expect(this.pagination.getPaginated().count()).toEqual(3)
});

test('Test returns the right chunk of results', () => {
    this.pagination.goToPage(2)
    expect(this.pagination.getPaginated(true)).toEqual(expect.arrayContaining([4, 5, 6]))
    expect(this.pagination.getPaginated().first()).toEqual(4)
});

test('Test get first page', () => {
    this.pagination.firstPage()
    expect(this.pagination.getPaginated(true)).toEqual(expect.arrayContaining([1, 2, 3]))
    expect(this.pagination.getPaginated().last()).toEqual(3)
});

test('Test get last page', () => {
    this.pagination.lastPage()
    expect(this.pagination.getPaginated(true)).toEqual(expect.arrayContaining([13]))
    expect(this.pagination.getPaginated().contains(13)).toEqual(true)
});

test('Test get prev page', () => {
    this.pagination
        .goToPage(4)
        .prevPage()

    expect(this.pagination.getPaginated(true)).toEqual(expect.arrayContaining([7, 8, 9]))
    expect(this.pagination.getPaginated().nth(2)).toEqual(8)
});

test('Test get next page', () => {
    this.pagination
        .goToPage(3)
        .nextPage()

    expect(this.pagination.getPaginated(true)).toEqual(expect.arrayContaining([10, 11, 12]))
    expect(this.pagination.getPaginated().nth(4)).toEqual(null)
});

test('Test get page number from current position', () => {
    this.pagination.prevPage()

    expect(this.pagination.pageNumber).toEqual(3)
});

test('Test get page number from beginning', () => {
    this.pagination
        .firstPage()
        .nextPage()
        .nextPage()

    expect(this.pagination.pageNumber).toEqual(3)
});

test('Test get page that not exists', () => {
    this.pagination.goToPage(7)
    expect(this.pagination.getPaginated(true)).toEqual(expect.arrayContaining([13]))
});

test('Test reset pagination', () => {
    expect(this.pagination.reset().getPaginated(true)).toEqual(expect.arrayContaining([1,2,3]))
    expect(this.pagination.nextPage().getPaginated(true)).toEqual(expect.arrayContaining([4,5,6]))
});

test('Test get chunked list of array', () => {
    expect(this.pagination.chunkList().count()).toEqual(5)
});

test('Test get chunked list of array with keys', () => {
    expect(Object.keys(this.pagination.chunkList(true))).toEqual(expect.arrayContaining(['1','2','3','4','5']))
});

test('Test expect count last page to have 1 entry', () => {
    expect(this.pagination.countLastPage()).toEqual(1)
});

test('Test get pagination with perPage larger than array length', () => {
    this.pagination.perPage = 20
    expect(this.pagination.getPaginated().count()).toEqual(this.pagination.count())
});

test('Test expect count list to have 13 entries', () => {
    expect(this.pagination.count()).toEqual(13)
});

afterAll(() => this.pagination = null);
