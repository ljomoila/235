import Api from '../Api';

describe('Api', () => {
    const api = new Api();

    it('should do fetch', async () => {
        // given
        const expectedResponse = { teams: [] };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(expectedResponse)
            })
        );

        // when
        const response = await api.doFetch('/');

        // then
        expect(expectedResponse).toEqual(response);
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/');
    });

    it('should fail to do fetch with rejection', async () => {
        // given
        global.fetch = jest.fn(() => mockRejectedValueOnce(new Error('error')));

        // when && then
        try {
            await api.doFetch('/');
            expect(true).toEqual(false);
        } catch (e) {
            expect(true).toEqual(true);
        }
    });

    it('should fail to do fetch with invalid status', async () => {
        // given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({})
            })
        );

        // when && then
        try {
            await api.doFetch('/');
            expect(true).toEqual(false);
        } catch (e) {
            expect(true).toEqual(true);
            expect(e.message.includes('Status not ok')).toBeTruthy();
        }
    });

    it('should fail to do fetch with error in response', async () => {
        // given
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ error: true, message: 'error foo' })
            })
        );

        // when && then
        try {
            await api.doFetch('/');
            expect(true).toEqual(false);
        } catch (e) {
            expect(true).toEqual(true);
            expect(e.message.includes('error foo')).toBeTruthy();
        }
    });
});
