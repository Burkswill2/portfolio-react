import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId:'1s0f8ey6',
    dataset: 'production-porfolio',
    apiVersion: "2024-03-07",
    useCdn: false,
    token: 'sk6k5z6zNIJuvAcpRm2E3pRnQXicuJ5XluzWPSzPiOW6mnT3Io5EuPFVqk141QW7Tx5nIMD1oRLaF1rNT0vBuFZGaG4hoFYiuggLr7GybwyG0NnWKlbZzbPi77sGpsyTYp3JqEOmfJmWE8BXxWVOsTRz8yva8eytu2RTNfrpTg021V0vFA6Z',
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);