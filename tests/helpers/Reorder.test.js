import reorder from '../../src/helpers/Reorder.js';

describe('Reorder', () => {

    const svg    = d3.select(document.createElement('svg'));
    const group  = svg.append('g');

    const first  = group.append('g').attr('class', 'first').datum({ z: 2 });
    const second = group.append('g').attr('class', 'second').datum({ z: 1 });
    const third  = group.append('g').attr('class', 'third').datum({ z: 3 });

    it('Should be able to reorder the shape elements;', () => {

        reorder(group.selectAll('g'), first);

        expect(group.node().querySelector('g:nth-of-type(1)').classList.contains('second')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(2)').classList.contains('first')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(3)').classList.contains('third')).toBeTruthy();

        third.datum({ z: -Infinity });
        reorder(group.selectAll('g'), third);
        expect(group.node().querySelector('g:nth-of-type(1)').classList.contains('third')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(2)').classList.contains('second')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(3)').classList.contains('first')).toBeTruthy();

        second.datum({ z: Infinity });
        reorder(group.selectAll('g'), second);
        expect(group.node().querySelector('g:nth-of-type(1)').classList.contains('third')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(2)').classList.contains('first')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(3)').classList.contains('second')).toBeTruthy();

        first.datum({ z: 1 });
        reorder(group.selectAll('g'), first);
        expect(group.node().querySelector('g:nth-of-type(1)').classList.contains('first')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(2)').classList.contains('third')).toBeTruthy();
        expect(group.node().querySelector('g:nth-of-type(3)').classList.contains('second')).toBeTruthy();

    });

});