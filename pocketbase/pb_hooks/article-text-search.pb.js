/// <reference path="../pb_data/types.d.ts" />

onRecordValidate(e => {
    if (!e.record) {
        return e.next();
    }

    const rawText = [e.record.get('name'), e.record.get('markdown')].join(' ');
    const search = rawText
        .replaceAll(/[^A-ZА-ЯЁ0-9\s]/gmi, ' ')
        .replaceAll(/\s+/g, ' ')
        .toUpperCase();
    e.record.set('textSearch', search);

}, 'articles');