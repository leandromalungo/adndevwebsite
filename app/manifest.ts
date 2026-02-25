import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ADN Developer',
        short_name: 'ADN',
        description: 'Maior repositório de tecnologia na lusofonia',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#7c3aed',
        icons: [
            {
                src: '/api/images/icon-light-32x32',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/api/images/apple-icon',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    };
}
