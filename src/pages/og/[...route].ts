import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
    const title = url.searchParams.get('title') || 'PwnFuzz Labs';

    return new ImageResponse(
        {
            type: 'div',
            props: {
                style: {
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1a1b26',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                },
                children: [
                    {
                        type: 'div',
                        props: {
                            style: {
                                fontSize: '64px',
                                fontWeight: 'bold',
                                color: '#c0caf5',
                                textAlign: 'center',
                                lineHeight: '1.2',
                                maxWidth: '1000px',
                            },
                            children: title,
                        },
                    },
                    {
                        type: 'div',
                        props: {
                            style: {
                                position: 'absolute',
                                bottom: '40px',
                                right: '60px',
                                fontSize: '28px',
                                fontWeight: '600',
                                color: '#ff9e64',
                            },
                            children: 'PwnFuzz Labs',
                        },
                    },
                ],
            },
        },
        {
            width: 1200,
            height: 630,
        }
    );
};
