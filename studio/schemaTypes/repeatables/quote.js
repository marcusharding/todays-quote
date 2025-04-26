export default {
    name: 'quote',
    type: 'document',
    title: 'Quote',
    fields: [
        {
            name: 'quote',
            type: 'string',
            title: 'Copy',
            validation: (Rule) => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'quote'
        }
    }
};
