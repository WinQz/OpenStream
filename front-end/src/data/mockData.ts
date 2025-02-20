export interface MovieDetails {
    id: string;
    title: string;
    description: string;
    extendedDescription?: string;
    thumbnail: string;
    url: string;
    duration: number;
    views: number;
    categoryId: string;
    releaseYear: number;
    rating: string;
    cast: string[];
    directors: string[];
    genres: string[];
}

export const mockVideos: MovieDetails[] = [
    {
        id: '1',
        title: 'The Matrix',
        description: 'A computer programmer discovers that reality as he knows it is a simulation.',
        extendedDescription: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free from the system. In this mind-bending sci-fi epic, he must confront the truth about his world and make a choice that will impact humanity forever.',
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 8160,
        views: 2000000,
        categoryId: '1',
        releaseYear: 1999,
        rating: 'R',
        cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
        directors: ['Lana Wachowski', 'Lilly Wachowski'],
        genres: ['Sci-Fi', 'Action']
    },
    {
        id: '2',
        title: 'Elephants Dream',
        description: 'A surreal story of two strange characters exploring a dark and foreboding machine.',
        extendedDescription: 'A surreal story of two strange characters exploring a dark and foreboding machine. The film delves into the depths of their minds and the bizarre world they inhabit, revealing the complexities of their relationship and the mysteries of the machine.',
        thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: 6530,
        views: 1500000,
        categoryId: '1',
        releaseYear: 2006,
        rating: 'PG',
        cast: ['Cas Jansen', 'Tygo Gernandt'],
        directors: ['Bassam Kurdali'],
        genres: ['Animation', 'Fantasy']
    },
    {
        id: '3',
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        extendedDescription: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. As they venture into the unknown, they face unimaginable challenges and must rely on their ingenuity and determination to save the human race.',
        thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Interstellar.mp4',
        duration: 10200,
        views: 1800000,
        categoryId: '1',
        releaseYear: 2014,
        rating: 'PG-13',
        cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        directors: ['Christopher Nolan'],
        genres: ['Sci-Fi', 'Drama']
    },
    {
        id: '4',
        title: 'Inception',
        description: 'A thief who enters the dreams of others to steal their secrets.',
        extendedDescription: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state. His rare ability has made him a coveted player in this treacherous new world of corporate espionage.',
        thumbnail: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 8880,
        views: 2200000,
        categoryId: '1',
        releaseYear: 2010,
        rating: 'PG-13',
        cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
        directors: ['Christopher Nolan'],
        genres: ['Sci-Fi', 'Action', 'Thriller']
    },
    {
        id: '5',
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc on Gotham City, Batman must fight for justice.',
        extendedDescription: 'With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham City. But when a vicious criminal calling himself the Joker suddenly throws the city into chaos, Batman must face his greatest challenge yet.',
        thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 9120,
        views: 2500000,
        categoryId: '1',
        releaseYear: 2008,
        rating: 'PG-13',
        cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
        directors: ['Christopher Nolan'],
        genres: ['Action', 'Crime', 'Drama']
    },
    {
        id: '6',
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.',
        extendedDescription: 'Multiple stories of Los Angeles criminals and lowlifes interweave in four tales of violence, redemption, and unexpected connections. From two philosophical hitmen to a boxer who refuses to throw a fight, these stories create a tapestry of crime, punishment, and dark humor.',
        thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 9240,
        views: 1900000,
        categoryId: '2',
        releaseYear: 1994,
        rating: 'R',
        cast: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
        directors: ['Quentin Tarantino'],
        genres: ['Crime', 'Drama']
    },
    {
        id: '7',
        title: 'The Grand Budapest Hotel',
        description: 'A concierge at a famous European hotel befriends a lobby boy and involves him in a theft and recovery plot.',
        extendedDescription: 'The adventures of Gustave H, a legendary concierge at a famous European hotel, and Zero Moustafa, the lobby boy who becomes his most trusted friend. The story involves the theft and recovery of a priceless Renaissance painting and the battle for an enormous family fortune.',
        thumbnail: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 6000,
        views: 1200000,
        categoryId: '3',
        releaseYear: 2014,
        rating: 'R',
        cast: ['Ralph Fiennes', 'Tony Revolori', 'Saoirse Ronan'],
        directors: ['Wes Anderson'],
        genres: ['Comedy', 'Drama', 'Adventure']
    },
    {
        id: '8',
        title: 'Blade Runner 2049',
        description: 'A young blade runner discovers a long-buried secret that leads him on a quest to find Rick Deckard.',
        extendedDescription: 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what\'s left of society into chaos. His discovery leads him on a quest to find Rick Deckard, a former blade runner who has been missing for 30 years.',
        thumbnail: 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?w=800',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: 9840,
        views: 1700000,
        categoryId: '1',
        releaseYear: 2017,
        rating: 'R',
        cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
        directors: ['Denis Villeneuve'],
        genres: ['Sci-Fi', 'Drama', 'Mystery']
    }
];

export const categories = [
    { id: '1', name: 'Action & Sci-Fi', description: 'Action and Science Fiction movies' },
    { id: '2', name: 'Drama & Crime', description: 'Drama and Crime movies' },
    { id: '3', name: 'Comedy', description: 'Comedy movies' }
];
