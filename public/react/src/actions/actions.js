export const POST_LIST = 'POST_LIST';
export const POST_LIST_ADD = 'POST_LIST_ADD';

export const postList = () => ({
    type: POST_LIST,
    data: [
        {
            id: 1,
            title: 'Hello'
        },
        {
            id: 2,
            title: 'Hello2'
        }
    ]
});

export const postAdd = () => ({
    type: POST_LIST_ADD,
    data: [
        {
            id: Math.floor(Math.random() * 100 + 3),
            title: 'A newly added blog post'
        }
    ]
});
