export const mockVideos = [
    {
        id: '1',
        title: 'The Matrix',
        description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
        url: '#',
        duration: 8160,
        views: 2000000,
        categoryId: '1'
    },
    // Add 8 more movies with similar structure using unsplash images
    {
        id: '3',
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
        url: '#',
        duration: 10200,
        views: 1800000,
        categoryId: '1'
    }
];

export const categories = [
    { id: '1', name: 'Action', description: 'Action movies' },
    { id: '2', name: 'Drama', description: 'Drama movies' },
    { id: '3', name: 'Comedy', description: 'Comedy movies' }
];
